'use client';
import BackButton from '@/components/ui/back-button';
import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturedStoriesList() {

  const [currentPage, setCurrentPage] = useState(1);
  const videosPerpage = 12;
  
  // Sample video data
  const allVideos = [
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    
    { id: 2, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ', duration: '12:34' },
    { id: 3, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ', duration: '12:34' },
    { id: 4, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ', duration: '12:34' },
    { id: 5, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ', duration: '12:34' },
    { id: 6, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 7, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 8, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 9, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d ' },
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d '  },
  ];

    // Function to limit title to 5 words
  const limitTitleToFiveWords = (title) => {
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };

  // Calculate pagination
  const totalPages = Math.ceil(allVideos.length / videosPerpage);
  const startIndex = (currentPage - 1) * videosPerpage;
  const currentVideos = allVideos.slice(startIndex, startIndex + videosPerpage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-6 ">
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
              className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              placeholder="Search videos..."
            />
          </div>
        </div>
        <div className="border-t border-t-gray-200 dark:border-t-gray-900 pb-8">

        </div>
        {/* stories Grid - 4 per line */}
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
                        src="/hero-section-image.jpg" // Replace with your image path
                        alt="Hero Image"
                        width={500}
                        height={500}
                        className='w-full'
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
                    <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
                    Ed Donner, Ligency
                    </p>
                    
                    {/* Description - Limited to 3 lines */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm  line-clamp-3 flex-1">
                    {video.description}
                    </p>
                </div>
                {/* Watch Button - Full width at the bottom */}
                    <a href="https://youtu.be/k5Y1pN7TgZQ?si=sj7yJJJQc-O_OkO4" target='__blank' className="px-5 pb-2">
                    <Button 
                      size="sm" 
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 w-full justify-center py-2.5"
                    >
                      Watch Video
                    </Button>
                  </a>
                  <Link href={`/featured-videos/${video.id}`} className="px-5 pb-3">
                    <Button 
                      size="sm" 
                      className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 w-full justify-center py-2.5"
                    >  
                      Video Details
                    </Button>
                  </Link>
            </div>
              
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg border ${
                currentPage === page
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}