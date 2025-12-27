// components/TopBanner.jsx
'use client';
import { useTranslations } from '@/hooks/useTranslations';  
export default function TopBanner() {
  const { t } = useTranslations();
  return (
    <div className="pt-10 pb-5 bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-gray-200  py-4 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-custom-half mb-3">
          {t("Banner.title")}
        </h1>
        <p className="pt-5 text-xl font-bold text-gray-600 ">
          {t("Banner.description1")}
          <span className="pt-5 text-xl font-semibold text-gray-500 ">
            {t("Banner.description2")}
          </span>
        </p>
      </div>
    </div>
  );
}