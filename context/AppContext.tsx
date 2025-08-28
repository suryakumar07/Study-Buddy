
import { createContext } from 'react';
import type { User, Language, Feature } from '../types';

interface IAppContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  activeFeature: Feature;
  setActiveFeature: React.Dispatch<React.SetStateAction<Feature>>;
}

export const AppContext = createContext<IAppContext | null>(null);
