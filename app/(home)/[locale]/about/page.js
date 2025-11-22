"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import TeamSection from "@/components/homePage/teamSection";
import SocialMediaSection from "@/components/homePage/socialmedia";

export const runtime = "edge";
// app/about/page.js
export default function AboutPage() {
  const [heroSectionText, setHeroSectionText] = useState("");
  const { get } = useApi();

  const getText = async () => {
    try {
      const resultedData = await get("/api/heroSectionText");
      if (resultedData.success) {
        setHeroSectionText(resultedData.data || []);
      } else {
        console.log("❌ API returned error:", resultedData.error);
      }
    } catch (error) {
      setError(error.message);
      console.log("🚨 Fetch error:", error);
    } finally {
      console.log("Data is here");
    }
  };

  useEffect(() => {
    getText();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50  p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: heroSectionText.full_text,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <TeamSection />
      <SocialMediaSection />
    </>
  );
}
