// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Visualization from "./pages/Visualization";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {/* Navbar shifts with sidebar */}
          <Navbar sidebarOpen={sidebarOpen} />

          <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <Sidebar onToggle={setSidebarOpen} />

            {/* Main Content */}
            <div
              className="page-content" // ✅ added class
              style={{
                flex: 1,
                marginLeft: sidebarOpen ? "200px" : "60px", // ✅ shifts with sidebar
                marginTop: "70px", // ✅ pushes below fixed navbar
                transition: "margin-left 0.3s, margin-top 0.3s",
                padding: "20px",
              }}
            >
              <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/visualization"
                  element={
                    <ProtectedRoute>
                      <Visualization />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
