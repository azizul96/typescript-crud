import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};
const getProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (productId: String) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

const updateAProductFromDB = async (productId: String, product: Product) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id: productId },
    product,
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  updateAProductFromDB,
};
