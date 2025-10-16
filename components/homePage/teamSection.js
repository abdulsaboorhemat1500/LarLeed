'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// components/TeamSection.jsx
export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/mentor-team`);
        const result = await response.json();

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
      <section className="py-20 bg-gray-50 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
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
      <section className="py-20 bg-gray-50 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
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
    <section className="py-20 bg-gray-50 dark:bg-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our Team
          </h2>
        </div>

        {/* Team Grid - Centered with auto-fit and justify-items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="text-center w-full max-w-[180px]">
              {/* Circular Image */}
              <div className="mb-5 mx-auto w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                <Link 
                  href={`/mentorships/${member.id}`} 
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
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`${member.profile_image ? 'hidden' : 'flex'} items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-full w-full h-full`}>
                    <span className="text-sm">No Image</span>
                  </div>
                </Link>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
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
              No team members found. Please add some team members in the admin panel.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}