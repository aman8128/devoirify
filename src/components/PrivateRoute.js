import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';  // Assuming you have AuthContext to manage auth state

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();  // Get the current authentication state

  // If user is not authenticated, redirect to login page
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected route's component
  return children;
};

export default PrivateRoute;
