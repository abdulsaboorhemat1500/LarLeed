"use client";
export const runtime = "edge";
export const dynamic = "force-dynamic";
import { useState, useEffect, useRef } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import SocialMediaSection from "@/components/homePage/socialmedia";

export default function CourseDetailsPage() {
  const [course, setCourse] = useState(null);
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
  const getLocalizedField = (course, fieldBase) => {
    if (!course) return "";

    const normalizedLocale = normalizeLocale(locale);
    const fieldName = `${fieldBase}_${normalizedLocale}`;

    // Return the localized field or fallback to English
    return course[fieldName] || course[`${fieldBase}_en`] || "";
  };

  // Update views function
  const updateViews = async (courseId) => {
    try {
      await post(`/api/course/${courseId}/views`);
    } catch (error) {
      // Don't show error to user for view updates
    }
  };

  // Fetch course data from API
  useEffect(() => {
    const fetchCourse = async () => {
      if (!params?.id) return;

      try {
        setLoading(true);
        const result = await get(`/api/course/${params.id}`);

        if (result.success) {
          setCourse(result.data);
        } else {
          setError(result.error || "Failed to fetch course data");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params?.id]);

  // Separate useEffect to update views when course data is loaded
  useEffect(() => {
    if (course && !viewsUpdatedRef.current) {
      viewsUpdatedRef.current = true;
      updateViews(course.id);
    }
  }, [course]);

  // Handle course link button click
  const handleCourseLinkClick = () => {
    if (course?.link) {
      window.open(course.link, "_blank", "noopener,noreferrer");
    } else {
      alert("No course link available");
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

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("CoursePage.Error loading course")}
              </h3>
              <p className="text-gray-600 mb-4">
                {error || "Course not found"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t("CoursePage.Try Again")}
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
  const descriptionField = `description_${currentLocale}`;

  const overviewValue = course[overviewField] || course.overview_en || "";
  const descriptionValue =
    course[descriptionField] || course.description_en || "";

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="h-60 w-full text-center flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-100"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-custom-half rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-custom-half rounded-full"></div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-200"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {getLocalizedField(course, "name")}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("CoursePage.Course Overview")}
                </h2>
                {overviewValue ? (
                  <div
                    className="text-gray-700 leading-relaxed rich-text-content"
                    dangerouslySetInnerHTML={{
                      __html: overviewValue,
                    }}
                  />
                ) : (
                  <div className="text-gray-500 italic">
                    {t("CoursePage.No overview available in")}{" "}
                    {currentLocale.toUpperCase()}.
                    {course.overview_en && " Showing English version."}
                  </div>
                )}
              </div>

              {/* Detailed Description */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("CoursePage.Detailed Description")}
                </h2>
                {descriptionValue ? (
                  <div
                    className="text-gray-700 leading-relaxed rich-text-content"
                    dangerouslySetInnerHTML={{
                      __html: descriptionValue,
                    }}
                  />
                ) : (
                  <div className="text-gray-500 italic">
                    {t("CoursePage.No detailed description available in")}{" "}
                    {currentLocale.toUpperCase()}.
                    {course.description_en && " Showing English version."}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Course Summary (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                {/* Course Image - MOVED TO TOP OF SUMMARY CARD */}
                {course.image && (
                  <div className="mb-6">
                    <div className="relative h-60 w-full rounded-lg overflow-hidden">
                      <img
                        src={course.image}
                        alt={getLocalizedField(course, "name") || "Course"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  {/* Course Name */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600">📚</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("CoursePage.Course Name")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {getLocalizedField(course, "name") || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">🏷️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("CoursePage.Category")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {getLocalizedField(course, "category") ||
                          course.category_en ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("CoursePage.Fee")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {course.fee || "Free"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Link Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCourseLinkClick}
                    className="custom-my-btn w-full"
                    disabled={!course.link}
                  >
                    🔗 {t("CoursePage.Access Course")}
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
