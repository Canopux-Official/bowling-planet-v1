import { Router } from 'express';
import {
  createBaseProduct,
  getAllBaseProducts,
  getBaseProductBySlug,
  getBaseProductWithItems,
  updateBaseProduct,
  deleteBaseProduct,
} from '../controllers/baseProduct.controller';
import { upload } from '../middleware/multer';

const router = Router();

const baseProductUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 }
]);


// admin
router.post('/admin',baseProductUpload, createBaseProduct);
router.patch('/admin/:id',baseProductUpload, updateBaseProduct);
router.delete('/admin/:id', deleteBaseProduct);

// public
router.get('/', getAllBaseProducts);
router.get('/:slug', getBaseProductBySlug);
router.get('/:slug/with-items', getBaseProductWithItems);

export default router;