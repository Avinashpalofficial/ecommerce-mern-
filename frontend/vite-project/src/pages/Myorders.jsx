import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Myorders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  /* ================= FETCH ================= */

  const fetchOrders = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/orders/me`,
        { withCredentials: true }
      );

      setOrders(res.data.orders);

    } catch (error) {

      console.log(error);
      alert("Order not found");

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);


  /* ================= ANIMATIONS ================= */

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };


  /* ================= SKELETON ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[1,2,3,4,5,6].map((i) => (
            <div
              key={i}
              className="h-56 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))}

        </div>

      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-6"
    >

      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="
          max-w-6xl mx-auto mb-10
          bg-gradient-to-r
          from-indigo-600 via-purple-600 to-pink-600
          text-white
          p-8 rounded-3xl shadow-xl
          text-center
        "
      >

        <h1 className="text-3xl md:text-4xl font-bold">
          🛒 My Orders
        </h1>

        <p className="mt-2 text-gray-100">
          Track your purchases and delivery status
        </p>

      </motion.div>


      {/* ================= EMPTY ================= */}

      {orders.length === 0 ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-20"
        >
          <h2 className="text-xl font-semibold">
            😕 No Orders Yet
          </h2>

          <p className="mt-2">
            Start shopping to see your orders here
          </p>
        </motion.div>

      ) : (

        /* ================= ORDERS ================= */

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {orders.map((o) => (

            <motion.div
              key={o._id}
              variants={item}

              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}

              className="
                bg-white rounded-2xl
                shadow-lg p-5
                hover:shadow-2xl
                transition
                relative
              "
            >

              {/* ORDER ID */}
              <p className="text-xs text-gray-400">
                Order ID
              </p>

              <p className="font-mono text-xs break-all mb-3">
                {o._id}
              </p>


              {/* STATUS */}
              <div className="flex justify-between mb-2">

                <span className="font-semibold">
                  Status:
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    o.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : o.orderStatus === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {o.orderStatus}
                </span>

              </div>


              {/* STATUS BAR */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all ${
                    o.orderStatus === "Delivered"
                      ? "bg-green-500 w-full"
                      : o.orderStatus === "Shipped"
                      ? "bg-blue-500 w-2/3"
                      : "bg-yellow-500 w-1/3"
                  }`}
                />

              </div>


              {/* TOTAL */}
              <div className="flex justify-between mb-2">

                <span className="font-semibold">
                  Total:
                </span>

                <span className="text-indigo-600 font-bold">
                  ₹{o.totalPrice}
                </span>

              </div>


              {/* PAYMENT */}
              <div className="flex justify-between mb-4">

                <span className="font-semibold">
                  Paid:
                </span>

                <span
                  className={`font-bold ${
                    o.isPaid
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {o.isPaid ? "Yes" : "No"}
                </span>

              </div>


              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  w-full bg-gradient-to-r
                  from-indigo-600 to-purple-600
                  text-white py-2 rounded-xl
                  font-semibold shadow
                "
              >
                View Details
              </motion.button>

            </motion.div>

          ))}

        </motion.div>

      )}

    </motion.div>
  );
}
