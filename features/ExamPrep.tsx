
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';
import type { Flashcard, MCQ } from '../types';

const mockFlashcards: { en: Flashcard[], ta: Flashcard[] } = {
  en: [
    { question: 'What is the powerhouse of the cell?', answer: 'Mitochondria' },
    { question: 'What is H2O?', answer: 'Water' },
    { question: 'Capital of France?', answer: 'Paris' },
  ],
  ta: [
    { question: 'செல்லின் ஆற்றல் மையம் எது?', answer: 'மைட்டோகாண்ட்ரியா' },
    { question: 'H2O என்றால் என்ன?', answer: 'தண்ணீர்' },
    { question: 'பிரான்சின் தலைநகரம்?', answer: 'பாரிஸ்' },
  ]
};

const mockMCQs: { en: MCQ[], ta: MCQ[] } = {
  en: [
    { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Mars' },
    { question: 'What is the largest mammal?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippo'], correctAnswer: 'Blue Whale' },
  ],
  ta: [
    { question: 'செவ்வாய் கிரகம் என்று அழைக்கப்படும் கிரகம் எது?', options: ['பூமி', 'செவ்வாய்', 'வியாழன்', 'சனி'], correctAnswer: 'செவ்வாய்' },
    { question: 'மிகப்பெரிய பாலூட்டி எது?', options: ['யானை', 'நீலத் திமிங்கலம்', 'ஒட்டகச்சிவிங்கி', 'நீர்யானை'], correctAnswer: 'நீலத் திமிங்கலம்' },
  ]
};

const ExamPrep: React.FC = () => {
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<'flashcards' | 'mcqs'>('flashcards');
  
  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // MCQ state
  const [mcqIndex, setMcqIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!context) return null;
  const { language } = context;

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % mockFlashcards[language].length);
  };

  const handleNextMcq = () => {
    setSelectedOption(null);
    setMcqIndex((prev) => (prev + 1) % mockMCQs[language].length);
  };
  
  const currentCard = mockFlashcards[language][cardIndex];
  const currentMcq = mockMCQs[language][mcqIndex];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button onClick={() => setActiveTab('flashcards')} className={`px-4 py-2 font-semibold ${activeTab === 'flashcards' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}>{getLocaleString('flashcards', language)}</button>
        <button onClick={() => setActiveTab('mcqs')} className={`px-4 py-2 font-semibold ${activeTab === 'mcqs' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}>{getLocaleString('mcqs', language)}</button>
      </div>

      {activeTab === 'flashcards' && (
        <div className="text-center">
            <div className="w-full h-64 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center p-4 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                <p className="text-2xl font-bold">{isFlipped ? currentCard.answer : currentCard.question}</p>
            </div>
            <div className="mt-4 flex gap-4 justify-center">
                <button onClick={() => setIsFlipped(!isFlipped)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">{getLocaleString('flip', language)}</button>
                <button onClick={handleNextCard} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{getLocaleString('next', language)}</button>
            </div>
        </div>
      )}

      {activeTab === 'mcqs' && (
        <div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
                <p className="text-xl font-semibold">{currentMcq.question}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentMcq.options.map(option => {
                    const isCorrect = selectedOption && option === currentMcq.correctAnswer;
                    const isWrong = selectedOption && selectedOption === option && option !== currentMcq.correctAnswer;
                    
                    let buttonClass = 'p-4 rounded-lg border-2 text-left transition-colors ';
                    if (isCorrect) {
                        buttonClass += 'bg-green-100 dark:bg-green-900 border-green-500';
                    } else if (isWrong) {
                        buttonClass += 'bg-red-100 dark:bg-red-900 border-red-500';
                    } else {
                        buttonClass += 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700';
                    }
                    
                    return (
                        <button key={option} onClick={() => setSelectedOption(option)} disabled={!!selectedOption} className={buttonClass}>
                            {option}
                        </button>
                    );
                })}
            </div>
             <div className="mt-4 flex justify-end">
                <button onClick={handleNextMcq} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{getLocaleString('next', language)}</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ExamPrep;
