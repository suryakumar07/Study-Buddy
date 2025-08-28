
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';
import type { Feature } from '../types';
import { BookOpenIcon, ClipboardListIcon, AcademicCapIcon, LightBulbIcon, UsersIcon } from './icons/Icons';

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) return null;

  const { activeFeature, setActiveFeature, language } = context;

  const navItems: { id: Feature; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'tutor', labelKey: 'aiTutor', icon: <LightBulbIcon /> },
    { id: 'planner', labelKey: 'planner', icon: <ClipboardListIcon /> },
    { id: 'notes', labelKey: 'smartNotes', icon: <BookOpenIcon /> },
    { id: 'exam', labelKey: 'examPrep', icon: <AcademicCapIcon /> },
    { id: 'community', labelKey: 'community', icon: <UsersIcon /> },
  ];

  return (
    <nav className="w-16 md:w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
            <i className="fas fa-user-graduate text-3xl text-indigo-600 dark:text-indigo-400"></i>
        </div>
        <ul>
          {navItems.map(item => (
            <li key={item.id} className="mt-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveFeature(item.id); }}
                className={`flex items-center py-3 px-4 md:px-6 transition-colors duration-200 ${
                  activeFeature === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 border-r-4 border-indigo-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="mx-4 font-medium hidden md:inline">{getLocaleString(item.labelKey, language)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
