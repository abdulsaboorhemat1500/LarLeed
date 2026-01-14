"use client";

import * as React from "react";
import SimpleLanguageDropdown from "../homePage/languageDropDown";
import { useTranslations } from "../../hooks/useTranslations";
import { useState } from "react";
import {
  X,
  Menu,
  BookOpen,
  GraduationCap,
  NotebookText,
  Users,
  Heart,
  Info,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Component to render text with break after 3 words
const ThreeWordText = ({ text, isMobile = false }) => {
  if (!text) return "";

  const words = text.split(" ");

  if (words.length <= 3) {
    return (
      <div
        className={`flex items-center justify-center ${
          isMobile
            ? "bg-blue-100 hover:bg-blue-300 hover:text-white transition-all duration-200 transform rounded-lg"
            : ""
        }`}
      >
        {text}
      </div>
    );
  }

  const firstLine = words.slice(0, 3).join(" ");
  const secondLine = words.slice(3).join(" ");

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isMobile
          ? "bg-blue-100 hover:bg-blue-300 hover:text-white transition-all duration-200 transform rounded-lg"
          : ""
      }`}
    >
      <div>{firstLine}</div>
      <div>{secondLine}</div>
    </div>
  );
};

// Icon mapping for menu items
const iconMap = {
  school: BookOpen,
  scholarshipsPrograms: GraduationCap,
  certifications: NotebookText,
  mentorships: Users,
  donate: Heart,
  aboutUs: Info,
};

export default function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslations();
  const { locale } = useParams();

  // Check if current locale is Pashto or Dari
  const isRtlLanguage = locale === "ps" || locale === "fa";

  // Text size classes based on language
  const textSizeClass = isRtlLanguage ? "text-lg" : "text-md";
  const mobileTextSizeClass = isRtlLanguage ? "text-lg" : "text-base";

  // Navigation items data
  const navItems = [
    { href: "/school", key: "school" },
    { href: "/scholarships-programs", key: "scholarshipsPrograms" },
    { href: "/certifications", key: "certifications" },
    { href: "/mentorships", key: "mentorships" },
    // { href: "/roshangari", key: "roshangari" },
    { href: "/donate", key: "donate" },
    { href: "/about", key: "aboutUs" },
  ];

  return (
    <header className="bg-blue-100 sticky top-0 z-50 shadow-sm border-b">
      <nav
        aria-label="Global"
        className="mx-auto flex container items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex lg:gap-x-1">
            <img src="/logo.png" alt="logo image" className="h-12" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-0.5">
          {navItems.map((item) => {
            const text = t(`Header.${item.key}`);

            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`
                  ${textSizeClass} 
                  font-semibold 
                  px-2.5 
                  py-1 
                  rounded-lg 
                  transition-all 
                  duration-200 
                  transform
                  hover:-translate-y-[1%]
                  text-center
                  leading-tight
                  flex items-center justify-center
                  min-w-[85px]
                  h-[44px]
                  
                `}
              >
                <ThreeWordText text={text} isMobile={false} />
              </Link>
            );
          })}
        </div>

        <div className="lg:flex lg:flex-1 flex lg:justify-end lg:gap-3 md:gap-2 sm:gap-3">
          <SimpleLanguageDropdown />
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-blue-200 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
          <div className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img src="/logo.png" alt="logo image" className="h-10" />
                  <p className="text-xl font-bold text-gray-900">
                    {t("Banner.title")}
                  </p>
                </Link>
              </div>
              <button
                type="button"
                className="rounded-full p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="size-6" />
              </button>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => {
                const text = t(`Header.${item.key}`);
                const IconComponent = iconMap[item.key];

                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      {IconComponent && <IconComponent className="size-6" />}
                    </div>

                    <div className="flex-1">
                      <div
                        className={`${mobileTextSizeClass} font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200`}
                      >
                        {text}
                      </div>
                    </div>

                    <div className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200">
                      <svg
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
