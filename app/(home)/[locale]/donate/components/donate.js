"use client";
import { useState } from "react";
import Lottie from "lottie-react";
import Donate from "@/components/lottie-files/Donate.json";

export default function DonateSection() {


  return (
    <section
      id="donate"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      {/* Background Design */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-custom-half rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-custom-half rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-400 rounded-full opacity-20"></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-blue-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 border-2 border-indigo-200 rounded-full opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-0">
          {/* Content Section */}
          <div className="flex-1 max-w-2xl text-center lg:text-left lg:pe-12">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-custom-half block">Transform Lives</span>
              <span className="text-gradient-custom bg-clip-text text-transparent">
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
              <button className="cursor-pointer bg-custom-half text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                🌍 Donate Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <p className="text-gray-600 text-center">
                Every contribution makes a difference.
                <span className="font-semibold text-custom-half">
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
    </section>
  );
}
