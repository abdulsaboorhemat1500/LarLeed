// app/featured-stories/[id]/page.js
'use client';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { useState, useEffect, use } from "react";
import BackButton from '@/components/ui/back-button';
import Image from 'next/image';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
import SocialMediaSection from "@/components/homePage/socialmedia";
export default function StoryDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const { stories: id } = unwrappedParams;
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();
  const { t } = useTranslations();
  // Fetch story data from API
  useEffect(() => {
    const fetchStory = async () => {
      try {
        if (!id) {
          return;
        }

        setLoading(true);
        setError(null);

        const result = await get(`/api/posts/${id}`);

        if (result.success) {
          setStory(result.data);
        } else {
          setError(result.error || t("storyDetailsPage.failed to fetch story"));
        }
      } catch (error) {
        setError(
          error.message ||
            t("storyDetailsPage.network error. Please try again.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">
              Error:No story ID provided in URL
            </p>
            <p className="text-gray-500 mt-2">
              Please check the URL and try again
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("storyDetailsPage.loading story...")}
            </p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              {t("storyDetailsPage.try again")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("storyDetailsPage.story not found.")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {story.post_title}
            </h1>
          </div>

          {story.post_image && (
            <div className="mb-8">
              <div className="relative w-full h-80 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={story.post_image}
                  alt="this is story image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {story.post_title}
                </h1>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div
                    className="text-gray-600 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: story.post_description }}
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("storyDetailsPage.story details")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("storyDetailsPage.this inspiring story was shared by")}{" "}
                    {story.author_name}{" "}
                    {t(
                      "storyDetailsPage.as part of our community stories collection."
                    )}
                    {t(
                      "storyDetailsPage.each story represents the resilience and hope within our community."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("storyDetailsPage.story author details")}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                      {story.post_image ? (
                        <Image
                          src={story.post_image}
                          alt="this is story image"
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {(story.author_name || "AA")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {story.author_name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {story.author_job_title || "Author"}
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
                          {t("storyDetailsPage.published")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {story.created_at
                            ? new Date(story.created_at).toLocaleDateString()
                            : "Recent"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">
                          📧
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("storyDetailsPage.email address")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {story.author_email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">
                          📍
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("storyDetailsPage.category")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {story.category}
                        </p>
                      </div>
                    </div>

                    {story.auther_email && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-400">
                            ✉️
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t("storyDetailsPage.email")}
                          </p>
                          <a
                            href={`mailto:${story.auther_email}`}
                            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {story.auther_email}
                          </a>
                        </div>
                      </div>
                    )}

                    {story.auther_job_title && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-400">
                            💼
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t("storyDetailsPage.profession")}
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {story.auther_job_title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {story.auther_email && (
                      <a
                        href={`mailto:${story.auther_email}`}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center"
                      >
                        {t("storyDetailsPage.contact author")}
                      </a>
                    )}
                    <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-4 rounded-lg font-medium mt-3 transition-colors">
                      {t("storyDetailsPage.share story")}
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