import express from "express";
import { sendStripeApiKey, createCheckoutSession, verifysession } from "../controllers/paymentControllers.js";
import { authUser, authAdmin } from "../middleware/auth.js";

const paymentRouter = express.Router();
// paymentRouter.post("/payment/process", authUser, processPayment);
paymentRouter.get('/stripeapikey',authUser,sendStripeApiKey)
paymentRouter.post('/create-checkout-session',authUser,createCheckoutSession)
paymentRouter.get('/stripe/session/:sessionId',verifysession)

export default paymentRouter