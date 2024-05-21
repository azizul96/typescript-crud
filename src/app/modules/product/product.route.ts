import express from 'express';
import { ProductControllers } from './product.controller';
// getProductById, createProduct, updateProduct, deleteProduct

const router = express.Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getProductById);
router.put('/:productId', ProductControllers.updateProduct);
// router.post('/');
// router.put('/:id');
// router.delete('/:id');

export const ProductRoutes = router;
