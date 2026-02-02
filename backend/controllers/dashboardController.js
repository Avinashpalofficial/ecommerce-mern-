import Product from "../Models/product.js";
import Order from "../Models/Order.js";
import User from "../Models/userSchema.js";

export const getDashboardStats = async()=>{
                   //total counts
                   try {
                    const totalProducts = await Product.countDocuments()
                   const totalUser =  await User.countDocuments()
                   const totalOrders= await Order.countDocuments()
                   const totalRevenue= await Order.aggregate([
                    {$match:{orderStatus:'delivered'}},
                    {$group :{_id:null ,total: {$sum :'$totalPrice'} }}
                   ])
     //Recent Orders
       const recentOrders =     await Order.find()  
                               .populate('user','name')
                               .sort('-createdAt')
                               .limit(5)
       const   lowStockProduct =    await Product.find({stock : {$lt:10}})
                                  .select('name stock price')
                                  .limit(5)
       // Order status distribution    
       const orderStatus = await Order.aggregate([
                      {$group:{_id:'$orderStatus' , count:{$sum:1}}}
       ])                                           
  //   Monthly revenue for current year
         const currentYear = new Date().getFullYear()
         const  monthlyRevenue=  await  Order.aggregate([
                {
                  $match:{
                         orderStatus:'delivered',
                         createdAt:{
                               $gte: new Date(`${currentYear}-01-01`),   
                               $lte: new Date(`${currentYear}-12-031`)   
                         }
                  }
                },
                {
                  $group:{
                          _id:   {$month: '$createdAt'},
                          revenue: { $sum: '$totalAmount' },
                          orders: { $sum: 1 }
                  }
                },
                {$sort:{_id:1}}
         ])    
         res.json({
          success:true,
          stats:{
            totals:{
              product: totalProducts,
              orders:totalOrders,
              users:totalUser,
              revenue:totalRevenue[0]?.total || 0
            },
            recentOrders,
            lowStockProduct,
            orderStatus,
            monthlyRevenue
          }
         })  
                   } catch (error) {
                    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
                   }

}