
export type Language = 'en' | 'ta';

export type Feature = 'tutor' | 'planner' | 'notes' | 'exam' | 'community';

export interface User {
  name: string;
  isPremium: boolean;
  aiRequestsLeft: number;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
}
