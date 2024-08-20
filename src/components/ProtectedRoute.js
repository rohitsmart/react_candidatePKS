import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = useSelector((state) => state.auth.token); // Replace with your token selector

  return token ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
