// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

// Layout wrapper for authenticated routes
const AppLayout = ({ children, sidebarOpen, setSidebarOpen }) => (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(90deg, #132758 60%, #243375 100%)",
    }}
  >
    <Navbar sidebarOpen={sidebarOpen} />
    <div style={{ display: "flex" }}>
      <Sidebar onToggle={setSidebarOpen} />
      <div
        style={{
          flex: 1,
          marginLeft: sidebarOpen ? "200px" : "60px",
          marginTop: "70px",
          transition: "margin-left 0.3s, margin-top 0.3s",
          padding: "20px",
          background: "transparent",
          minHeight: "calc(100vh - 70px - 40px)",
        }}
      >
        {children}
      </div>
    </div>
    <Footer />
  </div>
);

// Optional: Redirect logged-in users away from login/signup
const RedirectIfLoggedIn = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfLoggedIn>
                <Signup />
              </RedirectIfLoggedIn>
            }
          />

          {/* Protected Routes with Layout */}
          <Route
            path="/*"
            element={
              <AppLayout
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              >
                <Routes>
                  {/* Dashboard and general pages (all logged-in users) */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
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

                  {/* Reports page only for admin */}
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
