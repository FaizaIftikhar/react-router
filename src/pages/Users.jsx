import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Load";
import Error from "./Error";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Loading message="Fetching users..." />;
  if (error) return <Error message={error} />;

  return (
    <div className="users-container">
      <h2>User List</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.company?.name}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
