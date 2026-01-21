import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    firstName: String,
    lastName: String,
    // dateofBirth: Date,
    roles: {
      type: [String], //Array of string for roles
      default: ["user"],
    },
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    isEmailVerified:{
      type:Boolean,
      default:false
    },
    emailChange:{
            newEmail:String,
            oldEmailOtpHash:String,
            newEmailOtpHash:String,
            oldEmailVerified:{
              type:Boolean,
              default:false
            },
            expiresAt:Date
    },
    emailOtp:String,
    emailOtpExpire:Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userschema);
export default User;
