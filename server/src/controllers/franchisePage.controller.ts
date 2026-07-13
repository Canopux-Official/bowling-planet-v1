import { Request, Response } from 'express';
import { FranchisePage, IFranchisePage } from '../models/FranchisePage';

// In-memory cache for singleton document
let cachedFranchisePage: IFranchisePage | null = null;

export const getFranchisePage = async (req: Request, res: Response) => {
  try {
    if (cachedFranchisePage) {
      return res.status(200).json({ success: true, data: cachedFranchisePage });
    }

    const data = await FranchisePage.findOne();
    if (!data) {
      // If empty, create an empty skeleton
      const newPage = await FranchisePage.create({});
      cachedFranchisePage = newPage;
      return res.status(200).json({ success: true, data: newPage });
    }

    cachedFranchisePage = data;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching franchise page:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateFranchisePage = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;

    const updated = await FranchisePage.findOneAndUpdate(
      {},
      { $set: updateData },
      { returnDocument: 'after', upsert: true }
    );

    // Update cache
    cachedFranchisePage = updated;

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating franchise page:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
