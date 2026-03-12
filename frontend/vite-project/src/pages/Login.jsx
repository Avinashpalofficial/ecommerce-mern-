import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { login, loading } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all required fields");
      return;
    }
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[hsl(20,10%,15%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(12,76%,55%)]/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="font-serif text-5xl font-semibold mb-6 leading-tight">
            Welcome back to<br />
            <span className="text-[hsl(12,76%,55%)]">CLOVER</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-md">
            Sign in to access your account, track orders, and discover curated collections just for you.
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-serif font-semibold text-[hsl(12,76%,55%)]">50K+</p>
              <p className="text-sm text-gray-400 mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-semibold text-[hsl(12,76%,55%)]">2K+</p>
              <p className="text-sm text-gray-400 mt-1">Products</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-semibold text-[hsl(12,76%,55%)]">99%</p>
              <p className="text-sm text-gray-400 mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] border border-white/5 rounded-full" />
      </div>

      {/* Right Section - Form */}
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
              Sign In
            </h2>
            <p className="text-[hsl(20,10%,40%)]">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-[hsl(20,10%,40%)]" size={18} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white border border-[hsl(20,10%,88%)] rounded-lg pl-12 pr-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-[hsl(20,10%,88%)] rounded-lg pl-12 pr-12 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(20,10%,40%)] hover:text-[hsl(20,15%,10%)] transition-colors"
                >
                  {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[hsl(12,76%,55%)] hover:text-[hsl(12,76%,45%)] font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white py-3.5 rounded-lg font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[hsl(20,10%,88%)]" />
            <span className="text-sm text-[hsl(20,10%,40%)]">or</span>
            <div className="flex-1 h-px bg-[hsl(20,10%,88%)]" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[hsl(20,10%,40%)]">
            {"Don't have an account? "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[hsl(12,76%,55%)] font-semibold hover:text-[hsl(12,76%,45%)] transition-colors"
            >
              Create Account
            </button>
          </p>

          {/* Footer */}
          <p className="text-xs text-center text-[hsl(20,10%,60%)] mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
