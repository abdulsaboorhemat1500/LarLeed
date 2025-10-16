// app/featured-videos/[id]/page.js
'use client';
export const runtime = 'edge';
import { useState, useEffect ,use} from 'react';
import GetInTouchSection from '@/components/get-in-touch';
import BackButton from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function VideoDetailsPage({ params }) {
  const unrraped = use(params);
  const id = unrraped.id;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch video data from API
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/featured-videos/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();

        if (result.success) {
          setVideo(result.data);
        } else {
          setError(result.error || 'Failed to fetch video');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  // Function to extract YouTube video ID from URL
  const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[7].length === 11) ? match[7] : null;
    
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    return null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading video...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
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
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Video not found
  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Video not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const displayImage = video.v_image || getYouTubeThumbnail(video.v_link) || "/hero-section-image.jpg";

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <BackButton />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Video Content (2/3 width on desktop) */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {video.v_title}
                </h1>
                
                {/* Video Description */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                    {video.v_description || 'No description available for this video.'}
                  </div>
                </div>

                {/* Additional Video Information */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Video Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {video.v_category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(video.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Video Details (1/3 width on desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="w-full h-60 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                    <Image
                      src={video.v_image}
                      alt={video.v_title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Play Button Overlay */}
                    {video.v_link && (
                      <div className="  bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-2xl">
                          {video.v_image ? (
                        <img
                          src={video.v_image}
                          alt={video.v_creature}
                          className="object-cover w-full h-full "
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {(video.v_creature || 'VV').split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Video Information */}
                <div className="space-y-6 p-6 md:p-8">
                  {/* Creator Information */}
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                      🎥
                    </div>
                    <div>
                      
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Video Creator
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {video.v_creature || 'Unknown Creator'}
                      </p>
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400">📅</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(video.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">📺</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {video.v_category}
                        </p>
                      </div>
                    </div>

                    {video.v_creature && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-400">👤</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Creator</p>
                          <p className="font-medium text-gray-900 dark:text-white">{video.v_creature}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    {video.v_link ? (
                      <a 
                        href={video.v_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <button className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Watch Video
                        </button>
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="cursor-not-allowed w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        No Video Link
                      </button>
                    )}
                    
                    <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Share Video
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