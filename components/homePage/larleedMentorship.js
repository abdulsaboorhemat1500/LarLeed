"use client";

import { useTranslations } from "../../hooks/useTranslations";
import Link from "next/link";

export default function LarleedMentorship() {
  const { t } = useTranslations();

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t("Header.mentorships")}
          </h1>
        </div>

        {/* Simple Text Blocks */}
        <div className="max-w-7xl mx-auto">
          {/* First Text Block */}
          <div className="mb-4">
            <div className=" rounded-lg p-6 shadow-md">
              <p className="text-xl md:text-2xl text-gray-800 font-semibold text-center">
                {t("MentorshipsPage.applying for scholarships")}
              </p>
            </div>
          </div>

          {/* Second Text Block */}
          <div className="mb-8">
            <div className=" rounded-lg p-6 shadow-md">
              <p className="text-lg md:text-xl text-gray-700 font-medium text-center">
                {t("MentorshipsPage.larleed mentorship homepage")}
              </p>
            </div>
          </div>

          {/* Read More Button */}
          <div className="text-center">
            <Link
              href={`mentorships`}
              className="inline-flex items-center px-8 py-3 bg-custom-half text-white font-semibold rounded-lg transition-all duration-300 h hover:shadow-md active:scale-95"
            >
              {t("HomePage.read more")}
              <svg
                className="w-5 h-5 ml-2 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
