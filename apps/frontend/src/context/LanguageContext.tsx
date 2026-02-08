'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from '../translations';
import { DATA_BY_LANG } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
  getData: (key: keyof typeof DATA_BY_LANG['fr']) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on client only
  React.useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('mgs_language');
    if (saved === 'en' || saved === 'fr') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mgs_language', lang);
    }
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in language: ${language}`);
        return path;
      }
      current = current[key];
    }
    
    return current as string;
  };

  // Helper to fetch data objects (arrays) based on current language
  const getData = (key: keyof typeof DATA_BY_LANG['fr']) => {
    return DATA_BY_LANG[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

