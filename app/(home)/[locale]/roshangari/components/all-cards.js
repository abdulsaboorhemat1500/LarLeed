'use client'; 
export const runtime = "edge";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import SocialMediaSection from "@/components/homePage/socialmedia";
import Lottie from "lottie-react";
import Loading from "@/components/lottie-files/Loading.json";

export default function FeaturedStoriesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storiesPerPage = 12;
  const { get } = useApi();
  const { t } = useTranslations();
  const { locale } = useParams();
  // Fetch stories from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const result = await get("/api/posts");

        if (result.success) {
          // Filter posts where category is "story"
          const storyPosts = result.data;
          setStories(storyPosts);
        } else {
          setError(result.error || "Failed to fetch stories");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Filter stories based on search query
  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) {
      return stories;
    }

    const query = searchQuery.toLowerCase();
    return stories.filter(
      (story) =>
        story.post_title?.toLowerCase().includes(query) ||
        story.post_description?.toLowerCase().includes(query) ||
        story.auther_name?.toLowerCase().includes(query)
    );
  }, [stories, searchQuery]);

  // Calculate pagination based on FILTERED stories
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const startIndex = (currentPage - 1) * storiesPerPage;
  const currentStories = filteredStories.slice(
    startIndex,
    startIndex + storiesPerPage
  );

  // Reset to page 1 when search changes
  useState(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Function to limit title to 5 words
  const limitTitleToFiveWords = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <Lottie animationData={Loading} />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">
              {t("RoshangariPage.error:")}: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 ">
        <div className="mb-8 bg-blue-100 h-40 w-full text-center flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900  mb-4">
            Roshangari and Featured Stories
          </h1>
        </div>
        <div className="container mx-auto px-4 py-8">
          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder={t("RoshangariPage.search roshangari stories")}
              />

              {/* Clear Search Button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                  title={t("RoshangariPage.clear search")}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="border-t border-t-gray-200 dark:border-t-gray-900 pb-8"></div>

          {/* Stories Grid - 4 per line */}
          {currentStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-blue-100 rounded-xl hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
                >
                  {/* Story Thumbnail */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-50 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                      {story.post_image ? (
                        <Image
                          src={story.post_image}
                          alt={story.post_title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src="/hero-section-image.jpg"
                          alt={story.post_title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {/* Views Counter Overlay */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs backdrop-blur-sm">
                      <span>👁️</span>
                      <span>{story.views}</span>
                    </div>
                  </div>

                  {/* Card Content - Flex column to push button to bottom */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Title - Limited to 5 words */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {limitTitleToFiveWords(story.post_title)}
                    </h3>

                    {/* Author */}
                    <p className="text-blue-600 dark:text-gray-400 text-sm mb-2">
                      {story.author_name}
                    </p>

                    {/* Description - Limited to 3 lines */}
                    <div
                      className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3 flex-1 rich-text-content"
                      dangerouslySetInnerHTML={{
                        __html: story.post_description,
                      }}
                    />

                    {/* Story Details Button - Full width at the bottom */}
                    <Link href={`/${locale}/featured-stories/${story.id}`}>
                      <button className="custom-my-btn">
                        {t("RoshangariPage.story detail")}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No results message
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                {stories.length === 0
                  ? t("RoshangariPage.no stories found")
                  : t(`RoshangariPage.no stories found "${searchQuery}"`)}
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {t("RoshangariPage.clear search")}
                </button>
              )}
            </div>
          )}

          {/* Pagination - Only show if there are results */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                }`}
              >
                {t("RoshangariPage.previous")}
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg border transition-colors ${
                      currentPage === page
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                }`}
              >
                {t("RoshangariPage.next")}
              </button>
            </div>
          )}
        </div>
      </div>
      <SocialMediaSection />
    </>
  );
}