'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
export default function MentorSection() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { get } = useApi();
  const { t } = useTranslations();
  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const result = await get("/api/mentor-team");

        if (result.success) {
          // Filter members where category is 'mentor'
          const filteredMentors = result.data.filter(
            (member) => member.category === "mentor"
          );
          setMentors(filteredMentors);
        } else {
          setError(result.error || t("HomePage.failed to fetch mentors"));
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(t("HomePage.network error please try again"));
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("MentorshipsPage.meet our mentors")}
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("MentorshipsPage.meet our mentors")}
            </h2>
          </div>
          <div className="text-center text-red-600">
            <p>
              {t("RoshangariPage.error")}: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("MentorshipsPage.meet our mentors")}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="text-center w-full max-w-[180px]">
              <div className="mb-5 mx-auto w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                <div className="cursor-pointer hover:shadow-xl w-full h-full rounded-full transform hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden shadow-md">
                  {mentor.profile_image ? (
                    <Image
                      src={mentor.profile_image}
                      alt={mentor.full_name}
                      width={160}
                      height={160}
                      className="object-cover rounded-full w-full h-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`${
                      mentor.profile_image ? "hidden" : "flex"
                    } items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-full w-full h-full`}
                  >
                    <span className="text-sm">{t("HomePage.no image")}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1">
                  {mentor.full_name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {mentor.job_title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {mentor.experience}
                </p>
              </div>
            </div>
          ))}
        </div>

        {mentors.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t("MentorshipsPage.no mentors found")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}