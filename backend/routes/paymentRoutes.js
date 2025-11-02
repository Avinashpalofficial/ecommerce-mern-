import express from "express";
import { processPayment,sendStripeApiKey, createCheckoutSession,stripeWebhook } from "../controllers/paymentControllers.js";
import { authUser, authAdmin } from "../middleware/auth.js";

const paymentRouter = express.Router();
paymentRouter.post("/payment/process", authUser, processPayment);
paymentRouter.get('/stripeapikey',authUser,sendStripeApiKey)
paymentRouter.post('/create-checkout-session',authUser,createCheckoutSession)
paymentRouter.post('/webhook',stripeWebhook)
export default paymentRouter