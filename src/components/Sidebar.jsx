import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUpload, FaChartBar, FaBars, FaSignOutAlt } from "react-icons/fa";

function Sidebar({ onToggle, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  return (
    <div
      style={{
        width: isOpen ? "200px" : "60px",
        background: "linear-gradient(180deg, #1a2a6c, #0d1b33)", // blue gradient
        color: "#fff",
        height: "100vh",
        transition: "width 0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 👈 pushes footer to bottom
      }}
    >
      {/* Top: Toggle + Nav */}
      <div>
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
          onMouseEnter={(e) => (e.target.style.background = "#1f4068")}
          onMouseLeave={(e) => (e.target.style.background = "#142850")}
        >
          <FaBars />
        </button>

        <div style={{ marginTop: "20px" }}>
          <NavLink to="/dashboard" style={navStyle(isOpen)}>
            <FaChartBar /> {isOpen && "Dashboard"}
          </NavLink>
          <NavLink to="/upload" style={navStyle(isOpen)}>
            <FaUpload /> {isOpen && "Upload"}
          </NavLink>
          <NavLink to="/visualization" style={navStyle(isOpen)}>
            <FaChartBar /> {isOpen && "Visualization"}
          </NavLink>
        </div>
      </div>

      {/* Bottom: Footer & Logout */}
      <div style={{ padding: "10px" }}>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            ...navStyle(isOpen),
            width: "100%",
            background: "transparent",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >

        </button>

        {/* Footer Text */}
        <div
          style={{
            fontSize: isOpen ? "12px" : "10px",
            color: "#bbb",
            textAlign: isOpen ? "center" : "left",
          }}
        >
        
        </div>
      </div>
    </div>
  );
}

const navStyle = (isOpen) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 15px",
  textDecoration: "none",
  color: "white",
  fontSize: "16px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  backgroundColor: "transparent",
  cursor: "pointer",
});

export default Sidebar;

