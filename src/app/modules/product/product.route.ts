import express from 'express';
import { ProductControllers } from './product.controller';
// getProductById, createProduct, updateProduct, deleteProduct

const router = express.Router();

router.post('/', ProductControllers.createProducts);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.updateSingleProduct);
// router.post('/');
// router.put('/:id');
// router.delete('/:id');

export const ProductRoutes = router;
