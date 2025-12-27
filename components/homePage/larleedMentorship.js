"use client";

import { useTranslations } from "../../hooks/useTranslations";
import Link from "next/link";

export default function LarleedMentorship() {
  const { t } = useTranslations();

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-half mb-4">
            Our Mentorship
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Mentorship Text */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-10">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold">
              Applying for scholarships or higher education programs can be
              challenging—especially when requirements are unclear or
              information is spread across many sources.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Larleed's mentorship initiative is a community-based,
              volunteer-supported program that connects students with mentors
              who have experience navigating similar educational pathways. The
              purpose of this initiative is to share knowledge, experience, and
              practical insights, not to provide paid consulting services or
              guarantees.
            </p>
          </div>

          {/* Read More Link */}
          <div className="text-center mt-10">
            <Link
              href="/mentorships"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Read More About Mentorship
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
