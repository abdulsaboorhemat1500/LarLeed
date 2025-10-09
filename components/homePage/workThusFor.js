import Image from 'next/image';
import Link from 'next/link';

export default function WorkThusFor() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content - Left Side */}
          <div className="space-y-6">
            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Work Thus For
            </h2>
            
            {/* Description */}
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <p>
                At LarLeed, we are dedicated to creating lasting impact through our comprehensive 
                initiatives focused on education, dialogue, and youth empowerment.
              </p>
              
              <p>
                Our work spans across multiple domains, each designed to address the unique 
                challenges faced by Afghan youth while harnessing their incredible potential 
                for positive change.
              </p>
              
              <p>
                Through strategic partnerships, community engagement, and innovative programs, 
                we strive to build a brighter future where every young Afghan has the opportunity 
                to learn, grow, and lead.
              </p>
            </div>
            
            {/* Key Focus Areas
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">Education Access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">Youth Leadership</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">Community Dialogue</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">Skill Development</span>
              </div>
            </div> */}
            
            {/* Call to Action */}
            <div className="pt-6">
              <Link href="/about">
              <button className="cursor-pointer px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                Learn More About Our Work
              </button>
              </Link>
            </div>
          </div>
          
          {/* Image Content - Right Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Default Picture Placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4 text-blue-600 dark:text-blue-400">🌟</div>
                 
                </div>
              </div>
              
              
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -z-10 bottom-10 -left-10 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}