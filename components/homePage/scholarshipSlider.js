"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "@/hooks/useTranslations";

// Sample scholarship data
const scholarships = [
  { id: 1, name: "Türkiye Scholarships" },
  { id: 2, name: "ANSO Scholarship for Young Talents" },
  { id: 3, name: "University of Central Asia" },
  { id: 4, name: "DAAD Master Scholarship" },
  { id: 5, name: "Italy MAECI Scholarship" },
  { id: 6, name: "Erasmus Mundus MESPOM Scholarship" },
  { id: 7, name: "Lund University Global Scholarship" },
  { id: 8, name: "Chinese Government Scholarships" },
  { id: 9, name: "NL Scholarship" },
  { id: 10, name: "MEXT – Japanese Scholarship" },
];

export default function ScholarshipsSlider() {
  const { t } = useTranslations();
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Duplicate scholarships for seamless infinite scrolling
  const duplicatedScholarships = [
    ...scholarships,
    ...scholarships,
    ...scholarships,
  ];

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Continuous auto-scrolling animation (client-side only)
  useEffect(() => {
    if (!isClient) return;

    let lastTimestamp = 0;
    const speed = 50; // pixels per second

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Calculate movement based on time passed for smooth animation
      const movement = (speed * deltaTime) / 1000;

      setSliderPosition((prev) => {
        // Reset position when we've scrolled through one set of scholarships
        if (prev <= -scholarships.length * 200) {
          return 0;
        }
        return prev - movement;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  // Don't render the slider on server-side
  if (!isClient) {
    return (
      <section className="bg-blue-50 py-12 px-4 md:px-8 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {t("ScholarshipsPage.allScholarships")}
            </h2>
          </div>
          <div className="h-36"></div> {/* Placeholder height */}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-blue-50 py-12 px-4 md:px-8 overflow-hidden">
      <div className="container mx-auto">
        {/* Simple Header */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ">
            {t("ScholarshipsPage.allScholarships")}
          </h2>
          <Link
            href={`/${locale}/scholarships-programs`}
            className="inline-flex items-center text-custom-half font-semibold text-lg transition-colors duration-200"
          >
            {t("HomePage.see all")}
            <svg
              className="w-5 h-5 ms-2 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Auto-moving Slider Container */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6"
            style={{
              transform: `translateX(${sliderPosition}px)`,
              willChange: "transform",
            }}
          >
            {duplicatedScholarships.map((scholarship, index) => (
              <div key={`${scholarship.id}-${index}`} className="flex-shrink-0">
                <div className="bg-custom-half h-36 w-36 rounded-full border-2 border-white text-white hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center p-4">
                  <div className="text-center">
                    <span className="text-base font-semibold break-words line-clamp-3">
                      {scholarship.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
