// components/OnlineSchoolsSection.js
import Link from 'next/link';
import SchoolCard from './school-card';

export default function MasterDegreeCardListSection() {

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Scholarships in <span className="text-blue-600 dark:text-blue-400">Master's</span> Degree 
            </h2>
            
            </div>
            
            <Link 
                href="#" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-lg transition-colors duration-200"
            >
                See all
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <SchoolCard />
                <SchoolCard />
                <SchoolCard />
                <SchoolCard />
         </div>
      </div>
    </section>
  );
}