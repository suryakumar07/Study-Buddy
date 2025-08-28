
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';

interface UpgradeModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onUpgrade }) => {
  const context = useContext(AppContext);
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (!context) return null;
  const { language } = context;
  
  const handleUpgrade = () => {
      setIsRedirecting(true);
      setTimeout(() => {
          onUpgrade();
      }, 2000);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-sm w-full mx-4">
        <div className="text-center">
            <i className="fas fa-crown text-4xl text-yellow-500 mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">{getLocaleString('premiumPlan', language)}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{getLocaleString('premiumFeatures', language)}</p>
        </div>

        <ul className="space-y-4 mb-8">
            <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span>{getLocaleString('fiftyRequests', language)}</span>
            </li>
            <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span>{getLocaleString('unlimitedNotes', language)}</span>
            </li>
        </ul>

        <div className="text-center text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
            {getLocaleString('just99', language)}
        </div>
        
        {isRedirecting ? (
             <div className="text-center text-blue-500 font-semibold">
                {getLocaleString('redirecting', language)}
             </div>
        ) : (
            <div className="flex flex-col gap-2">
                <button onClick={handleUpgrade} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                    {getLocaleString('upgradeNow', language)}
                </button>
                <button onClick={onClose} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                    {getLocaleString('close', language)}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default UpgradeModal;
