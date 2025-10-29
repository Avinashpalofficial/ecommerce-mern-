import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";

//load environment modules
dotenv.config();

//connect to mongoDB
connectDB();
//initialize express App
const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", productRouter);
app.get("/", (req, res) => {
  res.send("project is ready");
});
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
