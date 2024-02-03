import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
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
    default: "без бренда",
  },
  category: {
    type: String,
    trim: true,
    default: "без категории",
  },
  thumbnail: {
    type: String,
    default: "",
  },
  images: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Product", productSchema);
