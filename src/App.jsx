import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import LoginForm from "./pages/LoginForm";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails"; 
import NotFound from "./pages/NotFound"; 
import ProtectedRoute from "./pages/ProtectedRoute";
import SignupForm from "./pages/SignUp";
import "./App.css"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/login"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      <Route
          path="/SignUp"
          element={<SignupForm/>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
