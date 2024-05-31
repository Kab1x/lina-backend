import { ProductModel } from "../models/product-model.js";
import { getProducts } from "../services/product-service.js";

const removeProduct = async (req, res) => {
  try {
    await ProductModel.findOneAndDelete({ id: req.body.id });
    res.json({
      success: true,
      name: req.body,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error while deleting product",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    let products = await ProductModel.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findOne({ id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const products = await ProductModel.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getProductsByPriceUnder = async (req, res) => {
  try {
    const products = await ProductModel.find({
      price: { $lte: req.params.price },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getProductsByPriceOver = async (req, res) => {
  try {
    const products = await ProductModel.find({
      price: { $gt: req.params.price },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getProductsBySize = async (req, res) => {
  try {
    const products = await ProductModel.find({ size: req.params.size });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getProductsByColor = async (req, res) => {
  try {
    const products = await ProductModel.find({ colors: req.params.colors });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getNewProducts = async (req, res) => {
  const products = await getProducts();
  let newcollection = products.slice(1).slice(-8);
  console.log("New collection Fetched");
  res.send(newcollection);
};

export const getFilteredProducts = async (req, res) => {
  try {
    const products = await getProducts(req.query);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
};

export {
  addProduct,
  getAllProducts,
  getNewProducts,
  getProductById,
  getProductsByCategory,
  getProductsByColor,
  getProductsByPriceOver,
  getProductsByPriceUnder,
  getProductsBySize,
  removeProduct,
};
