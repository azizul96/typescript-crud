import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductsFromDB = async (searchQuery?: string) => {
  const filter = searchQuery
    ? {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } },
          { tags: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    : {};
  const result = await ProductModel.find(filter);
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

const updateAProductFromDB = async (productId: string, product: Product) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id: productId },
    product,
    { new: true },
  );
  return result;
};

const deleteAProductFromDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: productId });
  return result;
};

export const ProductService = {
  async getProductByIdFromDB(productId: string): Promise<Product | null> {
    return await ProductModel.findById(productId);
  },

  async updateProductInventory(
    productId: string,
    orderedQuantity: number,
  ): Promise<Product> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const currentQuantity = product.inventory.quantity;

    if (currentQuantity < orderedQuantity) {
      throw new Error('Insufficient stock');
    }

    const newQuantity = currentQuantity - orderedQuantity;
    const inStock = newQuantity > 0 ? true : false;

    product.inventory.quantity = newQuantity;
    product.inventory.inStock = inStock;

    return await product.save();
  },
};
export const ProductServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  updateAProductFromDB,
  deleteAProductFromDB,
  getProductsFromDB,
  ProductService,
};
