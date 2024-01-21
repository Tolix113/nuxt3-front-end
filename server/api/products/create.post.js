import ProductModel from "~/server/models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await ProductModel.create(body);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
