// src/pages/Signup.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, role);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">Normal User</option>
        <option value="scientist">Scientist</option>
        <option value="researcher">Researcher</option>
        <option value="policymaker">Policymaker</option>
      </select>

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
