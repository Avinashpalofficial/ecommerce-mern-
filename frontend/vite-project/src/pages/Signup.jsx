import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
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

      toast.error(
        error.response?.data?.message || "Signup failed"
      );

    } finally {
      setLoading(false);
    }
  };


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
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Join CLOVER and start your journey
        </p>


        <form onSubmit={submitHandler} className="space-y-4">


          {/* Username */}
          <div className="relative">

            <FiUser className="absolute top-3.5 left-3 text-gray-400" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

          </div>


          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />


          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />


          {/* Email */}
          <div className="relative">

            <FiMail className="absolute top-3.5 left-3 text-gray-400" />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

          </div>


          {/* Password */}
          <div className="relative">

            <FiLock className="absolute top-3.5 left-3 text-gray-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

          </div>


          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>


        {/* Login Link */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>


        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © {new Date().getFullYear()} CLOVER Admin Panel
        </p>


        <ToastContainer />

      </div>

    </div>
  );
};

export default Signup;
