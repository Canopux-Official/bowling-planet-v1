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

router.post('/', createBaseProduct);
router.get('/', getAllBaseProducts);
router.get('/:slug', getBaseProductBySlug);
router.get('/:slug/with-items', getBaseProductWithItems);
router.patch('/:id', updateBaseProduct);
router.delete('/:id', deleteBaseProduct);

export default router;