import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";
import OrderRouter from "./routes/orderRoutes.js";
import { upload } from "./config/cloudinary.js";
import cloudinary from "./config/cloudinary.js";

//load environment modules
dotenv.config();

//connect to mongoDB
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//initialize express App
const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", OrderRouter);
app.get("/", (req, res) => {
  res.send("project is ready");
});
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
