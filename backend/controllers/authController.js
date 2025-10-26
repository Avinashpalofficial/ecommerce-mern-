import bcrypt from "bcrypt";
import catchAsyncError from "../middleware/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../Models/userSchema.js";

import hashPassword from "../utils/hashUtils.js";
import sendToken from "../utils/sendToken.js";
import { success } from "zod";

//  register the user
const registerUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password, firstName, lastName, dateofBirth } =
    req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists with this email", 400));
  }
  const hashed = await hashPassword(req.body.password); //if user is not exist then we create a user
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashed,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateofBirth: new Date(req.body.dateofBirth),
  });
  sendToken(user, 201, res);
});

//login user
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //check email & password  is entered
  if (!email || !password) {
    return next(new ErrorHandler("Please enter an email and password.", 400));
  }
  //finding user in database
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  console.log("password=",password);
  console.log("user.password=",user.password);
  
  
  const isPasswordMatched = await bcrypt.compare(
    password, user.password,
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});
//logout user
const logoutUser = catchAsyncError(async(req,res,next)=>{
       res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
       })
       res.status(200).json({
        success:true,
        message:'logged out successfully'
       })
})
export { registerUser, loginUser, logoutUser };
