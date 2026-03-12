import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/productdetail/${product._id || product.id}`)}
    >
      {/* Image Container */}
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-4 relative">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
          <span className="bg-card text-foreground px-6 py-2.5 rounded-full font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
            Quick View
          </span>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 w-11 h-11 bg-card text-foreground rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingBag size={18} />
        </motion.button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < 4 ? "fill-primary text-primary" : "text-border"}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
      </div>

      {/* Title */}
      <h3 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-lg font-semibold text-foreground">
        Rs. {product.price?.toLocaleString()}
      </p>
    </motion.div>
  );
}
