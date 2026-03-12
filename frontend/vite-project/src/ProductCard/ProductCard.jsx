import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  return (

    <motion.div

      // Same entry animation as Hero.jsx
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}

      // Same hover feel
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}

      className="
        group relative
        rounded-3xl
        overflow-hidden
        shadow-xl
        hover:shadow-2xl
        transition
        bg-white/90
        backdrop-blur-lg
      "
    >

      {/* ================= IMAGE (Like Hero Right Image) ================= */}
      <div className="relative h-56 overflow-hidden">

        {/* Hero Gradient Overlay */}
        <div
          className="
            absolute inset-0 z-10
            bg-gradient-to-r
            from-indigo-600/30
            via-purple-600/20
            to-pink-600/20
          "
        />

        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.4 }}
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover"
        />


        {/* Floating View Button (Hero Style) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            navigate(`/productdetail/${product._id || product.id}`)
          }
          className="
            absolute bottom-4 right-4 z-20
            bg-white text-indigo-600
            px-4 py-2 rounded-xl
            font-semibold
            shadow-lg
            hover:bg-indigo-50
          "
        >
          View
        </motion.button>

      </div>


      {/* ================= CONTENT (Glass Card Like Hero Text Box) ================= */}
      <div
        className="
          relative -mt-10 z-20
          mx-4 mb-4
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          p-5
          shadow-lg
        "
      >

        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-1 text-gray-800">
          {product.name}
        </h3>


        {/* Price */}
        <p className="text-indigo-600 font-bold text-xl mt-1">
          ₹{product.price}
        </p>


        {/* Sub Text */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          Premium quality product for daily use
        </p>


        {/* Button (Same Gradient as Hero Section) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            navigate(`/productdetail/${product._id || product.id}`)
          }
          className="
            w-full mt-4 py-2
            bg-gradient-to-r
            from-indigo-600
            via-purple-600
            to-pink-600
            text-white
            rounded-xl
            font-semibold
            shadow-md
            hover:opacity-90
          "
        >
          View Product
        </motion.button>

      </div>

    </motion.div>
  );
}
