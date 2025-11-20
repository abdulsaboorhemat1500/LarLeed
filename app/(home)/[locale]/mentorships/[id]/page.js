'use client';
export const runtime = 'edge';
export const dynamic = "force-dynamic";
import BackButton from '@/components/ui/back-button';
import Image from 'next/image';
import { useState, useEffect, use } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
// Safe icon component
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function TeamMemberDetails({ params }) {
  // Unwrap the params promise using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { get } = useApi();
  const { t } = useTranslations();
  // Fetch specific mentor data from API
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        setLoading(true);
        const result = await get(`/api/mentor-team/${id}`);

        if (result.success) {
          setMentor(result.data);
        } else {
          setError(result.error || 'Failed to fetch mentor details');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMentor();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
            <BackButton />
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
            <BackButton />
            <div className="text-center text-red-600 py-12">
              <p>{error}</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!mentor) {
    return (
      <>
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
            <BackButton />
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">{t('MentorDetailsPage.mentor not found.')}</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <BackButton />
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
              <div className="lg:col-span-2 mx-auto text-center">
                <div className="mb-5 mx-auto w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 text-center">
                  <div className="cursor-pointer hover:shadow-xl w-full h-full rounded-full transform hover:scale-105 transition-transform duration-300  flex items-center justify-center overflow-hidden shadow-md">
                    <Image
                      src={mentor.profile_image || "/team-members/saboor.png"}
                      alt={mentor.full_name || "Mentor"}
                      width={180}
                      height={180}
                      className="object-cover rounded-full"
                      onError={(e) => {
                        e.target.src = "/team-members/saboor.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 mt-2">
                      {mentor.full_name || "Mentor Name"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium ">
                      {mentor.job_title}
                    </p>
                  </div>
                </div>
                <div className="mt-20">
                  <p className="text-lg text-gray-500 dark:text-white font-medium">
                    {mentor.bio ||
                      mentor.summary ||
                      "Hello guys my name is abdul saboor hemat, I am a web Developer working with next.js and Laravel."}
                  </p>
                </div>
                {/* Social Media Links */}
                <div className="flex space-x-4 text-white mx-auto justify-center mt-7">
                  {mentor.facebook_link && (
                    <a
                      href={mentor.facebook_link}
                      className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                  )}
                  {mentor.youtube_link && (
                    <a
                      href={mentor.youtube_link}
                      className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors duration-200"
                      aria-label="YouTube"
                    >
                      <YoutubeIcon className="w-5 h-5" />
                    </a>
                  )}
                  {mentor.linkedin_link && (
                    <a
                      href={mentor.linkedin_link}
                      className="p-2 bg-gray-800 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="">
                  {/* Details List */}
                  <div className="space-y-4 justify-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400">
                          📅
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("MentorDetailsPage.experience")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {mentor.experience || "No Experience"}
                        </p>
                      </div>
                    </div>

                    {/* <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">
                          📍
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("MentorDetailsPage.address")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {mentor.address || "No Address"}
                        </p>
                      </div>
                    </div> */}

                    {/* <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400">
                          🌍
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("MentorDetailsPage.country")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {mentor.country || "No Country"}
                        </p>
                      </div>
                    </div> */}

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400">
                          ✉️
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("MentorDetailsPage.email")}
                        </p>
                        <a
                          href={`mailto:${mentor.email || "No Email"}`}
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {mentor.email || "No Email"}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 dark:text-orange-400">
                          📞
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("MentorDetailsPage.phone")}
                        </p>
                        <a
                          href={`tel:${mentor.phone || "NO number"}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {mentor.phone || "No number"}
                        </a>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        {t("MentorDetailsPage.contact")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}