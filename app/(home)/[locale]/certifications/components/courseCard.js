"use client";

import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";

export default function CourseCard({ course, getLocalizedField }) {
  const { t } = useTranslations();
  const { locale } = useParams();

  // Get the overview content
  const overviewContent = getLocalizedField(course, "overview");

  // Get category - FIXED: Use the localized category field
  const categoryContent =
    getLocalizedField(course, "category") || course.category_en || "";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Course Image with Views Overlay */}
      <div className="h-48 bg-gray-200 relative">
        <img
          src={course.image || "/default-course.jpg"}
          alt={getLocalizedField(course, "name")}
          className="w-full h-full object-cover"
        />

        {/* Views Counter Overlay */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs backdrop-blur-sm">
          <span>👁️</span>
          <span>{course.views || 0}</span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Course Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 leading-tight">
          {getLocalizedField(course, "name")}
        </h3>

        {/* Category - FIXED */}
        {categoryContent && (
          <p className="text-blue-700 text-sm mb-3 font-medium line-clamp-1">
            {categoryContent}
          </p>
        )}

        {/* Description */}
        <div
          className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed rich-text-content"
          dangerouslySetInnerHTML={{
            __html: overviewContent || "No description available.",
          }}
        />

        {/* Fee */}
        <p className="bg-purple-50 text-purple-700 rounded-lg p-2 text-sm font-medium mb-4">
          {course.fee || "Free"}
        </p>

        {/* Read More Button */}
        <Link href={`/${locale}/course/${course.id}`}>
          <button className="cursor-pointer w-full bg-custom-half text-white px-8 py-3 rounded-lg font-semibold text-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {t("HomePage.view details")}
          </button>
        </Link>
      </div>
    </div>
  );
}
