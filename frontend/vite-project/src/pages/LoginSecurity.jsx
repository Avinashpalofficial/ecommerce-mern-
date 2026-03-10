import {
  ShieldCheck,
  Mail,
  Phone,
  Key,
  Lock,
  AlertTriangle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function LoginSecurity() {

  const { user } = useAuth();
console.log("USER DATA:", user);

  const fullName = user
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : "Not added";

  const email = user
    ? user.email
    : "Not added";


  return (

    /* ================= PAGE BACKGROUND ================= */

    <div
      className="
        min-h-screen py-12 px-4
        bg-gradient-to-br
        from-indigo-50 via-purple-50 to-pink-50
      "
    >


      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}

        className="
          max-w-3xl mx-auto mb-8
          bg-gradient-to-r
          from-indigo-600 via-purple-600 to-pink-600
          text-white
          p-7 rounded-3xl shadow-xl
        "
      >

        <h1 className="text-2xl md:text-3xl font-bold">
          Login & Security
        </h1>

        <p className="text-sm text-gray-100 mt-1">
          Manage your account security and login settings
        </p>

      </motion.div>


      {/* ================= MAIN CARD ================= */}

      <motion.div

        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}

        className="
          bg-white/80 backdrop-blur-xl shadow-2xl
          max-w-3xl mx-auto
          rounded-3xl
          border border-white/40
          overflow-hidden
        "
      >


        {/* ================= ITEMS ================= */}

        <SecurityItem
          icon={<ShieldCheck size={22} />}
          title="Name"
          value={fullName}
          action="Edit"
          link="/update-name"
        />

        <SecurityItem
          icon={<Mail size={22} />}
          title="Email"
          value={email}
          warning={!user?.emailVerified}
          action="Edit"
          link="/request-email-change"
        />

        <SecurityItem
          icon={<Phone size={22} />}
          title="Mobile Number"
          value={user?.phone || "Not added"}
          action="Edit"
        />

        <SecurityItem
          icon={<Key size={22} />}
          title="Passkey"
          value="Not set"
          action="Set up"
        />

        <SecurityItem
          icon={<Lock size={22} />}
          title="Password"
          value="••••••••"
          action="Change"
        />


        {/* ================= SECURITY ALERT ================= */}

        <motion.div
          whileHover={{ scale: 1.01 }}

          className="
            px-6 py-5 border-t
            bg-red-50
            flex justify-between items-center
            gap-4
          "
        >

          <div className="flex gap-3 items-start">

            <AlertTriangle className="text-red-500 mt-1" />

            <div>

              <p className="font-semibold text-red-700">
                Compromised account?
              </p>

              <p className="text-sm text-red-600">
                Sign out everywhere and reset credentials
              </p>

            </div>

          </div>


          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

            className="
              px-4 py-2
              border border-red-500
              text-red-600
              rounded-xl
              font-semibold
              hover:bg-red-100
              transition
            "
          >
            Start
          </motion.button>

        </motion.div>

      </motion.div>

    </div>
  );
}



/* ================= SECURITY ITEM ================= */

function SecurityItem({ icon, title, value, action, warning, link }) {

  const navigate = useNavigate();


  return (

    <motion.div

      whileHover={{ backgroundColor: "#f9fafb" }}

      className="
        flex items-center justify-between
        px-6 py-5
        border-b
        transition
      "
    >

      {/* LEFT */}
      <div className="flex gap-4 items-start">

        <div
          className="
            p-2 rounded-lg
            bg-indigo-50
            text-indigo-600
          "
        >
          {icon}
        </div>


        <div>

          <p className="font-medium text-gray-800">
            {title}
          </p>

          <p
            className={`text-sm mt-0.5 ${
              warning
                ? "text-yellow-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {value}
          </p>

        </div>

      </div>


      {/* RIGHT BUTTON */}
      <motion.button

        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}

        onClick={() => link && navigate(link)}

        className="
          px-4 py-1.5
          border border-gray-300
          rounded-lg
          text-sm font-medium
          hover:bg-gray-100
          transition
        "
      >

        {action}

      </motion.button>

    </motion.div>
  );
}
