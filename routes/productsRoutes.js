const express = require("express");
const {
  addProduct,
  getAllProducts,
  getMyProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const verifyToken = require("../middleware/tokenVerify");

const productRouter = express.Router();

// إضافة منتج جديد
productRouter.post("/products", verifyToken, addProduct);

// عرض كل المنتجات (بدون تحقق)
productRouter.get("/products", getAllProducts);

// عرض منتجات المستخدم الحالي
productRouter.get("/my-products", verifyToken, getMyProducts);

// تعديل منتج
productRouter.put("/products/:id", verifyToken, updateProduct);

// حذف منتج
productRouter.delete("/products/:id", verifyToken, deleteProduct);

module.exports = productRouter;