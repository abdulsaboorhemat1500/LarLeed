"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import SimpleLanguageDropdown from "../homePage/languageDropDown";
import { useTranslations } from "../../hooks/useTranslations";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslations();
  const { locale } = useParams();
  const pathname = usePathname();

  // Check if current locale is Pashto or Dari
  const isRtlLanguage = locale === "ps" || locale === "fa";

  // Text size classes based on language
  const textSizeClass = isRtlLanguage ? "text-lg" : "text-md";
  const mobileTextSizeClass = isRtlLanguage ? "text-lg" : "text-base";

  // Function to check if a link is active
  const isActiveLink = (href) => {
    return pathname === `/${locale}${href}` || pathname === href;
  };

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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-2">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`
                                    ${textSizeClass} 
                                    font-bold 
                                    px-4 
                                    py-2 
                                    rounded-lg 
                                    transition-all 
                                    duration-200 
                                    transform 
                                    hover:scale-105
                                    ${
                                      isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-900 hover:bg-blue-200 hover:text-blue-900"
                                    }
                                `}
              >
                {t(`Header.${item.key}`)}
              </Link>
            );
          })}
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end lg:gap-4 md:gap-2 sm:gap-4">
          <SimpleLanguageDropdown />
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-1.5 p-1.5"
              >
                <p className="text-2xl font-bold">LarLeed</p>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-blue-200 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => {
                    const isActive = isActiveLink(item.href);
                    return (
                      <Link
                        key={item.key}
                        href={`/${locale}${item.href}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                                                    -mx-3 
                                                    block 
                                                    rounded-lg 
                                                    px-3 
                                                    py-2 
                                                    ${mobileTextSizeClass} 
                                                    font-bold 
                                                    transition-colors 
                                                    duration-200
                                                    ${
                                                      isActive
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-900 hover:bg-blue-200"
                                                    }
                                                `}
                      >
                        {t(`Header.${item.key}`)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
