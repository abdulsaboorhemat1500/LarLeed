"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";

export default function HeroSection() {
  const { t, currentLocale } = useTranslations();

  // Calculate isRTL based on current locale
  const isRTL = currentLocale === "ps" || currentLocale === "fa"; // Pashto and Dari are RTL
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
              <span className="text-gradient-custom">
                {t("HomePage.connecting afghan youth")}
              </span>
            </h1>
            <p className="text-lg font-semibold text-gray-600">
              {t("HomePage.Our platform connect")}
            </p>
            {/* CTA Button */}
            <div
              className={`flex flex-col pt-6 sm:flex-row gap-4 ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <Link
                href={`/${currentLocale}/scholarships-programs`}
                className="cursor-pointer mt-4  py-3 px-4  border-2 border-custom-half text-custom-half  font-semibold rounded-3xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                {t("HomePage.Find Scholarships Now")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-5"></div>
    </section>
  );
}
