import express from 'express'
import { newOrder,getSingleOrder } from '../controllers/orderControllers.js'
import { authUser, authAdmin } from "../middleware/auth.js";

 const OrderRouter= express.Router() 

OrderRouter.post('/orders/new',authUser,newOrder)
OrderRouter.get('/orders/:id',authUser,getSingleOrder)

export default OrderRouter