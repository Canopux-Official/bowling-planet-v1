import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';

// ------------------------------------------------------------------
// Initialize once, at import time. As long as this file is imported
// somewhere early (e.g. from server.ts / app.ts, or just by being
// imported by any controller that uses it), config is set globally
// for the whole process.
// ------------------------------------------------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;       // secure_url — store THIS in your `IMedia.url` / `thumbnail` field
  publicId: string;  // store this too if you ever want to delete/replace the asset later
}

type ResourceType = 'image' | 'video';

// ------------------------------------------------------------------
// Upload a single file to Cloudinary.
// Accepts EITHER:
//   - a Buffer (e.g. req.file.buffer from multer memoryStorage), or
//   - a string (local file path, remote URL, or base64 data URI)
// ------------------------------------------------------------------
export const uploadMedia = (
  file: Buffer | string,
  options: { folder?: string; resourceType?: ResourceType } = {}
): Promise<CloudinaryUploadResult> => {
  const { folder = 'general', resourceType = 'image' } = options;

  if (Buffer.isBuffer(file)) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType },
        (error, result?: UploadApiResponse) => {
          if (error || !result) return reject(error);
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      streamifier.createReadStream(file).pipe(uploadStream);
    });
  }

  return cloudinary.uploader
    .upload(file, { folder, resource_type: resourceType })
    .then((result) => ({ url: result.secure_url, publicId: result.public_id }));
};

// Convenience wrappers
export const uploadImage = (file: Buffer | string, folder = 'general') =>
  uploadMedia(file, { folder, resourceType: 'image' });

export const uploadVideo = (file: Buffer | string, folder = 'general') =>
  uploadMedia(file, { folder, resourceType: 'video' });

// Upload many at once (e.g. a gallery / media array), preserving order
export const uploadMultiple = (
  files: (Buffer | string)[],
  options: { folder?: string; resourceType?: ResourceType } = {}
): Promise<CloudinaryUploadResult[]> => Promise.all(files.map((f) => uploadMedia(f, options)));

// ------------------------------------------------------------------
// Delete an asset by its Cloudinary public_id (call this when an
// image is replaced or its parent doc is permanently deleted, so you
// don't accumulate orphaned files in your Cloudinary storage).
// ------------------------------------------------------------------
export const deleteMedia = async (
  publicId: string | undefined | null,
  resourceType: ResourceType = 'image'
): Promise<void> => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export const deleteMultiple = async (
  publicIds: (string | undefined | null)[],
  resourceType: ResourceType = 'image'
): Promise<void> => {
  const ids = publicIds.filter(Boolean) as string[];
  if (!ids.length) return;
  await cloudinary.uploader.destroy(ids as unknown as string, { resource_type: resourceType });
  // Note: for bulk cleanup of many ids, prefer cloudinary.api.delete_resources(ids) instead —
  // uploader.destroy is meant for one id at a time.
};

// ------------------------------------------------------------------
// If you only stored `url` (not `publicId`) on older documents, you
// can still recover the public_id from a standard Cloudinary URL to
// delete it later. Not needed for new uploads — use publicId directly.
// ------------------------------------------------------------------
export const extractPublicIdFromUrl = (url: string): string | null => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
};

export default cloudinary;