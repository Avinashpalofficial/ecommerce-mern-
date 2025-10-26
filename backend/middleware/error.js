import { success } from "zod"
import ErrorHandler from "../utils/errorHandler.js"
const errorMiddleware= (err,req,res,next)=>{
          err.statusCode = err.statusCode || 500
          err.message = err.message || 'Internal server error'
//wrong mongoose object Id
          if(err.name === 'CastError'){         
            const message = `Resource not found :${err.path}`
            err= new ErrorHandler(message,400)
          }
//JWT error hanling
if(err.name === 'jsonwebtokenError'){
    const message = 'json wenToken is invalid . Try again !!'
    err= new ErrorHandler(message,400)
}        
//handling expired jwt error
if(err.name ==='TokenExpiredError'){
    const message = 'JWT TOKEN is expired . Try again'
    err= new ErrorHandler(message,400)
}  
res.status(err.statusCode).json({
    success:false,
    message:err.message,
    stack:process.env.NODE_ENV === 'PRODUCTION' ? {} : err.stack
})

}

export default errorMiddleware