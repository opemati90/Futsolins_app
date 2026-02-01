import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { HomeView, DashboardView, PracticeView, PlannerView, PricingView, ReferralView, LoginView, SignupView, ProfileView, SettingsView } from './components/Views';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
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
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(ViewState.HOME);
  };

  const renderView = () => {
    const commonProps = { changeView: setCurrentView, isDarkMode };

    switch (currentView) {
      case ViewState.HOME:
        return <HomeView {...commonProps} />;
      case ViewState.LOGIN:
        return <LoginView {...commonProps} onLogin={handleLogin} />;
      case ViewState.SIGNUP:
        return <SignupView {...commonProps} onLogin={handleLogin} />;
      case ViewState.DASHBOARD:
        return isAuthenticated ? <DashboardView {...commonProps} /> : <LoginView {...commonProps} onLogin={handleLogin} />;
      case ViewState.PRACTICE:
        return isAuthenticated ? <PracticeView {...commonProps} /> : <LoginView {...commonProps} onLogin={handleLogin} />;
      case ViewState.PLANNER:
        return isAuthenticated ? <PlannerView {...commonProps} /> : <LoginView {...commonProps} onLogin={handleLogin} />;
      case ViewState.PRICING:
        return <PricingView {...commonProps} />;
      case ViewState.REFERRAL:
        return <ReferralView {...commonProps} />;
      case ViewState.PROFILE:
        return isAuthenticated ? <ProfileView {...commonProps} /> : <LoginView {...commonProps} onLogin={handleLogin} />;
      case ViewState.SETTINGS:
        return isAuthenticated ? <SettingsView {...commonProps} /> : <LoginView {...commonProps} onLogin={handleLogin} />;
      default:
        return <HomeView {...commonProps} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setView={setCurrentView} 
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    >
      {renderView()}
    </Layout>
  );
}

export default App;