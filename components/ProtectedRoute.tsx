import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginView } from './Views';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  isDarkMode?: boolean;
  onLogin: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  isAuthenticated, 
  children, 
  isDarkMode,
  onLogin 
}) => {
  if (!isAuthenticated) {
    return <LoginView changeView={() => {}} isDarkMode={isDarkMode} onLogin={onLogin} />;
  }
  return <>{children}</>;
};
