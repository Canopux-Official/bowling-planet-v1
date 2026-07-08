import { NextFunction, Request, RequestHandler, Response } from 'express';
import Blog from '../models/blog';
import { deleteMedia, uploadImage } from '../utils/cloudinary';

export const asyncHandler =
    (fn: RequestHandler): RequestHandler =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };


// ====================================================================
// ADMIN CONTROLLERS
// ====================================================================

// POST /api/admin/blogs
export const createBlog = asyncHandler(async (req: Request, res: Response) => {
    const { title, content, excerpt, coverImage, author, tags, isPublished } = req.body;

    const blog = await Blog.create({
        title,
        content,
        excerpt,
        coverImage, // { url, publicId } — uploaded separately via uploadBlogImage first
        author,
        tags,
        isPublished: isPublished ?? false,
    });

    res.status(201).json({ success: true, data: blog });
});

// PUT /api/admin/blogs/:id
export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, excerpt, coverImage, author, tags, isPublished } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // If the cover image is being replaced, delete the old Cloudinary asset
    if (coverImage && blog.coverImage?.publicId && coverImage.publicId !== blog.coverImage.publicId) {
        await deleteMedia(blog.coverImage.publicId);
    }

    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (author !== undefined) blog.author = author;
    if (tags !== undefined) blog.tags = tags;
    if (isPublished !== undefined) blog.isPublished = isPublished;

    // Using .save() (not findByIdAndUpdate) so the pre-save hook re-runs
    // slug regeneration on title change and stamps publishedAt correctly.
    await blog.save();

    res.status(200).json({ success: true, data: blog });
});

// DELETE /api/admin/blogs/:id  (hard delete — permanently removes the document)
export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Clean up the cover image on Cloudinary before removing the document,
    // so we don't leave orphaned files behind.
    if (blog.coverImage?.publicId) {
        await deleteMedia(blog.coverImage.publicId);
    }

    // NOTE: if you insert extra inline images via the editor (not just the
    // cover image), those Cloudinary assets won't be caught here since only
    // the coverImage publicId is tracked on the document. If you want those
    // cleaned up too, you'd need to store their publicIds somewhere on the
    // blog doc (e.g. an `inlineImagePublicIds: string[]` array updated
    // whenever the editor content changes) so delete can loop over them.

    await Blog.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
});

// GET /api/admin/blogs?page=1&limit=10&status=draft&tag=tips&search=bowling
export const getAllBlogsAdmin = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { status, tag, search } = req.query;

    const filter: Record<string, any> = {};

    if (status === 'published') filter.isPublished = true;
    if (status === 'draft') filter.isPublished = false;
    if (tag) filter.tags = tag;
    if (search) filter.title = { $regex: search as string, $options: 'i' };

    const [blogs, total] = await Promise.all([
        Blog.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Blog.countDocuments(filter),
    ]);

    res.status(200).json({
        success: true,
        data: blogs,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
});

// PATCH /api/admin/blogs/:id/toggle-publish
export const togglePublishBlog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save(); // hook stamps publishedAt on first publish

    res.status(200).json({ success: true, data: blog });
});

// POST /api/admin/blogs/upload-image  (multer memoryStorage middleware runs before this)
export const uploadBlogImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const result = await uploadImage(req.file.buffer, 'blog');

    res.status(200).json({ success: true, data: result }); // { url, publicId }
});

// ====================================================================
// PUBLIC CONTROLLERS
// ====================================================================

// GET /api/blogs?page=1&limit=9&tag=tips
export const getPublishedBlogs = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const { tag } = req.query;

    const filter: Record<string, any> = { isPublished: true };
    if (tag) filter.tags = tag;

    const [blogs, total] = await Promise.all([
        Blog.find(filter)
            .select('-content') // list view doesn't need full HTML body
            .sort({ publishedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Blog.countDocuments(filter),
    ]);

    res.status(200).json({
        success: true,
        data: blogs,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
});

// GET /api/blogs/:slug
export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug, isPublished: true });

    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
});

// GET /api/blogs/:slug/related
export const getRelatedBlogs = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const limit = parseInt(req.query.limit as string) || 3;

    const current = await Blog.findOne({ slug, isPublished: true });

    if (!current) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const related = await Blog.find({
        _id: { $ne: current._id },
        tags: { $in: current.tags },
        isPublished: true,
    })
        .select('-content')
        .limit(limit);

    res.status(200).json({ success: true, data: related });
});