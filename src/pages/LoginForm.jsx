import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginForm({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    message: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password) {
      setFormData((prev) => ({
        ...prev,
        message: "Please fill all the fields"
      }));
    } else {
      setIsLoggedIn(true); // ✅ mark as logged in
      navigate("/users", { state: { username: formData.email } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <h2>Login</h2>
      <label>Email:</label>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />
      <label>Password:</label>
      <input
        name="password"
        type={formData.showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        placeholder="password"
      />
      <div className="checkbox">
        <label>
          <input
            name="showPassword"
            type="checkbox"
            checked={formData.showPassword}
            onChange={handleChange}
          />{" "}
          Show password
        </label>
      </div>
      <div className="buttons">
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate("/login")}>
          Reset
        </button>
      </div>
      {formData.message && <p>{formData.message}</p>}
    </form>
  );
}
