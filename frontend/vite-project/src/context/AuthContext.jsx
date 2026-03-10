import { createContext, useEffect, useState,useContext } from "react";
import axios from "axios";
const AuthContext= createContext()
export const AuthProvider = ({children})=>{
        const[user,setUser] = useState(null)
        const [name,setName]= useState("")
        const[loading,setLoading]= useState(true)
        const[isAuthenticated,setIsAuthenticated]= useState(false)

        const getUserProfile=  async()=>{
              try {
                         const response =  await axios.get("http://localhost:3000/api/v1/auth/user/me",
                          {withCredentials:true}
                         )
                           console.log("ME API:", response.data);
                        if(response.data.success){
                        setUser(response.data.user)
                        setIsAuthenticated(true)
                      
               }   
               else{
                setUser(null)
                setIsAuthenticated(false)
               }
              } catch (error) {
                setUser(null)
                setIsAuthenticated(false)
              }finally{
                setLoading(false)
              }
        }
        useEffect(()=>{
                getUserProfile()
        },[])

        const login = async(email,password)=>{
                  try {
                    const response =  await axios.post("http://localhost:3000/api/v1/auth/user/login",
                    {email,password},
                    {withCredentials:true}
                  )
                  if(response.data.success){
                    setUser(response.data.user)
                    setIsAuthenticated(true)
                    return true
                  }
                  } catch (error) {
                    console.log(error.response?.data?.message||"login failed");
                    
                  }
                }
                const logout = async()=>{
                  try {
                    const response= await axios.get("http://localhost:3000/api/v1/auth/user/logout")
                    if(response.data.success){
                      setUser(null)
                      setIsAuthenticated(false)
                    }
                  } catch (error) {
                    console.log(error.response?.data?.message|| "logout failed");
                    
                  }
                    
                }
                const updateUser = (updatedData) => {
  setUser((prev) => ({
    ...prev,
    ...updatedData,
  }));
};
        return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);


