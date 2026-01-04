"use client";
export const runtime = "edge";
import { useState, useMemo, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import SocialMediaSection from "@/components/homePage/socialmedia";
import CourseCard from "./courseCard";

export default function CoursesCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerpage = 14;
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();
  const { t } = useTranslations();
  const { locale } = useParams();

  // Normalize locale to match your database field suffixes
  const normalizedLocale = useMemo(() => {
    const localeMap = {
      en: "en",
      eng: "en",
      ps: "ps",
      pash: "ps",
      fa: "pa",
      dari: "pa",
    };
    return localeMap[locale] || "en";
  }, [locale]);

  const getcourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultedData = await get("/api/course");
      if (resultedData.success) {
        setcourses(resultedData.data || []);
      } else {
        setError("Failed to load courses");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getcourses();
  }, []);

  // Fixed helper function that matches your database fields
  const getLocalizedField = (course, fieldBase) => {
    const fieldName = `${fieldBase}_${normalizedLocale}`;

    // Special handling for language mapping
    let actualField = fieldName;

    if (normalizedLocale === "pa") {
      actualField = `${fieldBase}_fa`;
    }

    return course[actualField] || course[`${fieldBase}_en`] || "";
  };

  // Filter courses based on search query
  const filteredcourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        getLocalizedField(course, "name")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [courses, searchQuery, normalizedLocale]);

  // Calculate pagination based on FILTERED courses
  const totalPages = Math.ceil(filteredcourses.length / coursesPerpage);
  const startIndex = (currentPage - 1) * coursesPerpage;
  const currentcourses = filteredcourses.slice(
    startIndex,
    startIndex + coursesPerpage
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <>
      <div className="h-80 w-full text-center flex items-center justify-center relative overflow-hidden">
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
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-custom-half max-w-4xl mb-6 tracking-tight p-2">
            {t("CoursePage.page title")}
          </h1>
        </div>
      </div>
      <section className="py-4 bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-9 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Section */}
            <div className="flex items-center">
              <div className="flex items-center gap-4">
                {/* Search Input - Larger Width */}
                <div className="relative group flex-1 max-w-2xl">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500 group-focus-within:text-custom-md transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={t("SchoolPage.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900  placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-base w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  />

                  {/* Clear Search Button */}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                      title={t("RoshangariPage.clear search")}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Reset Filter Button */}
                <button
                  onClick={() => {
                    setSearchQuery("");
                  }}
                  className="px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-2xl font-medium text-sm transition-all duration-300 hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                  title="Reset search"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {t("ScholarshipsPage.reset")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <div className="text-red-600 dark:text-red-400 text-lg mb-4">
                {t("ScholarshipsPage.error")}
              </div>
              <button
                onClick={getcourses}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {t("SchoolPage.Try Again")}
              </button>
            </div>
          )}

          {/* course Grid */}
          {!loading && !error && currentcourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentcourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  getLocalizedField={getLocalizedField}
                />
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  {courses.length === 0
                    ? "No courses available yet"
                    : "No courses found matching your criteria"}
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                  }}
                  className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {t("HomePage.clear search")}
                </button>
              </div>
            )
          )}

          {/* Pagination - Only show if there are results */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-8">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                }`}
              >
                {t("ScholarshipsPage.previous")}
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg border transition-colors ${
                      currentPage === page
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                }`}
              >
                {t("ScholarshipsPage.next")}
              </button>
            </div>
          )}
        </div>
      </section>
      <SocialMediaSection />
    </>
  );
}
