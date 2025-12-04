"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";

export default function ScholarshipSliderSection() {
  const [scholarships, setScholarships] = useState([]);
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

  const getScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultedData = await get("/api/scholarships");
      if (resultedData.success) {
        setScholarships(resultedData.data || []);
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

  // Handle apply now button click
  const handleApplyNow = () => {
    if (scholarship?.s_applying_link) {
      window.open(scholarship.s_applying_link, "_blank", "noopener,noreferrer");
    } else {
      // Fallback behavior if no link is provided
      alert(t("scholarshipDetailsPage.no application link available"));
    }
  };

  // Helper function to get the appropriate language field based on locale
  const getLocalizedField = (scholarship, fieldBase) => {
    const cleanFieldBase = fieldBase.replace(/_(eng|pash|dari)$/, "");
    const fieldName = `${cleanFieldBase}_${normalizedLocale}`;
    return scholarship[fieldName] || scholarship[`${cleanFieldBase}_eng`] || "";
  };

  // Filter scholarships: show scholarships where deadline is within next 30 days from current date
  const filteredScholarships = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    const oneMonthFromNow = new Date();
    oneMonthFromNow.setDate(today.getDate() + 30);
    oneMonthFromNow.setHours(23, 59, 59, 999); // Set to end of day

    const expiringSoon = scholarships.filter((scholarship) => {
      if (!scholarship.s_app_deadline) return false;

      const deadline = new Date(scholarship.s_app_deadline);
      deadline.setHours(23, 59, 59, 999); // Set to end of deadline day

      return deadline >= today && deadline <= oneMonthFromNow;
    });

    return expiringSoon.length > 0 ? expiringSoon : scholarships;
  }, [scholarships]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get section title based on filtered scholarships
  const getSectionTitle = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneMonthFromNow = new Date();
    oneMonthFromNow.setDate(today.getDate() + 30);
    oneMonthFromNow.setHours(23, 59, 59, 999);

    const expiringSoon = scholarships.filter((scholarship) => {
      if (!scholarship.s_app_deadline) return false;
      const deadline = new Date(scholarship.s_app_deadline);
      deadline.setHours(23, 59, 59, 999);
      return deadline >= today && deadline <= oneMonthFromNow;
    });

    if (expiringSoon.length > 0) {
      return t("ScholarshipsPage.deadline in two weeks");
    } else {
      return t("ScholarshipsPage.allScholarships");
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and See All Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 ">
            {getSectionTitle()}
          </h2>
          <Link
            href={`/${locale}/scholarships-programs`}
            className="inline-flex items-center text-custom-half font-semibold text-lg transition-colors duration-200"
          >
            {t("HomePage.see all")}
            <svg
              className="w-5 h-5 ms-2 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

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

        {/* Scholarship Slider */}
        {!loading && !error && filteredScholarships.length > 0 && (
          <div className="relative">
            <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x snap-mandatory">
              {filteredScholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="flex-shrink-0 w-80 snap-start bg-blue-100 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  {/* Scholarship Header with Logo and Name */}
                  <div className="p-6 border-b border-gray-100 ">
                    <div className="flex items-center gap-4">
                      {/* Circular Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                          {scholarship.s_image ? (
                            <img
                              src={scholarship.s_image}
                              alt={getLocalizedField(scholarship, "s_name")}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            getLocalizedField(scholarship, "s_name").charAt(0)
                          )}
                        </div>
                      </div>

                      {/* Scholarship Name */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                          {getLocalizedField(scholarship, "s_name")}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Scholarship Details */}
                  <div className="p-6">
                    {/* Country and Deadline in one line */}
                    <div className="mb-4">
                      <div className="">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400 line-clamp-1">
                          <span>Country : </span>
                          {scholarship.s_country_eng || "International"}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          <span>Deadline : </span>
                          {formatDate(scholarship.s_app_deadline)}
                        </div>
                      </div>
                    </div>

                    {/* Overview */}
                    <div className="mb-4">
                      <div
                        className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 rich-text-content"
                        dangerouslySetInnerHTML={{
                          __html:
                            getLocalizedField(scholarship, "s_overview") ||
                            "No description available.",
                        }}
                      />
                    </div>

                    <Link
                      href={`/${locale}/scholarships-programs/${scholarship.id}`}
                    >
                      <button className="custom-my-btn">
                        {t("ScholarshipsPage.read more")}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {filteredScholarships.slice(0, 5).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && !error && filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {t("ScholarshipsPage.no scholarships available")}
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
