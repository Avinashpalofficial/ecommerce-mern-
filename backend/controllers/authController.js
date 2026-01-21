import bcrypt from "bcrypt";
import crypto from "crypto";
import catchAsyncError from "../middleware/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../Models/userSchema.js";
import sendEmail from "../utils/sendEmail.js";
import hashPassword from "../utils/hashUtils.js";
import sendToken from "../utils/sendToken.js";
import getResetPasswordToken from "../utils/resetToken.js";

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
  console.log("password=", password);
  console.log("user.password=", user.password);

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});
//logout user
const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

//forgot password

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  const resetToken = getResetPasswordToken(user);

  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/password/reset/${resetToken}`;
  const message = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
                    .button { background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
                    .footer { margin-top: 20px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Password Reset Request</h2>
                    <p>Hello ${user.name},</p>
                    <p>You requested to reset your password. Click the button below to proceed:</p>
                    <p>
                        <a href="${resetUrl}" class="button">Reset Your Password</a>
                    </p>
                    <p>Or copy and paste this link in your browser:</p>
                    <p>${resetUrl}</p>
                    <p>This password reset link is valid for <strong>30 minutes</strong> only.</p>
                    <p>If you didn't request this reset, please ignore this email.</p>
                    <div class="footer">
                        <p>Thank you,<br>Your App Team</p>
                    </div>
                </div>
            </body>
            </html>
        `;
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// resetpassword

const resetpassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  console.log("ye vala toekn dena=", token);

  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler("password and confirmPassword fields are required", 400)
    );
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("password and confirmPasword does not match", 400)
    );
  }
  //hash urltoken
  const hashed = await hashPassword(req.body.password);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  console.log("resetPasswordToken=", resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  console.log("user btao muje=", user);

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or has expired", 400)
    );
  }

  // Update user
  user.password = hashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.passwordChangedAt = Date.now(); // Track password change time

  await user.save();
  sendToken(user, 200, res);
});

  const sendEmailOtp= catchAsyncError(async(req,res,next)=>{
   
    
           const {email} = req.body
            const user = await User.findOne({email})
            console.log('user is:',user);
            
            if(!user){
              return next(new ErrorHandler('user not found',400))
            }   
            const otp = Math.floor(100000 +Math.random()*900000)
            //hash otp
            const hashedOtp = crypto
            .createHash('sha256')
            .update(otp.toString())
            .digest('hex')
            user.emailOtp = hashedOtp
            user.emailOtpExpire = Date.now()+5*60*1000   //5min
            await user.save()
            await sendEmail(
                   {
                    email:user.email,
                    subject: 'Email Verification OTP',
                    message: ` <h2>Email Verification</h2>
                               <p>Your OTP is <b>${otp}</b></p>
                               <p>This OTP is valid for 5 minutes.</p>`
                   }
            )
            res.status(200).json({success:true, message:"otp send successfully"})

  })
     const  verifyEmailOtp =  catchAsyncError(async(req,res,next)=>{
                   const email = req.body?.email;
                   const otp = req.body?.otp;
                    const user = await  User.findOne({email})
                    console.log('user:',user);
                    
                    if(!user){
                      return  next(
                        new ErrorHandler('user not found',400)
                      )
                    }
                    if(!user.emailOtp || Date.now() > user.emailOtpExpire){
                      return  next(
                        new ErrorHandler('otp is expired',400)
                      )
                    }
                const hashedOtp = crypto
                                  .createHash('sha256')
                                  .update(otp.toString())
                                  .digest('hex')
                    if(hashedOtp !== user.emailOtp ){
                      return   next(new ErrorHandler('otp is invalid',400))
                    } 
                user.isEmailVerified =true
                user.emailOtp= undefined
                user.emailOtpExpire= undefined     
                await user.save()   
                
              res.status(200).json({success:true,message:'OTP verified successfully'})
     })
  //Request Email Change   
   const requestEmailChange= catchAsyncError(async(req,res,next)=>{
                 const {newEmail}= req.body
                 const user = await User.findById(req.user.id)
                 const otp =   Math.floor(100000+Math.random()*900000)
                 const hashOtp = crypto
                                 .createHash('sha256')
                                 .update(otp.toString())
                                 .digest('hex')
                user.emailChange={
                  newEmail,
                  oldEmailOtpHash:hashOtp,
                  expiresAt:Date.now()+5*60*1000
                }  
                await user.save()
                await sendEmail({
                  email:user.email,
                    subject: 'Email Verification OTP',
                    message: ` <h2>Email Verification</h2>
                               <p>Your OTP is <b>${otp}</b></p>
                               <p>This OTP is valid for 5 minutes.</p>`
                })     
                res.status(200).json({success:true,message:'otp send to old email'})          
   })
export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetpassword,
  sendEmailOtp,
  verifyEmailOtp,
  requestEmailChange
  
};
