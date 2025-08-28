
import type { Language } from '../types';

type LocaleStrings = {
  [key: string]: { [lang in Language]: string };
};

export const locales: LocaleStrings = {
  // App Name
  studentBuddy: { en: 'Student Buddy', ta: 'மாணவர் துணை' },

  // Features
  aiTutor: { en: 'Quick Revision AI Tutor', ta: 'விரைவு திருப்புதல் AI ஆசிரியர்' },
  planner: { en: 'Daily Planner', ta: 'தினசரி திட்டமிடுபவர்' },
  smartNotes: { en: 'Smart Notes', ta: 'ஸ்மார்ட் குறிப்புகள்' },
  examPrep: { en: 'Exam Prep Mode', ta: 'தேர்வு தயாரிப்பு முறை' },
  community: { en: 'Community Space', ta: 'சமூக இடம்' },

  // AI Tutor
  enterTopic: { en: 'Enter any topic...', ta: 'ஏதேனும் தலைப்பை உள்ளிடவும்...' },
  getSummary: { en: 'Get Summary', ta: 'சுருக்கம் பெறுக' },
  getQA: { en: 'Get Q&A', ta: 'கேள்வி பதில் பெறுக' },
  generating: { en: 'Generating...', ta: 'உருவாக்குகிறது...' },
  aiResponse: { en: 'AI Response', ta: 'AI பதில்' },
  
  // Planner
  todoList: { en: 'To-Do List', ta: 'செய்ய வேண்டியவை பட்டியல்' },
  addTask: { en: 'Add a new task...', ta: 'புதிய பணியைச் சேர்க்கவும்...' },
  add: { en: 'Add', ta: 'சேர்' },
  timetable: { en: 'Timetable', ta: 'கால அட்டவணை' },
  motivationalQuote: { en: 'Motivational Quote', ta: 'ஊக்கமூட்டும் மேற்கோள்' },

  // Smart Notes
  pasteNotes: { en: 'Paste your notes here...', ta: 'உங்கள் குறிப்புகளை இங்கே ஒட்டவும்...' },
  summarize: { en: 'Summarize', ta: 'சுருக்கமாக' },
  summarizedNotes: { en: 'Summarized Notes', ta: 'சுருக்கமான குறிப்புகள்' },
  downloadPdf: { en: 'Download as PDF', ta: 'PDF ஆக பதிவிறக்கவும்' },
  
  // Exam Prep
  flashcards: { en: 'Flashcards', ta: 'ஃபிளாஷ் கார்டுகள்' },
  mcqs: { en: 'Multiple Choice Questions', ta: 'பல தேர்வு கேள்விகள்' },
  flip: { en: 'Flip', ta: 'புரட்டவும்' },
  next: { en: 'Next', ta: 'அடுத்தது' },

  // Community
  discussionBoard: { en: 'Discussion Board', ta: 'கலந்துரையாடல் பலகை' },
  askQuestion: { en: 'Ask a question...', ta: 'ஒரு கேள்வியைக் கேளுங்கள்...' },
  post: { en: 'Post', ta: 'பதிவு' },

  // Header & User
  welcome: { en: 'Welcome', ta: 'வரவேற்கிறோம்' },
  aiRequestsLeft: { en: 'AI Requests Left:', ta: 'மீதமுள்ள AI கோரிக்கைகள்:' },
  upgradeToPremium: { en: 'Upgrade to Premium', ta: 'பிரீமியத்திற்கு மேம்படுத்தவும்' },

  // Upgrade Modal
  premiumPlan: { en: 'Premium Plan', ta: 'பிரீமியம் திட்டம்' },
  premiumFeatures: { en: 'Get access to exclusive features:', ta: 'பிரத்தியேக அம்சங்களுக்கான அணுகலைப் பெறுங்கள்:' },
  fiftyRequests: { en: '50 AI requests/day', ta: 'தினமும் 50 AI கோரிக்கைகள்' },
  unlimitedNotes: { en: 'Unlimited notes & planner', ta: 'வரம்பற்ற குறிப்புகள் & திட்டமிடுபவர்' },
  just99: { en: 'Just ₹99/month', ta: 'மாதம் ₹99 மட்டும்' },
  upgradeNow: { en: 'Upgrade Now', ta: 'இப்போதே மேம்படுத்து' },
  close: { en: 'Close', ta: 'மூடு' },
  redirecting: { en: 'Redirecting to payment gateway...', ta: 'கட்டண நுழைவாயிலுக்கு திருப்பி விடப்படுகிறது...' }
};

export const getLocaleString = (key: string, lang: Language): string => {
  return locales[key]?.[lang] || key;
};
