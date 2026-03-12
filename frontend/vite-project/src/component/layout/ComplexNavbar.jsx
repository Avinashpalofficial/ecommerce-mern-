import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search, Heart, ChevronDown } from "lucide-react";

export default function ComplexNavbar() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  if (loading) return null;

  const { cartItem = [] } = useCart();

  const cartCount = cartItem.reduce((total, item) => total + item.qty, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Clover
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium transition">
              Home
            </Link>
            <Link to="/allproduct" className="text-gray-700 hover:text-emerald-600 font-medium transition">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-600 font-medium transition">
              Contact
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <Search size={20} className="text-gray-600" />
            </button>

            {/* WISHLIST */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <Heart size={20} className="text-gray-600" />
            </button>

            {/* CART */}
            <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <ShoppingCart size={20} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.firstName?.[0] || "U"}
                  </div>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <Link to="/myprofile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition" onClick={() => setIsProfileOpen(false)}>
                      <User size={18} className="text-gray-600" />
                      <span className="text-gray-700">My Profile</span>
                    </Link>

                    <Link to="/my-orders" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition" onClick={() => setIsProfileOpen(false)}>
                      <ShoppingCart size={18} className="text-gray-600" />
                      <span className="text-gray-700">My Orders</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition text-red-600 border-t border-gray-100 mt-2"
                    >
                      <X size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
              >
                Login
              </button>
            )}

            {/* MOBILE MENU */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col gap-3">
              <Link to="/" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/allproduct" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <Link to="/about" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
