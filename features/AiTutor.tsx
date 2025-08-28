
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';
import { geminiService } from '../services/geminiService';

const AiTutor: React.FC = () => {
  const context = useContext(AppContext);
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!context) return null;
  const { language, user, setUser } = context;

  const handleRequest = async (type: 'summary' | 'qa') => {
    if (!topic || isLoading || user.aiRequestsLeft <= 0) return;

    setIsLoading(true);
    setResponse('');
    
    try {
      const result = type === 'summary' 
        ? await geminiService.getSummary(topic, language) 
        : await geminiService.getQA(topic, language);
      setResponse(result);
      setUser(prev => ({ ...prev, aiRequestsLeft: prev.aiRequestsLeft - 1 }));
    } catch (error) {
      console.error("API call failed:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {getLocaleString('aiTutor', language)}
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={getLocaleString('enterTopic', language)}
          className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <div className="flex gap-2 justify-center">
            <button
                onClick={() => handleRequest('summary')}
                disabled={isLoading || user.aiRequestsLeft <= 0}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? getLocaleString('generating', language) : getLocaleString('getSummary', language)}
            </button>
            <button
                onClick={() => handleRequest('qa')}
                disabled={isLoading || user.aiRequestsLeft <= 0}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? getLocaleString('generating', language) : getLocaleString('getQA', language)}
            </button>
        </div>
      </div>
      {user.aiRequestsLeft <= 0 && <p className="text-red-500 mt-2 text-center">You have no AI requests left. Please upgrade to premium.</p>}

      {(isLoading || response) && (
        <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 min-h-[100px]">
          <h3 className="text-lg font-semibold mb-2">{getLocaleString('aiResponse', language)}</h3>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{response}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AiTutor;
