"use client";

import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";
import { useParams } from "next/navigation";

// Sample scholarship data
const scholarships = [
  { id: 1, name: "Türkiye Scholarships" },
  { id: 2, name: "ANSO Scholarship for Young Talents" },
  { id: 3, name: "University of Central Asia" },
  { id: 4, name: "DAAD Master Scholarship" },
  { id: 5, name: "Italy MAECI Scholarship" },
  { id: 6, name: "Erasmus Mundus MESPOM Scholarship" },
  { id: 7, name: "Lund University Global Scholarship" },
  { id: 8, name: "Chinese Government Scholarships" },
  { id: 9, name: "NL Scholarship" },
  { id: 10, name: "MEXT – Japanese Scholarship" },
];

export default function ScholarshipsSlider() {
  const { locale } = useParams();
  const { t } = useTranslations();

  return (
    <section className="bg-blue-50 py-12 px-4 md:px-8 overflow-hidden">
      <div className="container mx-auto">
        {/* Header with See All link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t("ScholarshipsPage.allScholarships")}
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

        {/* CSS Animation Slider Container */}
        <div className="relative overflow-hidden">
          <div className="flex">
            {/* First set - visible */}
            <div className="flex animate-scroll gap-6">
              {scholarships.map((scholarship) => (
                <div
                  key={`first-${scholarship.id}-${locale}`}
                  className="flex-shrink-0"
                >
                  <div className="bg-blue-100 h-36 w-36 rounded-full border-2 border-white text-gray-700 hover:text-gray-900 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center p-4">
                    <div className="text-center">
                      <span className="text-base font-semibold break-words line-clamp-3">
                        {scholarship.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless loop - hidden from screen readers */}
            <div className="flex animate-scroll gap-6" aria-hidden="true">
              {scholarships.map((scholarship) => (
                <div
                  key={`second-${scholarship.id}-${locale}`}
                  className="flex-shrink-0"
                >
                  <div className="bg-blue-100 h-36 w-36 rounded-full border-2 border-white text-gray-700 hover:text-gray-900 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center p-4">
                    <div className="text-center">
                      <span className="text-base font-semibold break-words line-clamp-3">
                        {scholarship.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          min-width: 200%;
        }
        @media (min-width: 768px) {
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
