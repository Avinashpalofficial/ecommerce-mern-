import express from 'express'
import { newOrder,getSingleOrder, myOrders } from '../controllers/orderControllers.js'
import { authUser, authAdmin } from "../middleware/auth.js";

 const OrderRouter= express.Router() 

OrderRouter.post('/orders/new',authUser,newOrder)
OrderRouter.get('/orders/me',authUser,myOrders)

OrderRouter.get('/orders/:id',authUser,getSingleOrder)
OrderRouter.use((req,res,next)=>{
  console.log("ORDER ROUTE HIT:", req.originalUrl);
  next();
});

export default OrderRouter