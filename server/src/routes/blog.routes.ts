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

const router = Router();


// public
router.get('/', getPublishedBlogs);              
router.get('/:slug', getBlogBySlug);              
router.get('/:slug/related', getRelatedBlogs);    


// admin
router.post('/admin', createBlog);                           
router.put('/admin/:id', updateBlog);                           
router.delete('/admin/:id', deleteBlog);                        
router.get('/admin/all', getAllBlogsAdmin);                     
router.patch('/admin/:id/toggle-publish', togglePublishBlog);  
router.post('/admin/upload-image', upload.single('image'), uploadBlogImage); 

export default router;