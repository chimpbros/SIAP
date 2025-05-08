import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  // If you need to pass specific props, define them here
  // Example: requiredRole?: 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (/* props */) => {
  const { currentUser, loading, isApproved } = useAuth();

  if (loading) {
    // You might want to render a loading spinner here instead of null
    return <div>Loading...</div>;
  }

  // User must be logged in AND approved to access protected routes
  if (!currentUser || !isApproved) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    // Note: We might need to pass the location state to the login page later.
    return <Navigate to="/login" replace />;
  }

  // If logged in and approved, render the child route element
  // Using <Outlet /> allows this component to be used in nested routes layout
  return <Outlet />;

  // Alternatively, if passing children directly:
  // return <>{children}</>;
};

export default ProtectedRoute;
