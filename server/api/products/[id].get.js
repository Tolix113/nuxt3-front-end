import ProductModel from "~/server/models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, "id");
    return await ProductModel.findById(productId);
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: error.statusMessage,
    });
  }
});
