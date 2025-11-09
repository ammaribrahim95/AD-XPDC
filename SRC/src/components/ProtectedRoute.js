import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return <Outlet />;
};

export default ProtectedRoute;
