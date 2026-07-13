import { NextFunction, Request, RequestHandler, Response } from 'express';
import Resource from '../models/resources';
export const asyncHandler =
    (fn: RequestHandler): RequestHandler =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };


// ====================================================================
// ADMIN CONTROLLERS
// ====================================================================

// POST /api/admin/resources
export const createResource = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, type, externalUrl, category, tags, isPublished } = req.body;

    const resource = await Resource.create({
        title,
        description,
        type,
        externalUrl,
        category,
        tags,
        isPublished: isPublished ?? false,
    });

    res.status(201).json({ success: true, data: resource });
});

// PUT /api/admin/resources/:id
export const updateResource = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, type, externalUrl, category, tags, isPublished } = req.body;

    const resource = await Resource.findById(id);

    if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    if (title !== undefined) resource.title = title;
    if (description !== undefined) resource.description = description;
    if (type !== undefined) resource.type = type;
    if (externalUrl !== undefined) resource.externalUrl = externalUrl;
    if (category !== undefined) resource.category = category;
    if (tags !== undefined) resource.tags = tags;
    if (isPublished !== undefined) resource.isPublished = isPublished;

    // Using .save() (not findByIdAndUpdate) so the pre-save hook re-runs
    // slug regeneration on title change.
    await resource.save();

    res.status(200).json({ success: true, data: resource });
});

// DELETE /api/admin/resources/:id  (hard delete — permanently removes the document)
export const deleteResource = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    // No Cloudinary cleanup needed here — resources only ever hold an
    // externalUrl, nothing hosted on our own Cloudinary account.
    await Resource.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Resource deleted successfully' });
});

// GET /api/admin/resources?page=1&limit=10&category=Operations&type=pdf&status=published
export const getAllResourcesAdmin = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { category, type, status } = req.query;

    const filter: Record<string, any> = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (status === 'published') filter.isPublished = true;
    if (status === 'draft') filter.isPublished = false;

    const [resources, total] = await Promise.all([
        Resource.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Resource.countDocuments(filter),
    ]);

    res.status(200).json({
        success: true,
        data: resources,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
});

// PATCH /api/admin/resources/:id/toggle-publish
export const togglePublishResource = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    resource.isPublished = !resource.isPublished;
    await resource.save();

    res.status(200).json({ success: true, data: resource });
});

// ====================================================================
// PUBLIC CONTROLLERS
// ====================================================================

// GET /api/resources?page=1&limit=12&category=Operations&type=pdf
export const getPublishedResources = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const { category, type } = req.query;

    const filter: Record<string, any> = { isPublished: true };
    if (category) filter.category = category;
    if (type) filter.type = type;

    const [resources, total] = await Promise.all([
        Resource.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Resource.countDocuments(filter),
    ]);

    res.status(200).json({
        success: true,
        data: resources,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
});

// GET /api/resources/:slug
export const getResourceBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const resource = await Resource.findOne({ slug, isPublished: true });

    if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    res.status(200).json({ success: true, data: resource });
});
