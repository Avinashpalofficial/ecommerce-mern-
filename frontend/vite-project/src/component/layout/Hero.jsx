import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, Shield, RefreshCw, ArrowUpRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive text-lg">{error}</p>
      </div>
    );

  const featuredProducts = products.slice(0, 8);
  const categories = [
    { name: "New Arrivals", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" },
    { name: "Best Sellers", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600" },
    { name: "Collections", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600" },
  ];

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6"
              >
                Curated Collection 2026
              </motion.p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-[1.1] mb-8">
                Discover
                <span className="block">exquisite style</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Explore our carefully curated selection of premium products designed to elevate your everyday experience.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/allproduct")}
                  className="group bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 hover:bg-secondary/90 transition-colors"
                >
                  Shop Collection
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/about")}
                  className="px-8 py-4 rounded-full font-medium border border-border hover:bg-muted transition-colors inline-flex items-center gap-3"
                >
                  Our Story
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-border">
                {[
                  { icon: Truck, text: "Free Shipping" },
                  { icon: Shield, text: "Secure Payment" },
                  { icon: RefreshCw, text: "Easy Returns" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <item.icon size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
                  alt="Featured collection"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border"
              >
                <p className="text-sm text-muted-foreground mb-1">This Season</p>
                <p className="text-2xl font-serif font-semibold text-foreground">500+ Products</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-3">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">Find what you are looking for</p>
            </div>
            <button
              onClick={() => navigate("/allproduct")}
              className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
            >
              View All
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemAnim}
                whileHover={{ y: -8 }}
                onClick={() => navigate("/allproduct")}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked favorites from our collection
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((item) => (
              <motion.div
                key={item._id || item.id}
                variants={itemAnim}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/productdetail/${item._id || item.id}`)}
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-4 relative">
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                    <span className="bg-card text-foreground px-6 py-2.5 rounded-full font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                      Quick View
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < 4 ? "fill-primary text-primary" : "text-border"}
                    />
                  ))}
                </div>

                <h3 className="font-medium text-foreground mb-1 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-lg font-semibold text-foreground">
                  Rs. {item.price?.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <button
              onClick={() => navigate("/allproduct")}
              className="bg-secondary text-secondary-foreground px-10 py-4 rounded-full font-medium inline-flex items-center gap-3 hover:bg-secondary/90 transition-colors"
            >
              View All Products
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "50+", label: "Categories" },
              { number: "4.8", label: "Average Rating" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-serif font-semibold mb-2">
                  {stat.number}
                </p>
                <p className="text-secondary-foreground/70 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-8">
              &quot;The quality of products and attention to detail is exceptional. 
              Clover has become my go-to destination for premium shopping.&quot;
            </blockquote>

            <div>
              <p className="font-semibold text-foreground">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Verified Customer</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
