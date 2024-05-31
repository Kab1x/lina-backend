import Router from "express";
import {
  addProduct,
  getAllProducts,
  getFilteredProducts,
  getNewProducts,
  getProductById,
  getProductsByPriceOver,
  getProductsByPriceUnder,
  removeProduct,
} from "../controllers/product-controller.js";

const ProductRouter = Router();

ProductRouter.post("/add", addProduct);
ProductRouter.delete("/remove", removeProduct);

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/new", getNewProducts);
ProductRouter.get("/filtered", getFilteredProducts);
ProductRouter.get("/:productId", getProductById);

ProductRouter.get("/priceUnder/:price", getProductsByPriceUnder);
ProductRouter.get("/priceOver/:price", getProductsByPriceOver);

export default ProductRouter;
