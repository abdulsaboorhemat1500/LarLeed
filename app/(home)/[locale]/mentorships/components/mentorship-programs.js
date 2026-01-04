"use client";
import { useState, useEffect, useMemo } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useParams } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";
import ScholarshipFormModal from "./scholarship-form";

export const runtime = "edge";

export default function MentorshipPage() {
  const [threeSectionTexts, setThreeSectionTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();
  const { locale } = useParams();
  const { t } = useTranslations();
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false); // Fixed: changed from destructuring to array

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
      <section
        id="donate"
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
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

          <div className="flex flex-col items-center justify-center min-h-screen py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("MentorshipsPage.Mentorship Details")}
              </h1>
              <div className="w-24 h-1.5 bg-custom-half mx-auto rounded-full"></div>
            </div>

            {/* Mentorship Content Card */}
            <div className="w-full max-w-7xl mx-auto mb-12">
              <div className=" rounded-2xl shadow-xl border border-white/50 p-8 lg:p-12">
                {mentorshipText ? (
                  <div
                    className="text-gray-700 leading-relaxed text-lg prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-p:text-gray-700 
                    prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700
                    prose-ul:text-gray-700 prose-ol:text-gray-700
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-800
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-blue-700
                    prose-p:mb-4 prose-p:text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: mentorshipText,
                    }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-6">
                      <svg
                        className="w-20 h-20 text-gray-300 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">
                      {t("MentorshipsPage.No Mentorship Content Available") ||
                        "Mentorship Information Coming Soon"}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Mentorship Request Button */}
        <div className="text-center py-3">
          <button
            onClick={() => setIsMentorModalOpen(true)}
            className="cursor-pointer bg-custom-half text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t("MentorshipsPage.mentorship request form") ||
              "Request Mentorship"}
          </button>
        </div>

        {/* Modal Component */}
        <ScholarshipFormModal
          isOpen={isMentorModalOpen}
          onClose={() => setIsMentorModalOpen(false)}
        />
      </section>
    </>
  );
}
