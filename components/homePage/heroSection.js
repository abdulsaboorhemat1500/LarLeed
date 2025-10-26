'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const [textData, setTextData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();
  const { t, currentLocale } = useTranslations();

  // Calculate isRTL based on current locale
  const isRTL = currentLocale === 'ps' || currentLocale === 'fa'; // Pashto and Dari are RTL

  const fetchTextData = async () => {
    try {
      setLoading(true);
      const result = await get('/api/heroSectionText');
      if (result.success && result.data.length > 0) {
        setTextData(result.data[0]);
      }
    } catch (error) {
      console.error('Error fetching text data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTextData();
  }, []);

  const shortText = textData?.seven_line_text || `No text data found`;

  // Determine text alignment based on locale
  const textAlignment = currentLocale === 'en' ? 'lg:text-start' : 'lg:text-end';
  const justifyAlignment = currentLocale === 'en' ? 'lg:justify-start' : 'lg:justify-end';

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-0 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Image Section - Always show first in DOM for RTL languages */}
            <div className={`flex-1 flex justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-end'} mt-8 lg:mt-0 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Main Image Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/hero-section-image.jpg"
                    alt="Hero Image"
                    width={400}
                    height={400}
                    className="w-full h-auto md:max-h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Introduction Section - Show second in DOM for RTL languages */}
            <div className={`flex-1 max-w-2xl ${isRTL ? 'lg:text-right lg:ps-12' : 'lg:text-left lg:pe-12'} text-center ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-black dark:text-white">{t('Banner.title')}</span>
              </h1>
              
              {/* Subtitle */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('HomePage.connecting afghan youth')}
                </span>
              </h1>

              {/* CTA Buttons */}
              <div className={`flex flex-col pt-6 sm:flex-row gap-4 ${isRTL ? 'justify-end' : 'justify-start'} lg:justify-start`}>
                <button 
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t('HomePage.read more')}
                </button>
              </div>

              
              <div className={`flex flex-wrap justify-between lg:justify-between gap-6 mt-12 pt-8 border-t pb-3 border-gray-200 dark:border-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">5k+</div>
                  <div className="text-gray-500 dark:text-gray-400">{t('HomePage.online education resources')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">100+</div>
                  <div className="text-gray-500 dark:text-gray-400">{t('HomePage.detailed scholarships guides')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1k+</div>
                  <div className="text-gray-500 dark:text-gray-400">{t('HomePage.mentors')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('HomePage.About LarLeed')}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="text-gray-600 rich-text-content" dangerouslySetInnerHTML={{ __html: textData.full_text }} />
              
              {/* Modal Footer */}
              <div className="flex justify-end pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  {t('HomePage.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}