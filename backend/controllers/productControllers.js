import Product from "../Models/product.js";
import APIfeatures from "../utils/apiFeatures.js";
import catchAsyncError from "../middleware/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "../config/cloudinary.js";
import { upload } from "../config/cloudinary.js";

export const createProduct = catchAsyncError(async (req, res, next) => {
  // Check if images are provided
  if (!req.files || req.files.length === 0) {
    return next(new ErrorHandler("At least one image upload", 400));
  }

  //upload images in cloudinary
  const imageLinks = req.files.map((file) => ({
    public_id: file.filename,
    url: file.path,
  }));
  const productData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock || 0,
    images: imageLinks,
    Seller: req.admin.id,
  };
  const product = await Product.create(productData);
  res.status(200).json({
    success: true,
    product,
  });
});
//Get all Products
export const getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 8;
  const TotalProducts = await Product.countDocuments();
  const apiFeatures = new APIfeatures(Product.find(), req.query);
  search();
  Filter();
  //Count filtered products without pagination
  const filterProductCount = await Product.countDocuments(
    apiFeatures.query.getQuery()
  );
  apiFeatures.pagination(resPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    TotalProducts,
    resPerPage,
    filterProductCount,
    products,
  });
});

//get Single Product  /api/v1/products/:id
export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
