'use client';

export const runtime = 'edge';
import { useTranslations } from '@/hooks/useTranslations';
export default function Donate(){
    const { t } = useTranslations();
    return (
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('HomePage.page under maintenance')}</h1>
        <p className="text-gray-600">{t('HomePage.this page is temporarily unavailable.')}</p>
      </div>
    </div>
  );
}