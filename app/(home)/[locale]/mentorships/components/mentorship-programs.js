"use client";

export default function MentorshipProgramsSection() {
  return (
    <>
      <section className="relative min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="max-w-4xl mx-auto">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
