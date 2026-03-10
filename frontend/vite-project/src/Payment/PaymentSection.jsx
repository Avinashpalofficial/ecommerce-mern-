import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Truck } from "lucide-react";


export default function PaymentSection() {

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


  /* ================= FETCH ORDER ================= */

  const fetchOrder = async () => {

    if (!orderId) return;

    try {

      const res = await axios.get(
        `http://localhost:3000/api/v1/orders/${orderId}`,
        { withCredentials: true }
      );

      setOrder(res.data.order);

    } catch (error) {

      console.log(error);
      alert("Order not found");

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrder();
  }, [orderId]);


  /* ================= STRIPE ================= */

  const handleStripeCheckout = async () => {

    try {

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/create-checkout-session",
        { orderId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe session failed");
      }

    } catch (error) {

      console.log(error);
      alert("Payment failed");

    }
  };


  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-lg font-semibold animate-pulse">
          Loading order...
        </p>
      </div>
    );
  }


  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Order not found
      </div>
    );
  }


  const item = order.orderItems[0];


  return (

    /* ================= BACKGROUND ================= */

    <div
      className="
        min-h-screen py-12 px-4
        bg-gradient-to-br
        from-indigo-50 via-purple-50 to-pink-50
      "
    >


      {/* ================= MAIN CARD ================= */}

      <motion.div

        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}

        className="
          max-w-4xl mx-auto
          bg-white/80 backdrop-blur-xl
          rounded-3xl shadow-2xl
          border border-white/40
          overflow-hidden
        "
      >


        {/* ================= HEADER ================= */}

        <div
          className="
            bg-gradient-to-r
            from-indigo-600 via-purple-600 to-pink-600
            text-white
            p-6
          "
        >

          <h1 className="text-2xl font-bold">
            Secure Checkout
          </h1>

          <p className="text-sm text-gray-100 mt-1">
            Complete your purchase safely
          </p>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="p-6 grid md:grid-cols-2 gap-6">


          {/* LEFT : PRODUCT */}
          <div>

            <motion.img
              whileHover={{ scale: 1.05 }}
              src={
                item.image ||
                item.images?.[0]?.url ||
                "https://via.placeholder.com/600x400"
              }
              alt={item.name}
              className="w-full h-64 object-cover rounded-2xl shadow-md"
            />

            <h2 className="text-xl font-bold mt-4">
              {item.name}
            </h2>

            <p className="text-gray-500 mt-1">
              Quantity: {item.quantity || 1}
            </p>

          </div>


          {/* RIGHT : PAYMENT */}
          <div className="space-y-5">


            {/* PRICE */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">

              <div className="flex justify-between text-lg font-semibold">

                <span>Total Amount</span>

                <span className="text-indigo-600">
                  ₹{item.price?.toLocaleString("en-IN")}
                </span>

              </div>

            </div>


            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-3 text-center text-sm">

              <div className="bg-white rounded-xl p-3 shadow">

                <ShieldCheck className="mx-auto text-green-600" />

                <p className="mt-1 font-medium">
                  Secure
                </p>

              </div>


              <div className="bg-white rounded-xl p-3 shadow">

                <CreditCard className="mx-auto text-indigo-600" />

                <p className="mt-1 font-medium">
                  Stripe
                </p>

              </div>


              <div className="bg-white rounded-xl p-3 shadow">

                <Truck className="mx-auto text-purple-600" />

                <p className="mt-1 font-medium">
                  Fast Delivery
                </p>

              </div>

            </div>


            {/* BUTTON */}
            <motion.button

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

              onClick={handleStripeCheckout}

              className="
                w-full py-3
                bg-gradient-to-r
                from-indigo-600 to-purple-600
                text-white font-semibold
                rounded-xl
                shadow-md
                hover:opacity-90
                transition
              "
            >

              Pay Securely Now

            </motion.button>


            {/* INFO */}
            <p className="text-xs text-gray-400 text-center">

              🔒 Your payment is encrypted and processed by Stripe

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}
