import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ sidebarOpen }) {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
        borderBottom: "1px solid #0f172a",
        position: "fixed",
        top: 0,
        left: sidebarOpen ? "200px" : "60px", // ✅ shift with sidebar
        width: `calc(100% - ${sidebarOpen ? "200px" : "60px"})`, // ✅ shrink
        zIndex: 1000,
        transition: "all 0.3s",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div>
        <h1
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          HMPI Dashboard
        </h1>
      </div>

      <div>
        {!user ? (
          <>
            <Link to="/signup" style={linkStyle}>
              Signup
            </Link>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </>
        ) : (
          <button onClick={logout} style={btnStyle}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  marginLeft: "20px",
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
};

const btnStyle = {
  marginLeft: "20px",
  background: "transparent",
  border: "1px solid white",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  padding: "6px 16px",
  borderRadius: "8px",
};

export default Navbar;
