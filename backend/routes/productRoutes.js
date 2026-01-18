import express from "express";
import {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { authUser, authAdmin } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";
const productRouter = express.Router();
productRouter.get('/allProducts',getProducts)
productRouter.post(
  "/admin/product/new",
  authAdmin,
  upload.array("images", 5),
  createProduct
);
productRouter.get("/product/:id", getSingleProduct);
productRouter.put(
  "/admin/products/:id",
  authAdmin,
  upload.array("images", 5),
  updateProduct
);
productRouter.delete("/admin/products/:id", authAdmin, deleteProduct);

export default productRouter;
