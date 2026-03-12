import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import Footer from "../component/layout/Footer";

export default function Myorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/orders/me`,
        { withCredentials: true }
      );
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const getProgressWidth = (status) => {
    switch (status) {
      case "Delivered":
        return "w-full";
      case "Shipped":
        return "w-2/3";
      default:
        return "w-1/3";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(45,30%,97%)]">
        <div className="bg-[hsl(20,10%,15%)] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 bg-white rounded-2xl animate-pulse border border-[hsl(20,10%,88%)]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      {/* Header Section */}
      <section className="bg-[hsl(20,10%,15%)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(12,76%,55%)]/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-6 relative z-10"
        >
          <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-3">
            Order History
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white">
            My Orders
          </h1>
          <p className="text-gray-400 mt-2">
            Track your purchases and delivery status
          </p>
        </motion.div>
      </section>

      {/* Orders Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-[hsl(12,40%,92%)] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-[hsl(12,76%,55%)]" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[hsl(20,15%,10%)] mb-3">
              No Orders Yet
            </h2>
            <p className="text-[hsl(20,10%,40%)] mb-8">
              Start shopping to see your orders here
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white px-8 py-3 rounded-lg font-medium transition-all"
            >
              Browse Products
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {orders.map((o) => (
              <motion.div
                key={o._id}
                variants={item}
                onClick={() => navigate(`/orders/${o._id}`)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[hsl(20,10%,88%)] overflow-hidden group"
              >
                {/* Header */}
                <div className="p-5 border-b border-[hsl(20,10%,88%)]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(12,40%,92%)] rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-[hsl(12,76%,55%)]" />
                      </div>
                      <div>
                        <p className="text-xs text-[hsl(20,10%,40%)]">Order ID</p>
                        <p className="font-mono text-xs text-[hsl(20,15%,10%)]">
                          {o._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[hsl(20,10%,60%)] group-hover:text-[hsl(12,76%,55%)] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[hsl(20,15%,10%)]">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        o.orderStatus
                      )}`}
                    >
                      {o.orderStatus}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[hsl(45,20%,93%)] rounded-full mb-5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all bg-[hsl(12,76%,55%)] ${getProgressWidth(
                        o.orderStatus
                      )}`}
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[hsl(20,10%,40%)]">Total Amount</span>
                      <span className="font-semibold text-[hsl(20,15%,10%)]">
                        Rs. {o.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[hsl(20,10%,40%)]">Payment</span>
                      <span
                        className={`text-sm font-medium ${
                          o.isPaid ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {o.isPaid ? "Paid" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 pb-5">
                  <button className="w-full bg-[hsl(45,20%,93%)] hover:bg-[hsl(45,20%,88%)] text-[hsl(20,15%,10%)] py-2.5 rounded-lg text-sm font-medium transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
