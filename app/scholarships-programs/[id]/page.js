import GetInTouchSection from "@/components/get-in-touch";
import BackButton from "@/components/ui/back-button";

// app/scholarships/[id]/page.js
export default function ScholarshipDetailsPage({ params }) {
  const { id } = params;
  
  // Sample scholarship data
  const scholarship = {
    id: id,
    title: "International Undergraduate Scholarship 26",
    university: "University of Oxford",
    country: "United Kingdom",
    level: "Undergraduate",
    language: "English",
    gender: "Both Male & Female",
    deadline: "March 31, 2026",
    duration: "4 years",
    funding: "Full tuition + living expenses",
    eligibleCountries: ["All Countries"],
    startDate: "September 2024",
    website: "https://www.ox.ac.uk/scholarships",
    
    description: `The International Undergraduate Scholarship at the University of Oxford is a prestigious award designed to support outstanding international students who demonstrate exceptional academic achievement and leadership potential. This scholarship aims to foster global understanding and cultural exchange while providing access to world-class education.`,
    
    fullDescription: `
The International Undergraduate Scholarship represents a commitment to educational excellence and global diversity. This comprehensive scholarship package covers full tuition fees, accommodation, and provides a generous living stipend to ensure students can focus entirely on their academic pursuits without financial constraints.

Key features of this scholarship include:
• Full tuition coverage for the entire duration of the undergraduate program
• Accommodation in university residences
• Monthly living allowance for personal expenses
• Health insurance coverage
• Travel grants for international students
• Research and academic development funds

Eligible programs span across all undergraduate disciplines offered by the university, including but not limited to Sciences, Humanities, Engineering, Social Sciences, and Business Studies. The selection process is highly competitive, focusing on academic excellence, leadership qualities, extracurricular achievements, and the potential to contribute to the university community.

Applicants are expected to demonstrate not only outstanding academic records but also a commitment to community service, leadership experience, and clear career goals. The scholarship committee particularly values candidates who show potential to become future leaders in their respective fields.
    `,
    
    eligibility: `
• Minimum high school GPA of 3.5/4.0 or equivalent
• Proof of English language proficiency (IELTS 7.0 or TOEFL 100)
• Demonstrated leadership experience and community involvement
• Strong academic references
• Personal statement outlining career goals and motivations
• No previous undergraduate degree
• Age between 17-25 years at time of application
    `,
    
    applicationProcess: `
1. Complete online application form
2. Submit academic transcripts and certificates
3. Provide two academic references
4. Write a personal statement (500-800 words)
5. Submit proof of English language proficiency
6. Complete scholarship-specific essay (if required)
7. Interview for shortlisted candidates
    `,
    
    benefits: `
• Full tuition fee coverage
• Accommodation allowance
• Living stipend (£12,000 per year)
• Health insurance
• Travel allowance
• Research grant
• Mentorship program
• Career development opportunities
    `
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <BackButton />
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {scholarship.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {scholarship.university} • {scholarship.country}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Scholarship Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Scholarship Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {scholarship.description}
                </p>
              </div>

              {/* Full Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Detailed Information
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.fullDescription}
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Eligibility Criteria
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.eligibility}
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Application Process
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.applicationProcess}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Scholarship Benefits
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {scholarship.benefits}
                </div>
              </div>
            </div>

            {/* Right Column - Scholarship Card (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-22">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Scholarship Summary
                </h3>
                
                <div className="space-y-4">
                  {/* Scholarship Name */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400">🎓</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Scholarship Name</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.title}</p>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">🌍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.country}</p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400">💬</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Language</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.language}</p>
                    </div>
                  </div>
                  {/* Gender */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-600 dark:text-pink-400">👥</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">For Genders</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.gender}</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 dark:text-indigo-400">📊</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Study Level</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.level}</p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 dark:text-red-400">⏰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Application Deadline</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.deadline}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 dark:text-teal-400">📅</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Program Duration</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.duration}</p>
                    </div>
                  </div>

                  {/* Funding */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 dark:text-emerald-400">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Funding Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{scholarship.funding}</p>
                    </div>
                  </div>
                </div>

                {/* Apply Now Button */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Apply Now
                  </button>
                  
                
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