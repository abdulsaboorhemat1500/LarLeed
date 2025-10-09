'use client';
import { useState } from 'react';
import Link from 'next/link';
import ArticalCard from '../../../components/articalCard';

export default function AllVideos() {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerpage = 12;
  
  // Fixed video data with unique IDs
  const allVideos = [
    { id: 1, title: 'Introduction to Programming', description: 'kjdfkjdkfjdkjf d dkfj fd kjfddkjf ddf dkf dk d fdk fdkfjdk dkfjdkf df dk fdjf d' },
    { id: 2, title: 'Web Development Basics', description: 'Learn the fundamentals of web development including HTML, CSS and JavaScript' },
    { id: 3, title: 'Data Structures and Algorithms', description: 'Comprehensive guide to data structures and algorithms for beginners' },
    { id: 4, title: 'Machine Learning Fundamentals', description: 'Introduction to machine learning concepts and practical applications' },
    { id: 5, title: 'Mobile App Development', description: 'Build mobile applications for iOS and Android platforms' },
    { id: 6, title: 'Cloud Computing Basics', description: 'Understanding cloud services and deployment strategies' },
    { id: 7, title: 'Cybersecurity Essentials', description: 'Learn about cybersecurity threats and protection methods' },
    { id: 8, title: 'Database Management Systems', description: 'Comprehensive guide to database design and management' },
    { id: 9, title: 'UI/UX Design Principles', description: 'Master user interface and user experience design concepts' },
    { id: 10, title: 'Software Engineering Practices', description: 'Best practices in software development and project management' },
    { id: 11, title: 'Network Fundamentals', description: 'Understanding computer networks and communication protocols' },
    { id: 12, title: 'Artificial Intelligence', description: 'Explore AI concepts and machine learning algorithms' },
    { id: 13, title: 'Blockchain Technology', description: 'Introduction to blockchain and cryptocurrency concepts' },
    { id: 14, title: 'Internet of Things', description: 'Learn about IoT devices and their applications' },
    { id: 15, title: 'DevOps Practices', description: 'Continuous integration and deployment strategies' },
    { id: 16, title: 'Game Development', description: 'Create games using modern development tools and engines' },
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

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');



  return (
    <section className="py-4 bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-9 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
         
          {/* Search Section */}
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Search Input - Larger Width */}
              <div className="relative group flex-1 min-w-2xl justify-end">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg 
                    className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Live Search......"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-base w-full transition-all duration-300 shadow-lg hover:shadow-xl"
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
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {currentVideos.map((program) => (
            <div 
              key={program.id} // ✅ Now using unique IDs
              className="bg-white dark:bg-gray-800 hover:shadow-xl overflow-hidden group flex flex-col h-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
               <div className="max-w-sm bg-white dark:bg-gray-800  shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            {/* Course Image */}
            <div className="h-60 bg-gray-300 dark:bg-gray-600 relative">
              <img 
                src="/hero-section-image.jpg" 
                alt="The Complete Agentic AI Engineering Course"
                className="w-full h-full object-cover"
              />
            
            </div>

                {/* Rest of the content remains the same */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                    The Complete Agentic AI Engineering Course (2025)
                  </h3>

                  <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
                    Ed Donner, Ligency
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                      kj df fldkjf dfjkdsj fkdsjfkdsj fdsjfkdsjf dsjfkadsjfkadjf lkdsjfjsdfjsdjf fdsjfkdsjffdsjfdsk
                      djfadhfdjf dfj dhflsdfj dkjfklsajdf aldjfkdjs fdjf dfj sd
                  </p>
                  
                  <Link href={`/scholarships-programs/${program.id}`}>
                    <button className="cursor-pointer w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                      Read More
                    </button>
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
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
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
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
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}