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
          <div className="h-24"></div> {/* Placeholder height */}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-blue-50 py-12 px-4 md:px-8 overflow-hidden">
      <div className="container mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("ScholarshipsPage.allScholarships")}
          </h2>
        </div>

        {/* Auto-moving Slider Container */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-4"
            style={{
              transform: `translateX(${sliderPosition}px)`,
              willChange: "transform",
            }}
          >
            {duplicatedScholarships.map((scholarship, index) => (
              <div key={`${scholarship.id}-${index}`} className="flex-shrink-0">
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-full border-2 border-white px-8 py-4 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-lg font-semibold whitespace-nowrap">
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
