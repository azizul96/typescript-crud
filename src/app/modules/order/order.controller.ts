import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { ProductServices } from '../product/product.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const productId = order.productId;
    const orderedQuantity = order.quantity;

    // Check if the product exists
    const product =
      await ProductServices.ProductService.getProductByIdFromDB(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check available quantity in inventory
    const availableQuantity = product.inventory.quantity;
    if (orderedQuantity > availableQuantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Reduce inventory quantity and update inStock status
    const updatedProduct =
      await ProductServices.ProductService.updateProductInventory(
        productId,
        orderedQuantity,
      );

    // Create order
    const result = await OrderService.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrdersFromDB();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getOrdersByUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }
    const result = await OrderService.getOrdersByUserEmailFromDB(
      email as string,
    );

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
  getOrdersByUserEmail,
};
