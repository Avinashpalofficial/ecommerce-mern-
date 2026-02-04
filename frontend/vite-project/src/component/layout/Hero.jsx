import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { motion } from "framer-motion";

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


  /* ================= SKELETON LOADER ================= */

  if (loading) {
    return (
      <div className="py-20 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-80 rounded-2xl"
          ></div>
        ))}

      </div>
    );
  }


  if (error)
    return (
      <h2 className="text-center mt-6 text-red-500">
        {error}
      </h2>
    );


  return (
    <>

      {/* ================= HERO ================= */}

      <section className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="flex-1 backdrop-blur-lg bg-white/10 p-8 rounded-3xl"
          >

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Discover the Best Products
              <span className="text-yellow-300">
                {" "}
                for Your Daily Needs
              </span>
            </h1>

            <p className="mt-4 text-lg text-gray-100">
              Clover Store me premium quality products milte hain best prices par.
              Fast delivery & trusted by thousands of customers.
            </p>


            <div className="mt-6 flex gap-4">

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow"
              >
                Shop Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition"
                onClick={() => navigate("/about")}
              >
                Learn More
              </motion.button>

            </div>

          </motion.div>


          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="flex-1 flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop"
              alt="Product Banner"
              className="rounded-3xl shadow-2xl w-full max-w-md"
            />
          </motion.div>

        </div>
      </section>


      {/* ================= PRODUCTS ================= */}

      <section className="py-16">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          Trending Products
        </motion.h2>


        {/* STAGGER CONTAINER */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >

          {products.map((item) => (

            <motion.div
              key={item._id || item.id}
              variants={itemAnim}

              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 120 }}

              className="group relative bg-white rounded-2xl shadow-md overflow-hidden"
            >

              {/* IMAGE */}
              <motion.img
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.4 }}
                src={item.images?.[0]?.url || item.images?.[1]?.url}
                alt={item.name}
                className="w-full h-52 object-cover"
              />


              {/* HOVER OVERLAY */}
              <div
                className="
                  absolute inset-0 bg-black/50 opacity-0
                  group-hover:opacity-100 transition
                  flex items-center justify-center
                "
              >
                <button
                  onClick={() =>
                    navigate(`/productdetail/${item._id || item.id}`)
                  }
                  className="bg-white px-5 py-2 rounded-lg font-semibold"
                >
                  Quick View
                </button>
              </div>


              {/* CONTENT */}
              <div className="p-5">

                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-700 mt-1">
                  ₹{item.price}
                </p>


                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg"
                  onClick={() =>
                    navigate(`/productdetail/${item._id || item.id}`)
                  }
                >
                  View Product
                </motion.button>

              </div>

            </motion.div>

          ))}

        </motion.div>

      </section>

    </>
  );
};

export default Hero;
