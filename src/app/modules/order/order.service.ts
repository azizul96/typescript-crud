import { OrderModel } from './order.model';
import { Order } from './order.interface';

export const OrderService = {
  async createOrderIntoDB(order: Order): Promise<Order> {
    return await OrderModel.create(order);
  },

  async getAllOrdersFromDB(): Promise<Order[]> {
    return await OrderModel.find();
  },

  async getOrdersByUserEmailFromDB(email: string): Promise<Order[]> {
    return await OrderModel.find({ email });
  },
};
