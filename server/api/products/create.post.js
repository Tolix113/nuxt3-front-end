import ProductModel from "~/server/models/Product.model"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        await ProductModel.create(body);
        const products = await ProductModel.find();
        return { message: 'Product created!', data: products }
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        })
    }
})