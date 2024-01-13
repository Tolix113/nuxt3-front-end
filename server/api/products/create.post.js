import ProductModel from "~/server/models/Product.model"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        await ProductModel.create(body);
        return { message: 'Product created!' }
    } catch(error) {
        throw createError({
            message: error.message
        })
    }
})