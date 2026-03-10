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
import { DashboardRouter } from "./routes/dashboardRoute.js";
import cors from "cors";

// load environment variables
dotenv.config();

// connect to mongoDB
connectDB();

const app = express();
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ CORS — local + production dono handle hoga
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      // Vercel ke saare subdomains allow karo
      const isVercel = origin.endsWith(".vercel.app");
      const isAllowed = allowedOrigins.includes(origin);
      
      if (isVercel || isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ✅ PORT — Railway khud PORT set karta hai
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", OrderRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", DashboardRouter);

// Stripe webhook — express.raw() CORS ke baad, express.json() se pehle hona chahiye
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Health check — Railway verify karta hai isse
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend chal raha hai ✅" });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});