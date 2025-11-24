"use client";

import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";

export default function SchoolCard({ school, getLocalizedField }) {
  const { t } = useTranslations();
  const { locale } = useParams();

  return (
    <div className="bg-blue-100 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* School Image with Views Overlay */}
      <div className="h-48 bg-gray-200 relative">
        <img
          src={school.image}
          alt={getLocalizedField(school, "name")}
          className="w-full h-full object-cover"
        />

        {/* Views Counter Overlay */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs backdrop-blur-sm">
          <span>👁️</span>
          <span>{school.views || 0}</span>
        </div>
      </div>

      {/* School Content */}
      <div className="p-3">
        {/* School Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 leading-tight">
          {getLocalizedField(school, "name")}
        </h3>

        {/* Funding Type */}
        <p className="text-blue-700 text-sm mb-3 font-medium line-clamp-1">
          Funding Type: {school.funding_type || "Not specified"}
        </p>

        {/* Description */}
        <div
          className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed rich-text-content"
          dangerouslySetInnerHTML={{
            __html:
              getLocalizedField(school, "overview") ||
              "No description available.",
          }}
        />

        {/* Owner Name */}
        <div className="flex justify-between items-center text-sm text-gray-700 border-t border-gray-100 pt-3">
          <span className="font-medium text-green-600">
            Owner: {getLocalizedField(school, "owner_name")}
          </span>
        </div>

        {/* Read More Button */}
        <Link href={`/${locale}/schools/${school.id}`}>
          <button className="custom-my-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
