// App.jsx
import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import LoginForm from "./pages/LoginForm";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
