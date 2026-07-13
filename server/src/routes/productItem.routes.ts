import { Router } from 'express';
import {
  createProductItem,
  getAllProductItems,
  getProductItemBySlug,
  getItemsByBaseProduct,
  getFeaturedItems,
  updateProductItem,
  incrementPurchaseCount,
  deleteProductItem,
} from '../controllers/productItem.controller';
import { upload } from '../middleware/multer';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

const productItemUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]);

// admin
router.post('/admin',authenticateJWT, productItemUpload,createProductItem);
router.patch('/admin/:id', authenticateJWT, productItemUpload,updateProductItem);
router.patch('/admin/:id/purchase', authenticateJWT, incrementPurchaseCount);
router.delete('/admin/:id', authenticateJWT, deleteProductItem);

// public
router.get('/', getAllProductItems);
router.get('/featured', getFeaturedItems);
router.get('/by-base/:baseProductId', getItemsByBaseProduct);
router.get('/:slug', getProductItemBySlug);


export default router;
