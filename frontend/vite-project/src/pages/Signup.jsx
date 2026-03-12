import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/user/register`,
        formData
      );

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[hsl(45,30%,97%)]">
        <div className="w-full max-w-md">
          {/* Logo - Mobile */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="font-serif text-3xl font-semibold text-[hsl(20,15%,10%)]">
              CLOVER
            </h2>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-semibold text-[hsl(20,15%,10%)] mb-2">
              Create Account
            </h2>
            <p className="text-[hsl(20,10%,40%)]">
              Join CLOVER and start your shopping journey
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-[hsl(20,10%,40%)]" size={18} />
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white border border-[hsl(20,10%,88%)] rounded-lg pl-12 pr-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-[hsl(20,10%,40%)]" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-[hsl(20,10%,88%)] rounded-lg pl-12 pr-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute top-1/2 -translate-y-1/2 left-4 text-[hsl(20,10%,40%)]" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white border border-[hsl(20,10%,88%)] rounded-lg pl-12 pr-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white py-3.5 rounded-lg font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[hsl(20,10%,88%)]" />
            <span className="text-sm text-[hsl(20,10%,40%)]">or</span>
            <div className="flex-1 h-px bg-[hsl(20,10%,88%)]" />
          </div>

          {/* Login Link */}
          <p className="text-center text-[hsl(20,10%,40%)]">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[hsl(12,76%,55%)] font-semibold hover:text-[hsl(12,76%,45%)] transition-colors"
            >
              Sign In
            </button>
          </p>

          {/* Footer */}
          <p className="text-xs text-center text-[hsl(20,10%,60%)] mt-8">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>

          <ToastContainer />
        </div>
      </div>

      {/* Right Section - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[hsl(20,10%,15%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[hsl(12,76%,55%)]/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="font-serif text-5xl font-semibold mb-6 leading-tight">
            Start your journey<br />
            with <span className="text-[hsl(12,76%,55%)]">CLOVER</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-md">
            Create an account to unlock exclusive offers, personalized recommendations, and seamless shopping experience.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-4">
            {[
              "Free shipping on first order",
              "Exclusive member-only deals",
              "Easy returns & exchanges",
              "Personalized recommendations"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[hsl(12,76%,55%)] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] border border-white/5 rounded-full" />
      </div>
    </div>
  );
};

export default Signup;
