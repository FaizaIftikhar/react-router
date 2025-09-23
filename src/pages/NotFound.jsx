// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <button onClick={() => navigate("/user")}>Back to Users</button>
    </div>
  );
}

export default NotFound;
