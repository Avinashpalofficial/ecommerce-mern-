import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SendOtp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/email/send-otp",
        { email }
      );
      if (res.data.success) {
        navigate("/verify-otp", { state: { email } });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Verify Your Email
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          We’ll send a one-time password to your email
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mt-5 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          onClick={sendOtp}
          className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-lg transition duration-200"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
