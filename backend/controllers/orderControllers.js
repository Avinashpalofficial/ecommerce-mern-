
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/asyncError.js";
import Order from "../Models/Order.js";
import User from "../Models/userSchema.js";
import { success } from "zod";

export const newOrder= catchAsyncError(async(req ,res ,next)=>{
               const{  orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo} =req.body
        const order =  await Order.create({
               orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user.id
        })
        await User.findByIdAndUpdate(req.user.id,{
            $push:{orders:order._id}
        })
        res.status(200).json({success:true,message:order})
})
//Get single order//  api/v1/orders/:id
export const getSingleOrder=  catchAsyncError(async(req,res,next)=>{
                     const order = await Order.findById(req.params.id).populate('user', 'name email')
                     if(!order){
                            return next(new ErrorHandler('Order not found',401))
                     }
                     res.status(200).json({success:true,order})
})