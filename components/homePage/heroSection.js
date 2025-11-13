"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";

export default function HeroSection() {
  const { t, currentLocale } = useTranslations();

  // Calculate isRTL based on current locale
  const isRTL = currentLocale === "ps" || currentLocale === "fa"; // Pashto and Dari are RTL

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
  ];

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-0 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image Section */}
          <div
            className={`flex-1 flex ${
              isRTL ? "lg:justify-end" : "lg:justify-end"
            } mt-8 lg:mt-0 ${isRTL ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className={`relative w-full max-w-md lg:max-w-lg`}>
              {/* Main Image Container - No border or background */}
              <div className="relative transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/heroSImage.png"
                  alt="Hero Image"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`flex-1 max-w-2xl ${
              isRTL ? "lg:text-right lg:ps-12" : "lg:text-left lg:pe-12"
            } text-center lg:text-start ${isRTL ? "lg:order-2" : "lg:order-1"}`}
          >
            {/* Subtitle */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
              <span className="text-black dark:text-white block">
                {t("Banner.title")}
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("HomePage.connecting afghan youth")}
              </span>
            </h1>
            <p className="text-lg font-semibold text-black">
              Our platform connects students with expert instructors and
              comprehensive curriculum designed specifically for native language
              speakers. We focus on making education accessible, affordable, and
              culturally relevant.
            </p>
            {/* CTA Button */}
            <div
              className={`flex flex-col pt-6 sm:flex-row gap-4 ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <Link
                href={`/${currentLocale}/scholarships-programs`}
                className="cursor-pointer px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                {t("HomePage.Find Scholarships Now")}
              </Link>
            </div>
          </div>
        </div>
        {/* Features Grid - Single Line with Better Design */}
        <div className="flex flex-wrap gap-4 my-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">
                {feature.icon}
              </span>
              <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-5"></div>
    </section>
  );
}
