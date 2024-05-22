import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

//
app.use(express.json());
app.use(cors());

//
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

//

const getAController = (req: Request, res: Response) => {
  res.send('hello from server');
};

app.get('/', getAController);

export default app;
