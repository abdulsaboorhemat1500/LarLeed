'use client';
import BackButton from '@/components/ui/back-button';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturedStoriesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const videosPerpage = 12;
  
  // Sample video data - Fixed duplicate IDs and added variety
  const allVideos = [
    { id: 1, title: 'Introduction to Programming', description: 'Learn the basics of programming and start your coding journey', duration: '15:30', author: 'John Smith' },
    { id: 2, title: 'Web Development Basics', description: 'HTML, CSS and JavaScript fundamentals for beginners', duration: '22:45', author: 'Sarah Johnson' },
    { id: 3, title: 'Data Structures Explained', description: 'Comprehensive guide to data structures and algorithms', duration: '18:20', author: 'Mike Chen' },
    { id: 4, title: 'Machine Learning Fundamentals', description: 'Introduction to ML concepts and practical applications', duration: '25:10', author: 'Emma Davis' },
    { id: 5, title: 'Mobile App Development', description: 'Build iOS and Android apps from scratch', duration: '30:15', author: 'Alex Rodriguez' },
    { id: 6, title: 'Cloud Computing Guide', description: 'Understanding AWS and cloud deployment strategies', duration: '20:40', author: 'Lisa Wang' },
    { id: 7, title: 'Cybersecurity Essentials', description: 'Learn about security threats and protection methods', duration: '28:35', author: 'Tom Wilson' },
    { id: 8, title: 'Database Management', description: 'Complete guide to database design and SQL', duration: '19:25', author: 'Rachel Green' },
    { id: 9, title: 'UI/UX Design Principles', description: 'Master user interface and experience design', duration: '16:50', author: 'Kevin Brown' },
    { id: 10, title: 'DevOps Practices', description: 'CI/CD and deployment automation strategies', duration: '24:15', author: 'Maria Garcia' },
    { id: 11, title: 'Game Development', description: 'Create games with modern development tools', duration: '21:30', author: 'David Lee' },
    { id: 12, title: 'AI Engineering', description: 'Artificial intelligence and neural networks', duration: '26:45', author: 'Sophia Martinez' },
    { id: 13, title: 'Blockchain Technology', description: 'Understanding blockchain and smart contracts', duration: '23:20', author: 'James Taylor' },
    { id: 14, title: 'Internet of Things', description: 'IoT devices and their real-world applications', duration: '17:55', author: 'Emily Clark' },
    { id: 15, title: 'Software Testing', description: 'Quality assurance and testing methodologies', duration: '19:40', author: 'Daniel White' },
    { id: 16, title: 'API Development', description: 'RESTful APIs and backend development', duration: '22:10', author: 'Olivia Harris' },
  ];

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) {
      return allVideos;
    }
    
    const query = searchQuery.toLowerCase();
    return allVideos.filter(video => 
      video.title.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query) ||
      video.author.toLowerCase().includes(query)
    );
  }, [allVideos, searchQuery]);

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
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };

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
              placeholder="Search videos by title, description, or author..."
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
            {currentVideos.map((video) => (
              <div 
                key={video.id}
                className="bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-60 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                    <Image
                      src="/hero-section-image.jpg"
                      alt={video.title}
                      width={500}
                      height={500}
                      className='w-full h-full object-cover'
                    />
                    {/* Video Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </div>
                  </div>
                </div>

                {/* Card Content - Flex column to push button to bottom */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Title - Limited to 5 words */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                    {limitTitleToFiveWords(video.title)}
                  </h3>
                  
                  {/* Author */}
                  <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
                    {video.author}
                  </p>
                  
                  {/* Description - Limited to 3 lines */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 flex-1">
                    {video.description}
                  </p>
                </div>

                {/* Buttons - Full width at the bottom */}
                <div className="p-5 pt-0 space-y-2">
                  <a href="https://youtu.be/k5Y1pN7TgZQ?si=sj7yJJJQc-O_OkO4" target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="sm" 
                      className="cursor-pointer mb-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 w-full justify-center py-2.5"
                    >
                      Watch Video
                    </Button>
                  </a>
                  
                  <Link href={`/featured-videos/${video.id}`}>
                    <Button 
                      size="sm" 
                      className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 w-full justify-center py-2.5"
                    >  
                      Video Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No results message
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No videos found matching "{searchQuery}"
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Clear Search
            </button>
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