import { Request, Response } from 'express';
import Project from '../models/project';


/**
 * @route   GET /api/landing/testimonials
 * @desc    Fetch testimonials across all published projects for landing page showcase
 * @access  Public
 * @query   limit  - number of testimonials to return (default: 10)
 * @query   rating - filter by minimum rating (optional)
 */
export const getShowcaseTestimonials = async (req: Request, res: Response) => {
  try {
    const { limit, rating } = req.query;
    const parsedLimit = limit ? parseInt(limit as string, 10) : 10;
    const minRating = rating ? parseInt(rating as string, 10) : null;

    // Only pull testimonials from published, non-deleted projects
    const projects = await Project.find({
      isPublished: true,
      isDeleted: { $ne: true },
      testimonials: { $exists: true, $not: { $size: 0 } },
    })
      .select('title slug testimonials')
      .lean();

    // Flatten testimonials across all projects, tagging each with its source project
    let testimonials = projects.flatMap((project: any) =>
      (project.testimonials || []).map((t: any) => ({
        _id: t._id,
        clientName: t.clientName,
        designation: t.designation || '',
        companyName: t.companyName || '',
        message: t.message,
        rating: t.rating || null,
        clientImage: t.clientImage || null,
        testimonialImage: t.testimonialImage || null,
        project: {
          title: project.title,
          slug: project.slug,
        },
        createdAt: t.createdAt,
      }))
    );

    // Optional rating filter
    if (minRating) {
      testimonials = testimonials.filter((t) => (t.rating || 0) >= minRating);
    }

    // Sort newest first
    testimonials.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply limit
    const limitedTestimonials = testimonials.slice(0, parsedLimit);

    res.status(200).json({
      success: true,
      count: limitedTestimonials.length,
      total: testimonials.length,
      data: limitedTestimonials,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching showcase testimonials',
      error: error.message,
    });
  }
};