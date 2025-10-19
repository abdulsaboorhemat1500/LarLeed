'use client';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function ApplicationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();

  useEffect(() => {
    if (id) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await get(`/api/aplyingScholarships/${id}`);
      
      console.log('📦 API Response:', result);

      if (result.success) {
        setApplication(result.data);
      } else {
        setError(result.error || 'Failed to fetch application');
      }
    } catch (err) {
      console.error('🚨 Fetch error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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

  const isDeadlineActive = (deadline) => {
    if (!deadline) return false;
    try {
      return new Date(deadline) > new Date();
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
            <button
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to List
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading application details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
            <button
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to List
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Application</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchApplication}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
            <button
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to List
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Application not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
              <p className="text-gray-600 mt-1">Name: {application.full_name}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.full_name || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.email || 'N/A'}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.address || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.phone || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {formatDate(application.date_of_birth)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Academic Information</h2>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.uni_name || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level of Study</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.level_of_study || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.graduation_year || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Major/Field of Study</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.major || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.gpa ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {application.gpa}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarship Information Section */}
          <div>
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Scholarship Information</h2>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_name || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_country || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_university || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Study Level</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_level ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {application.sch_level}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_deadline ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isDeadlineActive(application.sch_deadline) 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {formatDate(application.sch_deadline)}
                        {isDeadlineActive(application.sch_deadline) ? ' (Active)' : ' (Expired)'}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}