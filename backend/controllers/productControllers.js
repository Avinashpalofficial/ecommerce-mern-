 import Product from '../Models/product.js'

import catchAsyncError from '../middleware/asyncError.js'
import ErrorHandler  from '../utils/errorHandler.js'
import cloudinary from '../config/cloudinary'


const newProduct = catchAsyncError(async(req,res,next)=>{
    //  // Check if images are provided
    if(!req.files  || req.files.length===0){
        return next(new ErrorHandler('At least one image upload',400) )
    }
      let imageLinks= []
       //upload images in cloudinary
      for(let i =0; i<req.files.length;i++){
        //convert buffer to base64
        const b64 =  Buffer.from(req.files[i].buffer).toString('base64')
        const dataURL = 'data;'+ req.files[i].mimetype + ";base64"+b64
        //upload to  cloudinary
         const result=     await cloudinary.uploader.upload(dataURL,{
                folder:ecommerce/products
              })
        imageLinks.push({
            public_id : result.public_id,
            url:result.url
        })      
      }
      const productData =  {
           name: req.body.name,
           price:req.body.price,
           description:req.body.description,
           category:req.body.category,
           stocks:req.body.stocks || 0 ,
           images:imageLinks,
           user:req.user.id
      }
      const product = await Product.create(productData)
      res.status(200).json({
        success:true,
        product
      })
})
export default {newProduct}