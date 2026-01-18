import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/asyncError.js";
import Order from "../Models/Order.js";
import User from "../Models/userSchema.js";

import Product from "../Models/product.js";

export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
  } = req.body;
  const itemsPrice = orderItems.reduce((acc,item)=>acc+item.price *item.quantity,
                                      0
                
    
  )
  const taxPrice =0
  const shippingPrice =0
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo:{
             id:'stripe',
             status:'pending'
    },
    paidAt: Date.now(),
    user: req.user.id,
  });
  await User.findByIdAndUpdate(req.user.id, {
    $push: { orders: order._id },
  });
  res.status(200).json({ success: true, message: order });
});
//Get single order//  api/v1/orders/:id
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found", 401));
  }
  res.status(200).json({ success: true, order });
});

//Get logged in Users orders /api/v1/orders/me
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.findById({ user: req.user.id });
  if (!orders) {
    return next(new ErrorHandler("Orders not found"));
  }
  res.status(200).json({ success: true, orders });
});
//Get all Orders admin- /api/v1/admin/orders
export const allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find(); //collect the all orders
  if (!orders) {
    return next(new ErrorHandler("Orders not found", 401));
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({ success: true, orders, totalAmount });
});
//Update/Process order -Admin => /api/v1/admin/orders/:id
export const UpdateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("orderId not found", 401));
  }
  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }
  //forEach -> parallel updates not squentially
  //for..of+await ->squentially updates the orders
  for (const item of order.orderItems) {
    await updateStock(item.product, item.quantity);
  }
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({ success: true, order });
  //update stock for each items
  const updateStock = async (id, quantity) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(400)
          .json({ success: false, message: "Product not found" });
      }
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for Product ${id}`,
        });
      }
      product.stock = product.stock - quantity;
      await product.save();
    } catch (error) {
      console.log(`error is ${error}`);
    }
  };
});

//delete order /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler(`Order not found for this ID ${id}`));
  }
  await order.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "Order deleted successfully" });
});

