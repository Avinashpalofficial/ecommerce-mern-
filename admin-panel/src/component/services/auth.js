import axios from "axios"
import { api } from "./api"
import  {toast} from "react-toastify"

export const login =  async(email,password)=>{
                    try {
                        const res = await api.post('/auth/admin/login',{
                            email,
                            password
                        },
                    {withCredentials:true}
                )
                toast.success("login successfully")
                   return res.data
                    } catch (error) {
                         toast.error(error.response?.data?.message) || "login failed"
                         throw error
                    }
}