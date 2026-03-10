import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import StepIndicator from "../component/layout/StepIndicator";
import OtpInput from "../component/layout/OtpInput.jsx";

export default function VerifyOldEmail() {

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const verify = async () => {

    if (otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/email/verify-old`,
        { otp },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/verify-new-email");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Invalid OTP"
      );

    } finally {
      setLoading(false);
    }
  };


  return (

    /* ================= BACKGROUND ================= */

    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br
        from-indigo-50 via-purple-50 to-pink-50
      "
    >


      {/* ================= CARD ================= */}

      <motion.div

        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}

        className="
          w-full max-w-md
          bg-white/80 backdrop-blur-xl
          rounded-3xl shadow-2xl
          p-8
          border border-white/40
        "
      >


        {/* ================= STEP ================= */}

        <div className="mb-6">
          <StepIndicator step={2} />
        </div>


        {/* ================= TITLE ================= */}

        <h2 className="text-2xl font-bold text-gray-800">
          Verify Current Email
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>


        {/* ================= OTP ================= */}

        <div className="flex justify-center mb-6">
          <OtpInput onChange={setOtp} />
        </div>


        {/* ================= BUTTON ================= */}

        <motion.button

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}

          onClick={verify}
          disabled={otp.length !== 6 || loading}

          className="
            w-full py-2.5
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-semibold
            rounded-xl
            shadow-md
            hover:opacity-90
            disabled:opacity-60
            transition
          "
        >

          {loading ? "Verifying..." : "Verify & Continue"}

        </motion.button>

      </motion.div>

    </div>
  );
}
