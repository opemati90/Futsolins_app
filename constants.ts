import { PricingPlan, Testimonial, Question } from './types';

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
  }
];

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