"use client";
export const runtime = "edge";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import SocialMediaSection from "@/components/homePage/socialmedia";
import SchoolCard from "./schoolCard";
import Lottie from "lottie-react";
import Loading from "@/components/lottie-files/Loading.json";

export default function SchoolsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerpage = 12;
  const [searchQuery, setSearchQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();
  const { t } = useTranslations();
  const { locale } = useParams();

  // Normalize locale to match database field suffixes
  const normalizedLocale = useMemo(() => {
    const localeMap = {
      en: "eng",
      eng: "eng",
      ps: "pash",
      pash: "pash",
      fa: "dari",
      dari: "dari",
    };
    return localeMap[locale] || "eng";
  }, [locale]);

  const getSchools = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultedData = await get("/api/school");
      if (resultedData.success) {
        setSchools(resultedData.data || []);
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
    getSchools();
  }, []);

  // Helper function to get the appropriate language field based on locale - UPDATED TO MATCH SCHOLARSHIP
  const getLocalizedField = (school, fieldBase) => {
    const fieldName = `${fieldBase}_${normalizedLocale}`;
    return school[fieldName] || school[`${fieldBase}_eng`] || "";
  };

  // Filter schools based on search query
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch =
        searchQuery === "" ||
        getLocalizedField(school, "name")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getLocalizedField(school, "owner_name")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        school.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.content_type
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getLocalizedField(school, "overview")
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [schools, searchQuery, normalizedLocale]);

  // ... rest of your SchoolsPage component remains the same
  // Calculate pagination based on FILTERED schools
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerpage);
  const startIndex = (currentPage - 1) * schoolsPerpage;
  const currentSchools = filteredSchools.slice(
    startIndex,
    startIndex + schoolsPerpage
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <>
      <div
        className=" h-80 w-full text-center flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/scholarshipbg.jpg')" }}
      >
        {/* Background blur overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]"></div>

        {/* Text content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            Find Your Dream School Here
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
                    placeholder="Search for schools..."
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
                  Reset
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
                <Lottie animationData={Loading} />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <div className="text-red-600 dark:text-red-400 text-lg mb-4">
                Error: {error}
              </div>
              <button
                onClick={getSchools}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* School Grid */}
          {!loading && !error && currentSchools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentSchools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  getLocalizedField={getLocalizedField}
                />
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  {schools.length === 0
                    ? "No schools available yet"
                    : "No schools found matching your criteria"}
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                  }}
                  className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Clear Search
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
                Previous
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
                Next
              </button>
            </div>
          )}
        </div>
      </section>
      <SocialMediaSection />
    </>
  );
}
