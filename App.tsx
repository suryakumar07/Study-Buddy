
import React, { useState, useMemo } from 'react';
import { AppContext } from './context/AppContext';
import type { User, Language, Feature } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    isPremium: false,
    aiRequestsLeft: 5,
    name: 'Guest User'
  });
  const [language, setLanguage] = useState<Language>('en');
  const [activeFeature, setActiveFeature] = useState<Feature>('tutor');

  const appContextValue = useMemo(() => ({
    user,
    setUser,
    language,
    setLanguage,
    activeFeature,
    setActiveFeature,
  }), [user, language, activeFeature]);

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <Dashboard />
            </div>
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
