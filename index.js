import cors from "cors";
import express from "express";
import mongoose from "mongoose";
const app = express();

import AuthenticationRouter from "./routers/authentication-router.js";
import CartRouter from "./routers/cart-router.js";
import OrderRouter from "./routers/order-router.js";
import ProductRouter from "./routers/product-router.js";
import UserRouter from "./routers/user-router.js";
import { server_port } from "./utils/utils.js";

app.use(express.json());
app.use(cors());

app.use("/images", express.static("upload/images"));

app.use("/products", ProductRouter);
app.use("/users", UserRouter);
app.use("/cart", CartRouter);
app.use("/auth", AuthenticationRouter);
app.use("/order", OrderRouter);

mongoose.connect(
  "mongodb+srv://LINA:ANIS2010@cluster0.63xvddw.mongodb.net/test"
);

app.listen(server_port, (error) => {
  if (error) {
    console.log("error: " + error);
  } else {
    console.log("server run: " + server_port);
  }
});
