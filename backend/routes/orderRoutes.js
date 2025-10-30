import express from 'express'
import { newOrder } from '../controllers/orderControllers.js'
import { authUser, authAdmin } from "../middleware/auth.js";

 const OrderRouter= express.Router() 

OrderRouter.post('/orders/new',authUser,newOrder)

export default OrderRouter