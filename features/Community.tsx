
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';

const mockPosts = [
    { id: 1, user: 'Arun Kumar', text: 'Can someone explain photosynthesis in simple terms?', avatar: 'https://picsum.photos/seed/Arun/40/40' },
    { id: 2, user: 'Priya Sharma', text: 'I\'m having trouble with calculus. Any good resources?', avatar: 'https://picsum.photos/seed/Priya/40/40' },
    { id: 3, user: 'Vijay R.', text: 'Just finished my exams! Good luck to everyone else!', avatar: 'https://picsum.photos/seed/Vijay/40/40' },
];

const Community: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { language } = context;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{getLocaleString('discussionBoard', language)}</h2>
      <div className="mb-6">
        <textarea
          placeholder={getLocaleString('askQuestion', language)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          rows={3}
        ></textarea>
        <button className="mt-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
          {getLocaleString('post', language)}
        </button>
      </div>

      <div className="space-y-4">
        {mockPosts.map(post => (
          <div key={post.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center mb-2">
              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full mr-3" />
              <span className="font-semibold text-gray-800 dark:text-white">{post.user}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
