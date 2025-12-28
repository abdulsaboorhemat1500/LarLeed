"use client";
import { useTranslations } from "@/hooks/useTranslations";
import { BookOpen, GraduationCap, Search, Check } from "lucide-react";

export default function HeroSection() {
  const { t, currentLocale } = useTranslations();
  const isRTL = currentLocale === "ps" || currentLocale === "fa";

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 lg:py-20 relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-custom-half rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-custom-half rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-400 rounded-full opacity-20"></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-blue-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 border-2 border-indigo-200 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-custom-half block">{t("Banner.title")}</span>
            <span className="text-gradient-custom text-4xl sm:text-5xl lg:text-5xl">
              {t("HomePage.connecting afghan youth")}
            </span>
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl font-bold mx-auto mb-10 leading-relaxed">
            {t("HomePage.larleed is a free")}
          </p>
        </div>

        {/* Features Section - Single Line Cards */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            {t("HomePage.on this website")}
          </h2>

          <div className="space-y-4">
            {/* Feature 1 */}
            <div
              className={`bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300 ${
                isRTL ? "pr-16" : "pl-16"
              } relative`}
            >
              <div className="absolute top-1/2 transform -translate-y-1/2 left-6 bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <span className="text-lg font-bold text-gray-800">
                    {t("HomePage.explore education programs")}
                  </span>
                  <span className="text-gray-600 font-semibold ml-2">
                    {t("HomePage.for grades")}
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className={`bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300 ${
                isRTL ? "pr-16" : "pl-16"
              } relative`}
            >
              <div className="absolute top-1/2 transform -translate-y-1/2 left-6 bg-purple-100 p-3 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center justify-between">
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <span className="text-lg font-bold text-gray-800">
                    {t("HomePage.find information on")}
                  </span>
                  <span className="text-gray-600 font-semibold ml-2">
                    {t(
                      "HomePage.higher education opportunities and scholarships"
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className={`bg-green-50 p-6 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300 ${
                isRTL ? "pr-16" : "pl-16"
              } relative`}
            >
              <div className="absolute top-1/2 transform -translate-y-1/2 left-6 bg-green-100 p-3 rounded-lg">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <span className="text-lg font-bold text-gray-800">
                    {t("HomePage.access curated resources")}
                  </span>
                  <span className="text-gray-600 font-semibold ml-2">
                    {t("HomePage.and guidance to support")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Info */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-100 p-8 rounded-2xl border border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700 font-semibold">
                  {t("HomePage.this platform is designed")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="text-gray-600 font-semibold">
                  <span>{t("HomePage.learn about larleed")}</span>
                  <span className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer font-bold">
                    {t("HomePage.about us section")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
