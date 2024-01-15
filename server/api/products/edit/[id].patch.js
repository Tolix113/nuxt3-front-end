import ProductModel from "~/server/models/Product.model"

export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'id');
    const body = await readBody(event);
    await ProductModel.findByIdAndUpdate(productId, body);
    return await ProductModel.find();
})