import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN FOOTER */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ABOUT */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold text-white">Clover</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for premium quality products at unbeatable prices. Fast delivery and trusted service.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition">About Us</Link>
              </li>
              <li>
                <Link to="/allproduct" className="hover:text-emerald-400 transition">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition">Contact</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-400 transition">Blog</Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Track Order</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Shipping Info</a>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Clover Street, Mumbai, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">support@clover.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {currentYear} Clover. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
