import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !agree) {
      alert("Please complete all fields and accept the terms.");
      return;
    }

    const newUser = { email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Account created and logged in successfully!");
    navigate("/chat");
  };

  return (
    <div className="cypherx-home">
  <h1 className="home-title">
    Welcome to <strong><span className="highlight">CypherX</span></strong> by CyRushMF69
  </h1>
  <p className="home-description">
    Login or Sign Up to explore next-gen AI.
  </p>


      {!showLogin && (
        <button className="primary-btn" onClick={() => setShowLogin(true)}>Login</button>
      )}

      {showLogin && (
        <form className="modal-form" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
	   style={{ marginBottom: "16px" }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            I agree to the <a href="/privacy-policy" className="link" target="_blank">Privacy Policy</a> and <a href="/terms-of-service" className="link" target="_blank">Terms of Service</a>
          </label>

          <button type="submit" className="primary-btn">Log In</button>
        </form>
      )}

      <p className="sign-up-text">
        Don’t have an account? <Link to="/forget-password">Forgot Password?</Link>
      </p>
    </div>
  );
}
