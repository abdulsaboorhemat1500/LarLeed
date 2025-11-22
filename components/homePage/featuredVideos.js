'use client';
import { Play} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
import { useParams } from 'next/navigation';


export default function FeaturedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();
  const { t } = useTranslations();
  const { locale } = useParams();

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const result = await get("/api/featured-videos");

        if (result.success) {
          // Get only the latest first 4 videos (sorted by created_at descending)
          const latestVideos = result.data.slice(0, 4);
          setVideos(latestVideos);
        } else {
          setError(result.error || "Failed to fetch videos");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Function to limit title to 5 words
  const limitTitleToFiveWords = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  // Function to handle navigation to story details
  const handleStoryDetails = (storyId) => {
    router.push(`/${locale}/featured-videos/${storyId}`);
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeThumbnail = (url) => {
    if (!url) return null;

    // Extract YouTube video ID
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[7].length === 11 ? match[7] : null;

    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    return null;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t("HomePage.featured videos")}
              </h2>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("HomePage.loading video")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t("HomePage.featured videos")}
              </h2>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">
              {t("RoshangariPage.error")}: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t("HomePage.featured videos")}
            </h2>
          </div>

          {videos.length > 0 && (
            <Link
              href={`/${locale}/featured-videos`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-lg transition-colors duration-200"
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
          )}
        </div>

        {/* Video Cards Grid */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {videos.map((video) => {
              const youtubeThumbnail = getYouTubeThumbnail(video.v_link);
              const displayImage =
                video.v_image || youtubeThumbnail || "/hero-section-image.jpg";

              return (
                <div
                  key={video.id}
                  className="bg-custom-sm rounded-xl hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
                >
                  {/* Video Thumbnail */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-50 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                      <Image
                        src={displayImage}
                        alt={video.v_title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Card Content - Flex column to push button to bottom */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Title - Limited to 5 words */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {limitTitleToFiveWords(video.v_title)}
                    </h3>

                    {/* Creator */}
                    <p className="text-blue-600 dark:text-gray-400 font-semibold text-sm mb-2">
                      {video.v_creature || "Unknown Creator"}
                    </p>

                    {/* Description - Limited to 3 lines */}
                    <p
                      className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 flex-1"
                      dangerouslySetInnerHTML={{
                        __html:
                          video.v_description ||
                          "No description available for this video.",
                      }}
                    />

                    {/* Buttons - Full width at the bottom */}
                    <Button
                      className="custom-my-btn"
                      onClick={() => handleStoryDetails(video.id)}
                    >
                      {t("HomePage.video details")}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("HomePage.no videos found")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}