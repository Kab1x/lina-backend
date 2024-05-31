import { model, Schema } from "mongoose";
import { ModelNames } from "../utils/utils.js";

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: ModelNames.UserModel,
    required: true,
  },
  achats: [
    {
      produit: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.ProductModel,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      size: {
        type: String,
        required: true,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      },
      color: {
        type: String,
        required: true,
      },
      season: {
        type: String,
        required: true,
        enum: ["printemps", "ete", "automne", "hiver"],
      },
    },
  ],
});

export const CartModel = model(ModelNames.CartModel, CartSchema);
