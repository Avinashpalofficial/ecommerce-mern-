import React from "react";
import { FaBox, FaLock, FaMapMarkerAlt, FaPhone, FaWallet, FaCreditCard, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfileDashboard() {
  const navigate = useNavigate()
  const cards = [
    {
      icon: <FaBox size={28} />,
      title: "Your Orders",
      text: "Track, return, or buy again",
      path:'/my-orders'
    },
    {
      icon: <FaLock size={28} />,
      title: "Login & Security",
      text: "Edit login name, email & password",
      path: '/send-otp'
    },
    {
      icon: <FaMapMarkerAlt size={28} />,
      title: "Your Addresses",
      text: "Add or manage delivery addresses",
    },
    {
      icon: <FaShoppingBag size={28} />,
      title: "Clover Business Account",
      text: "Manage business settings & invoices",
    },
    {
      icon: <FaCreditCard size={28} />,
      title: "Payment Options",
      text: "Add or edit payment methods",
    },
    {
      icon: <FaWallet size={28} />,
      title: "Wallet / Balance",
      text: "Add money to your Clover wallet",
    },
    {
      icon: <FaPhone size={28} />,
      title: "Contact Support",
      text: "Chat or call customer support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-semibold mb  -6">Your Clover Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={()=>card.path && navigate(card.path)}
            className="border rounded-lg p-5 bg-white hover:shadow-md transition cursor-pointer"
          >
            <div className="text-green-600">{card.icon}</div>

            <h2 className="font-semibold text-lg mt-3">{card.title}</h2>

            <p className="text-gray-600 text-sm mt-1">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
