"use client";

import { useTranslations } from "../../hooks/useTranslations";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LarleedMentorship() {
  const { t } = useTranslations();
  const { locale } = useParams();

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-half mb-4">
            {t("Header.mentorships")}
          </h1>
          <div className="w-24 h-1 bg-custom-half mx-auto rounded-full"></div>
        </div>

        {/* Mentorship Text */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-10">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold">
              Applying for scholarships or higher education programs can be
              challenging—especially when requirements are unclear or
              information is spread across many sources.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed font-semibold">
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
              href={`mentorships`}
              className="inline-flex items-center px-6 py-3 bg-custom-half text-white font-medium rounded-lg  transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              {t("HomePage.read more")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
