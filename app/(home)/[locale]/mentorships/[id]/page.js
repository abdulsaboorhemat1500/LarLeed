"use client";
export const runtime = "edge";
export const dynamic = "force-dynamic";
import BackButton from "@/components/ui/back-button";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";

// Safe icon component
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default function TeamMemberDetails({ params }) {
  // Unwrap the params promise using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
          setError(result.error || "Failed to fetch mentor details");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Network error. Please try again.");
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
        <section className="bg-gray-50 dark:bg-gray-800 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
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
        <section className="bg-gray-50 dark:bg-gray-800 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
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
        <section className="bg-gray-50 dark:bg-gray-800 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {t("MentorDetailsPage.mentor not found.")}
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-white min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* First Column - Name, Job Title, and Image */}
              <div className="lg:col-span-1">
                <div className="text-center lg:text-left space-y-6">
                  {/* Name and Job Title at the top */}
                  <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {mentor.full_name}
                    </h1>
                    <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto lg:mx-0"></div>
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
                      {mentor.job_title}
                    </p>
                  </div>

                  {/* Image below - not rounded */}
                  <div className="mt-6">
                    <div className="relative group">
                      <div className="overflow-hidden rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={mentor.profile_image}
                          alt={mentor.full_name}
                          width={400}
                          height={500}
                          className="w-full h-auto object-cover"
                          onError={(e) => {
                            e.target.src = "/team-members/saboor.png";
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex justify-center lg:justify-start space-x-3 pt-4">
                    {mentor.facebook_link && (
                      <a
                        href={mentor.facebook_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-100 dark:bg-blue-700 hover:bg-blue-600 rounded-xl transition-all duration-200 transform hover:scale-110"
                        aria-label="Facebook"
                      >
                        <FacebookIcon />
                      </a>
                    )}
                    {mentor.youtube_link && (
                      <a
                        href={mentor.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-100 dark:bg-blue-700 hover:bg-red-600 rounded-xl transition-all duration-200 transform hover:scale-110"
                        aria-label="YouTube"
                      >
                        <YoutubeIcon />
                      </a>
                    )}
                    {mentor.linkedin_link && (
                      <a
                        href={mentor.linkedin_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-100 dark:bg-blue-700 hover:bg-blue-700 rounded-xl transition-all duration-200 transform hover:scale-110"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Second Column - Bio/Description and Contact Info */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Bio/Description Section */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900  border-l-4 border-blue-500 pl-4">
                      About: {mentor.full_name}
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-2xl border-l-4 border-blue-500">
                      <p className="text-gray-700  leading-relaxed text-lg">
                        {mentor.bio || mentor.summary}
                      </p>
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
