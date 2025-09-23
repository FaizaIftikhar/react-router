import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details Page</h2>
      <p>User ID: {id}</p>

      <button onClick={() => navigate("/user")}>Back to Users</button>
    </div>
  );
}

export default UserDetails;
