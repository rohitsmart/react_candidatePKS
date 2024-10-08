import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = useSelector((state) => state.auth.token);

  return token ? Component : <Navigate to="/" />;
};
export default ProtectedRoute;