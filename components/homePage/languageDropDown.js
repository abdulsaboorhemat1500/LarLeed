'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { EnglishFlag, PashtoFlag, DariFlag } from '../ui/flags';

const languages = [
  {
    code: 'ps',
    name: 'Pashto',
    nativeName: 'پښتو',
    flag: PashtoFlag
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: EnglishFlag
  },
  {
    code: 'fa',
    name: 'Dari',
    nativeName: 'دری',
    flag: DariFlag
  }
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname, default to 'ps' (Pashto)
  const currentLocale = pathname.split('/')[1] || 'ps';
  const selectedLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

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
    
    // Replace the locale in the current pathname
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = language.code; // Replace the locale segment
    } else {
      segments.unshift(language.code); // Add locale if not present
    }
    const newPathname = segments.join('/');
    
    router.push(newPathname);
  };

  const CheckIcon = () => (
    <svg className="w-4 h-4 text-blue-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const SelectedFlag = selectedLanguage.flag;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <SelectedFlag className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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
                  <FlagComponent className="w-5 h-5 mr-3" />
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