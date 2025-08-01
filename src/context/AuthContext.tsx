// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  phone_number: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (data: {
    username: string;
    email: string;
    password: string;
    phone_number?: string;
    role?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🚀 API Base URL - Update if needed
const BASE_URL = "http://localhost:8000"; // Change if your backend URL is different

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("accessToken");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login/`, {
        username,
        password,
      });

      const { access, refresh, user } = response.data;

      setUser(user);
      setAccessToken(access);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const signup = async (data: {
    username: string;
    email: string;
    password: string;
    phone_number?: string;
    role?: string;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/signup/`, data);
      const { access, refresh, user } = response.data;

      setUser(user);
      setAccessToken(access);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
