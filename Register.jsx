import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !agree) {
      alert("Fill all fields and accept terms.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Account created successfully!");
    navigate("/"); // Navigate to Home page ("/" is usually Home)
  };

  return (
    <div className="cypherx-home">
      <h1 className="home-title">Register to Cypher-X</h1>
      <form className="input-container" onSubmit={handleSignup}>
        <input
          className="input-field"
          type="email"
          placeholder="G-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          I agree to terms & policy
        </label>
        <button type="submit" className="primary-btn">Register</button>
      </form>
    </div>
  );
}
