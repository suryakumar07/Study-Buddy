
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';
import { geminiService } from '../services/geminiService';

const SmartNotes: React.FC = () => {
  const context = useContext(AppContext);
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!context) return null;
  const { language, user, setUser } = context;

  const handleSummarize = async () => {
    if (!notes || isLoading || user.aiRequestsLeft <= 0) return;
    
    setIsLoading(true);
    setSummary('');

    try {
      const result = await geminiService.summarizeNotes(notes, language);
      setSummary(result);
      setUser(prev => ({...prev, aiRequestsLeft: prev.aiRequestsLeft - 1}));
    } catch (error) {
      console.error("API call failed:", error);
      setSummary("An error occurred during summarization.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownloadPdf = () => {
      alert("PDF download functionality is for demonstration purposes.");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{getLocaleString('smartNotes', language)}</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={getLocaleString('pasteNotes', language)}
          className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        ></textarea>
        <button
          onClick={handleSummarize}
          disabled={isLoading || user.aiRequestsLeft <= 0}
          className="mt-4 w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? getLocaleString('generating', language) : getLocaleString('summarize', language)}
        </button>
         {user.aiRequestsLeft <= 0 && <p className="text-red-500 mt-2 text-center">You have no AI requests left. Please upgrade to premium.</p>}
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{getLocaleString('summarizedNotes', language)}</h2>
        <div className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{summary || 'Summary will appear here...'}</p>
          )}
        </div>
        <button 
          onClick={handleDownloadPdf}
          disabled={!summary}
          className="mt-4 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
        >
          {getLocaleString('downloadPdf', language)}
        </button>
      </div>
    </div>
  );
};

export default SmartNotes;
