import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Load";
import Error from "./Error";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="users-container">
      <h2>Users List</h2>
      <div className="user-cards">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="user-card"
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <small>{user.company.name}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;