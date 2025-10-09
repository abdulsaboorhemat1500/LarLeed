import { Play, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedStories() {
  const stories = [
    {
      id: 1,
      title: "first video dfdfd dfdf  dfdfd dfdfd dfdf",
      description: "fake data hello my name is abdul saboor hemat fake data hello my name is abdul saboor hemat ",
      duration: "15:30",
      // views: "2.4K",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "#"
    },
    {
      id: 2,
      title: "second video",
      description: "fake data hello my name is abdul saboor hemajfjfjfjfjfjfjfjfjfjfjfjfjfjfjjfjfjfjfjfjt fake data hello my name is abdul saboor hemat ",
      duration: "12:45",
      // views: "1.8K",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "third video",
      description: "fake data hello my name is abdul saboor hemat fake data hello my name is abdul saboor hemat ",
      duration: "18:20",
      // views: "3.1K",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "#"
    },
    {
      id: 4,
      title: "fourth video",
      description: "fake data hello my name is abdul saboor hemat fake data hello my name is abdul saboor hemat ",
      duration: "22:10",
      // views: "4.2K",
      thumbnail: "/api/placeholder/400/250",
      videoUrl: "#"
    }
  ];

  // Function to limit title to 5 words
  const limitTitleToFiveWords = (title) => {
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Videos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl ">
              Inspiring Videos of hope, resilience, and transformation from our community
            </p>
          </div>
          
          <Link 
            href="/featured-videos" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-lg transition-colors duration-200"
          >
            See all
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stories.map((story) => (
            <div 
              key={story.id}
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
                    {story.duration}
                  </div>
                </div>
              </div>

              {/* Card Content - Flex column to push button to bottom */}
              <div className="p-5 flex flex-col flex-1">
                {/* Title - Limited to 5 words */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                  {limitTitleToFiveWords(story.title)}
                </h3>
                <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
                  Ed Donner, Ligency
                </p>
                
                {/* Description - Limited to 3 lines */}
                <p className="text-gray-600 dark:text-gray-300 text-sm  line-clamp-3 flex-1">
                  {story.description}
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
                  <Link href={`/featured-videos/${story.id}`} className="px-5 pb-3">
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

       
      </div>
    </section>
  );
}
 