"use client";

import { useTranslations } from "../../hooks/useTranslations";
import Link from "next/link";

export default function LarleedMentorship() {
  const { t } = useTranslations();

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 rounded-2xl bg-purple-50 sm:px-6 lg:px-8 py-6">
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-half mb-4">
            {t("Header.mentorships")}
          </h1>
          <div className="w-24 h-1 bg-custom-half mx-auto rounded-full"></div>
        </div> */}

        {/* Mentorship Text */}
        <div className="max-w-7xl mx-auto">
          <div className="">
            {/* <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold">
              Applying for scholarships or higher education programs can be
              challenging, especially when requirements are unclear or
              information is spread across many sources.
            </p> */}

            <p className="text-lg text-gray-600 leading-relaxed font-semibold">
              {t("MentorshipsPage.larleed mentorship homepage")}
            </p>
          </div>

          {/* Read More Link */}
          <div className=" mt-4">
            <Link
              href={`mentorships`}
              className="inline-flex items-center px-6 py-2 bg-custom-half text-white font-medium rounded-full  transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              {t("HomePage.read more")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
