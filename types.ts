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
  SETTINGS = 'SETTINGS',
  COMPETITION = 'COMPETITION',
  ADMISSION_HUB = 'ADMISSION_HUB',
  COMMUNITY = 'COMMUNITY',
  STUDY_GROUP = 'STUDY_GROUP'
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

// Competition Types
export interface Competition {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  prizePool: number;
  entryFee: number;
  subjects: string[];
  participants: number;
  status: 'upcoming' | 'active' | 'ended';
}

export interface CompetitionEntry {
  competitionId: string;
  userId: string;
  subjects: string[];
  paymentStatus: 'pending' | 'completed';
  score?: number;
  rank?: number;
}

// Practice Enhancements
export interface Bookmark {
  questionId: number;
  subject: string;
  examType: string;
  createdAt: Date;
}

export interface AnsweredQuestion {
  questionId: number;
  subject: string;
  examType: string;
  userAnswer: number | string;
  correctAnswer: number | string;
  isCorrect: boolean;
  answeredAt: Date;
}

// Admission & Visa Hub
export interface AdmissionApplication {
  id: string;
  userId: string;
  targetCountry: string;
  targetUniversity: string;
  program: string;
  status: 'draft' | 'submitted' | 'under-review' | 'accepted' | 'rejected';
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VisaApplication {
  id: string;
  userId: string;
  country: string;
  visaType: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Community Types
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  createdAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  upvotes: number;
  downvotes: number;
  parentId?: string; // For nested comments
  createdAt: Date;
  replies?: Comment[];
}

export interface ChatRoom {
  id: string;
  name: string;
  subject: string;
  members: string[];
  messages: ChatMessage[];
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

// Study Group Types
export interface StudyGroup {
  id: string;
  name: string;
  creatorId: string;
  inviteCode: string;
  members: StudyGroupMember[];
  status: 'pending' | 'active' | 'expired';
  subscriptionEndDate: Date;
  createdAt: Date;
}

export interface StudyGroupMember {
  userId: string;
  userName: string;
  email: string;
  joinedAt: Date;
  status: 'invited' | 'accepted';
}