"use client";

import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";

export default function ScholarshipCard({ scholarship, getLocalizedField }) {
  const { t } = useTranslations();
  const { locale } = useParams();

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
    <div className="bg-blue-100 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Scholarship Image with Views Overlay */}
      <div className="h-48 bg-gray-200 relative">
        <img
          src={scholarship.s_image}
          alt={getLocalizedField(scholarship, "s_name")}
          className="w-full h-full object-cover"
        />

        {/* Views Counter Overlay */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs backdrop-blur-sm">
          <span>👁️</span>
          <span>{scholarship.views}</span>
        </div>
      </div>

      {/* Scholarship Content */}
      <div className="p-3">
        {/* Scholarship Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 leading-tight">
          {getLocalizedField(scholarship, "s_name")}
        </h3>

        {/* University and Country */}
        <p className="text-blue-700 text-sm mb-3 font-medium line-clamp-1">
          {t("ScholarshipsPage.country")} :{" "}
          {getLocalizedField(scholarship, "s_country")}
        </p>

        {/* Description */}
        <div
          className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed rich-text-content"
          dangerouslySetInnerHTML={{
            __html:
              getLocalizedField(scholarship, "s_overview") ||
              "No description available.",
          }}
        />

        {/* Deadline and Language */}
        <div className="flex justify-between items-center text-sm text-gray-700 border-t border-gray-100 pt-3">
          {new Date(scholarship.s_app_deadline) < new Date() ? (
            <span className="font-medium text-gray-600">Closed</span>
          ) : (
            <span className="font-medium text-red-600">
              Deadline: {formatDate(scholarship.s_app_deadline)}
            </span>
          )}
        </div>

        {/* Read More Button */}
        <Link href={`/${locale}/scholarships-programs/${scholarship.id}`}>
          <button className="cursor-pointer mt-2 bg-custom-half text-white px-8 py-2 w-full rounded-3xl font-semibold text-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {t("ScholarshipsPage.read more")}
          </button>
        </Link>
      </div>
    </div>
  );
}
