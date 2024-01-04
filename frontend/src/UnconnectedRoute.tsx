import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

const UnconnectedRoute = ({ children }: {children: React.ReactNode}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/tasks" state={{ from: location }} replace />;
  }

  return children;
};

export default UnconnectedRoute;
