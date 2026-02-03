import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:3',message:'App.tsx imports starting',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import Layout from './components/Layout';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:8',message:'Layout imported',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import { HomeView, DashboardView, PracticeView, PlannerView, PricingView, ReferralView, LoginView, SignupView, ProfileView, SettingsView } from './components/Views';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:12',message:'Views imported',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import { CookiePolicy, PrivacyPolicy, TermsOfService } from './components/PolicyPages';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:16',message:'PolicyPages imported',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import { CompetitionView } from './components/CompetitionView';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:20',message:'CompetitionView imported',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import { StudyGroupView } from './components/StudyGroupView';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:24',message:'StudyGroupView imported',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import { AdmissionHubView } from './components/AdmissionHubView';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:28',message:'AdmissionHubView imported',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import { CommunityView } from './components/CommunityView';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:32',message:'CommunityView imported',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import { ProtectedRoute } from './components/ProtectedRoute';
import { ViewState } from './types';

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:37',message:'All imports completed',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

function App() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:41',message:'App component rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const location = useLocation();
  const navigate = useNavigate();
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:45',message:'Hooks initialized',data:{pathname:location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Initialize dark mode from system preference or default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:53',message:'Dark mode initialization',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    if (typeof window !== 'undefined') {
      try {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:58',message:'Dark mode check result',data:{isDark},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        return isDark;
      } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:63',message:'ERROR in dark mode check',data:{errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:72',message:'Dark mode useEffect running',data:{isDarkMode,hasDocument:typeof document!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    try {
      if (typeof document !== 'undefined') {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:81',message:'Dark mode class applied',data:{isDarkMode},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
      }
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:85',message:'ERROR in dark mode useEffect',data:{errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
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

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:95',message:'About to render Layout',data:{currentView:getCurrentView(),pathname:location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

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
            <PracticeView {...commonProps} isAuthenticated={isAuthenticated} onLogin={handleLogin} />
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