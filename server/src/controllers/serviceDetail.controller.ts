import { Request, Response } from 'express';
import { ServiceDetail, IServiceDetail } from '../models/ServiceDetail';
import { uploadMedia, deleteMedia } from '../utils/cloudinary';

// Get all service detail pages
export const getServiceDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const details = await ServiceDetail.find();
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching service details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get single service detail page by slug
export const getServiceDetailBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const detail = await ServiceDetail.findOne({ slug });
    if (!detail) {
      res.status(404).json({ message: 'Service detail page not found' });
      return;
    }
    res.status(200).json(detail);
  } catch (error) {
    console.error('Error fetching service detail by slug:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new service detail page
export const createServiceDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    
    // Create new document
    const newDetail = new ServiceDetail(data);
    await newDetail.save();
    
    res.status(201).json(newDetail);
  } catch (error: any) {
    console.error('Error creating service detail:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'A service detail with this slug already exists.' });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Helper function to safely update an image field
const handleImageUpdate = async (newImage: any, existingImage: any, folder: string) => {
  if (newImage && newImage.url && newImage.url.startsWith('data:image')) {
    // It's a new base64 image, upload it
    const uploadRes = await uploadMedia(newImage.url, { folder });
    // Delete the old one if it exists
    if (existingImage && existingImage.public_id && existingImage.public_id !== 'dummy') {
      await deleteMedia(existingImage.public_id);
    }
    return { url: uploadRes.url, public_id: uploadRes.publicId };
  } else if (!newImage && existingImage && existingImage.public_id && existingImage.public_id !== 'dummy') {
    // Image was removed
    await deleteMedia(existingImage.public_id);
    return undefined;
  }
  // No change or just keeping the existing image data as passed from frontend
  return newImage;
};

// Update an existing service detail page
export const updateServiceDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const existing = await ServiceDetail.findById(id);
    if (!existing) {
      res.status(404).json({ message: 'Service detail page not found' });
      return;
    }

    // Handle Header Image
    if (updateData.header) {
      updateData.header.image = await handleImageUpdate(
        updateData.header.image,
        existing.header?.image,
        'service-details'
      );
    }

    // Handle Hero Image
    if (updateData.hero) {
      updateData.hero.image = await handleImageUpdate(
        updateData.hero.image,
        existing.hero?.image,
        'service-details'
      );
    }

    // Handle Metrics Images
    if (updateData.metrics && Array.isArray(updateData.metrics)) {
      for (let i = 0; i < updateData.metrics.length; i++) {
        const existingMetric = existing.metrics?.[i];
        updateData.metrics[i].image = await handleImageUpdate(
          updateData.metrics[i].image,
          existingMetric?.image,
          'service-details'
        );
      }
    }

    // Handle Features Images
    if (updateData.features && Array.isArray(updateData.features)) {
      for (let i = 0; i < updateData.features.length; i++) {
        const existingFeature = existing.features?.[i];
        updateData.features[i].image = await handleImageUpdate(
          updateData.features[i].image,
          existingFeature?.image,
          'service-details'
        );
      }
    }

    // Handle Gallery Images
    if (updateData.gallery && Array.isArray(updateData.gallery)) {
      for (let i = 0; i < updateData.gallery.length; i++) {
        const existingGallery = existing.gallery?.[i];
        updateData.gallery[i].image = await handleImageUpdate(
          updateData.gallery[i].image,
          existingGallery?.image,
          'service-details'
        );
      }
    }

    // Update document
    const updatedDetail = await ServiceDetail.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedDetail);
  } catch (error: any) {
    console.error('Error updating service detail:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'A service detail with this slug already exists.' });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a service detail page
export const deleteServiceDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const existing = await ServiceDetail.findById(id);
    if (!existing) {
      res.status(404).json({ message: 'Service detail page not found' });
      return;
    }
    
    // Delete all associated images
    if (existing.header?.image?.public_id && existing.header.image.public_id !== 'dummy') {
      await deleteMedia(existing.header.image.public_id);
    }
    if (existing.hero?.image?.public_id && existing.hero.image.public_id !== 'dummy') {
      await deleteMedia(existing.hero.image.public_id);
    }
    
    if (existing.metrics) {
      for (const m of existing.metrics) {
        if (m.image?.public_id && m.image.public_id !== 'dummy') await deleteMedia(m.image.public_id);
      }
    }
    
    if (existing.features) {
      for (const f of existing.features) {
        if (f.image?.public_id && f.image.public_id !== 'dummy') await deleteMedia(f.image.public_id);
      }
    }
    
    if (existing.gallery) {
      for (const g of existing.gallery) {
        if (g.image?.public_id && g.image.public_id !== 'dummy') await deleteMedia(g.image.public_id);
      }
    }

    await ServiceDetail.findByIdAndDelete(id);
    res.status(200).json({ message: 'Service detail page deleted successfully' });
  } catch (error) {
    console.error('Error deleting service detail:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
