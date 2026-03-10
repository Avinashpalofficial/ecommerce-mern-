import { useAdminAuth } from "../../context/adminAuthContext"
import { Navigate } from "react-router-dom"
export const AdminPrivateRoute = ({children})=>{

    const { isAuthenticated,loading} = useAdminAuth()

    if(loading){
        return <h3>loading...</h3>
    }

    if(!isAuthenticated){
              return  <Navigate to = "/login" replace/>

    }
             return children
}