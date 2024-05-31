import { CartModel } from "../models/cart-model.js";
import { OrderModel } from "../models/order-model.js";
import { ProductModel } from "../models/product-model.js";
import { UserModel } from "../models/user-model.js";

export const createOrderCurrentCart = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const { id } = req.user;

    const shippingPrice = 500;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await CartModel.findById(user.currentCart);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (cart.achats.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let itemsPrice = 0;
    for (let i = 0; i < cart.achats.length; i++) {
      const item = cart.achats[i];
      const product = await ProductModel.findById(item.produit);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: "Not enough quantity in stock" });
      }
      const itemPrice = item.quantity * product.price;
      itemsPrice += itemPrice;
    }

    console.log(`Items price: ${itemsPrice}`);
    const taxPrice = (itemsPrice * 0.19).toFixed(2);
    const totalPrice = (
      parseFloat(itemsPrice) +
      parseFloat(taxPrice) +
      parseFloat(shippingPrice)
    ).toFixed(2);

    const order = await OrderModel.create({
      userId: id,
      cart: user.currentCart,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while creating order" });
  }
};
export const createOrderByCartId = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const { id } = req.user;
    const { cartId } = req.params;

    const shippingPrice = 500;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await CartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (cart.achats.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let itemsPrice = 0;
    for (let i = 0; i < cart.achats.length; i++) {
      const item = cart.achats[i];
      const product = await ProductModel.findById(item.produit);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: "Not enough quantity in stock" });
      }
      const itemPrice = item.quantity * product.price;
      itemsPrice += itemPrice;
    }

    console.log(`Items price: ${itemsPrice}`);
    const taxPrice = (itemsPrice * 0.19).toFixed(2);
    const totalPrice = (
      parseFloat(itemsPrice) +
      parseFloat(taxPrice) +
      parseFloat(shippingPrice)
    ).toFixed(2);

    const order = await OrderModel.create({
      userId: id,
      cart: cartId,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while creating order" });
  }
};
