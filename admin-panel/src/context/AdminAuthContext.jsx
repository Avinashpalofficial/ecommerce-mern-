import { createContext,useContext,useEffect,useState } from "react"

import {api}    from "../component/services/api.js"

const  AdminAuthContext =  createContext()

export const   AdminAuthProvider =  ({children})=>{
            
             const[admin,setAdmin] = useState("") 
             const[loading,setLoading] =  useState(true)
             const[isAuthenticated,setIsAuthenticated]= useState(false)
             
             const getProfile =  async()=>{
                        try {
                         
                          const response =  await api.get('/auth/admin/me',
                            {withCredentials:true}
                          )
                          if(response.data.success){
                              setAdmin(response.data.admin)
                              setIsAuthenticated(true)
                          }else{
                             setAdmin(null)
                             setIsAuthenticated(false)
                          }
                        } catch (error) {
                                 setAdmin(null)
                                 setIsAuthenticated(false)
                        }
                        finally{
                          setLoading(false)
                        }

             }
             useEffect(()=>{
                    getProfile()
             },[])

             const login =   async(email,password)=>{
              console.log("CONTEXT EMAIL 👉", email);
              console.log("CONTEXT PASSWORD 👉", password);
                       try {
                         const response =  await api.post("/auth/admin/login",
                        {
                          email,
                          password
                        },{withCredentials:true}
                        )  
                        console.log("res:",response);
                        
                      if(response.data.success){
                        setAdmin(response.data.admin)
                        setIsAuthenticated(true)
                        return true
                      }   
                    
                       } catch (error) {
                          console.log(error.response?.data|| "login failed");
                          console.log("STATUS 👉", error.response?.status);
                           console.log("MESSAGE 👉", error.message);
                         
                          
                       }

             }
             const logout =   async()=>{
                      const response =  await api.get("/auth/admin/logout",{withCredentials:true})
                         if(response.data.success){
                          setAdmin(null)
                          setIsAuthenticated(false)
                         
                         }
             }
             return (
                 <AdminAuthContext.Provider
                 value={{
                  admin,
                  loading,
                  isAuthenticated,
                  getProfile,
                  login,
                  logout

                 }}
                 >
                 {children}
                 </AdminAuthContext.Provider>
             )
}
export const useAdminAuth = ()=> useContext(AdminAuthContext)