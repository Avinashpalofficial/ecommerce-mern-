import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";
import OrderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { upload } from "./config/cloudinary.js";
import cloudinary from "./config/cloudinary.js";
import { stripeWebhook } from "./controllers/paymentControllers.js";

import cors from "cors";
//load environment modules
dotenv.config();

//connect to mongoDB
connectDB();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//initialize express App
app.use(
  cors({
       origin:"http://localhost:5173",
       credentials:true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use(cookieParser());
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", OrderRouter);
app.use("/api/v1",paymentRouter)

app.get('/api/message',(req,res)=>{
        res.json({message:'Backend se response aaya'})
})
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
