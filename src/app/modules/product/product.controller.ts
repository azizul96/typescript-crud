import { Request, Response } from 'express';
import { ProductServices } from './product.service';

export const createProducts = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = req.body;
    const { productId } = req.params;

    const result = await ProductServices.updateAProductFromDB(
      productId,
      updatedProduct,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const ProductControllers = {
  createProducts,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
};
