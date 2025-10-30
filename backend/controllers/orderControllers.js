
import catchAsyncError from "../middleware/asyncError.js";
import Order from "../Models/Order.js";
import User from "../Models/userSchema.js";

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