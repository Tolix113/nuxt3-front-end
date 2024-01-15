import ProductModel from "~/server/models/Product.model"

export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'id');
    return await ProductModel.findById(productId);
})