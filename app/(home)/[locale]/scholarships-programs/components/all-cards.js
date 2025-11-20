'use client';
export const runtime = 'edge';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
import { useParams } from 'next/navigation';

export default function AllVideos() {
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerpage = 12;
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();
  const { t } = useTranslations();
  const { locale } = useParams();

  // Normalize locale to match database field suffixes
  const normalizedLocale = useMemo(() => {
    const localeMap = {
      'en': 'eng',
      'eng': 'eng',
      'ps': 'pash', 
      'pash': 'pash',
      'fa': 'dari',
      'dari': 'dari',
    };
    return localeMap[locale] || 'eng';
  }, [locale]);

  // Debug: Log the current locale
  useEffect(() => {}, [locale, normalizedLocale]);

  const getScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultedData = await get("/api/scholarships");
      if (resultedData.success) {
        setScholarships(resultedData.data || []);
        // Debug: Log first scholarship to see available fields
        if (resultedData.data && resultedData.data.length > 0) {
          console.log(
            "📋 First scholarship fields:",
            Object.keys(resultedData.data[0])
          );
          console.log("🔍 Available name fields:", {
            eng: resultedData.data[0].s_name_eng,
            pash: resultedData.data[0].s_name_pash,
            dari: resultedData.data[0].s_name_dari,
          });
        }
      } else {
        console.log("❌ API returned error:", resultedData.error);
      }
    } catch (error) {
      setError(error.message);
      console.log("🚨 Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getScholarships();
  }, []);

  const filters = [
    t("ScholarshipsPage.all"),
    t("ScholarshipsPage.undergraduate"),
    t("ScholarshipsPage.master"),
    t("ScholarshipsPage.phd"),
  ];

  // Helper function to get the appropriate language field based on locale
  const getLocalizedField = (scholarship, fieldBase) => {
    // Remove any existing locale suffix from fieldBase to avoid duplication
    const cleanFieldBase = fieldBase.replace(/_(eng|pash|dari)$/, "");
    const fieldName = `${cleanFieldBase}_${normalizedLocale}`;

    // Try the localized field first, then fallback to English
    const result =
      scholarship[fieldName] || scholarship[`${cleanFieldBase}_eng`] || "";

    // Debug: Log what field is being accessed (only for first item to avoid spam)
    if (
      scholarships[0] &&
      scholarship.id === scholarships[0].id &&
      fieldBase === "s_name"
    ) {
      console.log(
        `🔄 Field access: ${cleanFieldBase}_${normalizedLocale} =`,
        result.substring(0, 50) + "..."
      );
    }

    return result;
  };

  // Filter scholarships based on search query and active filter
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      // Filter by study level
      const matchesFilter =
        activeFilter === "All" ||
        getLocalizedField(scholarship, "s_study_level")
          ?.toLowerCase()
          .includes(activeFilter.toLowerCase());

      // Filter by search query (search in localized fields)
      const matchesSearch =
        searchQuery === "" ||
        getLocalizedField(scholarship, "s_name")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getLocalizedField(scholarship, "s_country")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getLocalizedField(scholarship, "s_university")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getLocalizedField(scholarship, "s_language")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getLocalizedField(scholarship, "s_funding_type")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getLocalizedField(scholarship, "s_overview")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [scholarships, activeFilter, searchQuery, normalizedLocale]);

  // Calculate pagination based on FILTERED scholarships
  const totalPages = Math.ceil(
    filteredScholarships.length / scholarshipsPerpage
  );
  const startIndex = (currentPage - 1) * scholarshipsPerpage;
  const currentScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + scholarshipsPerpage
  );

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  // Function to limit title to 5 words
  const limitTitleToFiveWords = (title) => {
    if (!title) return "No Title";
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-4 bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-9 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Desktop Filter Badges */}
            <div className="hidden sm:flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`cursor-pointer px-5 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 border-2 ${
                    activeFilter === filter
                      ? "bg-blue-500 text-white border-blue-500 shadow-2xl shadow-blue-500/30 transform scale-105"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown (Optional) */}
            <div className="sm:hidden w-full">
              <select
                onChange={(e) => setActiveFilter(e.target.value)}
                value={activeFilter}
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-100 dark:border-gray-700 rounded-2xl backdrop-blur-sm"
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              {/* Search Input - Larger Width */}
              <div className="relative group flex-1 max-w-2xl">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors"
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
                  placeholder={t("ScholarshipsPage.search for scholarships")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900  placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-base w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                />

                {/* Clear Search Button */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                    title="Clear search"
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
                  setActiveFilter("All");
                }}
                className="px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-2xl font-medium text-sm transition-all duration-300 hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                title="Reset all filters"
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
          <div className="text-center py-12">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">
                {t("ScholarshipsPage.loading scholarships")}
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-600 dark:text-red-400 text-lg mb-4">
              {t("ScholarshipsPage.error:")}: {error}
            </div>
            <button
              onClick={getScholarships}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {t("ScholarshipsPage.try again")}
            </button>
          </div>
        )}

        {/* Scholarship Grid */}
        {!loading && !error && currentScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {currentScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-blue-100 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Scholarship Image */}
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={scholarship.s_image}
                    alt={getLocalizedField(scholarship, "s_name")}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Scholarship Content */}
                <div className="p-3">
                  {/* Scholarship Name */}
                  <h3 className="text-lg font-bold text-gray-900  mb-2 line-clamp-1 leading-tight">
                    {getLocalizedField(scholarship, "s_name")}
                  </h3>

                  {/* University and Country */}
                  <p className="text-blue-700  text-sm mb-3 font-medium line-clamp-1">
                    {t("ScholarshipsPage.country")} :{" "}
                    {getLocalizedField(scholarship, "s_country")}
                  </p>

                  {/* Description */}
                  <div
                    className="text-gray-500  text-sm mb-4 line-clamp-3 leading-relaxed rich-text-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        getLocalizedField(scholarship, "s_overview") ||
                        "No description available.",
                    }}
                  />

                  {/* Deadline and Language */}
                  <div className="flex justify-between items-center text-sm text-gray-700 border-t border-gray-100 pt-3">
                    <span className="font-medium text-red-600">
                      Deadline: {formatDate(scholarship.s_app_deadline)}
                    </span>
                  </div>

                  {/* Read More Button */}
                  <Link
                    href={`/${locale}/scholarships-programs/${scholarship.id}`}
                  >
                    <button className="cursor-pointer w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
                      {t("ScholarshipsPage.read more")}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No results message (only when not loading and no error)
          !loading &&
          !error && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                {scholarships.length === 0
                  ? t("ScholarshipsPage.no scholarships available yet")
                  : t(
                      "ScholarshipsPage.no scholarships found matching your criteria"
                    )}
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {t("ScholarshipsPage.clear filters")}
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}

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
  );
}