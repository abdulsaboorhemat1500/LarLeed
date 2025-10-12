import Image from 'next/image';
import { Container } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-0">
          
          {/* Introduction Section - Left Side */}
          <div className="flex-1 max-w-2xl lg:pr-12 text-center lg:text-left ">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold  mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> LarLeed</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Connectiong Afghan Youth through Education, Dialogue and Vision.
               Invest in education, for it is the foundation upon which the 
               grandest dreams are built and the brightest futures are crafted.
               Connectiong Afghan Youth through Education, Dialogue and Vision.
               Invest in education, for it is the foundation upon which the 
               grandest dreams are built and the brightest futures are crafted.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col pt-10 sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/about">
              <button className="cursor-pointer px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                More about Us
              </button>
              </Link>
            </div>

            
            <div className="flex flex-wrap justify-between  lg:justify-between gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white text-center">5k+</div>
                <div className="text-gray-500 dark:text-gray-400">Online Education Resrouces</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white text-center">100+</div>
                <div className="text-gray-500 dark:text-gray-400">Detailed Scholarships Guides</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white text-center">1k+</div>
                <div className="text-gray-500 dark:text-gray-400">Mentors</div>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="flex-1 flex justify-center lg:justify-end sm:mb-0">
            <div className="relative w-full  max-w-lg">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                    src="/hero-section-image.jpg" // Replace with your image path
                    alt="Hero Image"
                    width={500}
                    height={500}
                    className='w-full'
                />
              </div>

              {/* <div className="relative">
                <Image
                    src="/heroSectionImagePNG.png" // Replace with your image path
                    alt="Hero Image"
                    width={500}
                    height={500}
                    className='w-full transform hover:scale-105 transition-transform duration-300'
                />
              </div> */}

              {/* Background decorative elements */}
              {/* <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -z-10 bottom-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-40"></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}