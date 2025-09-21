// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Signup (stores in localStorage)
  const signup = async (email, password, role = "user") => {
    const newUser = { email, password, role };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  // ✅ Login (checks localStorage)
  const login = async (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) throw new Error("User not found. Please sign up first.");
    if (storedUser.email !== email || storedUser.password !== password) {
      throw new Error("Invalid email or password");
    }
    setUser(storedUser);
    return storedUser;
  };

  // ✅ Logout
  const logout = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
