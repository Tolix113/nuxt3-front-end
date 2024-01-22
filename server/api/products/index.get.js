import ProductModel from "~/server/models/Product.model";

export default defineEventHandler(async () => {
  const products = await ProductModel.find();
  const { price: maxPrice } = (
    await ProductModel.find().sort({ price: -1 }).limit(1)
  )[0];
  const { price: minPrice } = (
    await ProductModel.find().sort({ price: +1 }).limit(1)
  )[0];
  return {
    items: products,
    maxPrice: maxPrice,
    minPrice: minPrice,
  };
});
