import { Request, Response } from 'express';
import 'multer'; // Ensures Express.Multer.File namespace resolves cleanly

import { uploadMedia, deleteMedia } from '../utils/cloudinary';
import { TeamMember } from '../models/team';

// ------------------------------------------------------------------
// CREATE — POST /api/team-members
// Handles profile image uploads via multipart/form-data
// ------------------------------------------------------------------
export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // Process the incoming single profile image
    if (files?.image?.[0]) {
      const uploadedImage = await uploadMedia(files.image[0].buffer, { folder: 'team-members' });
      req.body.image = {
        type: 'image',
        url: uploadedImage.url,
        publicId: uploadedImage.publicId
      };
    } else {
      return res.status(400).json({ success: false, message: 'Profile image is required' });
    }

    const member = await TeamMember.create(req.body);
    return res.status(201).json({ success: true, data: member });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// READ (List) — GET /api/team-members
// Fetches all team members sorted by their display order index
// ------------------------------------------------------------------
export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter: Record<string, any> = {};
    
    if (status) filter.status = status;

    // Utilizes the compound index on the 'order' field for fast presentation
    const members = await TeamMember.find(filter).sort({ order: 1 });

    return res.status(200).json({ success: true, data: members });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// UPDATE — PATCH /api/team-members/:id
// Swaps out old images on Cloudinary instantly if a new file is sent
// ------------------------------------------------------------------
export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }

    let updateData = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // Check if the profile image is being updated/replaced
    if (files?.image?.[0]) {
      // Safely delete the previous avatar from Cloudinary tracking if it exists
      if (member.image?.publicId) {
        await deleteMedia(member.image.publicId);
      }
      
      // Upload the replacement binary buffer
      const uploadedImage = await uploadMedia(files.image[0].buffer, { folder: 'team-members' });
      updateData.image = {
        type: 'image',
        url: uploadedImage.url,
        publicId: uploadedImage.publicId
      };
    }

    Object.assign(member, updateData);
    await member.save();

    return res.status(200).json({ success: true, data: member });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------------------------------------------------------
// DELETE (Hard Delete) — DELETE /api/team-members/:id
// Wipes out the database record and cleans up Cloudinary memory storage
// ------------------------------------------------------------------
export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }

    // Completely purge the associated image file off Cloudinary storage
    if (member.image?.publicId) {
      await deleteMedia(member.image.publicId);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Team member record and remote storage assets permanently deleted successfully.' 
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};