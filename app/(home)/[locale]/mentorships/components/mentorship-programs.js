"use client";
import { useState, useEffect, useMemo } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useParams } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";
import SocialMediaSection from "@/components/homePage/socialmedia";
import ScholarshipFormModal from "./scholarship-form";

export const runtime = "edge";

export default function MentorshipPage() {
  const [threeSectionTexts, setThreeSectionTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();
  const { locale } = useParams();
  const { t } = useTranslations();
  const { isMentorModalOpen, setIsMentorModalOpen } = useState(false);

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

  // Helper function to get the appropriate language field for mentorship
  const getLocalizedMentorshipText = () => {
    if (!currentText) return "";

    const fieldName = `mentorship_${normalizedLocale}`;
    const englishField = "mentorship_english";

    // Try the localized field first, then fallback to English
    return currentText[fieldName] || currentText[englishField] || "";
  };

  const mentorshipText = getLocalizedMentorshipText();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto relative z-10">
          {/* Background Design */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-custom-half rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-400 rounded-full opacity-20"></div>
          </div>

          {/* Geometric Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 border-2 border-blue-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 border-2 border-indigo-200 rounded-full opacity-20"></div>
          </div>
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("MentorshipsPage.Mentorship Details")}
            </h1>
          </div>

          {/* Mentorship Content */}
          <div className="">
            {mentorshipText ? (
              <>
                <div
                  className="text-gray-700 leading-relaxed text-lg prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-p:text-gray-700 
                    prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700
                    prose-ul:text-gray-700 prose-ol:text-gray-700
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                    prose-p:mb-4"
                  dangerouslySetInnerHTML={{
                    __html: mentorshipText,
                  }}
                />
                <div className="text-center pt-6">
                  <button
                    onClick={() => setIsMentorModalOpen(true)}
                    className="cursor-pointer bg-custom-half text-white px-8 py-4 rounded-3xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {t("MentorshipsPage.mentorship request form")}
                  </button>
                </div>

                {/* Modal Component */}
                <ScholarshipFormModal
                  isOpen={isMentorModalOpen}
                  onClose={() => setIsMentorModalOpen(false)}
                />
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {t("MentorshipsPage.No Mentorship Content Available")}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <SocialMediaSection />
    </>
  );
}

               