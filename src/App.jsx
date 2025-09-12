// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Visualization from "./pages/Visualization";
import Reports from "./pages/Reports";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from "./context/RoleProtectedRoute";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected App Routes */}
          <Route
            path="/*"
            element={
              <div style={{
                minHeight: "100vh",
                background: "linear-gradient(90deg, #132758 60%, #243375 100%)",
              }}>
                <Navbar sidebarOpen={sidebarOpen} />
                <div style={{ display: "flex" }}>
                  <Sidebar onToggle={setSidebarOpen} />
                  <div style={{
                    flex: 1,
                    marginLeft: sidebarOpen ? "200px" : "60px",
                    marginTop: "70px",
                    transition: "margin-left 0.3s, margin-top 0.3s",
                    padding: "20px",
                    background: "transparent",
                    minHeight: "calc(100vh - 70px - 40px)",
                  }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />

                      {/* Only scientists can access Upload */}
                      <Route path="/upload" element={
                        <RoleProtectedRoute allowedRoles={["scientist"]}>
                          <Upload />
                        </RoleProtectedRoute>
                      } />

                      {/* Only researchers can access Search */}
                      <Route path="/search" element={
                        <RoleProtectedRoute allowedRoles={["researcher"]}>
                          <Search />
                        </RoleProtectedRoute>
                      } />

                      {/* Scientists & Policymakers can access Visualization */}
                      <Route path="/visualization" element={
                        <RoleProtectedRoute allowedRoles={["scientist", "policymaker"]}>
                          <Visualization />
                        </RoleProtectedRoute>
                      } />

                      {/* Only Policymakers can access Reports */}
                      <Route path="/reports" element={
                        <RoleProtectedRoute allowedRoles={["policymaker"]}>
                          <Reports />
                        </RoleProtectedRoute>
                      } />
                    </Routes>
                  </div>
                </div>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
