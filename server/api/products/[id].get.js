import ProductModel from "~/server/models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, "id");
    const product = await ProductModel.findById(productId);
    return product;
  } catch (error) {
    throw createError({
      statusCode: 404,
    });
  }
});
