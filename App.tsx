import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { HomeView, DashboardView, PracticeView, PlannerView, PricingView, ReferralView, LoginView, SignupView, ProfileView, SettingsView } from './components/Views';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ViewState } from './types';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Initialize dark mode from system preference or default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  // Map pathname to ViewState for Layout component
  const getCurrentView = (): ViewState => {
    const path = location.pathname;
    switch (path) {
      case '/':
      case '/home':
        return ViewState.HOME;
      case '/login':
        return ViewState.LOGIN;
      case '/signup':
        return ViewState.SIGNUP;
      case '/dashboard':
        return ViewState.DASHBOARD;
      case '/practice':
        return ViewState.PRACTICE;
      case '/planner':
        return ViewState.PLANNER;
      case '/pricing':
        return ViewState.PRICING;
      case '/referral':
        return ViewState.REFERRAL;
      case '/profile':
        return ViewState.PROFILE;
      case '/settings':
        return ViewState.SETTINGS;
      default:
        return ViewState.HOME;
    }
  };

  const commonProps = { changeView: () => {}, isDarkMode };

  return (
    <Layout 
      currentView={getCurrentView()} 
      setView={() => {}} 
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    >
      <Routes>
        <Route path="/" element={<HomeView {...commonProps} />} />
        <Route path="/home" element={<HomeView {...commonProps} />} />
        <Route path="/login" element={<LoginView {...commonProps} onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupView {...commonProps} onLogin={handleLogin} />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <DashboardView {...commonProps} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/practice" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <PracticeView {...commonProps} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/planner" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <PlannerView {...commonProps} />
            </ProtectedRoute>
          } 
        />
        <Route path="/pricing" element={<PricingView {...commonProps} />} />
        <Route path="/referral" element={<ReferralView {...commonProps} />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <ProfileView {...commonProps} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <SettingsView {...commonProps} />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;