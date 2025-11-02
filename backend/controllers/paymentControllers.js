import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../Models/Order.js";
import catchAsyncError from "../middleware/asyncError.js";
import { success } from "zod";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//Process payment
export const processPayment = catchAsyncError(async (req, res, next) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHandler("Order not found ", 400));
  }
  if (order.user.toString() !== req.user.id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to access this order", 403)
    );
  }
  const amount = order.totalPrice;

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
//Send Stripe API Key   to frontend
export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY });
});
//Create Stripe Checkout Session
export const createCheckoutSession = catchAsyncError(async (req, res, next) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId).populate("orderItems.product");
  if (!order) {
    return next(new ErrorHandler("order not found", 401));
  }
  if (order.user.toString() !== req.user.id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to access this order", 403)
    );
  }
  const line_items = order.orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            productId: item.product._id.toString(),
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });
  // Add shipping cost as a separate line item
  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Shipping Cost",
      },
      unit_amount: Math.round((order.shippingPrice || 0) * 100),
    },
    quantity: 1,
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `https://example.com/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://example.com/order/cancel`,
    customer_email: req.user.email,
    client_reference_id: req.user._id.toString(),
    metadata: {
      totalPrice: order.totalPrice.toString(),
    },
  });
  res.status(200).json({
    success: true,
    sessionId: session.id,
    url: session.url,
  });
});

//Handle Stripe Webhook
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
