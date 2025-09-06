import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUpload, FaSearch, FaChartBar, FaBars } from "react-icons/fa";

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
        background: "#222",
        color: "#fff",
        height: "100vh",
        transition: "width 0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1001,
      }}
    >
      {/* Menu Icon */}
      <button
        onClick={toggleSidebar}
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "20px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        <FaBars />
      </button>

      {/* Links */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard" style={linkStyle}>
          <FaChartBar /> {isOpen && "Dashboard"}
        </Link>
        <Link to="/upload" style={linkStyle}>
          <FaUpload /> {isOpen && "Upload"}
        </Link>
        <Link to="/search" style={linkStyle}>
          <FaSearch /> {isOpen && "Search"}
        </Link>
        <Link to="/visualization" style={linkStyle}>
          <FaChartBar /> {isOpen && "Visualization"}
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  textDecoration: "none",
  color: "white",
  fontSize: "16px",
};

export default Sidebar;
