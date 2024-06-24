import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user' | 'guest';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (requiredRole === 'admin' && (!user || !user.isSeller)) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'user' && !user) {
    return <Navigate to="/auth/signin" />;
  }

  if (requiredRole === 'guest' && user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
