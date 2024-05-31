import Router from "express";
import {
  addToCart,
  createNewCart,
  getUserCart,
  removeFromCart,
} from "../controllers/cart-controller.js";

import { fetchUser } from "../middleware/user-middleware.js";

const CartRouter = Router();

CartRouter.get("/", fetchUser, getUserCart);

CartRouter.post("/add", fetchUser, addToCart);
CartRouter.delete("/remove", fetchUser, removeFromCart);
CartRouter.get("/", fetchUser, getUserCart);

CartRouter.post("/new", fetchUser, createNewCart);

export default CartRouter;
