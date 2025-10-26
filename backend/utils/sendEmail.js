   import nodemailer from 'nodemailer'

   const sendEmail= async(options)=>{          // option -> options ek object hai jo email ke different parts ko dynamically pass karne ke liye use hota hai.
    try {
        const  transporter=  nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        port:process.env.MAIL_PORT,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
        
    })
    const mailOptions = {
        from :process.env.MAIL_USER,
        to:options.email,
        subject:options.subject,
        html:options.message,
        text:options.text

    }
     const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
        
    } catch (error) {
          console.error('Error sending email: ', error);
    }                                                      
   }
   export default sendEmail