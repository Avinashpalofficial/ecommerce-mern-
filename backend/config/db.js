// mongoose  connection setup
import  mongoose  from 'mongoose'

const connectDB= async ()=>{
            try {
            const conn=   await mongoose.connect(process.env.MONGO_URL)
            console.log("DB is connect",);
            
            } catch (error) {
                console.log("DB is not connect=",error);
                
            }
}
export default connectDB