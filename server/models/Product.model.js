import { defineMongooseModel } from '#nuxt/mongoose'
import validator from 'validator'

export const Product = defineMongooseModel({
    name: 'Product',
    schema: {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description:  {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discountPercentage: {
            type: Number,
            min: 0,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        stock: {
            type: Number,
            min: 0,
        },
        brand: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            trim: true,
        },
        thumbnail: {
            type: String,
            validate: {
                validator: (value) => {
                    return validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true })
                },
            }
        },
        images: {
            type: Array,
            default: undefined,
            validate: {
                validator: (arr) => arr.every((value) => {
                    return validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true })
                })
            }
        },
    }    
})

export default Product;