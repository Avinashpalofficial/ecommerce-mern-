import bcrypt from 'bcrypt'
 
const hashPassword =  async (password)=>{
 const saltRounds = 10  //Typically a value between 10 and 12
 const hash=    await bcrypt.hash(password ,saltRounds)
 return hash;

}
export default hashPassword

