import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="success-page">
      <div className="success-card">
        <h2>Registration Successful</h2>
        <p>Your account has been created (mock API).</p>
        <button className="btn primary" onClick={() => navigate("/register")}>Register Another</button>
      </div>
    </div>
  );
}
