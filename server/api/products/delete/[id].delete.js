import ProductModel from "~/server/models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, "id");
    await ProductModel.findByIdAndDelete(productId);
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage,
    });
  }
});
