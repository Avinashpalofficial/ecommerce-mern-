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
export const stripeWebhook = catchAsyncError(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Here you would typically create the order in your database
    // You can use the session metadata to get order details
    console.log("Payment successful for session:", session.id);
  }

  res.status(200).json({ received: true });
});
