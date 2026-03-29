import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, Shield, RefreshCw, ArrowUpRight, Play, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  
  // Ref for smooth scrolling
  const productsRef = useRef(null);
  const categoriesRef = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

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

  const featuredProducts = products?.slice(0, 8)||[];
  const categories = [
    { name: "New Arrivals", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600", count: "120+ Items" },
    { name: "Best Sellers", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600", count: "80+ Items" },
    { name: "Collections", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600", count: "250+ Items" },
  ];

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                New Collection 2026
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-[1.1] mb-8">
                Elevate your
                <span className="block text-primary">lifestyle aesthetic</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Experience the perfect blend of craftsmanship and modern design. Our curated pieces are selected for those who appreciate the finer things.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(productsRef)}
                  className="group bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  Shop Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/about")}
                  className="px-8 py-4 rounded-full font-medium border border-border hover:bg-muted transition-colors inline-flex items-center gap-3"
                >
                  Explore Story
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-border">
                {[
                  { icon: Truck, text: "Free Delivery" },
                  { icon: Shield, text: "Secure Checkout" },
                  { icon: RefreshCw, text: "Money Back" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <item.icon size={18} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
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
              <div className="relative z-10 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
                  alt="Featured collection"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-12 -right-12 bg-card p-4 rounded-2xl shadow-xl border border-border z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="text-green-500" size={24} />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Quality Check</p>
                    <p className="text-sm font-semibold">100% Guaranteed</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border z-20"
              >
                <div className="flex items-center gap-4 mb-2">
                    <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-muted overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-medium">Joined by 2k+ others</p>
                </div>
                <p className="text-2xl font-serif font-semibold text-foreground">500+ Luxury Items</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16"
          >
            <div className="max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore our diverse range of premium products tailored for every occasion and style.
              </p>
            </div>
            <button
              onClick={() => scrollToSection(productsRef)}
              className="group text-sm uppercase tracking-widest font-bold text-primary flex items-center gap-2"
            >
              Browse All
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemAnim}
                whileHover={{ y: -10 }}
                className="group cursor-pointer relative"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted mb-6 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-foreground mb-1">
                        {category.name}
                        </h3>
                        <p className="text-muted-foreground text-sm font-medium">{category.count}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowRight size={20} />
                    </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" ref={productsRef} className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-4">Our Favorites</span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
              Featured Products
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {featuredProducts.map((item) => (
              <motion.div
                key={item._id || item.id}
                variants={itemAnim}
                className="group cursor-pointer"
                onClick={() => navigate(`/productdetail/${item._id || item.id}`)}
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-5 relative shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <img
                    src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                     <button className="w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:text-primary transition-colors">
                        <Star size={18} />
                     </button>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-full bg-foreground text-background py-3 rounded-xl font-semibold text-sm shadow-xl backdrop-blur-md">
                      Quick View
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">In Stock</p>
                        <div className="flex items-center gap-1">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-foreground">4.9</span>
                        </div>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {item.name}
                    </h3>
                    <p className="text-xl font-bold text-foreground">
                    Rs. {item.price?.toLocaleString()}
                    </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* New Arrivals Banner Inside Landing Page */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 relative rounded-[3rem] overflow-hidden bg-primary p-12 lg:p-24 text-primary-foreground text-center"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8 italic">
                    Upgrade your style with up to 30% off
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                    Join our member club and get early access to new drops, limited editions, and seasonal sales.
                </p>
                <button className="bg-background text-foreground px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                    Unlock Discount
                </button>
            </div>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 border-[40px] border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 border-[60px] border-white rounded-full translate-x-1/4 translate-y-1/4" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "24/7", label: "Expert Support" },
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
                <p className="text-4xl lg:text-6xl font-serif font-bold mb-4 text-primary">
                  {stat.number}
                </p>
                <p className="text-background/60 text-xs uppercase font-bold tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-muted/20 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-2 mb-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="text-3xl lg:text-4xl font-serif text-foreground leading-snug mb-12 italic">
              &quot;The quality of products and attention to detail is exceptional. 
              Clover has become my go-to destination for premium shopping. I couldn't be happier with my latest purchase.&quot;
            </blockquote>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" />
              </div>
              <p className="font-bold text-foreground text-lg">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Verified Collector</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
              Stay in the loop
            </h2>
            <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive offers, styling tips and new product announcements.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-8 py-5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold hover:shadow-lg hover:shadow-primary/20 transition-all whitespace-nowrap"
              >
                Join Now
              </button>
            </form>
            <p className="text-[10px] text-muted-foreground mt-6 uppercase tracking-widest font-medium">
                By subscribing, you agree to our privacy policy.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Hero;