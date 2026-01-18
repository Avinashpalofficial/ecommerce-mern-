import axios from "axios"
import   { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useParams } from "react-router-dom"


export default function OrderSuccess(){
    const [order,setOrder] = useState(null)
    const location = useLocation()
    const [loading,setLoading] = useState(true)
    
    const fetchSessionId= async()=>{
        const sessionId = new URLSearchParams(location.search).get("session_id")
                 if(!sessionId) return;
                        try {
                             const res = await axios.get(`http://localhost:3000/api/v1/stripe/session/${sessionId}`,
                                {withCredentials:true}
                             )
                             setOrder(res.data.order)

                        } catch (error) {
                            console.log(error);
                            alert('id is not found')
                                                  
                        } finally{
                            setLoading(false)
                        }
                        
    }
    useEffect(()=>{
             fetchSessionId()
    },[])
    if (loading) return <h2 style={{textAlign:'center'}}>Checking payment status…</h2>;


return (
<div style={{maxWidth:600, margin:'50px auto', textAlign:'center'}}>
<h1>Order Success 🎉</h1>
<p>Order ID: {order?._id}</p>
<p>Status: {order?.orderStatus}</p>
<p>Total: ${order?.totalPrice}</p>


{order?.isPaid ? (
<h2 style={{color:'green'}}>Payment Successful</h2>
) : (
<h2 style={{color:'orange'}}>Waiting for payment confirmation…</h2>
)}
</div>
);
}