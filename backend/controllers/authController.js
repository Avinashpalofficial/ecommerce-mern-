
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import  User  from "../Models/userSchema.js";
import hashPassword from "../utils/hashUtils.js";

// first we register the user

const  registerUser =  async(req,res)=>{
              
             try {
                const {username,email,password,firstName,lastName,dateofBirth}=req.body
                //check if user already exists
                const existUser=  await User.findOne({email})
                if(existUser){
                   return res.status(400).json({
                     success:false,
                     message:"user is already exist with this email"
                   })
                }
            //if user is not exist then we create a user 
            const hashed = await hashPassword(req.body.password)
             const createUser =   await User.create({
                 username :req.body.username,
                 email:req.body.email,  
                 password:hashed,
                 firstName:req.body.firstName,
                 lastName:req.body.lastName,
                 dateofBirth: new Date(req.body.dateofBirth)
             })
                 return res.status(200).json({
                    success: true,
                    message: "signup successfully",createUser
                 })
              
             } catch (error) {
                console.log("error",error);
                
             }

}

const loginUser = async(req,res)=>{
           try {
                const {email,password} = req.body
                const user = await User.findOne({email})
                if(!user){
                    return res.status(400).json({
                        success:false,
                        message:"Invalid email"
                    })
                }
                const isPasswordMatched=  await bcrypt.compare(password,user.password)
                if(!isPasswordMatched){
                    return res.status(400).json({
                        success:false,
                        message:"Wrong input credential or password"
                    })
                }
                const token =    jwt.sign({email:user.email ,password:user.password},process.env.JWT_SECRET)
                    return res.status(200).json({
                        success:true,
                        message: "token=",token
                    })
           } catch (error) {
            console.log("error=",error);
            
           }
}
export  {registerUser,loginUser}