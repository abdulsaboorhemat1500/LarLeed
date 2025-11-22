'use client';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import StudentStoriesSection from "../components/StudentsStoryVideos";
import ScholarshipTemplatesSection from "../components/ScholarshipTemplatesSection";
import SocialMediaSection from "@/components/homePage/socialmedia";

export default function ScholarshipDetailsPage() {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { get } = useApi();
  const { t } = useTranslations();
  const params = useParams();

  // Get locale from params and normalize it to match your database field suffixes
  const locale = params?.locale || "eng";

  // Helper function to get the appropriate language field based on locale
  const getLocalizedField = (scholarship, fieldBase) => {
    if (!scholarship) return "";

    // Normalize locale to match your database field suffixes
    const normalizedLocale = normalizeLocale(locale);
    const fieldName = `${fieldBase}_${normalizedLocale}`;

    // Return the localized field or fallback to English
    return scholarship[fieldName] || scholarship[`${fieldBase}_eng`] || "";
  };

  // Normalize locale to match database field suffixes
  const normalizeLocale = (locale) => {
    const localeMap = {
      en: "eng",
      eng: "eng",
      ps: "pash",
      pash: "pash",
      fa: "dari",
      dari: "dari",
      // Add any other mappings you need
    };

    return localeMap[locale] || "eng";
  };

  // Fetch scholarship data from API
  useEffect(() => {
    const fetchScholarship = async () => {
      if (!params?.id) return;

      try {
        setLoading(true);
        const result = await get(`/api/scholarships/${params.id}`);

        if (result.success) {
          setScholarship(result.data);
        } else {
          setError(result.error || "Failed to fetch scholarship data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [params?.id]); // Only depend on params.id

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Handle apply now button click
  const handleApplyNow = () => {
    if (scholarship?.s_applying_link) {
      window.open(scholarship.s_applying_link, "_blank", "noopener,noreferrer");
    } else {
      // Fallback behavior if no link is provided
      alert(t("scholarshipDetailsPage.no application link available"));
    }
  };

  // Debug: Log the current locale and scholarship data
  useEffect(() => {
    if (scholarship) {
      console.log("Current locale:", locale);
      console.log("Normalized locale:", normalizeLocale(locale));
      console.log("Scholarship data:", scholarship);
    }
  }, [scholarship, locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {t("scholarshipDetailsPage.loading scholarship details")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900  mb-2">
                {t("scholarshipDetailsPage.error loading scholarship")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error || "Scholarship not found"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t("scholarshipDetailsPage.try again")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        {/* Header */}
        <div className="mb-8 bg-blue-100 h-40 w-full text-center flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900  mb-4">
            {getLocalizedField(scholarship, "s_name")}
          </h1>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Scholarship Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white  rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">
                  {t("scholarshipDetailsPage.scholarship overview")}
                </h2>
                <div
                  className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedField(scholarship, "s_overview"),
                  }}
                />
              </div>

              {/* Full Description */}
              <div className="bg-white  rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">
                  {t("scholarshipDetailsPage.detailed information")}
                </h2>
                <div
                  className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedField(scholarship, "s_detailed_info"),
                  }}
                />
              </div>

              {/* Eligibility Criteria */}
              <div className="bg-white  rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">
                  {t("scholarshipDetailsPage.eligibility criteria")}
                </h2>
                <div
                  className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedField(scholarship, "s_eligibility"),
                  }}
                />
              </div>

              {/* Application Process */}
              <div className="bg-white  rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">
                  {t("scholarshipDetailsPage.application process")}
                </h2>
                <div
                  className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedField(scholarship, "s_app_procces"),
                  }}
                />
              </div>

              {/* Benefits */}
              <div className="bg-white  rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">
                  {t("scholarshipDetailsPage.scholarship benefits")}
                </h2>
                <div
                  className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedField(scholarship, "s_benefits"),
                  }}
                />
              </div>
            </div>

            {/* Right Column - Scholarship Card (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white  rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900  mb-6 text-center">
                  {t("scholarshipDetailsPage.scholarship summary")}
                </h3>

                <div className="space-y-4">
                  {/* Scholarship Name */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400">
                        🎓
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.name")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_name")}
                      </p>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">
                        🌍
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.country")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_country")}
                      </p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400">
                        💬
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.language")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_language")}
                      </p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-600 dark:text-pink-400">
                        👥
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.genders")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_gender") ||
                          "Both Male & Female"}
                      </p>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        📊
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.study level")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_study_level")}
                      </p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 dark:text-red-400">⏰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.application deadline")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {formatDate(scholarship.s_app_deadline)}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 dark:text-teal-400">
                        📅
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.duration")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_duration")}
                      </p>
                    </div>
                  </div>

                  {/* Funding */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        💰
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.funding type")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_funding_type")}
                      </p>
                    </div>
                  </div>

                  {/* Fields of Study */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 dark:text-amber-400">
                        📚
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.fields of study")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(scholarship, "s_fields_of_study") ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Language Required */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600 dark:text-cyan-400">
                        🗣️
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.language required")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(
                          scholarship,
                          "s_language_required"
                        ) || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Eligible Countries */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 dark:text-orange-400">
                        🌐
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("scholarshipDetailsPage.eligible countries")}
                      </p>
                      <p className="font-semibold text-gray-900 ">
                        {getLocalizedField(
                          scholarship,
                          "s_eligible_countries"
                        ) || "All countries"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Apply Now Button */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button onClick={handleApplyNow} className="custom-my-btn">
                    📃 {t("scholarshipDetailsPage.apply now")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScholarshipTemplatesSection scholarshipName={scholarship.s_name_eng} />
      <StudentStoriesSection scholarshipName={scholarship.s_name_eng} />
      <SocialMediaSection />
    </>
  );
}