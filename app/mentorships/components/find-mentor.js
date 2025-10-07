'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Mail } from 'lucide-react';

export default function MentorSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "saboor hemat",
      role: "web developer",
      image: "/team/ahmad.jpg",
      description: "jfdk djfkdjf  dfjkd fdfj df dkfj dkf kdj fdkjfkd fkdjfk dfj kdjf kd fdjfk dkf dfj df .",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ahmad@larleed.org"
      }
    },
    {
      id: 2,
      name: "saboor hemat",
      role: "web developer",
      image: "/team/fatima.jpg",
      description: "jfdk djfkdjf  dfjkd fdfj df dkfj dkf kdj fdkjfkd fkdjfk dfj kdjf kd fdjfk dkf dfj df .",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "fatima@larleed.org"
      }
    },
    {
      id: 3,
      name: "saboor hemat",
      role: "web developer",
      image: "/team/karim.jpg",
      description: "jfdk djfkdjf  dfjkd fdfj df dkfj dkf kdj fdkjfkd fkdjfk dfj kdjf kd fdjfk dkf dfj df .",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "karim@larleed.org"
      }
    },
    {
      id: 4,
      name: "saboor hemat",
      role: "web developer",
      image: "/team/zahra.jpg",
      description: "jfdk djfkdjf  dfjkd fdfj df dkfj dkf kdj fdkjfkd fkdjfk dfj kdjf kd fdjfk dkf dfj df .",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "zahra@larleed.org"
      }
    },
    {
      id: 5,
      name: "saboor hemati",
      role: "web developer",
      image: "/team/hamid.jpg",
      description: "jfdk djfkdjf  dfjkd fdfj df dkfj dkf kdj fdkjfkd fkdjfk dfj kdjf kd fdjfk dkf dfj df .",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "hamid@larleed.org"
      }
    },
    {
      id: 6,
      name: "saboor hemat",
      role: "Web Developer",
      image: "/team/laila.jpg",
      description: "jfdk djfkdjf  dfjkd fdfj df dkfj dkf kdj fdkjfkd fkdjfk dfj kdjf kd fdjfk dkf dfj df .",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "laila@larleed.org"
      }
    }
  ];

  const slidesToShow = 3;
  const totalSlides = Math.ceil(teamMembers.length / slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleMembers = () => {
    const startIndex = currentSlide * slidesToShow;
    return teamMembers.slice(startIndex, startIndex + slidesToShow);
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className=" mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find a Mentor
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl ">
            Dedicated professionals working together to empower Afghan youth through education and dialogue
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleMembers().map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Member Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👤</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Team Member Photo</p>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                      <a href={member.social.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </a>
                      <a href={member.social.twitter} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <Twitter className="w-4 h-4 text-blue-400" />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}