"use client";
import ScholarshipFormModal from "./scholarship-form";

export default function MentorshipProgramsSection() {
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  return (
    <>
      <section className="relative min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Need Help With Scholarship Applications?
              </h1>

              <div className="text-lg text-gray-700 leading-relaxed space-y-6 text-left">
                <p>
                  If you're facing challenges with any scholarship application
                  process, feeling confused about the requirements, or need
                  expert guidance to navigate through the complex application
                  procedures, we're here to help.
                </p>

                <p>
                  Many students struggle with understanding what scholarship
                  committees are looking for, how to write compelling essays, or
                  how to prepare the required documentation. Whether it's a
                  specific university's application process or general
                  scholarship guidance, our mentorship program is designed to
                  support you.
                </p>

                <p>
                  <strong>Here's how our process works:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Fill out the simple form below with your details and the
                    scholarship you're interested in
                  </li>
                  <li>
                    Our team will review your application and understand your
                    specific needs
                  </li>
                  <li>
                    We'll match you with one of our experienced mentors who
                    specializes in your target university or scholarship program
                  </li>
                  <li>
                    Your dedicated mentor will provide personalized guidance
                    throughout your application journey
                  </li>
                </ul>

                <p>
                  Our mentors are professionals and current students who have
                  successfully navigated the same processes and can provide
                  valuable insights, tips, and support to increase your chances
                  of success.
                </p>

                <p className="font-semibold text-custom-half">
                  Complete the form below, and we'll connect you with the right
                  mentor to help you achieve your educational goals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      What You'll Get:
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-custom-half rounded-full mr-3"></span>
                        Expert guidance through entire process
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-custom-half rounded-full mr-3"></span>
                        Application review and feedback
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-custom-half rounded-full mr-3"></span>
                        Personalized strategy session
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Why Choose Us:
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-custom-half rounded-full mr-3"></span>
                        Experienced mentors
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-custom-half rounded-full mr-3"></span>
                        Proven success rate
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-custom-half rounded-full mr-3"></span>
                        Comprehensive support
                      </li>
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center pt-6">
                  <button
                    onClick={() => setIsMentorModalOpen(true)}
                    className="cursor-pointer py-4 px-12 border-2 border-custom-half text-custom-half font-semibold rounded-3xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center text-lg"
                  >
                    Open Scholarship Form
                  </button>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Get started in just a few minutes
                  </p>
                </div>

                {/* Modal Component */}
                <ScholarshipFormModal
                  isOpen={isMentorModalOpen}
                  onClose={() => setIsMentorModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
