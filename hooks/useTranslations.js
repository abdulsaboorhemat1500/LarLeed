import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Import translation files
import enTranslations from '../messages/en.json';
import psTranslations from '../messages/ps.json';
import faTranslations from '../messages/fa.json';

const translations = {
  en: enTranslations,
  ps: psTranslations,
  fa: faTranslations
};

export function useTranslations() {
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState('ps');

  useEffect(() => {
    // Extract locale from pathname
    const segments = pathname.split('/').filter(segment => segment);
    const locale = segments[0];
    
    // Check if locale is valid
    if (locale && ['en', 'ps', 'fa'].includes(locale)) {
      setCurrentLocale(locale);
    } else {
      setCurrentLocale('ps');
    }
  }, [pathname]);

  const t = (key, fallback = '') => {
    const keys = key.split('.');
    let value = translations[currentLocale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return value || fallback || key;
  };

  return { t, currentLocale };
}