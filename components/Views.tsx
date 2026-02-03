import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Check, Star, ArrowRight, BookOpen, Clock, Award, Brain, Target, Users, Layout, Shield, Zap, Mail, Lock, ChevronDown, ChevronUp, Trophy, Smartphone, Copy, Share2, TrendingUp, Facebook, Twitter, Calendar, Calculator, Microscope, Globe, PenTool, Gift, Sparkles, MessageCircle, UserCircle, Settings, Bell, AlertTriangle, Save, Camera, X, Play, RotateCcw, FileText, CheckCircle, CreditCard, LogOut, GraduationCap, ChevronRight, Info, HelpCircle, Loader2, Filter, XCircle, Bookmark, History } from 'lucide-react';
import { ViewState, PerformanceData, Question, Bookmark as BookmarkType, AnsweredQuestion } from '../types';
import { PRICING_PLANS, TESTIMONIALS, SAMPLE_QUESTIONS } from '../constants';
import { generateStudyPlan } from '../services/geminiService';

interface ViewProps {
  changeView: (view: ViewState) => void;
  onLogin?: () => void;
  isDarkMode?: boolean;
}

// --- SHARED COMPONENTS ---

const SimpleTooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="group relative inline-flex items-center">
    {children}
    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] opacity-0 transition-opacity group-hover:opacity-100 z-50">
      <div className="bg-gray-900 dark:bg-slate-700 text-white text-xs rounded-lg px-3 py-1.5 shadow-xl text-center font-medium">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-slate-700"></div>
      </div>
    </div>
  </div>
);

const FAQAccordionItem: React.FC<{ 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  toggle: () => void; 
}> = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-all duration-200 hover:border-gray-300 dark:hover:border-slate-700">
      <button 
        onClick={toggle}
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-gray-900 dark:text-white text-lg">{question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 pt-0 text-gray-600 dark:text-slate-400 leading-relaxed border-t border-gray-100 dark:border-slate-800">
          {answer}
        </div>
      </div>
    </div>
  );
};

// --- AUTH VIEWS ---

export const LoginView: React.FC<ViewProps> = ({ changeView, onLogin }) => (
  <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-950 transition-colors">
    <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-slate-800">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
          Or <button onClick={() => changeView(ViewState.SIGNUP)} className="font-medium text-nigeria-600 dark:text-nigeria-400 hover:text-nigeria-500">create a new account</button>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin?.(); }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email address</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-slate-500" />
              </div>
              <input id="email" name="email" type="email" required className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-nigeria-500 focus:border-nigeria-500 dark:bg-slate-950 dark:text-white sm:text-sm placeholder-gray-400 dark:placeholder-slate-600" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500" />
              </div>
              <input id="password" name="password" type="password" required className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-nigeria-500 focus:border-nigeria-500 dark:bg-slate-950 dark:text-white sm:text-sm placeholder-gray-400 dark:placeholder-slate-600" placeholder="••••••••" />
            </div>
          </div>
        </div>

        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-nigeria-600 hover:bg-nigeria-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nigeria-500 shadow-md hover:shadow-lg transition-all">
          Sign in
        </button>
      </form>
    </div>
  </div>
);

export const SignupView: React.FC<ViewProps> = ({ changeView, onLogin }) => (
  <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-950 transition-colors">
    <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-slate-800">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Start Your Success Story</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
          Already have an account? <button onClick={() => changeView(ViewState.LOGIN)} className="font-medium text-nigeria-600 dark:text-nigeria-400 hover:text-nigeria-500">Log in</button>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin?.(); }}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Full Name</label>
            <input type="text" required className="mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-nigeria-500 focus:border-nigeria-500 dark:bg-slate-950 dark:text-white sm:text-sm placeholder-gray-400 dark:placeholder-slate-600" placeholder="Chinedu Okafor" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email address</label>
            <input type="email" required className="mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-nigeria-500 focus:border-nigeria-500 dark:bg-slate-950 dark:text-white sm:text-sm placeholder-gray-400 dark:placeholder-slate-600" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Exam Goal</label>
            <select className="mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-nigeria-500 focus:border-nigeria-500 dark:bg-slate-950 dark:text-white sm:text-sm">
                <option>JAMB UTME</option>
                <option>WAEC</option>
                <option>NECO</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Password</label>
            <input type="password" required className="mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-nigeria-500 focus:border-nigeria-500 dark:bg-slate-950 dark:text-white sm:text-sm placeholder-gray-400 dark:placeholder-slate-600" placeholder="Create a strong password" />
          </div>
        </div>

        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-nigeria-600 hover:bg-nigeria-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nigeria-500 shadow-md hover:shadow-lg transition-all">
          Create Account
        </button>
      </form>
    </div>
  </div>
);

// --- HOME VIEW ---

