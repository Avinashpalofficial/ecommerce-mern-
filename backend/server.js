import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes & Config
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { DashboardRouter } from "./routes/dashboardRoute.js";
import { stripeWebhook } from "./controllers/paymentControllers.js";
import errorMiddleware from "./middleware/error.js";
import cloudinary from "./config/cloudinary.js";

// Load env
dotenv.config();

// Init app
const app = express();

// ✅ Connect DB safely
connectDB().catch((err) => {
  console.error("❌ DB Connection Error:", err);
});

// ✅ Cookie parser
app.use(cookieParser());

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ SIMPLE + SAFE CORS (production ready)
app.use(
  cors({
    origin: true, // allow all origins (safe for dev + vercel)
    credentials: true,
  })
);

// ✅ STRIPE WEBHOOK (MUST be BEFORE express.json)
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ✅ JSON parser
app.use(express.json());

// ✅ Health check (VERY IMPORTANT for Railway)
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend chal raha hai ✅",
  });
});

// ✅ Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", OrderRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", DashboardRouter);

// ✅ Global error handler
app.use(errorMiddleware);

// ✅ PORT (Railway compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});