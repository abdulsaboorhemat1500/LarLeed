"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import Lottie from "lottie-react";
import Loading from "@/components/lottie-files/Loading.json";

export default function FeaturedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
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
  const handleStoryDetails = (id) => {
    router.push(`/${locale}/featured-videos/${id}`);
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
      <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900  mb-3">
              {t("HomePage.featured videos")}
            </h2>
          </div>

          {videos.length > 0 && (
            <Link
              href={`/${locale}/featured-videos`}
              className="inline-flex items-center text-custom-half  font-semibold text-lg transition-colors duration-200"
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
              const displayImage = youtubeThumbnail;
              return (
                <div
                  key={video.id}
                  className="bg-blue-100 rounded-xl hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
                >
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

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {limitTitleToFiveWords(video.v_title)}
                    </h3>

                    <p className="text-blue-600 dark:text-gray-400 text-sm mb-2 font-semibold">
                      {video.v_creature || "Unknown Creator"}
                    </p>

                    <p
                      className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1"
                      dangerouslySetInnerHTML={{
                        __html: video.v_description,
                      }}
                    />
                    {/* Story Details Button - Full width at the bottom */}
                    <button
                      onClick={() => handleStoryDetails(video.id)}
                      className="cursor-pointer mt-2 bg-custom-half text-white px-8 py-2 w-full rounded-3xl font-semibold text-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {t("HomePage.video details")}
                    </button>
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
