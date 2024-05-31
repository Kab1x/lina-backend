import { Router } from "express";

import {
  createOrderByCartId,
  createOrderCurrentCart,
} from "../controllers/order-controller.js";

import { fetchUser } from "../middleware/user-middleware.js";

// Créer un routeur pour les commandes
const OrderRouter = Router();

// Route pour créer une commande avec le panier actuel
// Requête POST sur /create avec le middleware fetchUser et le contrôleur createOrderCurrentCart
OrderRouter.post("/create", fetchUser, createOrderCurrentCart);

// Route pour créer une commande avec un panier spécifique
// Requête POST sur /create/:cartId avec le middleware fetchUser et le contrôleur createOrderForCart
OrderRouter.post("/create/:cartId", fetchUser, createOrderByCartId);

export default OrderRouter;
