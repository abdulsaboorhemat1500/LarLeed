'use client';
export const runtime = 'edge';
import BackButton from '@/components/ui/back-button';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
import { useParams } from 'next/navigation';
import SocialMediaSection from "@/components/homePage/socialmedia";

export default function FeaturedStoriesList() {
  const { locale } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storiesPerPage = 12;
  const { get } = useApi();
  const { t } = useTranslations();
  // Fetch stories from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const result = await get("/api/posts");

        if (result.success) {
          // Filter posts where category is "story"
          const storyPosts = result.data.filter(
            (post) => post.category === "story"
          );
          setStories(storyPosts);
        } else {
          setError(result.error || t("HomePage.failed to fetch stories"));
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(t("HomePage.network error. please try again."));
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

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

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const startIndex = (currentPage - 1) * storiesPerPage;
  const currentStories = filteredStories.slice(
    startIndex,
    startIndex + storiesPerPage
  );

  useState(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const limitTitleToFiveWords = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("HomePage.loading stories...")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg"> error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
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
                placeholder={t(
                  "HomePage.search stories by title, description, or author..."
                )}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                  title={t("HomePage.clear search")}
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

          <div className="border-t border-t-gray-200  pb-8"></div>

          {currentStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-custom-sm rounded-xl hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-60 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
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
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {limitTitleToFiveWords(story.post_title)}
                    </h3>

                    <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
                      {story.author_name}
                    </p>

                    <div
                      className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1 rich-text-content"
                      dangerouslySetInnerHTML={{
                        __html: story.post_description,
                      }}
                    />

                    <Link href={`/${locale}/featured-stories/${story.id}`}>
                      <button className="custom-my-btn">
                        {t("HomePage.story details")}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                {stories.length === 0
                  ? t("HomePage.no stories found.")
                  : t(`HomePage.no stories found matching "${searchQuery}"`)}
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {t("HomePage.clear search")}
                </button>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                }`}
              >
                {t("HomePage.previous")}
              </button>

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
                {t("HomePage.next")}
              </button>
            </div>
          )}
        </div>
      </div>
      <SocialMediaSection />
    </>
  );
}