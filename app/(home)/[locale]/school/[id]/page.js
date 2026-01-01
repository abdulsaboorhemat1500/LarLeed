"use client";
export const runtime = "edge";
export const dynamic = "force-dynamic";
import { useState, useEffect, useRef } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import SocialMediaSection from "@/components/homePage/socialmedia";

export default function SchoolDetailsPage() {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { get, post } = useApi();
  const { t } = useTranslations();
  const params = useParams();

  const viewsUpdatedRef = useRef(false);

  const locale = params?.locale || "en";

  // Normalize locale to match your database field suffixes
  const normalizeLocale = (locale) => {
    const localeMap = {
      en: "en",
      eng: "en",
      ps: "ps",
      pash: "ps",
      fa: "pa",
      dari: "pa",
    };
    return localeMap[locale] || "en";
  };

  // Fixed helper function that matches your exact database fields
  const getLocalizedField = (school, fieldBase) => {
    if (!school) return "";

    const normalizedLocale = normalizeLocale(locale);
    const fieldName = `${fieldBase}_${normalizedLocale}`;

    // Return the localized field or fallback to English
    return school[fieldName] || school[`${fieldBase}_en`] || "";
  };

  // Update views function
  const updateViews = async (schoolId) => {
    try {
      await post(`/api/school/${schoolId}/views`);
    } catch (error) {
      // Don't show error to user for view updates
    }
  };

  // Fetch school data from API
  useEffect(() => {
    const fetchSchool = async () => {
      if (!params?.id) return;

      try {
        setLoading(true);
        const result = await get(`/api/school/${params.id}`);

        if (result.success) {
          setSchool(result.data);
        } else {
          setError(result.error || "Failed to fetch school data");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [params?.id]);

  // Separate useEffect to update views when school data is loaded
  useEffect(() => {
    if (school && !viewsUpdatedRef.current) {
      viewsUpdatedRef.current = true;
      updateViews(school.id);
    }
  }, [school]);

  // Handle website button click
  const handleWebsiteClick = () => {
    if (school?.website_link) {
      window.open(school.website_link, "_blank", "noopener,noreferrer");
    } else {
      alert("No website link available");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !school) {
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
                {t("SchoolPage.Error loading school")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error || "School not found"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t("SchoolPage.Try Again")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the actual field values for debugging display
  const currentLocale = normalizeLocale(locale);
  const overviewField = `overview_${currentLocale}`;
  const detailedInfoField = `detailed_info_${currentLocale}`;

  const overviewValue = school[overviewField] || school.overview_en || "";
  const detailedInfoValue =
    school[detailedInfoField] || school.detailed_info_en || "";

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        {/* Header */}

        <div className="h-60 w-full text-center flex items-center justify-center relative overflow-hidden">
          {/* Simple gradient background with subtle animation */}
          <div className="absolute inset-0 bg-blue-100"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-custom-half rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-custom-half rounded-full"></div>
          </div>

          {/* Simple shine effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-200"></div>
          </div>

          {/* Text content */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900  mb-4">
              {getLocalizedField(school, "name") || "School Name Not Available"}
            </h1>
            <div className="flex items-center text-center justify-center gap-2  px-4 py-2 ">
              <span className="text-lg">👁️</span>
              <span className="text-lg font-bold text-white">
                {school.views}
              </span>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - School Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* School Image */}
              {school.image && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="relative h-80 w-full">
                    <img
                      src={school.image}
                      alt={getLocalizedField(school, "name") || "School"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("SchoolPage.School Overview")}
                </h2>
                {overviewValue ? (
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                    dangerouslySetInnerHTML={{
                      __html: overviewValue,
                    }}
                  />
                ) : (
                  <div className="text-gray-500 italic">
                    {t("SchoolPage.No overview available in")}{" "}
                    {currentLocale.toUpperCase()}.
                    {school.overview_en && " Showing English version."}
                  </div>
                )}
              </div>

              {/* Detailed Information */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("SchoolPage.Detailed Information")}
                </h2>
                {detailedInfoValue ? (
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                    dangerouslySetInnerHTML={{
                      __html: detailedInfoValue,
                    }}
                  />
                ) : (
                  <div className="text-gray-500 italic">
                    {t("SchoolPage.No detailed information available in")}{" "}
                    {currentLocale.toUpperCase()}.
                    {school.detailed_info_en && " Showing English version."}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - School Summary (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  {t("SchoolPage.School Summary")}
                </h3>

                <div className="space-y-4">
                  {/* School Name */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600">🏫</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("SchoolPage.School Name")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {getLocalizedField(school, "name") || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Owner Name */}
                  {/* <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">👤</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Owner</p>
                      <p className="font-semibold text-gray-900">
                        {getLocalizedField(school, "owner_name") ||
                          "Not specified"}
                      </p>
                    </div>
                  </div> */}

                  {/* Content Type */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600">📚</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("SchoolPage.Content Type")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {school.content_type || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Funding Type */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("SchoolPage.Funding Type")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {school.funding_type || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  {/* <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600">✉️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">
                        {school.email || "Not specified"}
                      </p>
                    </div>
                  </div> */}

                  {/* Phone Number */}
                  {/* <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600">📞</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">
                        {school.phone_number || "Not specified"}
                      </p>
                    </div>
                  </div> */}

                  {/* WhatsApp */}
                  {/* {school.whatsapp_number && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600">💬</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">WhatsApp</p>
                        <p className="font-semibold text-gray-900">
                          {school.whatsapp_number}
                        </p>
                      </div>
                    </div>
                  )} */}

                  {/* Social Media Links */}
                  {(school.facebook_link || school.instagram_link) && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600">🌐</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {t("SchoolPage.Social Media")}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {school.facebook_link && (
                            <a
                              href={school.facebook_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {t("SchoolPage.Facebook")}
                            </a>
                          )}
                          {school.instagram_link && (
                            <a
                              href={school.instagram_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:text-pink-800"
                            >
                              {t("SchoolPage.Instagram")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Website Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleWebsiteClick}
                    className="custom-my-btn w-full"
                    disabled={!school.website_link}
                  >
                    🌐 {t("SchoolPage.Visit Website")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SocialMediaSection />
    </>
  );
}
