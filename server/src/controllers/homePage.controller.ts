import { Request, Response } from 'express';
import { HomePage } from '../models/HomePage';
import mongoose from 'mongoose';

// Simple in-memory cache
let cachedHomePageData: any = null;

export const getHomePageData = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Check Cache
    if (cachedHomePageData) {
      res.json({ success: true, data: cachedHomePageData, cached: true });
      return;
    }

    // 2. Fetch from DB if cache miss
    let data = await HomePage.findOne().populate('featuredProjects.projectIds');

    // 3. If no data exists, create a default document
    if (!data) {
      data = await HomePage.create({});
      data = await HomePage.findById(data._id).populate('featuredProjects.projectIds');
    }

    // 4. Set Cache
    cachedHomePageData = data;

    res.json({ success: true, data, cached: false });
  } catch (error) {
    console.error('Error fetching Home Page data:', error);
    res.status(500).json({ success: false, message: 'Server error fetching home page data' });
  }
};

export const updateHomePageData = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatePayload = req.body;

    // 1. Ensure we only have one document. We use findOneAndUpdate without filtering by ID 
    // because there should only be a single singleton document.
    // If it doesn't exist, upsert creates it.
    const updatedData = await HomePage.findOneAndUpdate(
      {}, // Match the first document
      { $set: updatePayload }, // Apply updates
      { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }
    ).populate('featuredProjects.projectIds');

    // 2. Invalidate Cache so next GET request fetches fresh data
    cachedHomePageData = null;

    res.json({ 
      success: true, 
      message: 'Home Page data updated successfully', 
      data: updatedData 
    });
  } catch (error) {
    console.error('Error updating Home Page data:', error);
    res.status(500).json({ success: false, message: 'Server error updating home page data' });
  }
};
