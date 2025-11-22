"use client";
import { useState } from "react";

export default function MentorshipProgramsSection() {
  return (
    <>
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/mentorshipbg.png')" }}
      >
        {/* Background blur overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-5xl lg:text-5xl font-bold leading-tight text-white drop-shadow-lg">
              Get selected in the top universities <br />
              with our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Free Mentorship
              </span>
            </h1>

            {/* Bullet Points */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 max-w-4xl">
              {[
                { name: "Coaching", emoji: "🎯" },
                { name: "Goal", emoji: "🏆" },
                { name: "Success", emoji: "📈" },
                { name: "Motivation", emoji: "💪" },
                { name: "Expert Advice", emoji: "💡" },
                { name: "Support", emoji: "🤝" },
                { name: "Direction", emoji: "🧭" },
                { name: "Guidance", emoji: "🌟" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border-2 border-blue-300/50 transform hover:scale-105 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400 cursor-pointer"
                >
                  <div className="flex items-center justify-start space-x-3">
                    <div className="text-2xl">{item.emoji}</div>
                    <h3 className="text-lg font-semibold text-white text-left">
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
