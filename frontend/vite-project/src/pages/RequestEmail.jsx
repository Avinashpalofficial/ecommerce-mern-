import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StepIndicator from "../component/layout/StepIndicator";

export default function RequestEmailChange() {

  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const submit = async () => {

    if (!newEmail.trim()) {
      alert("Please enter your new email");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      alert("Please enter a valid email address");
      return;
    }


    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/email/change",
        { newEmail },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/verify-old-email");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
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
          <StepIndicator step={1} />
        </div>


        {/* ================= TITLE ================= */}

        <h2 className="text-2xl font-bold text-gray-800">
          Change Email Address
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-6">
          We’ll send verification codes to both emails
        </p>


        {/* ================= INPUT ================= */}

        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-600 mb-1">
            New Email Address
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="example@email.com"
            className="
              w-full px-4 py-2.5
              border border-gray-300
              rounded-xl
              focus:outline-none
              focus:ring-2 focus:ring-indigo-500
              transition
            "
          />

        </div>


        {/* ================= BUTTON ================= */}

        <motion.button

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}

          onClick={submit}
          disabled={loading}

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

          {loading ? "Sending..." : "Send OTPs"}

        </motion.button>

      </motion.div>

    </div>
  );
}
