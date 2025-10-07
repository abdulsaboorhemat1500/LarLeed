// components/HeroSection.js
'use client';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Transform Your Future with
            <span className="block text-blue-600 dark:text-blue-400 mt-2">LarLeed Education</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2 max-w-3xl mx-auto leading-relaxed">
            Access world-class programs and generous scholarships designed to help you achieve your academic and career goals. Start your learning journey today.
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Access world-class programs and generous scholarships designed to help you achieve your academic and career goals. Start your learning journey today.
          </p>
        </div>
      </div>
    </section>
  );
}