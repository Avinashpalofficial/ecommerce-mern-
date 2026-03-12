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
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../component/layout/Footer";

export default function ProfileDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: FaBox,
      title: "Your Orders",
      text: "Track, return, or buy again",
      path: "/my-orders",
    },
    {
      icon: FaLock,
      title: "Login & Security",
      text: "Edit login name, email & password",
      path: "/send-otp",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Your Addresses",
      text: "Add or manage delivery addresses",
      path: "/address",
    },
    {
      icon: FaShoppingBag,
      title: "Business Account",
      text: "Manage invoices & settings",
      path: "/business-account",
    },
    {
      icon: FaCreditCard,
      title: "Payment Options",
      text: "Add or edit payment methods",
      path: "/payment-options",
    },
    {
      icon: FaWallet,
      title: "Wallet / Balance",
      text: "Manage Clover wallet",
      path: "/clover-wallet",
    },
    {
      icon: FaPhone,
      title: "Contact Support",
      text: "Chat or call support",
      path: "/clover-support",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      {/* Header Section */}
      <section className="bg-[hsl(20,10%,15%)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(12,76%,55%)]/10 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-6 relative z-10"
        >
          <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-3">
            My Account
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white">
            Account Settings
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your profile, security, and preferences
          </p>
        </motion.div>
      </section>

      {/* Cards Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12 -mt-8 relative z-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={item}
              onClick={() => card.path && navigate(card.path)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[hsl(20,10%,88%)] group"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-[hsl(12,40%,92%)] rounded-xl flex items-center justify-center mb-4">
                  <card.icon className="text-[hsl(12,76%,55%)]" size={22} />
                </div>
                <ChevronRight 
                  className="w-5 h-5 text-[hsl(20,10%,60%)] group-hover:text-[hsl(12,76%,55%)] group-hover:translate-x-1 transition-all" 
                />
              </div>

              <h3 className="font-semibold text-[hsl(20,15%,10%)] text-lg mb-1">
                {card.title}
              </h3>

              <p className="text-[hsl(20,10%,40%)] text-sm">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-[hsl(12,40%,92%)] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[hsl(20,15%,10%)] mb-2">
              Need Help?
            </h3>
            <p className="text-[hsl(20,10%,40%)]">
              Our support team is available 24/7 to assist you with any questions.
            </p>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white px-8 py-3 rounded-lg font-medium transition-all whitespace-nowrap"
          >
            Contact Support
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
