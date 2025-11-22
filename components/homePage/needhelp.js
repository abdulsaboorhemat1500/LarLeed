"use client";

import { useState } from "react";
import ScholarshipFormModal from "@/app/(home)/[locale]/mentorships/components/scholarship-form";

export default function NeedHelpSection() {
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);

  return (
    <section className="min-h-screen bg-custom-sm py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with decorative elements */}
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-custom-half mx-auto mb-6 rounded-full"></div>
            <h2 className="text-5xl md:text-5xl font-bold text-gray-900 leading-tight">
              Need Help?
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="bg-white/80  backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <p className="text-xl text-gray-600  leading-relaxed text-center">
                If you need our help with the scholarship then fill the
                following form. Our experts will guide you through the entire
                application process and maximize your chances of success.
              </p>
            </div>

            {/* Benefits List */}
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
    </section>
  );
}
