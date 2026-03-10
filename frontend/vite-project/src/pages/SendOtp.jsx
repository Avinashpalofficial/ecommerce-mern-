import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SendOtp() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const sendOtp = async () => {

    if (!email) {
      alert("Please enter email");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/email/send-otp",
        { email }
      );

      if (res.data.success) {
        navigate("/verify-otp", { state: { email } });
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
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
            ✉️
          </div>

        </div>


        {/* HEADING */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify Your Email
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          We’ll send a one-time password to your email
        </p>


        {/* INPUT */}
        <div className="mt-6">

          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="
              mt-1 w-full px-4 py-2.5
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

          onClick={sendOtp}
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

          {loading ? "Sending..." : "Send OTP"}

        </motion.button>


        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-5">

          Didn’t receive OTP? Check spam folder

        </p>

      </motion.div>

    </div>
  );
}
