import { defineMongooseModel } from "#nuxt/mongoose";
import validator from "validator";

export const Product = defineMongooseModel({
  name: "Product",
  schema: {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
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
      default: "",
    },
    images: {
      type: Array,
      default: [],
    },
  },
});

export default Product;
