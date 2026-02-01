import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Crown, LayoutDashboard, Sparkles, PenTool, Gift, Settings, ChevronDown, UserCircle, Phone, Tag, Star, LogIn, UserPlus, LogOut, Sun, Moon } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, isAuthenticated, onLogout, isDarkMode, toggleTheme, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to get path from ViewState
  const getPath = (view: ViewState): string => {
    switch (view) {
      case ViewState.HOME: return '/';
      case ViewState.LOGIN: return '/login';
      case ViewState.SIGNUP: return '/signup';
      case ViewState.DASHBOARD: return '/dashboard';
      case ViewState.PRACTICE: return '/practice';
      case ViewState.PLANNER: return '/planner';
      case ViewState.PRICING: return '/pricing';
      case ViewState.REFERRAL: return '/referral';
      case ViewState.PROFILE: return '/profile';
      case ViewState.SETTINGS: return '/settings';
      default: return '/';
    }
  };

  // App Navigation (Sidebar/Top)
  const appNavItems = [
    { label: 'Dashboard', view: ViewState.DASHBOARD, path: '/dashboard', icon: LayoutDashboard },
    { label: 'Practice', view: ViewState.PRACTICE, path: '/practice', icon: PenTool },
    { label: 'AI Planner', view: ViewState.PLANNER, path: '/planner', icon: Sparkles },
    { label: 'Upgrade', view: ViewState.PRICING, path: '/pricing', icon: Crown },
    { label: 'Rewards', view: ViewState.REFERRAL, path: '/referral', icon: Gift },
  ];

  // Public Navigation (Marketing)
  const publicNavItems = [
    { label: 'Features', view: ViewState.HOME, path: '/', section: 'features', icon: Star },
    { label: 'Pricing', view: ViewState.PRICING, path: '/pricing', icon: Tag },
    { label: 'Contact', view: ViewState.HOME, path: '/', section: 'contact', icon: Phone },
  ];

  const handleNavClick = (path: string, section?: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);

    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/' && location.pathname === '/home');
  };

  const isPublicPage = !isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-all duration-300 ${!isPublicPage ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link 
              to={isAuthenticated ? '/dashboard' : '/'}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="bg-nigeria-600 p-2 rounded-xl group-hover:bg-nigeria-700 transition-all shadow-lg shadow-nigeria-100 dark:shadow-none transform group-hover:scale-105">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white leading-none tracking-tight">EduPrep</span>
                <span className="text-[10px] font-semibold text-nigeria-600 dark:text-nigeria-400 tracking-widest uppercase mt-0.5">Nigeria</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {isPublicPage ? (
                // Public Menu
                <>
                  <nav className="flex space-x-1 mr-4">
                    {publicNavItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => handleNavClick(item.path, item.section)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            isActive(item.path)
                            ? 'text-nigeria-600 dark:text-nigeria-400 bg-nigeria-50 dark:bg-nigeria-900/10' 
                            : 'text-gray-600 dark:text-slate-300 hover:text-nigeria-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-700">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                    >
                        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    <Link 
                      to="/login"
                      className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 hover:text-nigeria-600 dark:hover:text-white transition-colors"
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/signup"
                      className="bg-nigeria-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-nigeria-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                </>
              ) : (
                // App Menu (Logged In)
                <>
                  <nav className="flex items-center gap-1 bg-gray-50/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-gray-100 dark:border-slate-700 mr-4">
                    {appNavItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                          ${isActive(item.path)
                            ? 'bg-white dark:bg-slate-700 text-nigeria-600 dark:text-white shadow-sm ring-1 ring-gray-100 dark:ring-slate-600' 
                            : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-100/50 dark:hover:bg-slate-700/50'
                          }`}
                      >
                        <item.icon className={`h-4 w-4 ${isActive(item.path) ? 'text-nigeria-600 dark:text-nigeria-400' : 'text-gray-400 dark:text-slate-500'}`} />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                    >
                        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    {/* User Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 pl-2 focus:outline-none group"
                        >
                        <div className="w-10 h-10 rounded-full bg-nigeria-100 dark:bg-nigeria-900/40 border-2 border-white dark:border-slate-700 flex items-center justify-center text-nigeria-700 dark:text-nigeria-400 font-bold text-sm shadow-sm group-hover:border-nigeria-200 transition-colors">
                            CO
                        </div>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isUserMenuOpen && (
                        <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200 z-50 origin-top-right">
                            <div className="px-5 py-3 border-b border-gray-100 dark:border-slate-800 mb-1">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Chinedu Okafor</p>
                                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">chinedu.o@example.com</p>
                            </div>
                            <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-5 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors">
                                <UserCircle className="h-4 w-4 text-gray-400" /> My Profile
                            </Link>
                            <Link to="/settings" onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-5 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors">
                                <Settings className="h-4 w-4 text-gray-400" /> Settings
                            </Link>
                            <div className="border-t border-gray-100 dark:border-slate-800 mt-2 pt-1">
                                <button onClick={handleLogout} className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3 transition-colors">
                                    <LogOut className="h-4 w-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 dark:text-slate-400 hover:text-nigeria-600 dark:hover:text-nigeria-400 focus:outline-none p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-top ${
            isMobileMenuOpen ? 'max-h-[85vh] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
          }`}
        >
          <div className="px-4 py-6 space-y-1 overflow-y-auto max-h-[80vh]">
            {/* Navigation Items */}
            {(isPublicPage ? publicNavItems : appNavItems).map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => handleNavClick(item.path, 'section' in item ? (item as any).section : undefined)}
                className={`w-full text-left px-4 py-3.5 rounded-2xl text-base font-semibold flex items-center gap-4 transition-all
                  ${isActive(item.path)
                    ? 'bg-nigeria-50 dark:bg-nigeria-900/20 text-nigeria-700 dark:text-nigeria-400'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive(item.path) ? 'bg-white dark:bg-nigeria-900/40' : 'bg-gray-100 dark:bg-slate-800'}`}>
                  {'icon' in item && <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'text-nigeria-600 dark:text-nigeria-400' : 'text-gray-500 dark:text-slate-400'}`} />}
                </div>
                {item.label}
              </Link>
            ))}
            
            {/* Public Actions */}
            {isPublicPage && (
              <div className="pt-6 mt-4 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-3">
                  <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3.5 text-left px-4 rounded-2xl text-base font-semibold flex items-center gap-4 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800">
                        <LogIn className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                    </div>
                    Log in
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 text-left px-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 bg-nigeria-600 text-white hover:bg-nigeria-700 transition-all shadow-md active:scale-95"
                  >
                    <UserPlus className="h-5 w-5" />
                    Sign Up Free
                  </Link>
              </div>
            )}

            {/* Authenticated User Actions */}
            {!isPublicPage && (
                <div className="pt-6 mt-2 border-t border-gray-100 dark:border-slate-800 space-y-2">
                  <div className="px-4 py-2 flex items-center gap-4 mb-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 flex items-center justify-center text-nigeria-600 dark:text-nigeria-400 font-bold text-lg">
                      CO
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Chinedu Okafor</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded-md inline-block mt-1">Student Account</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl text-base font-semibold flex items-center gap-4 transition-colors ${isActive('/profile') ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >
                    <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800">
                      <UserCircle className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                    </div>
                    Profile
                  </Link>
                  <Link 
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl text-base font-semibold flex items-center gap-4 transition-colors ${isActive('/settings') ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >
                    <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800">
                       <Settings className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                    </div>
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3.5 rounded-2xl text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-4 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <LogOut className="h-5 w-5 text-red-500" />
                    </div>
                    Sign Out
                  </button>
                </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-transparent dark:border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                 <BookOpen className="h-6 w-6 text-nigeria-500" />
                 <span className="text-xl font-bold text-white">EduPrep</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Predicted learning for Nigerian students. We combine cutting-edge artificial intelligence with proven methodologies.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/practice" className="hover:text-nigeria-400 transition-colors">Past Questions</Link></li>
                <li><Link to="/planner" className="hover:text-nigeria-400 transition-colors">Study Planner</Link></li>
                <li><Link to="/pricing" className="hover:text-nigeria-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Exams</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-white cursor-pointer">JAMB UTME</li>
                <li className="hover:text-white cursor-pointer">WAEC SSCE</li>
                <li className="hover:text-white cursor-pointer">NECO</li>
                <li className="hover:text-white cursor-pointer">Post-UTME</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Contact</h4>
              <p className="text-sm mb-3 text-slate-400">317, Nwaefuna Osaji Close, Lugbe, FCT</p>
              <p className="text-sm mb-3 text-white">+234 800 EDUPREP</p>
              <p className="text-sm text-nigeria-400">hello@eduprep.ng</p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} EduPrep Nigeria. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-white">Privacy</a>
               <a href="#" className="hover:text-white">Terms</a>
               <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;