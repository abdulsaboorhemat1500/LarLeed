'use client';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function MentorshipProgramsSection(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-lg">
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

              {/* Outlined Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer mt-16 px-12 py-4 border-2 border-blue-200 text-blue-200 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-blue-500 hover:text-white hover:border-blue-500 text-lg"
              >
                Submit Form for Help
              </button>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/70 transition-opacity"
                onClick={() => setIsModalOpen(false)}
              ></div>

              {/* Modal Content */}
              <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Form Component */}
                <ScholarshipFormModal />
              </div>
            </div>
          </div>
        )}
      </>
    );
}

// Form Component (same as provided)
function ScholarshipFormModal() {
    const [formData, setFormData] = useState({
      full_name: '',
      email: '',
      address: '',
      phone: '',
      date_of_birth: '',
      uni_name: '',
      level_of_study: '',
      graduation_year: '',
      major: '',
      gpa: '',
      sch_name: '',
      sch_country: '',
      sch_university: '',
      sch_level: '',
      sch_deadline: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage({ type: '', text: '' });
    
      try {
        // Simulate API call - replace with your actual API call
        // const result = await post('/api/applyingScholarships', formData);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        
        // Mock success response
        setMessage({ 
          type: 'success', 
          text: 'Application submitted successfully!' 
        });
        
        // Reset form
        setFormData({
          full_name: '',
          email: '',
          address: '',
          phone: '',
          date_of_birth: '',
          uni_name: '',
          level_of_study: '',
          graduation_year: '',
          major: '',
          gpa: '',
          sch_name: '',
          sch_country: '',
          sch_university: '',
          sch_level: '',
          sch_deadline: ''
        });
        
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: 'Failed to submit application. Please try again.' 
        });
      } finally {
        setLoading(false);
      }
    };

    return (
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-300 dark:border-gray-600 pb-4">
            Scholarship Submission Form
          </h1>

          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
              {/* Personal Details */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Personal Details
                </h2>
                
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name *
                  </label>
                  <div className="mt-1">
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter your full Name"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter your current address"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Academic Details
                </h2>
                
                <div>
                  <label htmlFor="uni_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University/School Name *
                  </label>
                  <div className="mt-1">
                    <input
                      id="uni_name"
                      name="uni_name"
                      type="text"
                      value={formData.uni_name}
                      onChange={handleChange}
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter university/school name"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="level_of_study" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level of Study
                  </label>
                  <div className="mt-1">
                    <input
                      id="level_of_study"
                      name="level_of_study"
                      type="text"
                      value={formData.level_of_study}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter level of study"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Year of Graduation
                  </label>
                  <div className="mt-1">
                    <input
                      id="graduation_year"
                      name="graduation_year"
                      type="text"
                      value={formData.graduation_year}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter year of graduation"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Major
                  </label>
                  <div className="mt-1">
                    <input
                      id="major"
                      name="major"
                      type="text"
                      value={formData.major}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter your major"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your GPA/Score
                  </label>
                  <div className="mt-1">
                    <input
                      id="gpa"
                      name="gpa"
                      type="text"
                      value={formData.gpa}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter your GPA/score"
                    />
                  </div>
                </div>
              </div>

              {/* Scholarship Details */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Scholarship Details
                </h2>
                
                <div>
                  <label htmlFor="sch_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Scholarship Name *
                  </label>
                  <div className="mt-1">
                    <input
                      id="sch_name"
                      name="sch_name"
                      type="text"
                      value={formData.sch_name}
                      onChange={handleChange}
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter scholarship name"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="sch_country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Scholarship Country *
                  </label>
                  <div className="mt-1">
                    <input
                      id="sch_country"
                      name="sch_country"
                      type="text"
                      value={formData.sch_country}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter scholarship country"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="sch_university" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Scholarship University
                  </label>
                  <div className="mt-1">
                    <input
                      id="sch_university"
                      name="sch_university"
                      type="text"
                      value={formData.sch_university}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter scholarship university"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="sch_level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Scholarship Level
                  </label>
                  <div className="mt-1">
                    <input
                      id="sch_level"
                      name="sch_level"
                      type="text"
                      value={formData.sch_level}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Enter scholarship level"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="sch_deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Scholarship Deadline
                  </label>
                  <div className="mt-1">
                    <input
                      id="sch_deadline"
                      name="sch_deadline"
                      type="date"
                      value={formData.sch_deadline}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 text-center">
              <button 
                type="submit" 
                disabled={loading}
                className="cursor-pointer px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Form'}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }