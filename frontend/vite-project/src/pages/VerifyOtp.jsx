import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function VerifyOtp() {

  const location = useLocation();
  const navigate = useNavigate();

  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);


  const verifyOtp = async () => {

    if (!otp || otp.length < 4) {
      alert("Please enter valid OTP");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/email/verify-otp`,
        { email, otp }
      );

      if (res.data.success) {
        navigate("/edit-profile");
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

    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br
        from-indigo-100 via-purple-100 to-pink-100
        px-4
      "
    >

      {/* MAIN CARD */}
      <motion.div

        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}

        className="
          w-full max-w-md
          bg-white/80 backdrop-blur-xl
          p-8 rounded-3xl shadow-2xl
          border border-white/40
        "
      >

        {/* ICON */}
        <div className="flex justify-center mb-4">

          <div
            className="
              w-14 h-14 rounded-full
              bg-gradient-to-r from-indigo-600 to-purple-600
              flex items-center justify-center
              text-white text-2xl
              shadow-lg
            "
          >
            🔐
          </div>

        </div>


        {/* HEADING */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the code sent to your email
        </p>


        {/* EMAIL */}
        <div className="mt-5">

          <label className="text-sm font-medium text-gray-600">
            Email
          </label>

          <input
            value={email}
            readOnly
            className="
              mt-1 w-full px-4 py-2.5
              border border-gray-300
              rounded-xl
              bg-gray-100 text-gray-600
              cursor-not-allowed
            "
          />

        </div>


        {/* OTP INPUT */}
        <div className="mt-4">

          <label className="text-sm font-medium text-gray-600">
            OTP Code
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            className="
              mt-1 w-full px-4 py-2.5
              text-center tracking-widest
              font-semibold text-lg
              border border-gray-300
              rounded-xl
              focus:outline-none
              focus:ring-2 focus:ring-indigo-500
              transition
            "
          />

        </div>


        {/* BUTTON */}
        <motion.button

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}

          onClick={verifyOtp}
          disabled={loading}

          className="
            mt-6 w-full py-2.5
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-semibold
            rounded-xl
            shadow-md
            hover:opacity-90
            disabled:opacity-60
            transition
          "
        >

          {loading ? "Verifying..." : "Verify OTP"}

        </motion.button>


        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-5">

          Didn’t receive OTP? Try resending

        </p>

      </motion.div>

    </div>
  );
}
