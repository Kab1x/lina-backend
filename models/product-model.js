import mongoose from "mongoose";
import { ModelNames } from "../utils/utils.js";

const ProductSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  promo: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  season: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numRatings: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  hiddenBestSeller: {
    type: Boolean,
    default: false,
  },
});

export const ProductModel = mongoose.model(
  ModelNames.ProductModel,
  ProductSchema
);
