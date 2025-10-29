import express from "express";
// import authUser from '../middleware/auth.js'
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetpassword,
} from "../controllers/authController.js";
import adminLogin from "../controllers/adminController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);
authRouter.post("/password/forgot", forgotPassword);
authRouter.put("/password/reset/:token", resetpassword);
authRouter.post("/admin/login", adminLogin);

export default authRouter;
