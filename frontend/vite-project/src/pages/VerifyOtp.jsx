import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Email SendOtp se aa raha hai
  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/email/verify-otp",
        { email, otp }
      );

      if (res.data.success) {
        navigate("/edit-profile");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the OTP sent to your email
        </p>

        {/* EMAIL (READ ONLY) */}
        <input
          value={email}
          readOnly
          className="mt-5 w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
        />

        {/* OTP */}
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-3 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={verifyOtp}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
