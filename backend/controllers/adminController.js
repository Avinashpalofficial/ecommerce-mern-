import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../Models/Admin.js";
import catchAsyncError from "../middleware/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
export const adminLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return next(
      new ErrorHandler("Admin credentials missing in .env file", 500)
    );
  }
  if (email !== process.env.ADMIN_EMAIL) {
    return next(new ErrorHandler("Invalid email", 401));
  }
  let admin = await Admin.findOne({ email });
  console.log("admin=", admin);

  if (!admin) {
    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    admin = await Admin.create({
      name: "System Administrator",
      email: process.env.ADMIN_EMAIL,
      password: hashPassword,
      role: "superadmin",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid admin password", 400));
  }

  const token = jwt.sign(
    {
      id: admin._id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_TIME || "7d" }
  );

  const cookieExpire = Number(process.env.COOKIE_EXPIRES_TIME) || 7;
  // console.log("Cookie expire days:", cookieExpire);
  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true, //secure from js access,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res
    .status(200)
    .cookie("adminToken", token, options)
    .json({
      success: true,
      message: "Admin logged in successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
});
export const adminLogout = catchAsyncError(async(req,res,next)=>{
                               
})


