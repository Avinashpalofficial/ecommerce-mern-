import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function UpdateName() {

  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  const submitHandler = async () => {

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/user/update-name`,
        { name },
        { withCredentials: true }
      );

      if (res.data.success) {

        updateUser({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
        });

        navigate("/edit-profile");
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

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800">
          Update Name
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-6">
          This name will appear on your profile and orders
        </p>


        {/* INPUT */}
        <div className="mb-6">

          <label className="text-sm font-medium text-gray-600">
            Full Name
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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


        {/* BUTTONS */}
        <div className="flex gap-4">

          {/* CANCEL */}
          <motion.button

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

            onClick={() => navigate("/edit-profile")}

            className="
              w-1/2 py-2.5
              border border-gray-300
              rounded-xl
              font-semibold
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </motion.button>


          {/* SAVE */}
          <motion.button

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

            onClick={submitHandler}
            disabled={loading}

            className="
              w-1/2 py-2.5
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-white font-semibold
              rounded-xl
              shadow-md
              hover:opacity-90
              disabled:opacity-60
              transition
            "
          >
            {loading ? "Saving..." : "Save"}
          </motion.button>

        </div>

      </motion.div>

    </div>
  );
}
