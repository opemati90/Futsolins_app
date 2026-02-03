import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { HomeView, DashboardView, PracticeView, PlannerView, PricingView, ReferralView, LoginView, SignupView, ProfileView, SettingsView } from './components/Views';
import { CookiePolicy, PrivacyPolicy, TermsOfService } from './components/PolicyPages';
import { CompetitionView } from './components/CompetitionView';
import { StudyGroupView } from './components/StudyGroupView';
import { AdmissionHubView } from './components/AdmissionHubView';
import { CommunityView } from './components/CommunityView';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ViewState } from './types';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Initialize dark mode from system preference or default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (e) {
        console.error('Error checking dark mode:', e);
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && document?.documentElement) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
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
      case '/competition':
        return ViewState.COMPETITION;
      case '/study-group':
        return ViewState.STUDY_GROUP;
      case '/admission-hub':
        return ViewState.ADMISSION_HUB;
      case '/community':
        return ViewState.COMMUNITY;
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
        <Route 
          path="/competition" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <CompetitionView isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/study-group" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <StudyGroupView isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admission-hub" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <AdmissionHubView isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/community" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} onLogin={handleLogin}>
              <CommunityView isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } 
        />
        <Route path="/privacy" element={<PrivacyPolicy isDarkMode={isDarkMode} />} />
        <Route path="/terms" element={<TermsOfService isDarkMode={isDarkMode} />} />
        <Route path="/cookies" element={<CookiePolicy isDarkMode={isDarkMode} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;