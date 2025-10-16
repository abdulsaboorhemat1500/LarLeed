'use client';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import GetInTouchSection from "@/components/get-in-touch";
import BackButton from "@/components/ui/back-button";

export default function ScholarshipDetailsPage({ params }) {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Unwrap the params promise
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  // Fetch scholarship data from API
  useEffect(() => {
    const fetchScholarship = async () => {
      if (!resolvedParams?.id) return;

      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/scholarships/${resolvedParams.id}`);
        const result = await response.json();

        if (result.success) {
          setScholarship(result.data);
        } else {
          setError(result.error || 'Failed to fetch scholarship data');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [resolvedParams]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading scholarship details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading Scholarship</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error || 'Scholarship not found'}</p>
              <button
                onClick={() => window.location.reload()}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {scholarship.s_name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {scholarship.s_university} • {scholarship.s_country}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Scholarship Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Scholarship Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {scholarship.s_overview}
                </p>
              </div>

              {/* Full Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Detailed Information
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.s_detailed_info}
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Eligibility Criteria
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.s_eligibility}
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Application Process
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.s_app_procces}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Scholarship Benefits
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.s_benefits}
                </div>
              </div>
            </div>

            {/* Right Column - Scholarship Card (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-22">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Scholarship Summary
                </h3>
                
                <div className="space-y-4">
                  {/* Scholarship Name */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400">🎓</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Scholarship Name</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.s_name}</p>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">🌍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.s_country}</p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400">💬</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Language</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.s_language}</p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-600 dark:text-pink-400">👥</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">For Genders</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.s_gender || 'Both Male & Female'}</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 dark:text-indigo-400">📊</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Study Level</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.s_study_level}</p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 dark:text-red-400">⏰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Application Deadline</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{formatDate(scholarship.s_app_deadline)}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 dark:text-teal-400">📅</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Program Duration</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.s_duration}</p>
                    </div>
                  </div>

                  {/* Funding */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 dark:text-emerald-400">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Funding Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.s_funding_type}</p>
                    </div>
                  </div>
                </div>

                {/* Apply Now Button */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <GetInTouchSection />
    </>
  );
}