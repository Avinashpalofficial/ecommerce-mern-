import express from 'express'
import { newOrder,getSingleOrder, myOrders, allOrders, UpdateOrder, deleteOrder } from '../controllers/orderControllers.js'
import { authUser, authAdmin } from "../middleware/auth.js";

 const OrderRouter= express.Router() 

OrderRouter.post('/orders/new',authUser,newOrder)
OrderRouter.get('/orders/me',authUser,myOrders)

OrderRouter.get('/orders/:id',authUser,getSingleOrder)
OrderRouter.get('/admin/orders/:id',authAdmin,getSingleOrder)
OrderRouter.get('/admin/orders',authAdmin,allOrders)
OrderRouter.put('/admin/orders/:id',authAdmin,UpdateOrder)
OrderRouter.delete('/admin/orders/:id',authAdmin,deleteOrder)

OrderRouter.use((req,res,next)=>{
  console.log("ORDER ROUTE HIT:", req.originalUrl);
  next();
});

export default OrderRouter