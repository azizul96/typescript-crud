import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getOrders);
router.get('/', OrderControllers.getOrdersByUserEmail);

export const OrderRoutes = router;
