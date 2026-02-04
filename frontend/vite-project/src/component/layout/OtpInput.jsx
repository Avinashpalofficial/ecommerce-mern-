import { useState } from "react";

const OtpInput = ({ onChange }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    onChange(value);
  };

  return (
    <input
      type="text"
      value={otp}
      onChange={handleChange}
      placeholder="Enter 6-digit OTP"
      style={{ fontSize: 18, padding: 10, letterSpacing: 4 }}
    />
  );
};

export default OtpInput;
