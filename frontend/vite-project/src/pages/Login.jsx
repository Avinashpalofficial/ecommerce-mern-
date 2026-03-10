import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
    const {login,loading} =useAuth()
    const [error,setError]= useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate()
  const handleSubmit=  async(e)=>{
     e.preventDefault()
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
  }
    
 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">


      {/* Card */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">


        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold">
            C
          </div>

        </div>


        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          CLOVER user
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to manage your store
        </p>


        {/* Error */}
        {error && (
          <p className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}


        <form onSubmit={handleSubmit} className="space-y-4">


          {/* Email */}
          <div className="relative">

            <FiMail className="absolute top-3.5 left-3 text-gray-400" />

            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          {/* Password */}
          <div className="relative">

            <FiLock className="absolute top-3.5 left-3 text-gray-400" />

            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>

          </div>


          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>
<p className="text-sm text-center text-gray-500 mt-4">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/signup")}
    className="text-indigo-600 font-semibold cursor-pointer hover:underline"
  >
    Sign Up
  </span>
</p>


        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © {new Date().getFullYear()} CLOVER Admin Panel
        </p>

      </div>

    </div>
  );
};

export default Login;
