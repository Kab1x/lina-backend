import { CartModel } from "../models/cart-model.js";
import { UserModel } from "../models/user-model.js";

export const getUserCart = async (req, res) => {
  const { id } = req.user;
  const user = await UserModel.findById(id);
  const cart = await CartModel.findById(user.currentCart);
  res.send(cart);
};

export const addToCart = async (req, res) => {
  const { itemId, size, color, quantity } = req.body;
  const { id } = req.user;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartId = user.currentCart;
    if (!cartId) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingItem = await CartModel.findOne({
      _id: cartId,
      "achats.produit": itemId,
      "achats.size": size,
      "achats.color": color,
    });

    if (existingItem) {
      await CartModel.findOneAndUpdate(
        {
          _id: cartId,
          "achats.produit": itemId,
          "achats.size": size,
          "achats.color": color,
        },
        { $inc: { "achats.$.quantity": quantity } }
      );
    } else {
      await CartModel.findOneAndUpdate(
        { _id: cartId },
        {
          $push: {
            achats: {
              produit: itemId,
              size,
              color,
              quantity,
              season: "ete", // Assuming default season, adjust accordingly
            },
          },
        },
        { upsert: true }
      );
    }

    res.send("Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while adding item to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  const { itemId, size, color } = req.body;
  const { id } = req.user;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartId = user.currentCart;
    if (!cartId) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cart = await CartModel.findOne({
      _id: cartId,
      "achats.produit": itemId,
      "achats.size": size,
      "achats.color": color,
    });

    if (cart) {
      await CartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { achats: { produit: itemId, size, color } } }
      );
    }

    res.send("Removed");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while removing item from cart" });
  }
};

export const createNewCart = async (req, res) => {
  try {
    const newCart = await CartModel.create({ userId: req.user.id });
    const currentUser = await UserModel.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.currentCart = newCart.id;
    await currentUser.save();

    res.status(200).json(newCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while creating new cart" });
  }
};
