import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../Models/Order.js";
import catchAsyncError from "../middleware/asyncError.js";



const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



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
    success_url: `http://localhost:5173/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/order/cancel`,

    customer_email: req.user.email,
    client_reference_id: req.user._id.toString(),
    metadata: {
      orderId:order._id.toString(),
      totalPrice: order.totalPrice.toString(),
    },
  });
  res.status(200).json({
    success: true,
    sessionId: session.id,
    url: session.url,
  });
});
//verifysession 
 export const verifysession = catchAsyncError(async(req,res,next)=>{
                     const session =await stripe.checkout.sessions.retrieve(req.params.sessionId)
                     if(!session || session.payment_status!=='paid') {
                      return next(new ErrorHandler('payment not completed',400))
                     }
                     const order = await Order.findById(session.metadata.orderId).populate('user','email')
                     res.status(200).json({success:true,order})
 })
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
    console.log("event:", event.type);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId= session.metadata.orderId
    const order = await Order.findById(orderId)
    if (order && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.orderStatus = "Processing";
      order.paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        method: "Stripe",
      };

      await order.save()
      
      
      
    }
    // Here you would typically create the order in your database
    // You can use the session metadata to get order details
    console.log("Payment successful for session:", session.id);
  }

  res.status(200).json({ received: true });
});
