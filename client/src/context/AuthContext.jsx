import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "./LoadingContext.jsx";

// Auto-detect API URL: use same domain if on deployed server, else localhost for dev
const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? window.location.origin
    : "http://127.0.0.1:8800");

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setIsLoading } = useLoading();

  // Read localStorage only after showing loading screen
  useEffect(() => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to read user from localStorage", e);
    } finally {
      // End loading after auth initialization
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      const { user } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", response.data.accessToken);
      return user; // Return user on successful login
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      throw error; // Re-throw the error
    }
  };

  const register = async (userData) => {
    try {
      console.log(userData);
      await axios.post(`${API_URL}/register`, userData);
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.message || error.message
      );
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
