import { PricingPlan, Testimonial, Question, Competition, Post, ChatRoom } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Chioma Okeke",
    role: "Medical Student, UNILAG",
    text: "EduPrep changed the game for me. The personalized study plan helped me score 310 in JAMB!",
    exam: "JAMB UTME"
  },
  {
    id: 2,
    name: "Ibrahim Musa",
    role: "Engineering Aspirant",
    text: "The past questions feature is exactly like the real thing. I felt so confident walking into the exam hall.",
    exam: "WAEC"
  },
  {
    id: 3,
    name: "Funke Adebayo",
    role: "Law Student, UI",
    text: "I loved the referral program. I got premium access just by inviting my study group.",
    exam: "Post-UTME"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Basic',
    price: '₦0',
    features: [
      'Access to 5 years past questions',
      'Basic progress tracking',
      'Community forum access',
      'Limited daily practice'
    ]
  },
  {
    id: 'pro',
    name: 'Achiever',
    price: '₦2,500/mo',
    features: [
      'Unlimited past questions (20 years)',
      'AI-Powered Smart Study Plan',
      'Detailed performance analytics',
      'Priority expert support',
      'Offline mode download'
    ],
    isRecommended: true
  },
  {
    id: 'team',
    name: 'Group Bundle',
    price: '₦8,000/mo',
    features: [
      'Access for up to 5 friends',
      'Group challenges & leaderboards',
      'All Achiever features included',
      'Dedicated mentor chat'
    ]
  },
  {
    id: 'study-group',
    name: 'Study Group Plan',
    price: `₦${STUDY_GROUP_PRICE.toLocaleString()}`,
    features: [
      'Perfect for 3 friends',
      'Shared premium access',
      'Group study sessions',
      'All Achiever features',
      '30-day subscription'
    ]
  }
];

// Study Group Pricing (defined before PRICING_PLANS to avoid reference error)
export const STUDY_GROUP_PRICE = 15000; // ₦15,000 for 3 users

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: "Mathematics",
    questionText: "If 2x + 5 = 15, what is the value of x?",
    options: ["2", "5", "10", "15"],
    correctAnswer: 1
  },
  {
    id: 2,
    subject: "English",
    questionText: "Choose the option that best completes the gap: The man was charged ______ murder.",
    options: ["for", "with", "at", "on"],
    correctAnswer: 1
  },
  {
    id: 3,
    subject: "Physics",
    questionText: "Which of the following is a scalar quantity?",
    options: ["Velocity", "Acceleration", "Mass", "Force"],
    correctAnswer: 2
  }
];

// JAMB Subjects (English is always compulsory)
export const JAMB_SUBJECTS = [
  "English Language", // Always compulsory
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature in English",
  "Geography",
  "History",
  "Commerce",
  "Accounting",
  "Agricultural Science",
  "Computer Studies",
  "French",
  "Igbo",
  "Yoruba",
  "Hausa",
  "Christian Religious Studies",
  "Islamic Religious Studies"
];

// Mock Competitions - lazy initialization to avoid SSR issues
let _mockCompetitions: Competition[] | null = null;
export const getMockCompetitions = (): Competition[] => {
  if (!_mockCompetitions) {
    _mockCompetitions = [
      {
        id: 'comp-1',
        title: 'JAMB Excellence Challenge 2024',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-29'),
        prizePool: 500000,
        entryFee: 10000,
        subjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
        participants: 1247,
        status: 'active'
      },
      {
        id: 'comp-2',
        title: 'Science & Tech Competition',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-31'),
        prizePool: 750000,
        entryFee: 10000,
        subjects: ['English Language', 'Mathematics', 'Physics', 'Computer Studies'],
        participants: 0,
        status: 'upcoming'
      },
      {
        id: 'comp-3',
        title: 'Arts & Humanities Challenge',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        prizePool: 300000,
        entryFee: 10000,
        subjects: ['English Language', 'Literature', 'Government', 'History'],
        participants: 856,
        status: 'ended'
      }
    ];
  }
  return _mockCompetitions;
};
// Export as getter - will be called when needed
export const MOCK_COMPETITIONS = typeof window !== 'undefined' ? getMockCompetitions() : [];

// Forum Categories
export const FORUM_CATEGORIES = [
  'JAMB',
  'WAEC',
  'NECO',
  'Post-UTME',
  'Study Tips',
  'General Discussion',
  'Subject Help',
  'Success Stories'
];

// Mock Forum Posts - lazy initialization to avoid SSR issues
let _mockPosts: Post[] | null = null;
export const getMockPosts = (): Post[] => {
  if (!_mockPosts) {
    _mockPosts = [
      {
        id: 'post-1',
        authorId: 'user-1',
        authorName: 'Chioma Okeke',
        title: 'How I scored 320 in JAMB - My Study Strategy',
        content: 'I want to share my study strategy that helped me score 320 in JAMB. The key was consistency and using past questions effectively...',
        category: 'Success Stories',
        upvotes: 45,
        downvotes: 2,
        commentCount: 12,
        createdAt: new Date('2024-01-15'),
        comments: []
      },
      {
        id: 'post-2',
        authorId: 'user-2',
        authorName: 'Ibrahim Musa',
        title: 'Best Physics Topics to Focus On',
        content: 'For those preparing for JAMB Physics, here are the most frequently tested topics based on my analysis of past questions...',
        category: 'Subject Help',
        upvotes: 32,
        downvotes: 1,
        commentCount: 8,
        createdAt: new Date('2024-01-20'),
        comments: []
      }
    ];
  }
  return _mockPosts;
};
// Export as getter - will be called when needed
export const MOCK_POSTS = typeof window !== 'undefined' ? getMockPosts() : [];

// Mock Chat Rooms - lazy initialization to avoid SSR issues
let _mockChatRooms: ChatRoom[] | null = null;
export const getMockChatRooms = (): ChatRoom[] => {
  if (!_mockChatRooms) {
    _mockChatRooms = [
      {
        id: 'room-1',
        name: 'JAMB Mathematics',
        subject: 'Mathematics',
        members: ['user-1', 'user-2', 'user-3'],
        messages: [],
        createdAt: new Date('2024-01-10')
      },
      {
        id: 'room-2',
        name: 'Physics Study Group',
        subject: 'Physics',
        members: ['user-1', 'user-4'],
        messages: [],
        createdAt: new Date('2024-01-12')
      }
    ];
  }
  return _mockChatRooms;
};
// Export as getter - will be called when needed
export const MOCK_CHAT_ROOMS = typeof window !== 'undefined' ? getMockChatRooms() : [];