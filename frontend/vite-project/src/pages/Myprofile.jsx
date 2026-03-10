import React from "react";
import {
  FaBox,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaWallet,
  FaCreditCard,
  FaShoppingBag,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProfileDashboard() {

  const navigate = useNavigate();


  /* ================= CARDS ================= */

  const cards = [
    {
      icon: <FaBox size={26} />,
      title: "Your Orders",
      text: "Track, return, or buy again",
      path: "/my-orders",
      color: "text-indigo-600",
    },
    {
      icon: <FaLock size={26} />,
      title: "Login & Security",
      text: "Edit login name, email & password",
      path: "/send-otp",
      color: "text-purple-600",
    },
    {
      icon: <FaMapMarkerAlt size={26} />,
      title: "Your Addresses",
      text: "Add or manage delivery addresses",
      path: "/address",
      color: "text-pink-600",
    },
    {
      icon: <FaShoppingBag size={26} />,
      title: "Business Account",
      text: "Manage invoices & settings",
      path: "/business-account",
      color: "text-blue-600",
    },
    {
      icon: <FaCreditCard size={26} />,
      title: "Payment Options",
      text: "Add or edit payment methods",
      path: "/payment-options",
      color: "text-green-600",
    },
    {
      icon: <FaWallet size={26} />,
      title: "Wallet / Balance",
      text: "Manage Clover wallet",
      path: "/clover-wallet",
      color: "text-yellow-600",
    },
    {
      icon: <FaPhone size={26} />,
      title: "Contact Support",
      text: "Chat or call support",
      path: "/clover-support",
      color: "text-red-500",
    },
  ];


  /* ================= ANIMATION ================= */

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };


  return (

    /* ================= BACKGROUND ================= */

    <div
      className="
        min-h-screen px-6 py-12
        bg-gradient-to-br
        from-indigo-50 via-purple-50 to-pink-50
      "
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
          p-7 rounded-3xl shadow-xl
        "
      >

        <h1 className="text-2xl md:text-3xl font-bold">
          Your Clover Account
        </h1>

        <p className="text-sm text-gray-100 mt-1">
          Manage your profile, security and settings
        </p>

      </motion.div>


      {/* ================= GRID ================= */}

      <motion.div

        variants={container}
        initial="hidden"
        animate="show"

        className="
          max-w-6xl mx-auto
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {cards.map((card, i) => (

          <motion.div
            key={i}
            variants={item}

            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}

            onClick={() => card.path && navigate(card.path)}

            className="
              cursor-pointer
              bg-white/80 backdrop-blur-xl
              border border-white/40
              rounded-2xl p-6
              shadow-lg hover:shadow-2xl
              transition
              group
            "
          >


            {/* ICON */}
            <div
              className={`
                w-12 h-12 rounded-xl
                bg-gray-100
                flex items-center justify-center
                mb-4
                group-hover:scale-110
                transition
                ${card.color}
              `}
            >
              {card.icon}
            </div>


            {/* TITLE */}
            <h2 className="font-semibold text-lg text-gray-800">
              {card.title}
            </h2>


            {/* TEXT */}
            <p className="text-gray-600 text-sm mt-1">
              {card.text}
            </p>


            {/* ARROW */}
            <div className="mt-4 text-indigo-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition">
              View →
            </div>

          </motion.div>

        ))}

      </motion.div>

    </div>
  );
}
