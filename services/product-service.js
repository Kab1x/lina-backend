import { ProductModel } from "../models/product-model.js";

const getProduct = async (query = {}, opts = "") => {
  try {
    return await ProductModel.findOne(query, opts);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getProducts = async (query = {}, opts = "") => {
  try {
    return await ProductModel.find(query, opts);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export { getProduct, getProducts };
