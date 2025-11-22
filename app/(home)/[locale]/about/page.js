"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import TeamSection from "@/components/homePage/teamSection";
import SocialMediaSection from "@/components/homePage/socialmedia";

export const runtime = "edge";

export default function AboutPage() {
  const [heroSectionText, setHeroSectionText] = useState(null);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  const getText = async () => {
    try {
      const resultedData = await get("/api/heroSectionText");
      if (resultedData.success) {
        setHeroSectionText(resultedData.data[0]);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getText();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Us
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Hero Section Content */}
          <div className="max-w-4xl mx-auto">
            {heroSectionText?.full_text ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-white/20">
                <div
                  className="text-gray-700 leading-relaxed text-lg prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-p:text-gray-700 
                    prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700
                    prose-ul:text-gray-700 prose-ol:text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: heroSectionText.full_text,
                  }}
                />
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <p className="text-gray-500 text-lg">Content coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <TeamSection />
      <SocialMediaSection />
    </>
  );
}
