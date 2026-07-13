import { Request, Response } from 'express';
import Job from '../models/career';


// ------------------------------------------------------------------
// CREATE
// ------------------------------------------------------------------
export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.create(req.body);
    return res.status(201).json({ success: true, data: job });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: 'Failed to create job', error: err.message });
  }
};

// ------------------------------------------------------------------
// READ (list) — filters, search, pagination
// ------------------------------------------------------------------
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const {
      status,
      jobType,
      workMode,
      experience,
      department,
      tags,       // comma-separated: ?tags=remote,urgent
      search,     // matches title
      page = '1',
      limit = '10',
      sort = '-createdAt',
    } = req.query as Record<string, string>;

    const filter: Record<string, any> = {};

    if (status) filter.status = status;
    if (jobType) filter.jobType = jobType;
    if (workMode) filter.workMode = workMode;
    if (experience) filter.experience = experience;
    if (department) filter.department = department;

    if (tags) {
      const tagList = tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
      if (tagList.length) filter.tags = { $in: tagList };
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [jobs, total] = await Promise.all([
      Job.find(filter).sort(sort).skip(skip).limit(limitNum),
      Job.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch jobs', error: err.message });
  }
};

// ------------------------------------------------------------------
// READ (single) — by slug, for public job detail pages
// ------------------------------------------------------------------
export const getJobBySlug = async (req: Request, res: Response) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch job', error: err.message });
  }
};

// ------------------------------------------------------------------
// READ (single) — by id, for admin/edit views
// ------------------------------------------------------------------
export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch job', error: err.message });
  }
};

// ------------------------------------------------------------------
// UPDATE
// ------------------------------------------------------------------
export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    Object.assign(job, req.body);
    await job.save(); // triggers pre('validate') slug regeneration if title changed

    return res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: 'Failed to update job', error: err.message });
  }
};

// ------------------------------------------------------------------
// DELETE — direct delete, no soft delete
// ------------------------------------------------------------------
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, message: 'Job deleted permanently' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete job', error: err.message });
  }
};
