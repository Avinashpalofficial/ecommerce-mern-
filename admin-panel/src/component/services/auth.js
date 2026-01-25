import axios from "axios"
import { api } from "./api"
import  {toast} from "react-toastify"

export const login =  async(email,password)=>{
                    try {
                        const res = await api.post('/auth/admin/login',{
                            email,
                            password
                        },
                    
                )
                if(res.data.success){
                    
                   toast.success("login successfully")
                }else{
                  toast.error("login failed")   
                }
                   return res.data
                    } catch (error) {
                         toast.error(error.response?.data?.message || "login failed")
                         throw error
                    }
}
export  const logout =   async()=>{
      try {
                 const res =  await api.post('/auth/admin/logout')
                 if(res.data.success){
                    toast.success('logout successfully!')
                 }
                 else{
                    toast.error("failed")
                 }
      } catch (error) {
                         toast.error(error.response?.data?.message || "logout failed")
        
      }
}