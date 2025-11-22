"use client";
import { useTranslations } from "@/hooks/useTranslations";
export default function WhyChoseUse() {
  const { t } = useTranslations();
  const features = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      text: t("HomePage.Scholarships guiding") || "Scholarships guiding",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14v6l9-5m-9 5l-9-5"
          />
        </svg>
      ),
      text: t("HomePage.Free Resources") || "Free Resources",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      text: t("HomePage.Free MentorShips") || "Free MentorShips",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      text: t("HomePage.Career Guidance") || "Career Guidance",
    },
  ];

  return (
    <section className="py-20 bg-blue-100 shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient-custom mb-4">
              {t("HomePage.Why Choose Us")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("HomePage.We provide")}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300 animate-pulse"></div>

                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-sm border border-blue-200/50 rounded-xl p-6 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-300 cursor-pointer overflow-hidden">
                  {/* Floating Animation */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20 group-hover:animate-ping"></div>

                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container with Animation */}
                    <div className="inline-flex items-center justify-center p-3 bg-custom-full rounded-xl mb-4 transform group-hover:rotate-12 transition-transform duration-300">
                      <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {feature.text}
                    </h3>

                    {/* Animated Underline */}
                    <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-800 transition-all duration-500 mt-2"></div>
                  </div>

                  {/* Sparkle Effects */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300 delay-150"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
