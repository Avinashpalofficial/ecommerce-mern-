import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import Footer from "../component/layout/Footer";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();

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
  }, [location.search]);

  useEffect(() => {
    if (order?.isPaid) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const redirect = setTimeout(() => {
        navigate("/my-orders");
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
  }, [order, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(45,30%,97%)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[hsl(12,76%,55%)] animate-spin mx-auto mb-4" />
          <p className="text-[hsl(20,10%,40%)]">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl border border-[hsl(20,10%,88%)] overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-[hsl(20,10%,15%)] p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(12,76%,55%)]/20 to-transparent" />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="font-serif text-3xl font-semibold text-white mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-400">
                Thank you for your purchase
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-[hsl(20,10%,88%)]">
                <span className="text-[hsl(20,10%,40%)]">Order ID</span>
                <span className="font-mono text-sm text-[hsl(20,15%,10%)]">
                  {order?._id?.slice(-12).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[hsl(20,10%,88%)]">
                <span className="text-[hsl(20,10%,40%)]">Status</span>
                <span className="text-[hsl(20,15%,10%)] font-medium">
                  {order?.orderStatus}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[hsl(20,10%,88%)]">
                <span className="text-[hsl(20,10%,40%)]">Total Amount</span>
                <span className="text-[hsl(20,15%,10%)] font-semibold text-lg">
                  Rs. {order?.totalPrice?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[hsl(20,10%,40%)]">Payment</span>
                {order?.isPaid ? (
                  <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Paid Successfully
                  </span>
                ) : (
                  <span className="text-amber-600 font-medium">
                    Awaiting Confirmation...
                  </span>
                )}
              </div>
            </div>

            {order?.isPaid && (
              <div className="bg-[hsl(12,40%,92%)] rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[hsl(12,76%,55%)]" />
                  <div>
                    <p className="text-sm font-medium text-[hsl(20,15%,10%)]">
                      Redirecting to your orders in {countdown}s
                    </p>
                    <p className="text-xs text-[hsl(20,10%,40%)]">
                      You will receive an email confirmation shortly
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/my-orders")}
                className="flex-1 bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                View Orders
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/products")}
                className="flex-1 bg-transparent border border-[hsl(20,10%,88%)] hover:bg-[hsl(45,20%,93%)] text-[hsl(20,15%,10%)] py-3 rounded-lg font-medium transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
