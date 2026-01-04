'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
import { useParams } from 'next/navigation';
// components/TeamSection.jsx
export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { get } = useApi();
  const { t } = useTranslations();
  const { locale } = useParams();
  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const result = await get('/api/mentor-team');

        if (result.success) {
          // Filter members where category is 'team-member'
          const filteredMembers = result.data.filter(member => 
            member.category === 'team-member'
          );
          setTeamMembers(filteredMembers);
        } else {
          setError(result.error || 'Failed to fetch team members');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
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

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900  mb-6">
              {t("HomePage.team")}
            </h2>
          </div>
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900  mb-6">
            {t("HomePage.team")}
          </h2>
        </div>

        {/* Team Grid - Centered with auto-fit and justify-items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center w-full max-w-[180px]">
              {/* Circular Image */}
              <div className="mb-5 mx-auto w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                <Link
                  href={`/${locale}/mentorships/${member.id}`}
                  className="cursor-pointer hover:shadow-xl w-full h-full rounded-full transform hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden shadow-md"
                >
                  {member.profile_image ? (
                    <Image
                      src={member.profile_image}
                      alt={member.full_name}
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
                      member.profile_image ? "hidden" : "flex"
                    } items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-full w-full h-full`}
                  >
                    <span className="text-sm">{t("HomePage.no image")}</span>
                  </div>
                </Link>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="font-bold text-gray-900  text-lg mb-2">
                  {member.full_name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {member.job_title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No team members message */}
        {teamMembers.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t("HomePage.no team members found")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}