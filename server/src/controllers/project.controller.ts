import { Request, Response } from 'express';
import Project, { IProject, IMedia } from '../models/project';
import { uploadMedia, deleteMedia } from '../utils/cloudinary'; // Assuming deleteMedia is defined here
import 'multer';

// ------------------------------------------------------------------
// Small helper — consistent response shape across the controller
// ------------------------------------------------------------------
const sendResponse = (
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data: unknown = null
) => {
    return res.status(statusCode).json({ success, message, data });
};

// ------------------------------------------------------------------
// CREATE — POST /api/projects
// ------------------------------------------------------------------
export const createProject = async (req: Request, res: Response) => {
    try {
        // Handle initial image uploads via Multer memory storage buffers
        if (req.files && Array.isArray(req.files)) {
            const uploaded = await Promise.all(
                (req.files as Express.Multer.File[]).map((f) =>
                    uploadMedia(f.buffer, { folder: 'projects', resourceType: 'image' })
                )
            );

            req.body.media = uploaded.map(({ url, publicId }) => ({
                type: 'image',
                url,
                publicId,
            }));
        }

        const project = await Project.create(req.body);
        return sendResponse(res, 201, true, 'Project created successfully', project);
    } catch (error: any) {
        return sendResponse(res, 400, false, error.message || 'Failed to create project');
    }
};

// ------------------------------------------------------------------
// READ (list) — GET /api/projects
// ------------------------------------------------------------------
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const page = Math.max(parseInt(req.query.page as string) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
        const skip = (page - 1) * limit;

        const filter: any = { isDeleted: false };

        if (req.query.tags) {
            const tags = (req.query.tags as string).split(',').map((t) => t.trim().toLowerCase());
            filter.tags = { $in: tags };
        }

        if (req.query.isPublished !== undefined) {
            filter.isPublished = req.query.isPublished === 'true';
        }

        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search as string, 'i');
            filter.$or = [{ title: searchRegex }, { description: searchRegex }];
        }

        let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
        if (req.query.sort === 'oldest') sortOption = { createdAt: 1 };
        if (req.query.sort === 'title') sortOption = { title: 1 };

        const [projects, total] = await Promise.all([
            Project.find(filter).sort(sortOption).skip(skip).limit(limit),
            Project.countDocuments(filter),
        ]);

        return sendResponse(res, 200, true, 'Projects fetched successfully', {
            projects,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        return sendResponse(res, 500, false, error.message || 'Failed to fetch projects');
    }
};

// ------------------------------------------------------------------
// READ (single) — GET /api/projects/:slug
// ------------------------------------------------------------------
export const getProjectBySlug = async (req: Request, res: Response) => {
    try {
        const project = await Project.findOne({
            slug: req.params.slug,
            isDeleted: false,
        });

        if (!project) {
            return sendResponse(res, 404, false, 'Project not found');
        }

        return sendResponse(res, 200, true, 'Project fetched successfully', project);
    } catch (error: any) {
        return sendResponse(res, 500, false, error.message || 'Failed to fetch project');
    }
};

// ------------------------------------------------------------------
// UPDATE — PUT/PATCH /api/projects/:id
// Handles stringified structural updates alongside new file drops
// ------------------------------------------------------------------
export const updateProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, isDeleted: false });

        if (!project) {
            return sendResponse(res, 404, false, 'Project not found');
        }

        // Parse req.body properties if sent via multipart/form-data
        let updateData = { ...req.body };
        if (typeof updateData.media === 'string') {
            updateData.media = JSON.parse(updateData.media);
        }

        // 1. Check if the user wants to remove items from the existing array
        if (updateData.media && Array.isArray(updateData.media)) {
            const incomingPublicIds = updateData.media.map((m: any) => m.publicId).filter(Boolean);

            // Collect any asset currently saved that is omitted from the incoming modification payload
            const imagesToDelete = project.media?.filter(
                (existingImg: any) => existingImg.publicId && !incomingPublicIds.includes(existingImg.publicId)
            ) || [];

            // Purge deleted photos from Cloudinary storage
            if (imagesToDelete.length > 0) {
                await Promise.all(imagesToDelete.map((img: any) => deleteMedia(img.publicId)));
            }
        }

        // 2. Process completely new binary file replacements
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            const uploaded = await Promise.all(
                (req.files as Express.Multer.File[]).map((f) =>
                    uploadMedia(f.buffer, { folder: 'projects', resourceType: 'image' })
                )
            );

            const newMediaItems = uploaded.map(({ url, publicId }) => ({
                type: 'image',
                url,
                publicId,
            }));

            // Append new ones to whatever remains or assign them fresh
            if (updateData.media && Array.isArray(updateData.media)) {
                updateData.media = [...updateData.media, ...newMediaItems];
            } else {
                updateData.media = [...(project.media || []), ...newMediaItems];
            }
        }

        // Apply remaining changes and fire pre-save validations safely
        Object.assign(project, updateData);
        await project.save();

        return sendResponse(res, 200, true, 'Project updated successfully', project);
    } catch (error: any) {
        return sendResponse(res, 400, false, error.message || 'Failed to update project');
    }
};

// ------------------------------------------------------------------
// DELETE (soft) — DELETE /api/projects/:id
// Soft deletes project and cleans up assets from remote Cloudinary
// ------------------------------------------------------------------
export const deleteProject = async (req: Request, res: Response) => {
    try {
        // 1. Permanently delete the project document from MongoDB and return it
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return sendResponse(res, 404, false, 'Project not found');
        }

        // 2. Clean up Cloudinary storage using the deleted document's media metadata
        if (project.media && project.media.length > 0) {
            const publicIds = project.media.map((img: any) => img.publicId).filter(Boolean);

            if (publicIds.length > 0) {
                // Execute parallel destruction requests to Cloudinary
                await Promise.all(publicIds.map((id) => deleteMedia(id)));
            }
        }

        // Note: No need to run project.save() here since the document is already wiped from the database!
        return sendResponse(res, 200, true, 'Project permanently deleted and remote assets cleared');
    } catch (error: any) {
        return sendResponse(res, 500, false, error.message || 'Failed to delete project');
    }
};

// ------------------------------------------------------------------
// PUBLISH / UNPUBLISH TOGGLE — PATCH /api/projects/:id/publish
// ------------------------------------------------------------------
export const togglePublishProject = async (req: Request, res: Response) => {
    try {
        if (typeof req.body.isPublished !== 'boolean') {
            return sendResponse(res, 400, false, 'isPublished must be a boolean');
        }

        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isPublished: req.body.isPublished },
            { new: true }
        );

        if (!project) {
            return sendResponse(res, 404, false, 'Project not found');
        }

        const message = project.isPublished ? 'Project published' : 'Project unpublished';
        return sendResponse(res, 200, true, message, project);
    } catch (error: any) {
        return sendResponse(res, 500, false, error.message || 'Failed to update publish status');
    }
};