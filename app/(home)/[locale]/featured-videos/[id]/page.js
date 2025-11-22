// app/featured-videos/[id]/page.js
'use client';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { useState, useEffect, use } from "react";
import BackButton from '@/components/ui/back-button';
import Image from 'next/image';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
import SocialMediaSection from "@/components/homePage/socialmedia";

export default function VideoDetailsPage({ params }) {
  const unrraped = use(params);
  const id = unrraped.id;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();
  const { t } = useTranslations();
  // Fetch video data from API
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const result = await get(`/api/featured-videos/${id}`);

        if (result.success) {
          setVideo(result.data);
        } else {
          setError(result.error || t("videoDetailsPage.failed to fetch video"));
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setError(t("videoDetailsPage.network error. Please try again."));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[7].length === 11 ? match[7] : null;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("videoDetailsPage.loading video...")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              {t("videoDetailsPage.try again")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("videoDetailsPage.video not found.")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(video.v_link);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <BackButton />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-2">
              {/* Video Player Section */}
              {embedUrl ? (
                <div className="relative w-full h-0 pb-[56.25%]">
                  {" "}
                  {/* 16:9 aspect ratio */}
                  <iframe
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    title={video.v_title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-96 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {t("videoDetailsPage.video not available")}
                  </p>
                </div>
              )}

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {video.v_title}
                </h1>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed rich-text-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        video.v_description ||
                        "No description available for this video.",
                    }}
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("videoDetailsPage.video information")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("videoDetailsPage.category")}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {video.v_category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("videoDetailsPage.created")}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(video.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="w-full h-60 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                    <Image
                      src={video.v_image}
                      alt={video.v_title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-6 p-6 md:p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                      🎥
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t("videoDetailsPage.video creator")}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {video.v_creature || "Unknown Creator"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400">
                          📅
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("videoDetailsPage.published")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(video.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">
                          📺
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("videoDetailsPage.category")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {video.v_category}
                        </p>
                      </div>
                    </div>

                    {video.v_creature && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-400">
                            👤
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t("videoDetailsPage.creator")}
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {video.v_creature}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    {video.v_link ? (
                      <a
                        href={video.v_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <button className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          {t("videoDetailsPage.watch on youtube")}
                        </button>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="cursor-not-allowed w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        {t("videoDetailsPage.no video link")}
                      </button>
                    )}

                    <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      {t("videoDetailsPage.share video")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SocialMediaSection />
    </>
  );
}