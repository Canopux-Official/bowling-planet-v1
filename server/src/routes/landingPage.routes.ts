import { Router } from 'express';
import { getShowcaseTestimonials } from '../controllers/landingPage.controller';
import { getPublishedBlogs } from '../controllers/blog.controller';
import { getAllProjects } from '../controllers/project.controller';

const router = Router();
router.get('/testimonials', getShowcaseTestimonials);
router.get('/blogs',getPublishedBlogs)
router.get('/projects',getAllProjects)

export default router;