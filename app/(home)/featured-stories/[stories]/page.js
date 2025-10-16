// app/featured-stories/[id]/page.js
'use client';
export const runtime = 'edge';
import { useState, useEffect , use } from 'react';
import GetInTouchSection from '@/components/get-in-touch';
import BackButton from '@/components/ui/back-button';
import Image from 'next/image';

export default function StoryDetailsPage({ params }) {

  const unwrappedParams = use(params);
  const { 'stories': id } = unwrappedParams;
  // const id = stories;
  
  
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch story data from API
  useEffect(() => {
    const fetchStory = async () => {
      try {
        // Check if id is available
        if (!id) {
          return;
        }

        setLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/posts/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();

        if (result.success) {
          setStory(result.data);
        } else {
          console.log('❌ API returned error:', result.error);
          setError(result.error || 'Failed to fetch story');
        }
      } catch (error) {
        console.error('💥 Error fetching story:', error);
        setError(error.message || 'Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]); // Add id as dependency

  // Show loading only when we have an id but data is still loading
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: No story ID provided in URL</p>
            <p className="text-gray-500 mt-2">Please check the URL and try again.</p>
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
            <p className="text-gray-500 text-lg">Loading story...</p>
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
              Try Again
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
            <p className="text-gray-500 text-lg">Story not found.</p>
          </div>
        </div>
      </div>
    );
  }

  // ... rest of your component with the actual story data
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {story.post_title}
            </h1>
          </div>

          {/* Featured Image */}
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

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Story Content (2/3 width on desktop) */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {story.post_title}
                </h1>
                
                {/* Text Area */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                    {story.post_description}
                  </div>
                </div>

                {/* Additional Story Sections */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Story Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This inspiring story was shared by {story.author_name} as part of our community stories collection. 
                    Each story represents the resilience and hope within our community.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Story Details (1/3 width on desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Story Author Details
                </h2>
                
                {/* Author Information */}
                <div className="space-y-6">
                  {/* Author Profile */}
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
                          {(story.author_name || 'AA').split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {story.author_name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {story.author_job_title || 'Author'}
                      </p>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400">📅</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {story.created_at ? new Date(story.created_at).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">📧</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {story.author_email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">📍</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {story.category}
                        </p>
                      </div>
                    </div>

                    {story.auther_email && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-400">✉️</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
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
                          <span className="text-purple-600 dark:text-purple-400">💼</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Profession</p>
                          <p className="font-medium text-gray-900 dark:text-white">{story.auther_job_title}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {story.auther_email && (
                      <a 
                        href={`mailto:${story.auther_email}`}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center"
                      >
                        Contact Author
                      </a>
                    )}
                    <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-4 rounded-lg font-medium mt-3 transition-colors">
                      Share Story
                    </button>
                  </div>
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