"use client";
import { useState } from "react";
import Lottie from "lottie-react";
import Donate from "@/components/lottie-files/Donate.json";
import DonateAfghanistanModal from "./DonateAfghanistanModal";
import DonateInternationalModal from "./DonateInternationalModal";

export default function DonateSection() {
  const [isAfghanistanModalOpen, setIsAfghanistanModalOpen] = useState(false);
  const [isInternationalModalOpen, setIsInternationalModalOpen] =
    useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-0">
          {/* Content Section */}
          <div className="flex-1 max-w-2xl text-center lg:text-left lg:pe-12">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-blue-600 block">Transform Lives</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Through Education
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-2">
              Your donation provides scholarships, resources, and opportunities
              for Afghan students
            </p>
            <p className="text-lg text-gray-500 mb-8">
              Join us in creating a brighter future through education
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setIsAfghanistanModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🇦🇫 Donate in Afghanistan
              </button>

              <button
                onClick={() => setIsInternationalModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🌍 Donate Internationally
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <p className="text-gray-600 text-center">
                Every contribution makes a difference.
                <span className="font-semibold text-blue-600">
                  {" "}
                  100% of donations
                </span>{" "}
                go directly to student support programs.
              </p>
            </div>
          </div>

          {/* Animation Section */}
          <div className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <Lottie
                  animationData={Donate}
                  className="w-full h-full"
                  loop={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DonateAfghanistanModal
        isOpen={isAfghanistanModalOpen}
        onClose={() => setIsAfghanistanModalOpen(false)}
      />

      <DonateInternationalModal
        isOpen={isInternationalModalOpen}
        onClose={() => setIsInternationalModalOpen(false)}
      />
    </section>
  );
}
