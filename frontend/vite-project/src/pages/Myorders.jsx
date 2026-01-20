import { useEffect, useState } from "react";
import axios from "axios";

export default function Myorders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/orders/me", {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
      alert("Order not found");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🛒 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
            >
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="font-mono text-xs break-all mb-3">{o._id}</p>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    o.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {o.orderStatus}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total:</span>
                <span className="text-blue-600 font-bold">₹{o.totalPrice}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="font-semibold">Paid:</span>
                <span
                  className={`font-bold ${
                    o.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {o.isPaid ? "Yes" : "No"}
                </span>
              </div>

              <button className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
