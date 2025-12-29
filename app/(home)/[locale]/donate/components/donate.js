"use client";
import { useState, useEffect, useMemo } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useParams } from "next/navigation";
import Lottie from "lottie-react";
import Donate from "@/components/lottie-files/Donate.json";

export default function DonateSection() {
  const [threeSectionTexts, setThreeSectionTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();
  const { locale } = useParams();

  // Normalize locale to match database field suffixes
  const normalizedLocale = useMemo(() => {
    const localeMap = {
      en: "english",
      ps: "pashto",
      fa: "dari",
    };
    return localeMap[locale] || "english";
  }, [locale]);

  const getTexts = async () => {
    try {
      const result = await get("/api/threesectiontexts");
      if (result.success) {
        setThreeSectionTexts(result.data || []);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTexts();
  }, []);

  // Get the first text entry
  const currentText =
    threeSectionTexts.length > 0 ? threeSectionTexts[0] : null;

  // Helper function to get the appropriate language field for donate
  const getLocalizedDonateText = () => {
    if (!currentText) return "";

    const fieldName = `donate_${normalizedLocale}`;
    const englishField = "donate_english";

    // Try the localized field first, then fallback to English
    return currentText[fieldName] || currentText[englishField] || "";
  };

  const donateText = getLocalizedDonateText();

  if (loading) {
    return (
      <section
        id="donate"
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section
      id="donate"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Design */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-custom-half rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-custom-half rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-400 rounded-full opacity-20"></div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-blue-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 border-2 border-indigo-200 rounded-full opacity-20"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-0 relative z-10">
          {/* Content Section */}
          <div className="flex-1 max-w-2xl text-center lg:text-left lg:pe-12">
            {/* Language indicator */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Donate About Mission
              </h1>
            </div>

            {/* Donate Content */}
            {donateText ? (
              <div className="mb-8">
                <div
                  className="text-gray-700 leading-relaxed text-lg prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-p:text-gray-700 
                    prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700
                    prose-ul:text-gray-700 prose-ol:text-gray-700
                    prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:text-custom-half
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                    prose-p:mb-4"
                  dangerouslySetInnerHTML={{
                    __html: donateText,
                  }}
                />
              </div>
            ) : (
              <div className="mb-8">
                <div className="text-center py-8">
                  <h1 className="text-4xl font-bold text-custom-half mb-4">
                    No Data found
                  </h1>
                </div>
              </div>
            )}

            {/* Donate Now Button */}
            <div className="mt-8">
              <button className="cursor-pointer bg-custom-half text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
