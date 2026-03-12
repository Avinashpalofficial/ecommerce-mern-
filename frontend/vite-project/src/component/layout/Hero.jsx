import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Star, Truck, Shield, Zap } from "lucide-react";

const Hero = () => {

  const navigate = useNavigate();
  const { products, loading, error } = useProducts();


  /* ================= ANIMATION VARIANTS ================= */

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };


  if (loading) {
    return (
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-96 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <h2 className="text-center mt-6 text-red-500">{error}</h2>
    );

  const featuredProducts = products.slice(0, 8);


  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg2djZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-sm font-medium">Top Rated Products</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Shop Premium
                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Quality Products
                </span>
              </h1>

              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                Discover amazing deals on thousands of products. From electronics to fashion, we have everything you need.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/allproduct")}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2"
                >
                  <ShoppingBag size={20} />
                  Shop Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/about")}
                  className="border-2 border-white/20 backdrop-blur-sm px-8 py-4 rounded-xl hover:bg-white/10 transition font-semibold"
                >
                  Learn More
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                {[
                  { icon: Truck, label: "Free Delivery", desc: "On orders over ₹500" },
                  { icon: Shield, label: "Secure Payment", desc: "100% protected" },
                  { icon: Zap, label: "Fast Shipping", desc: "Same day delivery" }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="text-center"
                  >
                    <feature.icon className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                    <h4 className="font-semibold text-sm mb-1">{feature.label}</h4>
                    <p className="text-xs text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                  alt="Shopping"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked collection of our best sellers
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((item) => (
              <motion.div
                key={item._id || item.id}
                variants={itemAnim}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/productdetail/${item._id || item.id}`)}
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Quick View
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{item.price?.toLocaleString()}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/50 transition-all"
                    >
                      <ShoppingBag size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/allproduct")}
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              View All Products
              <TrendingUp size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "50+", label: "Categories" },
              { number: "4.8", label: "Average Rating" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
