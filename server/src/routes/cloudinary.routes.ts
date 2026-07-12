/**
 * Backend API Endpoint for Cloudinary Image Management
 * 
 * This endpoint should be added to your Express/Node.js backend
 * It lists all resources from your Cloudinary account
 */

import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

/**
 * GET /api/cloudinary/images
 * Fetches all images from Cloudinary
 * 
 * Query Parameters:
 * - folder: (optional) Filter images by folder prefix (e.g., 'cms/resources')
 * - limit: (optional) Number of images to fetch (default: 100, max: 500)
 * - page: (optional) Page number for pagination (default: 1)
 */
router.get('/images', async (req, res) => {
  try {
    const folder = req.query.folder as string || '';
    const limit = Math.min(parseInt(req.query.limit as string) || 100, 500);
    const cursor = req.query.cursor as string | undefined;

    // Build the search expression - filter by folder prefix if provided
    let expression = 'resource_type:image AND type:upload';
    if (folder) {
      expression += ` AND folder:${folder}*`;
    }

    // Fetch resources from Cloudinary
    // Note: cloudinary.search is an object with chainable methods, not a function - no ()
    let query = cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .max_results(limit);

    // Cloudinary Search API uses cursor-based pagination, not page numbers.
    // Pass the `nextCursor` value from a previous response to fetch the next batch.
    if (cursor) {
      query = query.next_cursor(cursor);
    }

    const result = await query.execute();

    // Transform response to match frontend expectations
    const resources = (result.resources || []).map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      bytes: resource.bytes,
      created_at: resource.created_at,
      format: resource.format,
    }));

    res.json({
      resources,
      total: result.total_count,
      nextCursor: result.next_cursor || null,
    });
  } catch (error) {
    console.error('Cloudinary fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch images from Cloudinary',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/cloudinary/upload
 * Direct upload endpoint to Cloudinary
 */
router.post('/upload', async (req, res) => {
  try {
    const { file, folder } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const uploadOptions: any = {
      resource_type: 'auto',
      folder: folder || 'cms',
      overwrite: false,
    };

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, uploadOptions);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * DELETE /api/cloudinary/images/:publicId
 * Delete an image from Cloudinary
 */
router.delete('/images/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({ error: 'Public ID is required' });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      error: 'Failed to delete image',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/cloudinary/upload-signature
 * Generate a signature for client-side upload (optional, for direct uploads)
 */
router.get('/upload-signature', (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: req.query.folder || 'cms',
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.json({
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error('Signature generation error:', error);
    res.status(500).json({
      error: 'Failed to generate upload signature',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;