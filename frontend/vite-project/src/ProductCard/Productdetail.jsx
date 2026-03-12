import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, Star, Truck, Shield, RefreshCw, Minus, Plus, Package } from "lucide-react";
import Footer from "../component/layout/Footer";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p._id === id || p.id?.toString() === id
  );

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [loadingPay, setLoadingPay] = useState(false);
  const [showShipping, setShowShipping] = useState(false);

  const [user, setUser] = useState({
    name: "",
    phoneNo: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(45,30%,97%)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[hsl(12,76%,55%)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[hsl(45,30%,97%)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[hsl(12,40%,92%)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-[hsl(12,76%,55%)]" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[hsl(20,15%,10%)] mb-3">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/allproduct")}
            className="bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) =>
    setUser((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
  };

  const handlePayment = async () => {
    if (!user.name || !user.phoneNo || !user.address) {
      setShowShipping(true);
      return;
    }

    try {
      setLoadingPay(true);

      const order = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/orders/new`,
        {
          orderItems: [
            {
              name: product.name,
              quantity: qty,
              image: product.images?.[0]?.url,
              price: product.price,
              product: product._id,
            },
          ],
          shippingInfo: user,
        },
        { withCredentials: true }
      );

      navigate(`/payment/${order.data.message._id}`);
    } catch (err) {
      alert("Order failed. Please try again.");
    } finally {
      setLoadingPay(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[hsl(20,10%,40%)] hover:text-[hsl(20,15%,10%)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[hsl(20,10%,88%)] mb-4">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images?.[activeImg]?.url || product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 justify-center">
                {product.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i
                        ? "border-[hsl(12,76%,55%)] ring-2 ring-[hsl(12,76%,55%)]/20"
                        : "border-[hsl(20,10%,88%)] hover:border-[hsl(20,10%,60%)]"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title & Price */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[hsl(20,15%,10%)] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < 4 ? "fill-[hsl(12,76%,55%)] text-[hsl(12,76%,55%)]" : "text-[hsl(20,10%,88%)]"}
                    />
                  ))}
                </div>
                <span className="text-sm text-[hsl(20,10%,40%)]">(4.0) 128 reviews</span>
              </div>

              <p className="text-3xl font-semibold text-[hsl(12,76%,55%)]">
                Rs. {product.price?.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-[hsl(20,10%,40%)] leading-relaxed">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-[hsl(20,15%,10%)]">Quantity:</span>
              <div className="flex items-center gap-1 border border-[hsl(20,10%,88%)] rounded-lg">
                <button
                  onClick={() => setQty((p) => Math.max(1, p - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[hsl(45,20%,93%)] rounded-l-lg transition-colors"
                >
                  <Minus className="w-4 h-4 text-[hsl(20,10%,40%)]" />
                </button>
                <span className="w-12 text-center font-medium text-[hsl(20,15%,10%)]">{qty}</span>
                <button
                  onClick={() => setQty((p) => p + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[hsl(45,20%,93%)] rounded-r-lg transition-colors"
                >
                  <Plus className="w-4 h-4 text-[hsl(20,10%,40%)]" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-[hsl(20,10%,15%)] text-[hsl(20,15%,10%)] py-4 rounded-lg font-medium hover:bg-[hsl(45,20%,93%)] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowShipping(true)}
                disabled={loadingPay}
                className="flex-1 bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white py-4 rounded-lg font-medium transition-colors disabled:opacity-60"
              >
                {loadingPay ? "Processing..." : "Buy Now"}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[hsl(20,10%,88%)]">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Shield, text: "Secure Payment" },
                { icon: RefreshCw, text: "Easy Returns" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <item.icon className="w-6 h-6 text-[hsl(12,76%,55%)] mx-auto mb-2" />
                  <p className="text-xs text-[hsl(20,10%,40%)]">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Product Details */}
            {product.description && (
              <div className="pt-6 border-t border-[hsl(20,10%,88%)]">
                <h3 className="font-semibold text-[hsl(20,15%,10%)] mb-3">Product Details</h3>
                <p className="text-[hsl(20,10%,40%)] leading-relaxed">{product.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Shipping Modal */}
      {showShipping && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-[hsl(20,15%,10%)]">
                Shipping Details
              </h2>
              <button
                onClick={() => setShowShipping(false)}
                className="p-2 hover:bg-[hsl(45,20%,93%)] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phoneNo"
                    value={user.phoneNo}
                    onChange={handleChange}
                    className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] transition-all resize-none"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                    City
                  </label>
                  <input
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] transition-all"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                    Postal Code
                  </label>
                  <input
                    name="postalCode"
                    value={user.postalCode}
                    onChange={handleChange}
                    className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] transition-all"
                    placeholder="400001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                    Country
                  </label>
                  <input
                    name="country"
                    value={user.country}
                    onChange={handleChange}
                    className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] transition-all"
                    placeholder="India"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-[hsl(45,20%,93%)] rounded-xl p-4 mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[hsl(20,10%,40%)]">Product</span>
                  <span className="font-medium text-[hsl(20,15%,10%)]">{product.name}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[hsl(20,10%,40%)]">Quantity</span>
                  <span className="font-medium text-[hsl(20,15%,10%)]">{qty}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[hsl(20,10%,88%)]">
                  <span className="font-semibold text-[hsl(20,15%,10%)]">Total</span>
                  <span className="font-semibold text-[hsl(12,76%,55%)] text-lg">
                    Rs. {(product.price * qty).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loadingPay}
                className="w-full bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white py-4 rounded-lg font-medium transition-colors disabled:opacity-60 mt-4"
              >
                {loadingPay ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
