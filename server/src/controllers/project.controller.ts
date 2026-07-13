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
        let projectData = { ...req.body };

        if (typeof projectData.tags === 'string') {
            projectData.tags = projectData.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
        }
        // ADD THIS LINE — was missing:
        if (typeof projectData.media === 'string') projectData.media = JSON.parse(projectData.media);

        if (typeof projectData.setupSteps === 'string') projectData.setupSteps = JSON.parse(projectData.setupSteps);
        if (typeof projectData.featurePoints === 'string') projectData.featurePoints = JSON.parse(projectData.featurePoints);
        if (typeof projectData.bulletList === 'string') projectData.bulletList = JSON.parse(projectData.bulletList);
        if (typeof projectData.testimonials === 'string') projectData.testimonials = JSON.parse(projectData.testimonials);

        const { gallery, setupStepFiles, testimonialFiles } = groupIncomingFiles(
            req.files as Express.Multer.File[]
        );

        // Gallery uploads — now correctly appends to an already-parsed array
        if (gallery.length > 0) {
            const uploaded = await Promise.all(
                gallery.map((f) => uploadMedia(f.buffer, { folder: 'projects', resourceType: 'image' }))
            );
            const newMediaItems = uploaded.map(({ url, publicId }) => ({ type: 'image', url, publicId }));
            projectData.media = [...(projectData.media || []), ...newMediaItems];
        }

        // Setup-step images
        if (Object.keys(setupStepFiles).length > 0 && Array.isArray(projectData.setupSteps)) {
            const uploadedByIdx = await uploadIndexedFiles(setupStepFiles, 'projects/setup-steps');
            for (const [idx, media] of Object.entries(uploadedByIdx)) {
                if (projectData.setupSteps[Number(idx)]) {
                    projectData.setupSteps[Number(idx)].image = media;
                }
            }
        }

        // Testimonial avatar images
        if (Object.keys(testimonialFiles).length > 0 && Array.isArray(projectData.testimonials)) {
            const uploadedByIdx = await uploadIndexedFiles(testimonialFiles, 'projects/testimonials');
            for (const [idx, media] of Object.entries(uploadedByIdx)) {
                if (projectData.testimonials[Number(idx)]) {
                    projectData.testimonials[Number(idx)].clientImage = media;
                }
            }
        }

        const project = await Project.create(projectData);
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
        if (!project) return sendResponse(res, 404, false, 'Project not found');

        let updateData = { ...req.body };

        if (typeof updateData.tags === 'string') {
            updateData.tags = updateData.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
        }
        if (typeof updateData.media === 'string') updateData.media = JSON.parse(updateData.media);
        if (typeof updateData.setupSteps === 'string') updateData.setupSteps = JSON.parse(updateData.setupSteps);
        if (typeof updateData.featurePoints === 'string') updateData.featurePoints = JSON.parse(updateData.featurePoints);
        if (typeof updateData.bulletList === 'string') updateData.bulletList = JSON.parse(updateData.bulletList);
        if (typeof updateData.testimonials === 'string') updateData.testimonials = JSON.parse(updateData.testimonials);

        // Gallery: diff-delete removed images (existing logic, unchanged)
        if (updateData.media && Array.isArray(updateData.media)) {
            const incomingPublicIds = updateData.media.map((m: any) => m.publicId).filter(Boolean);
            const imagesToDelete = project.media?.filter(
                (existingImg: any) => existingImg.publicId && !incomingPublicIds.includes(existingImg.publicId)
            ) || [];
            if (imagesToDelete.length > 0) {
                await Promise.all(imagesToDelete.map((img: any) => deleteMedia(img.publicId)));
            }
        }

        const { gallery, setupStepFiles, testimonialFiles } = groupIncomingFiles(
            req.files as Express.Multer.File[]
        );

        // New gallery uploads get appended
        if (gallery.length > 0) {
            const uploaded = await Promise.all(
                gallery.map((f) => uploadMedia(f.buffer, { folder: 'projects', resourceType: 'image' }))
            );
            const newMediaItems = uploaded.map(({ url, publicId }) => ({ type: 'image', url, publicId }));
            updateData.media = updateData.media
                ? [...updateData.media, ...newMediaItems]
                : [...(project.media || []), ...newMediaItems];
        }

        // Setup-step images — replace, and clean up the old Cloudinary asset if swapped
        if (Object.keys(setupStepFiles).length > 0 && Array.isArray(updateData.setupSteps)) {
            const uploadedByIdx = await uploadIndexedFiles(setupStepFiles, 'projects/setup-steps');
            for (const [idx, media] of Object.entries(uploadedByIdx)) {
                const i = Number(idx);
                const oldPublicId = project.setupSteps?.[i]?.image?.publicId;
                if (oldPublicId && oldPublicId !== media.publicId) {
                    await deleteMedia(oldPublicId).catch(() => {});
                }
                if (updateData.setupSteps[i]) updateData.setupSteps[i].image = media;
            }
        }

        // Testimonial avatars — same replace + cleanup pattern
        if (Object.keys(testimonialFiles).length > 0 && Array.isArray(updateData.testimonials)) {
            const uploadedByIdx = await uploadIndexedFiles(testimonialFiles, 'projects/testimonials');
            for (const [idx, media] of Object.entries(uploadedByIdx)) {
                const i = Number(idx);
                const oldPublicId = project.testimonials?.[i]?.clientImage?.publicId;
                if (oldPublicId && oldPublicId !== media.publicId) {
                    await deleteMedia(oldPublicId).catch(() => {});
                }
                if (updateData.testimonials[i]) updateData.testimonials[i].clientImage = media;
            }
        }

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
            { returnDocument: 'after' }
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


const groupIncomingFiles = (files: Express.Multer.File[] = []) => {
    const gallery: Express.Multer.File[] = [];
    const setupStepFiles: Record<number, Express.Multer.File> = {};
    const testimonialFiles: Record<number, Express.Multer.File> = {};

    for (const f of files) {
        const setupMatch = f.fieldname.match(/^setupStepImage_(\d+)$/);
        const testiMatch = f.fieldname.match(/^testimonialImage_(\d+)$/);

        if (f.fieldname === 'images') {
            gallery.push(f);
        } else if (setupMatch) {
            setupStepFiles[Number(setupMatch[1])] = f;
        } else if (testiMatch) {
            testimonialFiles[Number(testiMatch[1])] = f;
        }
        // unrecognized fieldnames are silently ignored — could log/reject instead
    }

    return { gallery, setupStepFiles, testimonialFiles };
};

// Uploads a map of {index: file} to Cloudinary and returns {index: IMedia}
const uploadIndexedFiles = async (
    fileMap: Record<number, Express.Multer.File>,
    folder: string
): Promise<Record<number, IMedia>> => {
    const entries = Object.entries(fileMap);
    const uploaded = await Promise.all(
        entries.map(async ([idx, file]) => {
            const { url, publicId } = await uploadMedia(file.buffer, { folder, resourceType: 'image' });
            return [Number(idx), { type: 'image', url, publicId }] as [number, IMedia];
        })
    );
    return Object.fromEntries(uploaded);
};
