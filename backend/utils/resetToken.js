

import crypto from 'crypto'
const getResetPasswordToken = (user)=>{
    const resetToken = crypto.randomBytes(20).toString('hex')
    console.log("resetToken=",resetToken);
    

    //Hash and set to  resetPasswordToken field
    user.resetPasswordToken= crypto
                        .createHash('sha256')
                        .update(resetToken)
                        .digest('hex') 
                        //set Token expiry
    user.resetPasswordExpire = Date.now()+30*60*1000     
                return resetToken;     
}

export  default getResetPasswordToken