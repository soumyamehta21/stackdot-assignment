import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username === "soumya.mehta" && userPassword === "soumya123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.assign("/admin/dashboard");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <form onSubmit={handleFormSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername((prev) => e.target?.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword((prev) => e.target?.value);
          }}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
