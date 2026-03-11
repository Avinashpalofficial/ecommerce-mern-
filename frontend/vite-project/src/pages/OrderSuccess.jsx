import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (!sessionId) return;

    let attempts = 0;

    const poll = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/stripe/session/${sessionId}`,
          { withCredentials: true }
        );
        setOrder(res.data.order);
        setLoading(false);

        // Agar isPaid false hai aur 5 attempts baaki hain — 3 sec baad retry
        if (!res.data.order?.isPaid && attempts < 5) {
          attempts++;
          setTimeout(poll, 3000);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    poll();
  }, []);

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Checking payment status...</h2>;

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
      <h1>Order Success 🎉</h1>
      <p>Order ID: {order?._id}</p>
      <p>Status: {order?.orderStatus}</p>
      <p>Total: ${order?.totalPrice}</p>

      {order?.isPaid ? (
        <h2 style={{ color: "green" }}>✅ Payment Successful</h2>
      ) : (
        <h2 style={{ color: "orange" }}>Waiting for payment confirmation...</h2>
      )}
    </div>
  );
}