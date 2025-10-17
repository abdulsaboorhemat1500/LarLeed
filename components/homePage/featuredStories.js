'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeaturedStories() {
  const router = useRouter();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        console.log("here i am")
        const result = await response.json();

        if (result.success) {
          // Filter posts where category is "story" - FIXED: use post_category instead of category
          const storyPosts = result.data.filter(post => post.category === 'story');
          setStories(storyPosts);
        } else {
          setError(result.error || 'Failed to fetch stories');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Function to handle navigation to story details
  const handleStoryDetails = (storyId) => {
    router.push(`/featured-stories/${storyId}`);
  };

  // Function to limit title to 5 words
  const limitTitleToFiveWords = (title) => {
    if (!title) return '';
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Featured Stories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Inspiring Stories of hope, resilience, and transformation from our community
              </p>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading stories...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Featured Stories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Inspiring Stories of hope, resilience, and transformation from our community
              </p>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Inspiring Stories of hope, resilience, and transformation from our community
            </p>
          </div>
          
          <Link
            href="/featured-stories" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-lg transition-colors duration-200"
          >
            See all
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Video Cards Grid */}
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stories.map((story) => (
              <div 
                key={story.id}
                className="bg-white dark:bg-gray-800 rounded-2xl hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
              >
                {/* Post Thumbnail */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-60 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                    {story.post_image ? (
                      <Image
                        src={story.post_image}
                        alt={story.post_title || 'Story image'}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src="/hero-section-image.jpg"
                        alt="Default story image"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Card Content - Flex column to push button to bottom */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Title - Limited to 5 words */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                    {limitTitleToFiveWords(story.post_title)}
                  </h3>
                  
                  {/* Author Information */}
                  <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
                    {story.auther_name || story.author_name}
                    {story.auther_job_title && `, ${story.auther_job_title}`}
                  </p>
                  
                  {/* Description - Limited to 3 lines */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                    {story.post_description}
                  </p>
                  
                  {/* Story Details Button - Full width at the bottom */}
                  <button 
                    onClick={() => handleStoryDetails(story.id)} 
                    className="cursor-pointer w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Story Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured stories found.</p>
          </div>
        )}
      </div>
    </section>
  );
}