// src/Pages/ForgetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // reuse styles from Register/Home

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.email !== email) {
      setError("Email not found.");
      return;
    }

    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(fakeOtp);
    alert(`OTP sent to ${email} (mocked): ${fakeOtp}`);
    setStep(2);
    setError("");
  };

  const handleVerifyOtp = () => {
    if (otp !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }
    setStep(3);
    setError("");
  };

  const handleResetPassword = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (newPassword === user.password) {
      setError("You cannot reuse your previous password.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ ...user, password: newPassword }));
    alert("Password reset successful!");
    navigate("/");
  };

  return (
    <div className="cypherx-home">
      <h1 className="home-title">Reset Your Password</h1>

      {step === 1 && (
        <div className="input-container">
          <input
            className="input-field"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="primary-btn" onClick={handleSendOtp}>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <div className="input-container">
          <input
            className="input-field"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="primary-btn" onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === 3 && (
        <div className="input-container">
          <input
            className="input-field"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="primary-btn" onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
