'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { EnglishFlag, PashtoFlag, DariFlag } from '../ui/flags';

const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: EnglishFlag,
    direction: 'ltr'
  },
  {
    code: 'ps',
    name: 'Pashto',
    nativeName: 'پښتو',
    flag: PashtoFlag,
    direction: 'rtl'
  },
  {
    code: 'fa',
    name: 'Dari',
    nativeName: 'دری',
    flag: DariFlag,
    direction: 'rtl'
  }
];

// List of non-localized routes (control panel routes)
const nonLocalizedRoutes = [
  '/control-panel',
  '/control-panel/dashboard',
  '/control-panel/settings',
  '/control-panel/users',
  '/control-panel/admin'
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if current route is non-localized (control panel)
  const isNonLocalizedRoute = nonLocalizedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Extract current locale from pathname (only for localized routes)
  let currentLocale = 'ps'; // Default to Pashto
  
  if (!isNonLocalizedRoute) {
    const pathSegments = pathname.split('/').filter(segment => segment);
    currentLocale = pathSegments[0] && languages.some(lang => lang.code === pathSegments[0]) 
      ? pathSegments[0] 
      : 'ps';
  }

  const selectedLanguage = languages.find(lang => lang.code === currentLocale) || languages[1];
  
  // Determine dropdown position based on language direction
  const dropdownPosition = selectedLanguage.direction === 'rtl' ? 'left-0' : 'right-0';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language) => {
    setIsOpen(false);
    
    // If we're on a non-localized route (control panel), redirect to home with selected language
    if (isNonLocalizedRoute) {
      router.push(`/${language.code}`);
      return;
    }
    
    // For localized routes, replace the locale in the current path
    const segments = pathname.split('/').filter(segment => segment);
    
    // Remove existing locale if present
    if (segments.length > 0 && languages.some(lang => lang.code === segments[0])) {
      segments.shift(); // Remove the locale
    }
    
    // Build new path with selected locale
    const newPath = `/${language.code}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
    
    // Navigate to new path
    router.push(newPath);
  };

  const CheckIcon = () => (
    <svg className="w-4 h-4 text-blue-600 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const SelectedFlag = selectedLanguage.flag;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isNonLocalizedRoute 
            ? 'bg-gray-300 cursor-not-allowed opacity-50' 
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={() => !isNonLocalizedRoute && setIsOpen(!isOpen)}
        aria-label="Select language"
        disabled={isNonLocalizedRoute}
        title={isNonLocalizedRoute ? "Language switching not available in control panel" : "Select language"}
      >
        <SelectedFlag className="w-5 h-5" />
        {isNonLocalizedRoute && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
        )}
      </button>

      {isOpen && !isNonLocalizedRoute && (
        <div className={`absolute ${dropdownPosition} mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
          <div className="py-1">
            {languages.map((language) => {
              const FlagComponent = language.flag;
              return (
                <button
                  key={language.code}
                  className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150 ${
                    selectedLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  <FlagComponent className="w-5 h-5 me-3" />
                  <div className="flex flex-col items-start flex-1">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-xs text-gray-500">{language.nativeName}</span>
                  </div>
                  {selectedLanguage.code === language.code && <CheckIcon />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}