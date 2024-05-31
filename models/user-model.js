import { Schema, model } from "mongoose";
import { ModelNames } from "../utils/utils.js";

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  familyName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  photo: {
    type: String,
    default:
      "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1901264380.jpg",
  },
  password: {
    type: String,
  },
  wilaya: {
    type: String,
  },
  commune: {
    type: String,
  },
  address: {
    type: String,
  },
  currentCart: {
    type: Schema.Types.ObjectId,
    ref: ModelNames.CartModel,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model(ModelNames.UserModel, UserSchema);
