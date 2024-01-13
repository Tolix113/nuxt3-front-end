import ProductModel from "~/server/models/Product.model"

export default defineEventHandler(async (event) => {
    return ProductModel.find();
})