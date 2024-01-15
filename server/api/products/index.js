import ProductModel from "~/server/models/Product.model"

export default defineEventHandler(async () => {
    return await ProductModel.find();
})