import ProductModel from "~/server/models/Product.model"

export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'id');
    await ProductModel.findByIdAndDelete(productId);
    return await ProductModel.find();
})