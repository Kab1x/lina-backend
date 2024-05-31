import { Schema, model } from "mongoose";
import { ModelNames } from "../utils/utils.js";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.UserModel,
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.CartModel,
      required: true,
    },

    shippingAddress: {
      address: { type: String, required: true },
      wilaya: { type: String, required: true },
      commune: { type: String, required: true },
    },

    /*paymentMethod: {
    type: String,
    required: true,
  },

  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },*/

    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 200,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    /*isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },*/

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    /*deliveredAt: {
    type: Date,
  },*/
  },
  {
    timestamps: true,
  }
);

export const OrderModel = model(ModelNames.OrderModel, OrderSchema);
