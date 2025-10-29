import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/asyncError.js";
import User from "../Models/userSchema.js";
import Admin from "../Models/Admin.js";
import jwt from "jsonwebtoken";
//User Authentication
export const authUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("user Token=",authUser);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log("userID=", user);
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("User JWT Error =", error.message);
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

//ADMIN AUTHENTICATION

export const authAdmin = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  //  console.log("token=",token);
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    //  console.log("admin=",admin);

    if (!admin) {
      return next(new ErrorHandler("Admin not found", 401));
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.log("token", token);

    console.error("Admin JWT Error =", error.message);
    return next(new ErrorHandler("Invalid or expired admin token", 401));
  }
});
