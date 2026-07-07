import { Request, Response } from 'express';
import 'multer'; // Ensures Express.Multer.File namespace resolves cleanly
import { BaseProduct, ProductItem } from '../models/product';
import { uploadMedia, deleteMedia } from '../utils/cloudinary';

// ------------------------------------------------------------------
// POST /base-products
// Expects an uploaded file on the 'thumbnail' field name
// ------------------------------------------------------------------
export const createBaseProduct = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // Process the singular thumbnail file drop
    if (files?.thumbnail?.[0]) {
      const uploadedThumbnail = await uploadMedia(files.thumbnail[0].buffer, { folder: 'base-products/thumbnails' });
      req.body.thumbnail = {
        type: 'image',
        url: uploadedThumbnail.url,
        publicId: uploadedThumbnail.publicId
      };
    } else {
      return res.status(400).json({ success: false, message: 'Thumbnail image is required' });
    }

    const product = await BaseProduct.create(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// GET /base-products
// ------------------------------------------------------------------
export const getAllBaseProducts = async (req: Request, res: Response) => {
  try {
    const { status, search, page = '1', limit = '20' } = req.query;

    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    if (search) filter.title = { $regex: search as string, $options: 'i' };

    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit as string, 10) || 20, 1);

    const [items, total] = await Promise.all([
      BaseProduct.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
      BaseProduct.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: items,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// GET /base-products/:slug
// ------------------------------------------------------------------
export const getBaseProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await BaseProduct.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ success: false, message: 'Base product not found' });
    return res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// GET /base-products/:slug/with-items
// ------------------------------------------------------------------
export const getBaseProductWithItems = async (req: Request, res: Response) => {
  try {
    const product = await BaseProduct.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ success: false, message: 'Base product not found' });

    const items = await ProductItem.find({ baseProduct: product._id }).sort({ featuredOrder: -1, purchaseCount: -1 });
    return res.status(200).json({ success: true, data: { ...product.toObject(), items } });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// PATCH /base-products/:id
// Replaces thumbnail on Cloudinary if a new one is uploaded
// ------------------------------------------------------------------
export const updateBaseProduct = async (req: Request, res: Response) => {
  try {
    const product = await BaseProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Base product not found' });

    let updateData = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // If a new thumbnail file is attached, swap it out on Cloudinary
    if (files?.thumbnail?.[0]) {
      if (product.thumbnail?.publicId) {
        // Delete old asset from Cloudinary storage
        await deleteMedia(product.thumbnail.publicId);
      }
      // Upload new asset
      const uploadedThumbnail = await uploadMedia(files.thumbnail[0].buffer, { folder: 'base-products/thumbnails' });
      updateData.thumbnail = {
        type: 'image',
        url: uploadedThumbnail.url,
        publicId: uploadedThumbnail.publicId
      };
    }

    Object.assign(product, updateData);
    await product.save(); // Triggers slug regeneration hook if title changed

    return res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// DELETE /base-products/:id (Hard Cascade Delete & Cloudinary Wipeout)
// ------------------------------------------------------------------
export const deleteBaseProduct = async (req: Request, res: Response) => {
  try {
    const product = await BaseProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Base product not found' });

    // 1. Wipe parent thumbnail from Cloudinary
    if (product.thumbnail?.publicId) {
      await deleteMedia(product.thumbnail.publicId);
    }

    // 2. Fetch variant children items to wipe out their image references from Cloudinary
    const relatedItems = await ProductItem.find({ baseProduct: product._id });
    for (const item of relatedItems) {
      if (item.thumbnail?.publicId) {
        await deleteMedia(item.thumbnail.publicId);
      }
      if (item.gallery && item.gallery.length > 0) {
        const publicIds = item.gallery.map((g: any) => g.publicId).filter(Boolean);
        if (publicIds.length > 0) {
          await Promise.all(publicIds.map((id) => deleteMedia(id)));
        }
      }
    }

    // 3. Delete dependent product item documents from MongoDB cascade-style
    await ProductItem.deleteMany({ baseProduct: product._id });

    return res.status(200).json({ 
      success: true, 
      message: 'Base product, all its child variants, and all related images from Cloudinary permanently deleted.' 
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};