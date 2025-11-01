import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/asyncError.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//Process payment
export const processPayment = catchAsyncError(async (req, res, next) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    // Stripe API method that creates a payment intent//paymentIntents->A Stripe object that tracks the payment lifecycle from creation through success/failure
    amount: Math.round(amount * 100),
    currency: "usd",
    metadata: {
      company: "Ecommerce",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: paymentIntent.client_secret });
});
