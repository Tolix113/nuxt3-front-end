import ProductModel from "~/server/models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, "id");
    const body = await readBody(event);
    await ProductModel.findByIdAndUpdate(productId, body);
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
