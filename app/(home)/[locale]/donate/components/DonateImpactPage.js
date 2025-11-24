"use client";

import { Link } from "lucide-react";

export default function DonationImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-custom-half mb-6">
              Where Your{" "}
              <span className="text-gradient-custom bg-clip-text text-transparent">
                Donation Goes
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Every contribution directly impacts the lives of Afghan students.
              See how your generosity transforms into meaningful educational
              opportunities.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Students Supported</div>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  25+
                </div>
                <div className="text-gray-600">Schools Equipped</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  100%
                </div>
                <div className="text-gray-600">Direct Impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-custom-half py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of donors who are transforming education in
              Afghanistan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#donate"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Start Donating Now
              </a>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More About Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
