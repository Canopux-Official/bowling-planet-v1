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

// NOTE: specific/static routes must be declared BEFORE the ':slug'
// catch-all, otherwise Express will treat "featured" or "by-base"
// as a slug value.
router.post('/', createProductItem);
router.get('/', getAllProductItems);
router.get('/featured', getFeaturedItems);
router.get('/by-base/:baseProductId', getItemsByBaseProduct);
router.get('/:slug', getProductItemBySlug);
router.patch('/:id', updateProductItem);
router.patch('/:id/purchase', incrementPurchaseCount);
router.delete('/:id', deleteProductItem);

export default router;