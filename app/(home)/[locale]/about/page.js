import BackButton from "@/components/ui/back-button";
export const runtime = 'edge';
// app/about/page.js
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
      <BackButton />
        
        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pt-10">
          About LarLeed
        </h1>

        {/* What is LarLeed */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What is LarLeed?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            LarLeed is an online learning platform dedicated to providing quality education in native languages, starting with Dari and Pashto. We believe that language should never be a barrier to learning.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Our platform connects students with expert instructors and comprehensive curriculum designed specifically for native language speakers. We focus on making education accessible, affordable, and culturally relevant.
          </p>
        </div>

        {/* Our Vision */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            To become the leading global platform for native language education, empowering millions of learners to achieve their full potential while preserving their linguistic and cultural heritage.
          </p>
        </div>

        {/* Our Mission */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            To democratize quality education by providing accessible, affordable, and culturally relevant learning opportunities in native languages. We aim to break down language barriers and create equal educational opportunities for all.
          </p>
        </div>

        {/* Our Goals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Goals
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            Provide quality education to 1 million students in underserved communities through our scholarship programs and affordable pricing.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            Expand our course offerings to 10 additional native languages to serve broader communities worldwide.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Develop innovative learning technologies that enhance the online education experience for native language speakers.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What We Offer
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            Comprehensive courses from grade 1 to 12 in Dari and Pashto languages, covering all major subjects including mathematics, science, literature, and social studies.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            Professional development courses and vocational training to help students build practical skills for career advancement.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Scholarship programs and financial aid to ensure that economic circumstances don't prevent anyone from accessing quality education.
          </p>
        </div>

        {/* Why Choose LarLeed */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose LarLeed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            We understand the unique challenges faced by native language speakers in accessing quality education. Our platform is built specifically to address these challenges.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            All our courses are taught by qualified instructors who are native speakers and understand the cultural context of the students.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            We provide flexible learning schedules that allow students to learn at their own pace while balancing other responsibilities.
          </p>
        </div>

        {/* Our Commitment */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Commitment
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            We are committed to maintaining the highest standards of educational quality while making learning accessible to everyone. We continuously work to improve our platform, expand our course offerings, and support our students in achieving their educational goals.
          </p>
        </div>

      </div>
    </div>
  );
}