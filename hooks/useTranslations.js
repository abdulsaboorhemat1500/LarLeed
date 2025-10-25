"use client";

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
    if (!pathname) return;
    
    // Extract locale from pathname more efficiently
    const locale = pathname.split('/')[1];
    
    // Check if locale is valid
    if (locale && translations[locale]) {
      setCurrentLocale(locale);
    } else {
      setCurrentLocale('ps'); // Default fallback
    }
  }, [pathname]);

  const t = (key, fallback = '') => {
    if (!key || typeof key !== 'string') return fallback || '';
    
    const keys = key.split('.');
    let value = translations[currentLocale];
    
    // Safely navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${currentLocale}`);
        return fallback || key;
      }
    }
    
    return value || fallback || key;
  };

  return { t, currentLocale };
}