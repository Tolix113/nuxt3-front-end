import ProductModel from "~/server/models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const product = await ProductModel.create(body);
    return { success: true, _id: product._id };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
