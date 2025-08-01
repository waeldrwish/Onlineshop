const productsModel = require("../models/productsModel");

// إضافة منتج
const addProduct = async (req, res) => {
  const { title, description, price, image } = req.body;
  const createdBy = req.user.id;

  try {
    const newProduct = new productsModel({
      title,
      description,
      price,
      image,
      createdBy
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// عرض كل المنتجات
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productsModel.find().sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// عرض المنتجات الخاصة بالمستخدم الحالي
const getMyProducts = async (req, res) => {
  const userId = req.user.id;
  try {
    const products = await productsModel.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// تعديل منتج
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: not your product" });
    }

    const { title, description, price, image } = req.body;

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (image !== undefined) product.image = image;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// حذف منتج
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: not your product" });
    }

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getMyProducts,
  updateProduct,
  deleteProduct
};