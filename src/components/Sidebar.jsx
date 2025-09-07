import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUpload,
  FaChartBar,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState); // notify App.jsx
  };

  return (
    <div
      style={{
        width: isOpen ? "200px" : "60px",
        background: "#0d1b33", 
        color: "#fff",
        height: "100vh",
        transition: "width 0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Menu Icon */}
      <button
        onClick={toggleSidebar}
        style={{
          background: "#1a2a4f",
          border: "none",
          color: "white",
          fontSize: "20px",
          margin: "10px",
          cursor: "pointer",
          padding: "10px 15px", 
          borderRadius: "6px", 
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#14213d")}
        onMouseLeave={(e) => (e.target.style.background = "#1a2a4f")}
      >
        <FaBars />
      </button>

      {/* Links */}
      <div style={{ marginTop: "20px", flexGrow: 1 }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? "#14213d" : "transparent",
            color: isActive ? "#ffd700" : "white",
          })}
        >
          <FaChartBar /> {isOpen && "Dashboard"}
        </NavLink>

        <NavLink
          to="/upload"
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? "#14213d" : "transparent",
            color: isActive ? "#ffd700" : "white",
          })}
        >
          <FaUpload /> {isOpen && "Upload"}
        </NavLink>

        <NavLink
          to="/visualization"
          style={({ isActive }) => ({
            ...linkStyle,
            backgroundColor: isActive ? "#14213d" : "transparent",
            color: isActive ? "#ffd700" : "white",
          })}
        >
          <FaChartBar /> {isOpen && "Visualization"}
        </NavLink>
      </div>

     
    </div>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 15px",
  textDecoration: "none",
  color: "white",
  fontSize: "16px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
};

export default Sidebar;
