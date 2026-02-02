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

export const authAdmin = async (req, res, next) => {

  try {
    console.log("COOKIES:", req.cookies);

    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    // 🔴 MOST IMPORTANT
    req.admin = admin;

    next();

  } catch (error) {

    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};