export const HomeView: React.FC<ViewProps> = ({ changeView }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stats = [
    { label: "Active Students", value: "15k+" },
    { label: "Questions Solved", value: "2M+" },
    { label: "Pass Rate", value: "92%" },
  ];

  const faqs = [
    { q: "Is EduPrep really free?", a: "Yes! Our Basic plan gives you access to 5 years of past questions for free. You only pay if you want the AI Tutor and detailed analytics." },
    { q: "Can I use it offline?", a: "Yes, our mobile app allows you to download questions and practice without data." },
    { q: "Does it cover NECO?", a: "Absolutely. We cover JAMB, WAEC, NECO, and Post-UTME for all major universities." },
  ];

  const handleToggleFaq = (idx: number) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  return (
    <div className="animate-fade-in bg-white dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <div className="relative pt-12 lg:pt-24 pb-16 lg:pb-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start animate-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm mb-8 transition-transform hover:scale-105 cursor-default">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 dark:bg-slate-700 bg-cover bg-center" style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 20})`}}></div>
                    ))}
                 </div>
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-white">
                    <div className="flex text-yellow-500"><Star className="h-3 w-3 fill-current" /></div>
                    <span>4.9/5 from 15k+ Students</span>
                 </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                The Smarter Way to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nigeria-600 to-nigeria-400">Smash JAMB & WAEC.</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
                Stop memorizing blindly. Use AI to identify your weak spots, generate personal study plans, and master typical exam questions before exam day.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => changeView(ViewState.SIGNUP)}
                  className="px-10 py-5 bg-nigeria-600 text-white font-extrabold rounded-2xl shadow-xl hover:bg-nigeria-700 hover:shadow-2xl transition-all text-xl flex items-center justify-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Start Practicing Free <ArrowRight className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => changeView(ViewState.PRICING)}
                  className="px-8 py-5 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all border border-gray-200 dark:border-slate-700 shadow-sm w-full sm:w-auto text-lg"
                >
                  View Pricing
                </button>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-slate-500 flex items-center gap-2 justify-center lg:justify-start">
                 <Check className="h-4 w-4 text-green-500" /> Free Plan Available 
                 <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                 <Check className="h-4 w-4 text-green-500" /> Offline Mode
              </p>
            </div>

            {/* Right Column: Product Simulation */}
            <div className="relative hidden lg:block animate-in slide-in-from-right-8 duration-1000 delay-200">
               <div className="absolute -top-20 -right-20 w-72 h-72 bg-nigeria-200/30 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

               <div className="relative mx-auto w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 p-6 z-10">
                  <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     <div className="text-xs font-mono text-gray-400 ml-auto">EduPrep AI v2.0</div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex gap-3 justify-end">
                        <div className="bg-nigeria-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] shadow-md">
                           Can you explain why the answer is C?
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                           <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-full h-full object-cover" />
                        </div>
                     </div>

                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                           <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 p-4 rounded-2xl rounded-tl-sm text-sm max-w-[90%] space-y-2 border border-gray-100 dark:border-slate-700">
                           <p className="font-semibold text-nigeria-700 dark:text-nigeria-400">Certainly! Here's the breakdown:</p>
                           <p>The question asks for the scalar quantity. Force and Velocity have direction, but <span className="font-bold bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">Mass</span> only has magnitude.</p>
                        </div>
                     </div>
                     
                     <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                        <div className="flex justify-between items-end mb-2">
                           <div>
                              <div className="text-xs text-gray-500 dark:text-slate-400">Physics Mastery</div>
                              <div className="text-lg font-bold text-gray-900 dark:text-white">82%</div>
                           </div>
                           <div className="text-xs font-bold text-green-600">+12% this week</div>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[82%] rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Referral Section */}
      <div className="bg-gradient-to-r from-nigeria-800 to-nigeria-600 py-6 overflow-hidden relative group cursor-pointer" onClick={() => changeView(ViewState.REFERRAL)}>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
               <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <Gift className="h-6 w-6 text-white animate-pulse" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white">Earn While You Learn!</h3>
                  <p className="text-nigeria-100 text-sm">Refer a friend and get <span className="font-bold text-white">₦500 cash</span> instantly.</p>
               </div>
            </div>
            <button className="bg-white text-nigeria-800 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2 group-hover:gap-3 w-full md:w-auto">
               Start Refering <ArrowRight className="h-4 w-4" />
            </button>
         </div>
      </div>

      {/* Stats Strip */}
      <div className="border-y border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-4 text-center divide-x divide-gray-200 dark:divide-slate-700">
            {stats.map((stat, idx) => (
              <div key={idx} className="px-2">
                <div className="text-2xl md:text-3xl font-extrabold text-nigeria-700 dark:text-nigeria-400">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 1: Practice */}
      <div id="features" className="py-16 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="bg-orange-50 dark:bg-orange-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                 <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
               </div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Practice exactly like the real exam.</h2>
               <p className="text-lg text-gray-600 dark:text-slate-400 mb-6 leading-relaxed">
                 Don't be surprised on exam day. Our Computer Based Test (CBT) interface mimics the actual JAMB platform, helping you build speed and confidence.
               </p>
               <button onClick={() => changeView(ViewState.PRACTICE)} className="text-nigeria-700 dark:text-nigeria-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                 Try a Demo Question <ArrowRight className="h-5 w-5" />
               </button>
            </div>
            <div className="w-full md:w-1/2 bg-gray-50 dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 relative">
               <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-green-600 dark:text-green-400 shadow-sm border border-green-100 dark:border-green-900/30">
                 Score: 85%
               </div>
               {SAMPLE_QUESTIONS.slice(0,1).map((q, i) => (
                 <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                   <p className="text-sm text-gray-500 dark:text-slate-400 mb-2 font-mono">Question 1/50</p>
                   <p className="font-medium text-gray-900 dark:text-white mb-4">{q.questionText}</p>
                   <div className="space-y-2">
                     {q.options.slice(0, 3).map((opt, idx) => (
                       <div key={idx} className={`p-3 rounded-lg text-sm border ${idx === 1 ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-300 font-medium' : 'border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400'}`}>
                         {String.fromCharCode(65 + idx)}. {opt}
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2: AI Planner */}
      <div className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="bg-purple-50 dark:bg-purple-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                 <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
               </div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">A personal tutor in your pocket.</h2>
               <p className="text-lg text-gray-600 dark:text-slate-400 mb-6 leading-relaxed">
                 Struggling with Physics? Our AI analyzes your weak points and creates a custom timetable to ensure you cover the syllabus before the exam date.
               </p>
               <button onClick={() => changeView(ViewState.PLANNER)} className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-bold rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                 Generate My Plan
               </button>
            </div>
            <div className="w-full md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <Clock className="h-6 w-6 text-blue-500 mb-2" />
                    <div className="font-bold text-gray-900 dark:text-white">Study Time</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Optimized for your schedule</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <Trophy className="h-6 w-6 text-yellow-500 mb-2" />
                    <div className="font-bold text-gray-900 dark:text-white">Goal Tracking</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Hit your target score</div>
                  </div>
                   <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-2 h-2 rounded-full bg-red-500"></div>
                       <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Weakness Detected: Calculus</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full w-full overflow-hidden">
                       <div className="h-full bg-red-500 w-[30%]"></div>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">Recommended: 2 hours practice today</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">Trusted by students from</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale dark:opacity-40">
             <span className="text-xl font-bold font-serif text-gray-400 dark:text-slate-600">UNILAG</span>
             <span className="text-xl font-bold font-serif text-gray-400 dark:text-slate-600">OAU</span>
             <span className="text-xl font-bold font-serif text-gray-400 dark:text-slate-600">UNN</span>
             <span className="text-xl font-bold font-serif text-gray-400 dark:text-slate-600">ABU ZARIA</span>
             <span className="text-xl font-bold font-serif text-gray-400 dark:text-slate-600">CU</span>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="h-4 w-4" />)}
                </div>
                <p className="text-gray-800 dark:text-slate-300 font-medium mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nigeria-200 dark:bg-nigeria-900 rounded-full flex items-center justify-center text-nigeria-700 dark:text-nigeria-400 font-bold text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{t.exam}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQAccordionItem 
                key={idx}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === idx}
                toggle={() => handleToggleFaq(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Sticky CTA */}
      <div className="py-12 bg-nigeria-900 dark:bg-nigeria-950 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to smash your exams?</h2>
          <p className="text-nigeria-200 mb-8">Join the platform that is changing how Nigerian students learn.</p>
          <button 
             onClick={() => changeView(ViewState.SIGNUP)}
             className="w-full md:w-auto px-10 py-4 bg-white text-nigeria-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all text-lg"
          >
             Create Free Account
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PRACTICE VIEW ---
export const PracticeView: React.FC<ViewProps & { isDarkMode?: boolean }> = ({ changeView, isDarkMode }) => {
  // Flattened State: 'SETUP' combines selection and config
  type Step = 'SETUP' | 'QUIZ' | 'RESULT' | 'BOOKMARKS' | 'HISTORY';
  
  const [step, setStep] = useState<Step>('SETUP');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Config
  const [configExam, setConfigExam] = useState('JAMB UTME');
  const [configYear, setConfigYear] = useState('2023');
  const [configType, setConfigType] = useState<'Objectives' | 'Theory'>('Objectives');
  const [configMode, setConfigMode] = useState<'Practice' | 'Exam'>('Practice');

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [examTimer, setExamTimer] = useState(30 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Bookmarks and History
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('eduprep_bookmarks');
    return stored ? JSON.parse(stored) : [];
  });

  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('eduprep_answered_questions');
    return stored ? JSON.parse(stored) : [];
  });

  const [bookmarkFilter, setBookmarkFilter] = useState<string>('all');
  const [historyFilter, setHistoryFilter] = useState<string>('all');

  const subjects = [
    { name: "Mathematics", count: 1200, icon: Calculator, color: "bg-blue-50 text-blue-600" },
    { name: "English", count: 1500, icon: BookOpen, color: "bg-yellow-50 text-yellow-600" },
    { name: "Physics", count: 800, icon: Zap, color: "bg-purple-50 text-purple-600" },
    { name: "Chemistry", count: 850, icon: Microscope, color: "bg-green-50 text-green-600" },
    { name: "Biology", count: 900, icon: Award, color: "bg-pink-50 text-pink-600" },
    { name: "Economics", count: 600, icon: TrendingUp, color: "bg-indigo-50 text-indigo-600" },
    { name: "Government", count: 500, icon: Globe, color: "bg-orange-50 text-orange-600" },
    { name: "Literature", count: 450, icon: BookOpen, color: "bg-rose-50 text-rose-600" },
  ];

  const exams = ['JAMB UTME', 'WAEC SSCE', 'NECO', 'Post-UTME'];
  const years = Array.from({length: 14}, (_, i) => (2023 - i).toString());

  // Theory Mock Data (same as before)
  const THEORY_QUESTIONS = [
    { id: 101, text: "Explain the concept of Thermionic Emission and list two applications.", answer: "Thermionic emission is the discharge of electrons from heated materials. Applications: Cathode Ray Tubes, X-ray tubes." },
    { id: 102, text: "Differentiate between scalar and vector quantities with examples.", answer: "Scalar has magnitude only (Mass). Vector has magnitude and direction (Velocity)." },
    { id: 103, text: "State Newton's First Law of Motion.", answer: "A body will continue in its state of rest or uniform motion in a straight line unless acted upon by an external force." }
  ];

  const currentQuestions = configType === 'Objectives' ? SAMPLE_QUESTIONS : THEORY_QUESTIONS;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === 'QUIZ' && configMode === 'Exam' && examTimer > 0 && !isSubmitted && !showConfirmSubmit) {
      interval = setInterval(() => {
        setExamTimer((prev) => prev - 1);
      }, 1000);
    } else if (examTimer === 0 && step === 'QUIZ' && !isSubmitted) {
      handleFinishQuiz();
    }
    return () => clearInterval(interval);
  }, [step, configMode, examTimer, isSubmitted, showConfirmSubmit]);

  const handleSubjectClick = (subject: string) => {
    // If clicking same subject, unselect it. Else select new one.
    if (selectedSubject === subject) {
        setSelectedSubject(null);
    } else {
        setSelectedSubject(subject);
    }
  };

  const startSession = () => {
    if (!selectedSubject) return;
    setStep('QUIZ');
    setCurrentQIndex(0);
    setUserAnswers({});
    setExamTimer(30 * 60);
    setShowFeedback(false);
    setIsSubmitted(false);
    setShowConfirmSubmit(false);
  };

  const handleBack = () => {
    if (step === 'QUIZ') {
        if(window.confirm("Are you sure you want to end this session? Progress will be lost.")) setStep('SETUP');
    }
    else if (step === 'RESULT') setStep('SETUP');
    else if (step === 'SETUP') changeView(ViewState.DASHBOARD);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
     if (isSubmitted) return;
     setUserAnswers(prev => ({...prev, [currentQuestions[currentQIndex].id]: optionIndex}));
     if (configMode === 'Practice') {
        setShowFeedback(true);
     }
  };

  const handleTheoryInput = (text: string) => {
      if (isSubmitted) return;
      setUserAnswers(prev => ({...prev, [currentQuestions[currentQIndex].id]: text}));
  };

  const handleNext = () => {
    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      if (configMode === 'Exam') {
        setShowConfirmSubmit(true);
      } else {
        handleFinishQuiz();
      }
    }
  };

  const handleFinishQuiz = () => {
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
      
      // Save answered questions to history
      if (configType === 'Objectives') {
        const newAnswered: AnsweredQuestion[] = currentQuestions.map((q: Question) => ({
          questionId: q.id,
          subject: selectedSubject || 'Unknown',
          examType: configExam,
          userAnswer: userAnswers[q.id] as number,
          correctAnswer: q.correctAnswer,
          isCorrect: userAnswers[q.id] === q.correctAnswer,
          answeredAt: new Date()
        }));
        
        const updated = [...answeredQuestions, ...newAnswered];
        setAnsweredQuestions(updated);
        if (typeof window !== 'undefined') {
          localStorage.setItem('eduprep_answered_questions', JSON.stringify(updated));
        }
      }
      
      setStep('RESULT');
  };

  const toggleBookmark = (questionId: number) => {
    const existing = bookmarks.find(b => b.questionId === questionId);
    if (existing) {
      const updated = bookmarks.filter(b => b.questionId !== questionId);
      setBookmarks(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('eduprep_bookmarks', JSON.stringify(updated));
      }
    } else {
      const question = currentQuestions.find((q: Question) => q.id === questionId) as Question;
      if (question) {
        const newBookmark: BookmarkType = {
          questionId,
          subject: selectedSubject || question.subject,
          examType: configExam,
          createdAt: new Date()
        };
        const updated = [...bookmarks, newBookmark];
        setBookmarks(updated);
        if (typeof window !== 'undefined') {
          localStorage.setItem('eduprep_bookmarks', JSON.stringify(updated));
        }
      }
    }
  };

  const isBookmarked = (questionId: number) => {
    return bookmarks.some(b => b.questionId === questionId);
  };

  const removeBookmark = (questionId: number) => {
    const updated = bookmarks.filter(b => b.questionId !== questionId);
    setBookmarks(updated);
    localStorage.setItem('eduprep_bookmarks', JSON.stringify(updated));
  };

  const calculateScore = () => {
      if (configType === 'Theory') return 0;
      let score = 0;
      SAMPLE_QUESTIONS.forEach(q => {
          if (userAnswers[q.id] === q.correctAnswer) {
              score++;
          }
      });
      return score;
  };

  const getTheoryAnswer = (qId: number) => {
      return userAnswers[qId] as string || '';
  };
  
  const getObjectiveSelection = (qId: number) => {
      return userAnswers[qId] as number | undefined;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[80vh] relative">
      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-slate-800 relative overflow-hidden">
             {/* Decorative Background Element */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
             
             <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-6 ring-8 ring-yellow-50/50 dark:ring-yellow-900/10">
                  <AlertTriangle className="h-10 w-10 text-yellow-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submit Assessment?</h3>
                
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 w-full mb-6 border border-gray-100 dark:border-slate-700">
                    <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Time Remaining</p>
                    <p className="text-3xl font-mono font-bold text-gray-900 dark:text-white">{formatTime(examTimer)}</p>
                </div>

                <p className="text-gray-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                   You are about to submit your exam. You won't be able to change your answers after this point.
                </p>
                
                <div className="flex gap-3 w-full">
                   <button 
                     onClick={() => setShowConfirmSubmit(false)}
                     className="flex-1 py-3.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={handleFinishQuiz}
                     className="flex-1 py-3.5 bg-gradient-to-r from-nigeria-600 to-nigeria-700 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
                   >
                     Submit Now
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {step === 'SETUP' ? 'Practice Arena' : 
             step === 'QUIZ' ? `${selectedSubject} Quiz` :
             step === 'BOOKMARKS' ? 'Bookmarked Questions' :
             step === 'HISTORY' ? 'Answered Questions History' :
             'Session Results'}
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            {step === 'SETUP' ? 'Select a subject to customize your session instantly.' : 
             step === 'QUIZ' ? `${configMode} Mode • ${configType} • ${configYear}` :
             step === 'BOOKMARKS' ? 'Review your saved questions' :
             step === 'HISTORY' ? 'Track your practice progress' :
             'Performance summary and analytics.'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {step === 'SETUP' && (
            <>
              <button
                onClick={() => setStep('BOOKMARKS')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
              >
                <Bookmark className="h-4 w-4" />
                Bookmarks ({bookmarks.length})
              </button>
              <button
                onClick={() => setStep('HISTORY')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
              >
                <History className="h-4 w-4" />
                History ({answeredQuestions.length})
              </button>
            </>
          )}
          {step !== 'SETUP' && step !== 'BOOKMARKS' && step !== 'HISTORY' && (
            <button 
            onClick={handleBack}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1"
            >
            <ChevronDown className="h-4 w-4 rotate-90" /> Back
            </button>
          )}
          {(step === 'BOOKMARKS' || step === 'HISTORY') && (
            <button 
            onClick={() => setStep('SETUP')}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1"
            >
            <ChevronDown className="h-4 w-4 rotate-90" /> Back to Practice
            </button>
          )}
        </div>
      </div>

      {/* STEP 1: UNIFIED DASHBOARD (SETUP) */}
      {step === 'SETUP' && (
        <div className="animate-in fade-in">
           {/* Filters Bar */}
           <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between sticky top-24 z-20">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-300">Filters:</span>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none sm:w-48">
                        <select
                            value={configExam}
                            onChange={(e) => setConfigExam(e.target.value)}
                            className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-nigeria-500 focus:border-transparent cursor-pointer"
                        >
                            {exams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative flex-1 sm:flex-none sm:w-32">
                        <select
                            value={configYear}
                            onChange={(e) => setConfigYear(e.target.value)}
                            className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-nigeria-500 focus:border-transparent cursor-pointer"
                        >
                            {years.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
              </div>
           </div>

           {/* Subject Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
              {subjects.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSubjectClick(sub.name)}
                  className={`relative group p-6 rounded-2xl border transition-all text-left flex flex-col h-full 
                    ${selectedSubject === sub.name 
                        ? 'bg-nigeria-50 dark:bg-nigeria-900/20 border-nigeria-500 ring-2 ring-nigeria-500 shadow-md transform -translate-y-1' 
                        : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:border-nigeria-400 hover:shadow-lg hover:-translate-y-1'
                    }`}
                >
                  <div className="flex justify-between items-start mb-4 w-full">
                    <div className={`p-3 rounded-xl transition-colors ${selectedSubject === sub.name ? 'bg-white dark:bg-slate-800 text-nigeria-600' : sub.color.replace('bg-', 'dark:bg-opacity-20 ')}`}>
                       <sub.icon className="h-6 w-6" />
                    </div>
                    {selectedSubject === sub.name && <CheckCircle className="h-6 w-6 text-nigeria-600 animate-in zoom-in" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-nigeria-600 dark:group-hover:text-nigeria-400 transition-colors">{sub.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{sub.count} Questions</p>
                </button>
              ))}
           </div>

           {/* Sticky Config Panel */}
           <div className={`fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 z-40 ${selectedSubject ? 'translate-y-0' : 'translate-y-full'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Selected Info */}
                    <div className="hidden md:block">
                        <p className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-1">Ready to practice</p>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {selectedSubject} <span className="text-gray-300 dark:text-slate-600">•</span> {configExam} {configYear}
                        </h3>
                    </div>

                    {/* Config Toggles */}
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-lg w-full md:w-auto">
                            {(['Objectives', 'Theory'] as const).map(t => (
                                <button 
                                    key={t}
                                    onClick={() => setConfigType(t)}
                                    className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-md transition-all ${configType === t ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-lg w-full md:w-auto">
                            {(['Practice', 'Exam'] as const).map(m => (
                                <button 
                                    key={m}
                                    onClick={() => setConfigMode(m)}
                                    className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-md transition-all ${configMode === m ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'}`}
                                >
                                    {m === 'Practice' ? 'Study' : 'Exam'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Start Button */}
                    <button 
                        onClick={startSession}
                        className="w-full md:w-auto px-8 py-3.5 bg-nigeria-600 text-white font-bold rounded-xl shadow-lg hover:bg-nigeria-700 hover:shadow-nigeria-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95"
                    >
                        Start Session <Play className="h-5 w-5 fill-current" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* STEP 4: QUIZ INTERFACE */}
      {step === 'QUIZ' && (
        <div className="max-w-3xl mx-auto animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 overflow-hidden">
              {/* Quiz Header */}
              <div className="bg-gray-50 dark:bg-slate-950 px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10">
                 <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">{selectedSubject} ({configYear})</h2>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{configType} • {configMode}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    {configMode === 'Exam' && (
                      <div className={`flex items-center gap-2 font-mono font-bold ${examTimer < 300 ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-slate-300'}`}>
                         <Clock className="h-4 w-4" /> {formatTime(examTimer)}
                      </div>
                    )}
                    <div className="text-sm font-bold text-gray-600 dark:text-slate-400">
                       {currentQIndex + 1}/{currentQuestions.length}
                    </div>
                 </div>
              </div>

              <div className="p-6 md:p-8">
                 {/* OBJECTIVES */}
                 {configType === 'Objectives' && (
                   <>
                     {/* Question Text with Bookmark */}
                     <div className="flex items-start justify-between gap-4 mb-8">
                       <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed flex-1">
                         {(currentQuestions[currentQIndex] as Question).questionText}
                       </p>
                       <button
                         onClick={() => toggleBookmark((currentQuestions[currentQIndex] as Question).id)}
                         className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                           isBookmarked((currentQuestions[currentQIndex] as Question).id)
                             ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                             : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-slate-800'
                         }`}
                         title={isBookmarked((currentQuestions[currentQIndex] as Question).id) ? 'Remove bookmark' : 'Bookmark this question'}
                       >
                         <Bookmark className={`h-5 w-5 ${isBookmarked((currentQuestions[currentQIndex] as Question).id) ? 'fill-current' : ''}`} />
                       </button>
                     </div>
                     
                     {/* Options */}
                     <div className="space-y-3">
                        {(currentQuestions[currentQIndex] as Question).options.map((option, index) => {
                           let stateClass = "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800";
                           const question = currentQuestions[currentQIndex] as Question;
                           const isCorrect = index === question.correctAnswer;
                           const isSelected = getObjectiveSelection(question.id) === index;

                           // VISUAL INDICATORS REFINED
                           if (configMode === 'Exam') {
                               if (isSelected) {
                                   stateClass = "border-nigeria-600 bg-nigeria-50 dark:bg-nigeria-900/20 text-nigeria-900 dark:text-nigeria-100 ring-2 ring-nigeria-600";
                               }
                           } else {
                               // Study Mode Logic
                               if (showFeedback) {
                                   if (isCorrect) stateClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100 ring-2 ring-green-500";
                                   else if (isSelected) stateClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100 ring-2 ring-red-500";
                                   else stateClass = "opacity-50 grayscale"; // Dim incorrect options if not selected
                               } else if (isSelected) {
                                   stateClass = "border-nigeria-600 bg-nigeria-50 dark:bg-nigeria-900/20 text-nigeria-900 dark:text-nigeria-100 ring-2 ring-nigeria-600";
                               }
                           }

                           return (
                               <button
                                 key={index}
                                 onClick={() => handleOptionSelect(index)}
                                 disabled={showFeedback && configMode === 'Practice'} // Disable changes after feedback shown in practice mode
                                 className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${stateClass}`}
                               >
                                  <div className="flex items-center gap-4">
                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors
                                        ${isSelected || (showFeedback && isCorrect && configMode === 'Practice') 
                                           ? 'border-transparent bg-white/50' 
                                           : 'border-gray-300 dark:border-slate-600 text-gray-500 dark:text-slate-400 group-hover:border-gray-400'}
                                     `}>
                                        {String.fromCharCode(65 + index)}
                                     </div>
                                     <span className={(showFeedback && isCorrect && configMode === 'Practice') ? 'font-bold' : ''}>{option}</span>
                                  </div>
                                  
                                  {/* Feedback Icons */}
                                  {configMode === 'Practice' && showFeedback && isCorrect && <CheckCircle className="h-5 w-5 text-green-600 fill-green-100" />}
                                  {configMode === 'Practice' && showFeedback && isSelected && !isCorrect && <X className="h-5 w-5 text-red-600" />} 
                               </button>
                           );
                        })}
                     </div>
                     
                     {/* Explanation (Study Mode Only) */}
                     {configMode === 'Practice' && showFeedback && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 animate-in slide-in-from-top-2">
                             <h4 className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2 mb-2">
                                <Sparkles className="h-4 w-4" /> Explanation
                             </h4>
                             <p className="text-sm text-blue-800 dark:text-blue-300">
                                This is a placeholder explanation. In a real app, this would explain why option {String.fromCharCode(65 + (currentQuestions[currentQIndex] as Question).correctAnswer)} is the correct answer.
                             </p>
                        </div>
                     )}
                   </>
                 )}

                 {/* THEORY */}
                 {configType === 'Theory' && (
                   <>
                     <div className="flex items-start justify-between gap-4 mb-6">
                       <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed flex-1">
                         {/* @ts-ignore - TS thinks it might be objective question */}
                         {currentQuestions[currentQIndex].text}
                       </p>
                       <button
                         onClick={() => toggleBookmark(currentQuestions[currentQIndex].id)}
                         className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                           isBookmarked(currentQuestions[currentQIndex].id)
                             ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                             : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-slate-800'
                         }`}
                         title={isBookmarked(currentQuestions[currentQIndex].id) ? 'Remove bookmark' : 'Bookmark this question'}
                       >
                         <Bookmark className={`h-5 w-5 ${isBookmarked(currentQuestions[currentQIndex].id) ? 'fill-current' : ''}`} />
                       </button>
                     </div>
                     <textarea
                        value={getTheoryAnswer(currentQuestions[currentQIndex].id)}
                        onChange={(e) => handleTheoryInput(e.target.value)}
                        placeholder="Type your answer here..."
                        disabled={showFeedback}
                        className="w-full h-40 p-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 focus:ring-2 focus:ring-nigeria-500 focus:border-transparent resize-none mb-4 font-sans text-base"
                     ></textarea>
                     
                     {configMode === 'Practice' && showFeedback && (
                       <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-in slide-in-from-top-2">
                          <h4 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Model Answer:</h4>
                          {/* @ts-ignore */}
                          <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">{currentQuestions[currentQIndex].answer}</p>
                       </div>
                     )}
                   </>
                 )}
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                 <SimpleTooltip text="Flag this question for review if it seems incorrect.">
                    <button className="text-gray-500 dark:text-slate-400 font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" /> Report Issue
                    </button>
                 </SimpleTooltip>
                 
                 <div className="flex gap-3">
                    {/* Show Answer Button for Practice Mode (Theory) */}
                    {configMode === 'Practice' && configType === 'Theory' && !showFeedback && (
                       <SimpleTooltip text="Reveal the model answer immediately.">
                         <button 
                           onClick={() => setShowFeedback(true)}
                           className="px-6 py-3 rounded-xl font-bold bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                         >
                            Show Answer
                         </button>
                       </SimpleTooltip>
                    )}

                    <SimpleTooltip text={currentQIndex < currentQuestions.length - 1 ? "Save answer and move to the next question." : "Submit your answers and finish the session."}>
                        <button 
                        onClick={handleNext}
                        className="px-8 py-3 rounded-xl font-bold text-white bg-nigeria-600 hover:bg-nigeria-700 transition-all shadow-md flex items-center gap-2 transform active:scale-95"
                        >
                        {currentQIndex < currentQuestions.length - 1 ? 'Next' : 'Finish Session'} <ArrowRight className="h-4 w-4" />
                        </button>
                    </SimpleTooltip>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* STEP 5: RESULTS */}
      {step === 'RESULT' && (
        <div className="max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-300">
           <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-slate-800">
              <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-yellow-50 dark:ring-yellow-900/20">
                 <Trophy className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Session Complete!</h2>
              <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                 {configMode === 'Exam' ? "You've successfully submitted your exam. Here is a summary of your performance." : "Great job practicing! Consistency is the key to mastery."}
              </p>

              {configType === 'Objectives' ? (
                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20">
                      <p className="text-xs text-green-600 dark:text-green-400 uppercase font-bold tracking-wider mb-1">Score</p>
                      <p className="text-4xl font-black text-green-700 dark:text-green-400">
                        {Math.round((calculateScore() / SAMPLE_QUESTIONS.length) * 100)}%
                      </p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-500 mt-1">{calculateScore()} / {SAMPLE_QUESTIONS.length} Correct</p>
                   </div>
                   <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                      <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider mb-1">Time Spent</p>
                      <p className="text-4xl font-black text-blue-700 dark:text-blue-400">
                         {Math.floor((30 * 60 - examTimer) / 60)}<span className="text-xl">m</span> {(30 * 60 - examTimer) % 60}<span className="text-xl">s</span>
                      </p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-500 mt-1">Avg. 45s / question</p>
                   </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl mb-8 text-left">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" /> Theory Session Completed
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                        Since this is a theory session, we cannot auto-grade your answers instantly. 
                        Please review the model answers provided in the study mode or consult with a tutor.
                    </p>
                </div>
              )}

              <div className="space-y-3">
                 <button 
                   onClick={() => setStep('SETUP')}
                   className="w-full py-4 bg-nigeria-600 text-white font-bold rounded-xl shadow-lg hover:bg-nigeria-700 transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1"
                 >
                    <RotateCcw className="h-5 w-5" /> Start New Session
                 </button>
                 <button 
                   onClick={() => changeView(ViewState.DASHBOARD)}
                   className="w-full py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
                 >
                    Return to Dashboard
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* BOOKMARKS VIEW */}
      {step === 'BOOKMARKS' && (
        <div className="animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bookmarked Questions</h2>
              <select
                value={bookmarkFilter}
                onChange={(e) => setBookmarkFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Subjects</option>
                {Array.from(new Set(bookmarks.map(b => b.subject))).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            {bookmarks.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-slate-400">No bookmarked questions yet</p>
                <p className="text-sm text-gray-500 dark:text-slate-500 mt-2">Bookmark questions while practicing to review them later</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmarks
                  .filter(b => bookmarkFilter === 'all' || b.subject === bookmarkFilter)
                  .map((bookmark) => {
                    const question = SAMPLE_QUESTIONS.find(q => q.id === bookmark.questionId);
                    if (!question) return null;
                    return (
                      <div key={bookmark.questionId} className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-nigeria-600 dark:text-nigeria-400 bg-nigeria-50 dark:bg-nigeria-900/20 px-2 py-1 rounded">
                                {bookmark.subject}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-slate-400">
                                {bookmark.examType}
                              </span>
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium mb-2">{question.questionText}</p>
                            <div className="flex flex-wrap gap-2">
                              {question.options.map((opt, idx) => (
                                <span
                                  key={idx}
                                  className={`text-xs px-2 py-1 rounded ${
                                    idx === question.correctAnswer
                                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                                  }`}
                                >
                                  {String.fromCharCode(65 + idx)}. {opt}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => removeBookmark(bookmark.questionId)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Remove bookmark"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* HISTORY VIEW */}
      {step === 'HISTORY' && (
        <div className="animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Answered Questions History</h2>
              <select
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All</option>
                <option value="correct">Correct Only</option>
                <option value="incorrect">Incorrect Only</option>
                {Array.from(new Set(answeredQuestions.map(a => a.subject))).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            {answeredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-slate-400">No answered questions yet</p>
                <p className="text-sm text-gray-500 dark:text-slate-500 mt-2">Complete practice sessions to see your history here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {answeredQuestions
                  .filter(a => {
                    if (historyFilter === 'all') return true;
                    if (historyFilter === 'correct') return a.isCorrect;
                    if (historyFilter === 'incorrect') return !a.isCorrect;
                    return a.subject === historyFilter;
                  })
                  .map((answered, idx) => {
                    const question = SAMPLE_QUESTIONS.find(q => q.id === answered.questionId);
                    if (!question) return null;
                    return (
                      <div key={`${answered.questionId}-${idx}`} className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              answered.isCorrect
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                            }`}>
                              {answered.isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                            <span className="text-xs text-nigeria-600 dark:text-nigeria-400 bg-nigeria-50 dark:bg-nigeria-900/20 px-2 py-1 rounded">
                              {answered.subject}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-slate-400">
                              {new Date(answered.answeredAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium mb-3">{question.questionText}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">Your Answer</p>
                            <p className={`text-sm font-medium ${
                              answered.isCorrect
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-red-700 dark:text-red-400'
                            }`}>
                              {String.fromCharCode(65 + (answered.userAnswer as number))}. {question.options[answered.userAnswer as number]}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">Correct Answer</p>
                            <p className="text-sm font-medium text-green-700 dark:text-green-400">
                              {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {answeredQuestions.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-200">Performance Summary</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      {answeredQuestions.filter(a => a.isCorrect).length} correct out of {answeredQuestions.length} questions
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {Math.round((answeredQuestions.filter(a => a.isCorrect).length / answeredQuestions.length) * 100)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- DASHBOARD VIEW ---
export const DashboardView: React.FC<ViewProps & { isDarkMode?: boolean }> = ({ changeView, isDarkMode }) => {
  const activityData = [
    { day: 'Mon', score: 45 },
    { day: 'Tue', score: 55 },
    { day: 'Wed', score: 40 },
    { day: 'Thu', score: 65 },
    { day: 'Fri', score: 60 },
    { day: 'Sat', score: 75 },
    { day: 'Sun', score: 82 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
       <div className="mb-8">
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Chinedu! 👋</h1>
         <p className="text-gray-600 dark:text-slate-400">You're on a 3-day streak. Keep it up!</p>
       </div>

       <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400">
                  <Zap className="h-6 w-6" />
               </div>
               <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Daily Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3 Days</p>
               </div>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                  <Target className="h-6 w-6" />
               </div>
               <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Questions Solved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">142</p>
               </div>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                  <TrendingUp className="h-6 w-6" />
               </div>
               <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Avg. Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
               </div>
             </div>
          </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
             <h3 className="font-bold text-gray-900 dark:text-white mb-6">Performance Trend</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{fill: isDarkMode ? '#334155' : '#f1f5f9'}} 
                      />
                      <Bar dataKey="score" fill="#16a34a" radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
             <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
             <div className="space-y-3">
                <button onClick={() => changeView(ViewState.PRACTICE)} className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-left group">
                   <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <PenTool className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400" />
                   </div>
                   <div>
                      <p className="font-bold text-gray-900 dark:text-white">Resume Practice</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">Continue Physics 2023</p>
                   </div>
                </button>
                <button onClick={() => changeView(ViewState.PLANNER)} className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-left group">
                   <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                   </div>
                   <div>
                      <p className="font-bold text-gray-900 dark:text-white">AI Planner</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">Update your schedule</p>
                   </div>
                </button>
                <button onClick={() => changeView(ViewState.PRICING)} className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-left group">
                   <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <Crown className="h-5 w-5 text-yellow-500" />
                   </div>
                   <div>
                      <p className="font-bold text-gray-900 dark:text-white">Upgrade Plan</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">Get unlimited access</p>
                   </div>
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- PLANNER VIEW ---
import { Crown } from 'lucide-react'; // Import locally if needed, but it's available in imports

export const PlannerView: React.FC<ViewProps & { isDarkMode?: boolean }> = ({ changeView, isDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  
  // Form State
  const [exam, setExam] = useState('JAMB UTME');
  const [weakness, setWeakness] = useState('');
  const [hours, setHours] = useState(2);

  const handleGenerate = async (e: React.FormEvent) => {
     e.preventDefault();
     if(!weakness) return;
     
     setLoading(true);
     try {
       const result = await generateStudyPlan(exam, weakness, hours);
       setPlan(result);
     } catch (err) {
       console.error(err);
     } finally {
       setLoading(false);
     }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
       <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4">
             <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Smart Planner</h1>
          <p className="text-gray-600 dark:text-slate-400">
             Tell us your goals, and our Gemini-powered AI will build a custom timetable for you.
          </p>
       </div>

       <div className="grid md:grid-cols-12 gap-8">
          {/* Config Form */}
          <div className="md:col-span-5">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm sticky top-24">
                <form onSubmit={handleGenerate} className="space-y-6">
                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Target Exam</label>
                      <select 
                        value={exam} 
                        onChange={(e) => setExam(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                         <option>JAMB UTME</option>
                         <option>WAEC SSCE</option>
                         <option>NECO</option>
                      </select>
                   </div>
                   
                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Weak Subjects</label>
                      <input 
                        type="text" 
                        value={weakness}
                        onChange={(e) => setWeakness(e.target.value)}
                        placeholder="e.g. Physics, Calculus"
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate multiple subjects with commas.</p>
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Daily Study Hours: {hours}h</label>
                      <input 
                        type="range" 
                        min="1" 
                        max="8" 
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="w-full accent-purple-600 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                         <span>1h</span>
                         <span>8h</span>
                      </div>
                   </div>

                   <button 
                     type="submit" 
                     disabled={loading}
                     className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                      {loading ? 'Generating...' : 'Generate Plan'}
                   </button>
                </form>
             </div>
          </div>

          {/* Result Area */}
          <div className="md:col-span-7">
             {plan ? (
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm animate-in slide-in-from-bottom-4">
                   <div className="flex justify-between items-start mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
                      <div>
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Personal Plan</h3>
                         <p className="text-sm text-gray-500 dark:text-slate-400">Generated by Gemini AI</p>
                      </div>
                      <button className="text-gray-400 hover:text-purple-600 transition-colors">
                         <Copy className="h-5 w-5" />
                      </button>
                   </div>
                   <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-700 dark:text-slate-300 whitespace-pre-line">
                      {plan}
                   </div>
                   <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex gap-3">
                      <button className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm">
                         Save to Calendar
                      </button>
                      <button className="flex-1 py-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-bold hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm">
                         Regenerate
                      </button>
                   </div>
                </div>
             ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl bg-gray-50/50 dark:bg-slate-900/50">
                   <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <Calendar className="h-8 w-8 text-gray-300 dark:text-slate-600" />
                   </div>
                   <h3 className="font-bold text-gray-900 dark:text-white mb-2">No Plan Generated Yet</h3>
                   <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs">
                      Fill out the form on the left to get a study timetable tailored to your weak areas.
                   </p>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

// --- PRICING VIEW ---
export const PricingView: React.FC<ViewProps & { isDarkMode?: boolean }> = ({ changeView, isDarkMode }) => {
  const navigate = useNavigate();
  return (
    <div className="py-16 bg-white dark:bg-slate-950 animate-in fade-in">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
             <p className="text-xl text-gray-600 dark:text-slate-400">
                Start for free, upgrade when you're ready. No hidden fees.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {PRICING_PLANS.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${
                     plan.isRecommended 
                     ? 'border-nigeria-500 bg-white dark:bg-slate-900 shadow-2xl scale-105 z-10' 
                     : 'border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 hover:border-gray-300'
                  }`}
                >
                   {plan.isRecommended && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-nigeria-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                         Most Popular
                      </div>
                   )}
                   
                   <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                      <div className="mt-4 flex items-baseline">
                         <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{plan.price.split('/')[0]}</span>
                         {plan.price.includes('/') && <span className="text-gray-500 ml-1">/{plan.price.split('/')[1]}</span>}
                      </div>
                   </div>

                   <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, idx) => (
                         <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-slate-300">
                            <Check className="h-5 w-5 text-green-500 shrink-0" />
                            <span>{feature}</span>
                         </li>
                      ))}
                   </ul>

                   <button 
                     onClick={() => plan.id === 'study-group' ? navigate('/study-group') : changeView(ViewState.SIGNUP)}
                     className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                        plan.isRecommended 
                        ? 'bg-nigeria-600 text-white hover:bg-nigeria-700 shadow-lg' 
                        : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                     }`}
                   >
                      Choose {plan.name}
                   </button>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

// --- REFERRAL VIEW ---
export const ReferralView: React.FC<ViewProps> = ({ changeView }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-in fade-in">
       <div className="bg-gradient-to-b from-nigeria-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-3xl p-8 md:p-12 border border-nigeria-100 dark:border-slate-800 shadow-xl">
          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
             <Gift className="h-10 w-10 text-nigeria-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Invite Friends, Get Premium Free</h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
             Share your unique link. When your friends sign up, you both get 1 month of EduPrep Achiever plan for free!
          </p>

          <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center gap-2 max-w-md mx-auto mb-8 shadow-sm">
             <div className="flex-1 px-4 py-2 font-mono font-bold text-gray-800 dark:text-slate-200 tracking-wider text-lg">
                EDUPREP-CHINEDU-24
             </div>
             <button className="bg-nigeria-600 hover:bg-nigeria-700 text-white p-3 rounded-lg transition-colors">
                <Copy className="h-5 w-5" />
             </button>
          </div>

          <div className="flex justify-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" /> Share
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-xl font-bold hover:bg-blue-500 transition-colors">
                <Twitter className="h-5 w-5" /> Tweet
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors">
                <MessageCircle className="h-5 w-5" /> WhatsApp
             </button>
          </div>
       </div>
    </div>
  );
};

// --- PROFILE VIEW ---
export const ProfileView: React.FC<ViewProps> = ({ changeView }) => {
   return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in">
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
         
         <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-nigeria-500 to-green-400"></div>
            <div className="px-8 pb-8">
               <div className="relative -mt-12 mb-6">
                  <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full p-1.5 inline-block">
                     <div className="w-full h-full bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                        CO
                     </div>
                  </div>
                  <button className="absolute bottom-0 left-16 p-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-100 dark:border-slate-700 text-gray-500 hover:text-nigeria-600 transition-colors">
                     <Camera className="h-4 w-4" />
                  </button>
               </div>

               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-400 mb-1">First Name</label>
                        <input type="text" defaultValue="Chinedu" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-400 mb-1">Last Name</label>
                        <input type="text" defaultValue="Okafor" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-slate-400 mb-1">Email Address</label>
                     <input type="email" defaultValue="chinedu.o@example.com" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-slate-400 mb-1">Target Exam</label>
                     <select className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white">
                        <option>JAMB UTME</option>
                        <option>WAEC SSCE</option>
                        <option>NECO</option>
                     </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                     <button className="px-6 py-2.5 bg-nigeria-600 text-white font-bold rounded-lg hover:bg-nigeria-700 transition-colors">
                        Save Changes
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- SETTINGS VIEW ---
export const SettingsView: React.FC<ViewProps> = ({ changeView }) => {
   return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in">
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
         
         <div className="space-y-6">
            {/* Account Security */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
               <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-400" /> Security
               </h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                     <div>
                        <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                        <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                     </div>
                     <button className="text-sm font-bold text-nigeria-600 hover:text-nigeria-700">Update</button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-slate-800">
                     <div>
                        <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Add an extra layer of security</p>
                     </div>
                     <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
               <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-400" /> Notifications
               </h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                     <div>
                        <p className="font-medium text-gray-900 dark:text-white">Study Reminders</p>
                        <p className="text-xs text-gray-500">Daily alerts to keep you on track</p>
                     </div>
                     <div className="w-11 h-6 bg-nigeria-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-slate-800">
                     <div>
                        <p className="font-medium text-gray-900 dark:text-white">Weekly Progress Report</p>
                        <p className="text-xs text-gray-500">Get a summary of your performance</p>
                     </div>
                     <div className="w-11 h-6 bg-nigeria-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-900/20">
               <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Danger Zone
               </h3>
               <div className="flex items-center justify-between">
                   <div>
                      <p className="font-medium text-gray-900 dark:text-white">Delete Account</p>
                      <p className="text-xs text-gray-500">Permanently delete your data</p>
                   </div>
                   <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-red-600 font-bold rounded-lg text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      Delete
                   </button>
               </div>
            </div>
         </div>
      </div>
   );
};
