import express from "express";
// import authUser from '../middleware/auth.js'
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetpassword,
  sendEmailOtp,
  verifyEmailOtp,
  requestEmailChange,
  verifyOldEmailOtp,
  verifyNewEmailOtp,
  updateName,
} from "../controllers/authController.js";
import adminLogin from "../controllers/adminController.js";
import { authUser } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);
authRouter.get("/user/logout", logoutUser);
authRouter.post("/password/forgot", forgotPassword);
authRouter.put("/password/reset/:token", resetpassword);
authRouter.post("/admin/login", adminLogin);
authRouter.post('/email/send-otp',sendEmailOtp)
authRouter.post('/email/verify-otp',verifyEmailOtp)
authRouter.post('/email/change',authUser,requestEmailChange)
authRouter.post('/email/verify-old',authUser,verifyOldEmailOtp)
authRouter.post('/email/verify-new',authUser,verifyNewEmailOtp)
authRouter.put("/user/update-name", authUser, updateName);


export default authRouter;
