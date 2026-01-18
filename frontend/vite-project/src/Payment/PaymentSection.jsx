import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

export default function PaymentSection() {
  
const {orderId} = useParams()
const [order,setOrder] = useState(null)
    const[loading,setLoading] = useState(true)
    console.log("id:",orderId);
    
    const fetchOrder = async()=>{
          if(!orderId) return;
           try {
                 const res = await axios.get(`http://localhost:3000/api/v1/orders/${orderId}`,
                  {withCredentials:true}
                 )   
                 setOrder(res.data.order)
           } catch (error) {
            console.log(error);
            alert('order not found')
           }finally {
        setLoading(false);
      }
    }
    useEffect(()=>{
      fetchOrder()
    },[orderId])
  
  
 const [showPaymentUI, setShowPaymentUI] = useState(false);
const handleStripeCheckout = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/create-checkout-session",
      {
       orderId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
        
      }
     

    );

    if (data?.url) {
      window.location.href = data.url; // Stripe redirect
    } else {
      alert("Stripe session create nahi hua");
    }
  } catch (error) {
    console.log(error);
    alert("Payment request failed");
  }
};
  if(loading)  return <p>loading order ....</p>
  if (!order) return <p>order not found</p>;
const item = order.orderItems[0];

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* IF PAYMENT UI NOT OPEN */}
      {!showPaymentUI && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
          
          <h1 className="text-2xl font-bold">Checkout</h1>

          <img
            src={
              item.image ||
              item.images?.[0]?.url ||
              item.images?.[0] ||
              "https://via.placeholder.com/600x400?text=Product"
            }
            className="rounded-xl"
          />

          <h2 className="text-xl font-bold">{item.name}</h2>

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>
              {item.currency}
              {item.price?.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={handleStripeCheckout}
            className="w-full bg-indigo-900 text-white py-3 rounded-xl font-semibold"
          >
            Buy Now
          </button>
        </div>
      )}

      {/* WHEN BUY CLICKED → SHOW CASHFREE STYLE */}
      
    </div>
  );
}
