import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, Search, Heart, ChevronDown, Package, LogOut } from "lucide-react";

export default function ComplexNavbar() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

  const { cartItem = [] } = useCart();
  const cartCount = cartItem.reduce((total, item) => total + item.qty, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/allproduct" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-3xl font-serif font-bold text-foreground tracking-tight">
              Clover
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-muted-foreground hover:text-foreground font-medium text-sm uppercase tracking-wider transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="hidden md:flex items-center justify-center w-11 h-11 rounded-full hover:bg-muted transition-colors">
              <Search size={20} className="text-foreground" />
            </button>

            {/* Wishlist */}
            <button className="hidden md:flex items-center justify-center w-11 h-11 rounded-full hover:bg-muted transition-colors">
              <Heart size={20} className="text-foreground" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-muted transition-colors"
            >
              <ShoppingBag size={20} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:bg-muted px-3 py-2 rounded-full transition-colors ml-2"
                >
                  <div className="w-9 h-9 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform hidden sm:block ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-64 bg-card rounded-2xl shadow-xl border border-border py-2 z-50"
                    >
                      <div className="px-5 py-4 border-b border-border">
                        <p className="font-semibold text-foreground">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          to="/myprofile"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-muted transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User size={18} className="text-muted-foreground" />
                          <span className="text-foreground">My Profile</span>
                        </Link>

                        <Link
                          to="/my-orders"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-muted transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Package size={18} className="text-muted-foreground" />
                          <span className="text-foreground">My Orders</span>
                        </Link>
                      </div>

                      <div className="border-t border-border pt-2">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 hover:bg-destructive/10 transition-colors text-destructive"
                        >
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="ml-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-full font-medium text-sm hover:bg-secondary/90 transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-muted transition-colors ml-1"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
