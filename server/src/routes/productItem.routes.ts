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

const router = Router();

// admin
router.post('/', createProductItem);
router.patch('/:id', updateProductItem);
router.patch('/:id/purchase', incrementPurchaseCount);
router.delete('/:id', deleteProductItem);

// public
router.get('/', getAllProductItems);
router.get('/featured', getFeaturedItems);
router.get('/by-base/:baseProductId', getItemsByBaseProduct);
router.get('/:slug', getProductItemBySlug);


export default router;