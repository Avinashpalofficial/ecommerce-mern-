const { promise } = require("zod")

const  catchAsyncError = (fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

export default catchAsyncError