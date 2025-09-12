// Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUpload,
  FaTachometerAlt,
  FaBars,
  FaChartLine,
  FaRegFileAlt,
} from "react-icons/fa";
import "./Sidebar.css"; // Make sure file is named exactly Sidebar.css

function Sidebar({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState); // safeguard if prop is missing
  };

  return (
    <div
      style={{
        width: isOpen ? "200px" : "60px",
        background: "linear-gradient(180deg, #1a2a6c, #0d1b33)",
        color: "#fff",
        height: "100vh",
        transition: "width 0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2001,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          background: "#142850",
          border: "none",
          color: "white",
          fontSize: "20px",
          margin: "10px",
          cursor: "pointer",
          padding: "10px 15px",
          borderRadius: "6px",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1f4068")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#142850")}
      >
        <FaBars />
      </button>

      {/* Links */}
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `Sidebar-link ${isActive ? "active" : ""}`}
        >
          <FaTachometerAlt /> {isOpen && "Dashboard"}
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) => `Sidebar-link ${isActive ? "active" : ""}`}
        >
          <FaUpload /> {isOpen && "Upload"}
        </NavLink>

        <NavLink
          to="/visualization"
          className={({ isActive }) => `Sidebar-link ${isActive ? "active" : ""}`}
        >
          <FaChartLine /> {isOpen && "Visualization"}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => `Sidebar-link ${isActive ? "active" : ""}`}
        >
          <FaRegFileAlt /> {isOpen && "Reports"}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
