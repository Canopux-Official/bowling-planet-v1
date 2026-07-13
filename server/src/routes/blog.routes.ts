import { Router } from 'express';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogsAdmin,
  togglePublishBlog,
  uploadBlogImage,
  getPublishedBlogs,
  getBlogBySlug,
  getRelatedBlogs,
} from '../controllers/blog.controller';
import { upload } from '../middleware/multer';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();


// public
router.get('/', getPublishedBlogs);              
router.get('/:slug', getBlogBySlug);              
router.get('/:slug/related', getRelatedBlogs);    


// admin
router.post('/admin', authenticateJWT,createBlog);                           
router.put('/admin/:id', authenticateJWT, updateBlog);                           
router.delete('/admin/:id', authenticateJWT, deleteBlog);                        
router.get('/admin/all', authenticateJWT, getAllBlogsAdmin);                     
router.patch('/admin/:id/toggle-publish', authenticateJWT, togglePublishBlog);  
router.post('/admin/upload-image', upload.single('image'), uploadBlogImage); 

export default router;
