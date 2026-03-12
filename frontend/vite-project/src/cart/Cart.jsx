import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Shield, RefreshCw, Truck } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../component/layout/Footer";

export default function Cart() {
  const { cartItem } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const totalItems = cartItem.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      {/* Header */}
      <section className="bg-[hsl(20,10%,15%)] py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(12,76%,55%)]/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-2">
            Your Cart
          </p>
          <h1 className="font-serif text-3xl font-semibold text-white">
            Shopping Cart
          </h1>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {cartItem.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-[hsl(12,40%,92%)] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-[hsl(12,76%,55%)]" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[hsl(20,15%,10%)] mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-[hsl(20,10%,40%)] mb-8">
              Looks like you {"haven't"} added anything to your cart yet
            </p>
            <button
              onClick={() => navigate("/allproduct")}
              className="inline-flex items-center gap-2 bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white px-8 py-3 rounded-lg font-medium transition-all"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-[hsl(20,10%,88%)] overflow-hidden"
              >
                <div className="p-6 border-b border-[hsl(20,10%,88%)]">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-[hsl(20,15%,10%)] text-lg">
                      Cart Items
                    </h2>
                    <span className="text-sm text-[hsl(20,10%,40%)]">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[hsl(20,10%,88%)]">
                  {cartItem.map((item, i) => (
                    <motion.div
                      key={item._id || item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-[hsl(20,10%,88%)] p-6 sticky top-24"
              >
                <h2 className="font-semibold text-[hsl(20,15%,10%)] text-lg mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(20,10%,40%)]">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium text-[hsl(20,15%,10%)]">
                      Rs. {totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(20,10%,40%)]">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(20,10%,40%)]">Tax</span>
                    <span className="text-[hsl(20,10%,40%)]">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-[hsl(20,10%,88%)] pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[hsl(20,15%,10%)]">Total</span>
                    <span className="font-semibold text-xl text-[hsl(20,15%,10%)]">
                      Rs. {totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/address")}
                  className="w-full bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full mt-3 bg-transparent border border-[hsl(20,10%,88%)] hover:bg-[hsl(45,20%,93%)] text-[hsl(20,15%,10%)] py-3 rounded-lg font-medium transition-all"
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-[hsl(20,10%,88%)]">
                  <div className="space-y-3">
                    {[
                      { icon: Shield, text: "Secure Checkout" },
                      { icon: RefreshCw, text: "Easy Returns" },
                      { icon: Truck, text: "Free Shipping" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-[hsl(20,10%,40%)]">
                        <item.icon className="w-4 h-4 text-[hsl(12,76%,55%)]" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
