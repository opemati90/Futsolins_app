export enum ViewState {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  DASHBOARD = 'DASHBOARD',
  PRACTICE = 'PRACTICE',
  PLANNER = 'PLANNER',
  PRICING = 'PRICING',
  REFERRAL = 'REFERRAL',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS'
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  exam: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isRecommended?: boolean;
}

export interface PerformanceData {
  subject: string;
  score: number;
  fullMark: number;
  date: string;
}

export interface Question {
  id: number;
  subject: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}