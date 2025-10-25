'use client';
import { useRouter } from 'next/navigation';

import { useTranslations } from '@/hooks/useTranslations';

export default function BackButton() {
  const router = useRouter();
  const { t } = useTranslations();

  return (
    <div className="px-4 py-4 ">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-medium">{t('RoshangariPage.back to previous')}</span>
      </button>
    </div>
  );
}