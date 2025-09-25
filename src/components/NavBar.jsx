import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">

      <ul className="navbar-links">
        <li>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
         <li>
          <NavLink to="/SignUp" className="nav-link">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
