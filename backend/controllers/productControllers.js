import Product from "../Models/product.js";
import APIfeatures from "../utils/apiFeatures.js";
import catchAsyncError from "../middleware/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "../config/cloudinary.js";
import { upload } from "../config/cloudinary.js";
import { success } from "zod";

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
//Update Product /api/v1/admin/products/:id
export const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }
  //if new images came via multer
  if (req.files && req.files.length > 0) {
    //first delete the old images
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    // Use multer approach for new images
    const imageLinks = req.files.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));
    req.body.images = imageLinks;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
//delete Product /api/v1/admin/product/:id
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
  await product.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "Prodcut delete successfully" });
});
