'use client';
import BackButton from '@/components/ui/back-button';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApi } from '@/app/hooks/useApi';

export default function FeaturedVideosList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videosPerpage = 12;
  const { get } = useApi();

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const result = await get('/api/featured-videos');

        if (result.success) {
          setVideos(result.data);
        } else {
          setError(result.error || 'Failed to fetch videos');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) {
      return videos;
    }
    
    const query = searchQuery.toLowerCase();
    return videos.filter(video => 
      video.v_title?.toLowerCase().includes(query) ||
      video.v_description?.toLowerCase().includes(query) ||
      video.v_creature?.toLowerCase().includes(query)
    );
  }, [videos, searchQuery]);

  // Calculate pagination based on FILTERED videos
  const totalPages = Math.ceil(filteredVideos.length / videosPerpage);
  const startIndex = (currentPage - 1) * videosPerpage;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + videosPerpage);

  // Reset to page 1 when search changes
  useState(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Function to limit title to 5 words
  const limitTitleToFiveWords = (title) => {
    if (!title) return '';
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };

  // Function to extract YouTube video ID from URL for thumbnail
  const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[7].length === 11) ? match[7] : null;
    
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    
    return null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="block text-blue-600 dark:text-blue-400 mt-2">Featured Videos</span>
            </h1>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="block text-blue-600 dark:text-blue-400 mt-2">Featured Videos</span>
            </h1>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="block text-blue-600 dark:text-blue-400 mt-2">Featured Videos</span>
          </h1>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search videos by title, description, or creator..."
            />
            
            {/* Clear Search Button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                title="Clear search"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-t-gray-200 dark:border-t-gray-900 pb-8"></div>

        {/* Videos Grid */}
        {currentVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentVideos.map((video) => {
              const displayImage = video.v_image || getYouTubeThumbnail(video.v_link) || "/hero-section-image.jpg";
              
              return (
                <div 
                  key={video.id}
                  className="bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
                >
                  {/* Video Thumbnail */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-60 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                      <Image
                        src={displayImage}
                        alt={video.v_title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Video Duration Badge - Placeholder since we don't have duration in API */}
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Video
                      </div>
                    </div>
                  </div>

                  {/* Card Content - Flex column to push button to bottom */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Title - Limited to 5 words */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {limitTitleToFiveWords(video.v_title)}
                    </h3>
                    
                    {/* Creator */}
                    <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
                      {video.v_creature || 'Unknown Creator'}
                    </p>
                    
                    {/* Description - Limited to 3 lines */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 flex-1">
                      {video.v_description || 'No description available'}
                    </p>
                  </div>

                  {/* Buttons - Full width at the bottom */}
                  <div className="p-5 pt-0 space-y-2">
                    {/* Watch Video Button */}
                    {video.v_link ? (
                      <a href={video.v_link} target="_blank" rel="noopener noreferrer">
                        <Button 
                          size="sm" 
                          className="cursor-pointer mb-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 w-full justify-center py-2.5"
                        >
                          Watch Video
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        size="sm" 
                        disabled
                        className="cursor-not-allowed mb-2 bg-gray-400 text-white flex items-center gap-2 w-full justify-center py-2.5"
                      >
                        No Video Link
                      </Button>
                    )}
                    
                    {/* Video Details Button */}
                    <Link href={`/featured-videos/${video.id}`}>
                      <Button 
                        size="sm" 
                        className="cursor-pointer bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 w-full justify-center py-2.5"
                      >  
                        Video Details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // No results message
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {videos.length === 0 ? 'No videos found.' : `No videos found matching "${searchQuery}"`}
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Pagination - Only show if there are results */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600'
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg border transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}