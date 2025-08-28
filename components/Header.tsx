
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';
import UpgradeModal from './UpgradeModal';
import type { Language } from '../types';

const Header: React.FC = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!context) return null;

  const { user, language, setLanguage, setUser } = context;

  const handleLanguageToggle = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'ta' : 'en'));
  };

  const handleUpgradeClick = () => {
    setIsModalOpen(true);
  };
  
  const handleSuccessfulUpgrade = () => {
      setUser({
          ...user,
          isPremium: true,
          aiRequestsLeft: 50
      });
      setIsModalOpen(false);
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-md">
      <h1 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        {getLocaleString('studentBuddy', language)}
      </h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{getLocaleString('aiRequestsLeft', language)}</span>
          <span className={`px-2 py-1 text-sm font-bold rounded-full ${user.aiRequestsLeft > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {user.aiRequestsLeft}
          </span>
        </div>

        {!user.isPremium && (
          <button
            onClick={handleUpgradeClick}
            className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
          >
            <i className="fas fa-crown mr-2"></i>
            {getLocaleString('upgradeToPremium', language)}
          </button>
        )}

        <button
          onClick={handleLanguageToggle}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {language === 'en' ? 'தமிழ்' : 'English'}
        </button>

        <div className="flex items-center space-x-2">
          <img src={`https://picsum.photos/seed/${user.name}/40/40`} alt="User Avatar" className="w-8 h-8 rounded-full"/>
          <span className="hidden lg:inline text-sm font-medium">{getLocaleString('welcome', language)}, {user.name}</span>
        </div>
      </div>
      {isModalOpen && <UpgradeModal onClose={() => setIsModalOpen(false)} onUpgrade={handleSuccessfulUpgrade}/>}
    </header>
  );
};

export default Header;
