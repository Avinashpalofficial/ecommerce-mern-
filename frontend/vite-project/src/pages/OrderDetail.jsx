import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

const STATUS_CONFIG = {
  Processing: { color: "bg-yellow-100 text-yellow-700", bar: "bg-yellow-400 w-1/4", step: 1 },
  Shipped:    { color: "bg-blue-100 text-blue-700",   bar: "bg-blue-500 w-2/3",   step: 2 },
  Delivered:  { color: "bg-green-100 text-green-700", bar: "bg-green-500 w-full",  step: 3 },
  Cancelled:  { color: "bg-red-100 text-red-600",     bar: "bg-red-400 w-full",    step: 0 },
};

const STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"];

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(data.order);
      } catch (err) {
        setError(err.response?.data?.message || "Order not found");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // ── Loading Skeleton ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 bg-gray-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">{error || "Order not found"}</h2>
          <button
            onClick={() => navigate("/my-orders")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Processing;
  const currentStep = statusCfg.step;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto space-y-5">

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate("/my-orders")}
          className="flex items-center gap-2 text-indigo-600 font-semibold hover:underline text-sm"
        >
          ← Back to My Orders
        </button>

        {/* ── Header ── */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Order Details</h1>
              <p className="text-xs text-white/60 mt-1 font-mono break-all">
                #{order._id}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${statusCfg.color}`}>
                {order.orderStatus}
              </span>
              <span className="text-xs text-white/60">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Progress Tracker ── */}
        {order.orderStatus !== "Cancelled" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-md p-6"
          >
            <h2 className="font-bold text-gray-800 mb-5">Order Progress</h2>
            <div className="relative">
              {/* Progress bar background */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 mx-10" />
              {/* Progress fill */}
              <div
                className={`absolute top-5 left-0 h-1 bg-indigo-500 mx-10 transition-all duration-700`}
                style={{ width: `${((currentStep) / (STEPS.length - 1)) * 85}%` }}
              />
              <div className="relative flex justify-between">
                {STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold z-10
                        ${done ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-gray-300 text-gray-400"}`}>
                        {done ? "✓" : i + 1}
                      </div>
                      <p className={`text-xs mt-2 font-medium text-center max-w-16 ${done ? "text-indigo-600" : "text-gray-400"}`}>
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-5">

          {/* ── Order Items ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl shadow-md p-6 md:col-span-2"
          >
            <h2 className="font-bold text-gray-800 mb-4">
              Items ({order.orderItems.length})
            </h2>
            <div className="space-y-4">
              {order.orderItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Qty: <span className="font-medium text-gray-700">{item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: <span className="font-medium text-gray-700">₹{item.price.toLocaleString("en-IN")}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-indigo-600 text-lg">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Price Breakdown ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-md p-6"
          >
            <h2 className="font-bold text-gray-800 mb-4">Price Breakdown</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span>₹{order.itemsPrice?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{order.taxPrice?.toLocaleString("en-IN") || "0"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-indigo-600">₹{order.totalPrice?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Status</span>
                <span className={`font-semibold ${order.isPaid ? "text-green-600" : "text-red-500"}`}>
                  {order.isPaid ? "✅ Paid" : "❌ Unpaid"}
                </span>
              </div>
              {order.isPaid && order.paidAt && (
                <p className="text-xs text-gray-400">
                  Paid on{" "}
                  {new Date(order.paidAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              )}
              {order.paymentInfo?.method && (
                <p className="text-xs text-gray-400">via {order.paymentInfo.method}</p>
              )}
            </div>
          </motion.div>

          {/* ── Shipping Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl shadow-md p-6"
          >
            <h2 className="font-bold text-gray-800 mb-4">📦 Shipping Address</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Address: </span>
                {order.shippingInfo?.address}
              </p>
              <p>
                <span className="font-medium text-gray-700">City: </span>
                {order.shippingInfo?.city}
              </p>
              <p>
                <span className="font-medium text-gray-700">Postal Code: </span>
                {order.shippingInfo?.postalCode}
              </p>
              <p>
                <span className="font-medium text-gray-700">Country: </span>
                {order.shippingInfo?.country}
              </p>
              <p>
                <span className="font-medium text-gray-700">Phone: </span>
                {order.shippingInfo?.phoneNo}
              </p>
            </div>

            {order.orderStatus === "Delivered" && order.deliveredAt && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-green-700 font-semibold text-sm">✅ Delivered on</p>
                <p className="text-green-600 text-sm">
                  {new Date(order.deliveredAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
            )}
          </motion.div>

        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 justify-end"
        >
          <button
            onClick={() => navigate("/allproduct")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-md"
          >
            🛍️ Continue Shopping
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
