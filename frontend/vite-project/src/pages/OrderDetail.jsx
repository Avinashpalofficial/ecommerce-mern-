import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle, Truck, ShoppingBag } from "lucide-react";
import Footer from "../component/layout/Footer";

const API = import.meta.env.VITE_API_URL;

const STATUS_CONFIG = {
  Processing: { color: "bg-amber-100 text-amber-700 border-amber-200", step: 1 },
  Shipped: { color: "bg-blue-100 text-blue-700 border-blue-200", step: 2 },
  Delivered: { color: "bg-green-100 text-green-700 border-green-200", step: 3 },
  Cancelled: { color: "bg-red-100 text-red-600 border-red-200", step: 0 },
};

const STEPS = [
  { label: "Order Placed", icon: ShoppingBag },
  { label: "Processing", icon: Package },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: CheckCircle },
];

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(45,30%,97%)]">
        <div className="bg-[hsl(20,10%,15%)] py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-[hsl(20,10%,88%)]" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[hsl(45,30%,97%)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[hsl(12,40%,92%)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-[hsl(12,76%,55%)]" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[hsl(20,15%,10%)] mb-3">
            {error || "Order not found"}
          </h2>
          <button
            onClick={() => navigate("/my-orders")}
            className="mt-4 bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Processing;
  const currentStep = statusCfg.step;

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      {/* Header */}
      <section className="bg-[hsl(20,10%,15%)] py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(12,76%,55%)]/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <button
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-2">
                Order Details
              </p>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-white">
                #{order._id.slice(-8).toUpperCase()}
              </h1>
            </div>
            <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border ${statusCfg.color}`}>
              {order.orderStatus}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Progress Tracker */}
        {order.orderStatus !== "Cancelled" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-[hsl(20,10%,88%)] p-6"
          >
            <h2 className="font-semibold text-[hsl(20,15%,10%)] mb-6">Order Progress</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-[hsl(45,20%,93%)] mx-12" />
              <div
                className="absolute top-5 left-0 h-0.5 bg-[hsl(12,76%,55%)] mx-12 transition-all duration-700"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 75}%` }}
              />
              
              <div className="relative flex justify-between">
                {STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  const StepIcon = step.icon;
                  return (
                    <div key={step.label} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                          done
                            ? "bg-[hsl(12,76%,55%)] text-white"
                            : "bg-[hsl(45,20%,93%)] text-[hsl(20,10%,60%)]"
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <p className={`text-xs mt-2 font-medium text-center ${
                        done ? "text-[hsl(12,76%,55%)]" : "text-[hsl(20,10%,60%)]"
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-[hsl(20,10%,88%)] overflow-hidden"
        >
          <div className="p-6 border-b border-[hsl(20,10%,88%)]">
            <h2 className="font-semibold text-[hsl(20,15%,10%)]">
              Items ({order.orderItems.length})
            </h2>
          </div>
          <div className="divide-y divide-[hsl(20,10%,88%)]">
            {order.orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6">
                <div className="w-20 h-20 bg-[hsl(45,20%,93%)] rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[hsl(20,15%,10%)] truncate">{item.name}</h3>
                  <p className="text-sm text-[hsl(20,10%,40%)] mt-1">
                    Qty: {item.quantity} x Rs. {item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="font-semibold text-[hsl(12,76%,55%)]">
                  Rs. {(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Price Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-[hsl(20,10%,88%)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[hsl(12,40%,92%)] rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[hsl(12,76%,55%)]" />
              </div>
              <h2 className="font-semibold text-[hsl(20,15%,10%)]">Payment Details</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[hsl(20,10%,40%)]">Items Total</span>
                <span className="text-[hsl(20,15%,10%)]">Rs. {order.itemsPrice?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(20,10%,40%)]">Tax</span>
                <span className="text-[hsl(20,15%,10%)]">Rs. {order.taxPrice?.toLocaleString("en-IN") || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(20,10%,40%)]">Shipping</span>
                <span className="text-green-600">{order.shippingPrice === 0 ? "Free" : `Rs. ${order.shippingPrice}`}</span>
              </div>
              <div className="h-px bg-[hsl(20,10%,88%)] my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-[hsl(20,15%,10%)]">Total</span>
                <span className="text-[hsl(12,76%,55%)]">Rs. {order.totalPrice?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[hsl(20,10%,40%)]">Payment Status</span>
                <span className={`font-medium ${order.isPaid ? "text-green-600" : "text-red-500"}`}>
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>
              {order.isPaid && order.paidAt && (
                <p className="text-xs text-[hsl(20,10%,60%)]">
                  Paid on {new Date(order.paidAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              )}
            </div>
          </motion.div>

          {/* Shipping Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl shadow-lg border border-[hsl(20,10%,88%)] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[hsl(12,40%,92%)] rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[hsl(12,76%,55%)]" />
              </div>
              <h2 className="font-semibold text-[hsl(20,15%,10%)]">Shipping Address</h2>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-[hsl(20,15%,10%)]">{order.shippingInfo?.address}</p>
              <p className="text-[hsl(20,10%,40%)]">
                {order.shippingInfo?.city}, {order.shippingInfo?.postalCode}
              </p>
              <p className="text-[hsl(20,10%,40%)]">{order.shippingInfo?.country}</p>
              <p className="text-[hsl(20,10%,40%)] pt-2">
                Phone: {order.shippingInfo?.phoneNo}
              </p>
            </div>

            {order.orderStatus === "Delivered" && order.deliveredAt && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 font-medium text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Delivered on {new Date(order.deliveredAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <button
            onClick={() => navigate("/products")}
            className="bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
