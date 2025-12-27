"use client";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { CheckCircle, BookOpen, GraduationCap, Search } from "lucide-react";

export default function HeroSection() {
  const { t, currentLocale } = useTranslations();

  const isRTL = currentLocale === "ps" || currentLocale === "fa";

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Free Public Education Resource
          </div> */}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-custom-half block">{t("Banner.title")}</span>
            <span className="text-gradient-custom">
              {t("HomePage.connecting afghan youth")}
            </span>
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("HomePage.larleed is a free")}
          </p>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            {t("HomePage.on this website")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t("HomePage.explore education programs")}
              </h3>
              <p className="text-gray-600">{t("HomePage.for grades")}</p>
            </div>

            {/* Feature 2 */}
            <div
              className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t("HomePage.find information on")}
              </h3>
              <p className="text-gray-600">
                {t("HomePage.higher education opportunities and scholarships")}
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t("HomePage.access curated resources")}
              </h3>
              <p className="text-gray-600">
                {t("HomePage.and guidance to support")}
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-6">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t("HomePage.this platform is designed")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-gray-600">
                {t("HomePage.learn about larleed")}
              </p>
              {/* <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Visit About Us
                {t("HomePage.")}
                <svg
                  className="w-4 h-4 ml-2"
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
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
