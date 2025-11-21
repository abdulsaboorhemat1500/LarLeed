// components/TopBanner.jsx
'use client';
import { useTranslations } from '@/hooks/useTranslations';  
export default function TopBanner() {
  const { t } = useTranslations();
  return (
    <div className="pt-10 pb-5 bg-custom-sm border-b border-gray-200  py-4 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">
          {t("Banner.title")}
        </h1>
        <p className="pt-5 text-xl font-bold text-gray-600 dark:text-gray-300">
          {t("Banner.description")}
        </p>
      </div>
    </div>
  );
}