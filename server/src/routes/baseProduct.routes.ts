import { Router } from 'express';
import {
  createBaseProduct,
  getAllBaseProducts,
  getBaseProductBySlug,
  getBaseProductWithItems,
  updateBaseProduct,
  deleteBaseProduct,
} from '../controllers/baseProduct.controller';

const router = Router();


// admin
router.post('/', createBaseProduct);
router.patch('/:id', updateBaseProduct);
router.delete('/:id', deleteBaseProduct);

// public
router.get('/', getAllBaseProducts);
router.get('/:slug', getBaseProductBySlug);
router.get('/:slug/with-items', getBaseProductWithItems);

export default router;