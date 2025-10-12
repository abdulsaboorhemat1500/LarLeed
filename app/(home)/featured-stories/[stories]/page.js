// app/featured-stories/[slug]/page.js
import GetInTouchSection from '@/components/get-in-touch';
import BackButton from '@/components/ui/back-button';
import Image from 'next/image';

export default function StoryDetailsPage({ params }) {
  const { 'stories' : slug } = params;
  
  // Sample story data - replace with actual data from API or database
  const story = {
    title: "From Ghazni to Kabul the capital City",
    image: "/stories/education-journey.jpg", // Replace with actual image
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.`,
    author: {
      name: "Saboor Hemat",
      year: "2023",
      address: "Kabul, Afghanistan",
      email: "saboorhemat4600@gmail.com",
      country: "Afghanistan",
      phone: "+93 790161600"
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {story.title}{slug}
          </h1>
        </div>

        {/* Featured Image */}
        {/* <div className="mb-8">
          <div className="relative w-full h-64 md:h-80 lg:h-140 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Image
              src="/hero-section-image.jpg"
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
           
          </div>
        </div> */}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Story Content (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {story.title}
              </h1>
              
              {/* Text Area */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                  {story.content}
                </div>
              </div>

              {/* Additional Story Sections */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Journey Continues
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                  Sed ut perspiciatis unde omnis                 </p>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {/* <span className="text-white font-bold text-lg">
                      {story.author.name.split(' ').map(n => n[0]).join('')}
                    </span> */}
                     <Image
                      src="/team-members/saboor.png"
                      alt={story.title}
                       width={64}
                      height={64}
                      className="object-cover rounded-full"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {story.author.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Author
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                      <p className="font-medium text-gray-900 dark:text-white">{story.author.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p className="font-medium text-gray-900 dark:text-white">{story.author.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400">🌍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                      <p className="font-medium text-gray-900 dark:text-white">{story.author.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400">✉️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <a 
                        href={`mailto:${story.author.email}`}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {story.author.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400">📞</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <a 
                        href={`tel:${story.author.phone}`}
                        className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {story.author.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    Contact Author
                  </button>
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