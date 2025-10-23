import React, { useState } from "react";
import "./CreateUser.css";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create user");

      const data = await response.json();
      console.log("User created:", data);

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "" }); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <h2>Add New User</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {success && <p className="success">User created successfully!</p>}
      {error && <p className="error"> {error}</p>}
    </div>
  );
};

export default CreateUser;
