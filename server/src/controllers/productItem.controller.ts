import { Request, Response } from 'express';
import 'multer';
import { BaseProduct, ProductItem } from '../models/product';
import { uploadMedia, deleteMedia } from '../utils/cloudinary';

// ------------------------------------------------------------------
// POST /product-items
// ------------------------------------------------------------------
export const createProductItem = async (req: Request, res: Response) => {
  try {
    const { baseProduct } = req.body;

    const parentExists = await BaseProduct.exists({ _id: baseProduct });
    if (!parentExists) {
      return res.status(400).json({ success: false, message: 'Invalid or missing baseProduct' });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // 1. Process single thumbnail drop
    if (files?.thumbnail?.[0]) {
      const uploadedThumbnail = await uploadMedia(files.thumbnail[0].buffer, { folder: 'product-items/thumbnails' });
      req.body.thumbnail = {
        type: 'image',
        url: uploadedThumbnail.url,
        publicId: uploadedThumbnail.publicId
      };
    }

    // 2. Process multiple gallery items drop
    if (files?.gallery && files.gallery.length > 0) {
      const uploadedGallery = await Promise.all(
        files.gallery.map((file) => uploadMedia(file.buffer, { folder: 'product-items/gallery' }))
      );
      req.body.gallery = uploadedGallery.map(({ url, publicId }) => ({
        type: 'image',
        url,
        publicId
      }));
    }

    // in createProductItem, before ProductItem.create(req.body):
    if (typeof req.body.featureList === 'string') req.body.featureList = JSON.parse(req.body.featureList);
    if (typeof req.body.points === 'string') req.body.points = JSON.parse(req.body.points);
    if (typeof req.body.usedIn === 'string') req.body.usedIn = JSON.parse(req.body.usedIn);

    const item = await ProductItem.create(req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// GET /product-items
// ------------------------------------------------------------------
export const getAllProductItems = async (req: Request, res: Response) => {
  try {
    const { baseProduct, status, search, page = '1', limit = '20', sort = 'newest' } = req.query;

    const filter: Record<string, any> = {};
    if (baseProduct) filter.baseProduct = baseProduct;
    if (status) filter.status = status;
    if (search) filter.title = { $regex: search as string, $options: 'i' };

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      newest: { createdAt: -1 },
      bestsellers: { purchaseCount: -1 },
      featured: { featuredOrder: -1 },
      priceLowToHigh: { price: 1 },
      priceHighToLow: { price: -1 },
    };
    const sortOption = sortMap[sort as string] || sortMap.newest;

    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit as string, 10) || 20, 1);

    const [items, total] = await Promise.all([
      ProductItem.find(filter)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate('baseProduct', 'title slug thumbnail'),
      ProductItem.countDocuments(filter),
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
// GET /product-items/:slug
// ------------------------------------------------------------------
export const getProductItemBySlug = async (req: Request, res: Response) => {
  try {
    const item = await ProductItem.findOne({ slug: req.params.slug }).populate(
      'baseProduct',
      'title slug thumbnail'
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Product item not found' });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// GET /product-items/by-base/:baseProductId
// ------------------------------------------------------------------
export const getItemsByBaseProduct = async (req: Request, res: Response) => {
  try {
    const items = await ProductItem.find({ baseProduct: req.params.baseProductId }).sort({ purchaseCount: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// GET /product-items/featured
// ------------------------------------------------------------------
export const getFeaturedItems = async (req: Request, res: Response) => {
  try {
    const limit = Math.max(parseInt((req.query.limit as string) || '10', 10), 1);
    const items = await ProductItem.find({ status: 'active' })
      .sort({ featuredOrder: -1, purchaseCount: -1 })
      .limit(limit)
      .populate('baseProduct', 'title slug');

    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// PATCH /product-items/:id
// ------------------------------------------------------------------
export const updateProductItem = async (req: Request, res: Response) => {
  try {
    const item = await ProductItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Product item not found' });
    }

    let updateData = { ...req.body };
    if (typeof updateData.gallery === 'string') updateData.gallery = JSON.parse(updateData.gallery);
    if (typeof updateData.thumbnail === 'string') updateData.thumbnail = JSON.parse(updateData.thumbnail);
    // in updateProductItem, alongside the existing gallery/thumbnail parse lines:
    if (typeof updateData.featureList === 'string') updateData.featureList = JSON.parse(updateData.featureList);
    if (typeof updateData.points === 'string') updateData.points = JSON.parse(updateData.points);
    if (typeof updateData.usedIn === 'string') updateData.usedIn = JSON.parse(updateData.usedIn);

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // 1. Check if thumbnail is being updated/replaced
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.publicId) {
        await deleteMedia(item.thumbnail.publicId);
      }
      const uploadedThumbnail = await uploadMedia(files.thumbnail[0].buffer, { folder: 'product-items/thumbnails' });
      updateData.thumbnail = {
        type: 'image',
        url: uploadedThumbnail.url,
        publicId: uploadedThumbnail.publicId
      };
    }

    // 2. Track deleted pictures out of the gallery array payload
    if (updateData.gallery && Array.isArray(updateData.gallery)) {
      const incomingPublicIds = updateData.gallery.map((g: any) => g.publicId).filter(Boolean);
      const galleryItemsToRemove = item.gallery?.filter(
        (existing: any) => existing.publicId && !incomingPublicIds.includes(existing.publicId)
      ) || [];

      if (galleryItemsToRemove.length > 0) {
        await Promise.all(galleryItemsToRemove.map((img: any) => deleteMedia(img.publicId)));
      }
    }

    // 3. Append new images dropped into gallery
    if (files?.gallery && files.gallery.length > 0) {
      const uploadedGallery = await Promise.all(
        files.gallery.map((file) => uploadMedia(file.buffer, { folder: 'product-items/gallery' }))
      );
      const newItems = uploadedGallery.map(({ url, publicId }) => ({ type: 'image', url, publicId }));
      updateData.gallery = [...(updateData.gallery || item.gallery || []), ...newItems];
    }

    Object.assign(item, updateData);
    await item.save();

    return res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// PATCH /product-items/:id/purchase
// ------------------------------------------------------------------
export const incrementPurchaseCount = async (req: Request, res: Response) => {
  try {
    const { by = 1 } = req.body;
    const item = await ProductItem.findByIdAndUpdate(req.params.id, { $inc: { purchaseCount: by } }, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Product item not found' });
    return res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// DELETE /product-items/:id (Hard Delete + Asset Clean-up)
// ------------------------------------------------------------------
export const deleteProductItem = async (req: Request, res: Response) => {
  try {
    const item = await ProductItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Product item not found' });
    }

    // Clean thumbnail
    if (item.thumbnail?.publicId) {
      await deleteMedia(item.thumbnail.publicId);
    }

    // Clean gallery images
    if (item.gallery && item.gallery.length > 0) {
      const publicIds = item.gallery.map((g: any) => g.publicId).filter(Boolean);
      if (publicIds.length > 0) {
        await Promise.all(publicIds.map((id) => deleteMedia(id)));
      }
    }

    return res.status(200).json({ success: true, message: 'Product item and all related images permanently removed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};