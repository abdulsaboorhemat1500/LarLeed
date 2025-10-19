'use client';
import { useState } from 'react';
import { Button } from "../ui/button";
import { useApi } from '@/app/hooks/useApi';

export default function ScholarshipFormSection() {
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
  const { post } = useApi();

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
    
    const result = await post('/api/applyingScholarships', formData);

    if (result.success) {
      setMessage({ 
        type: 'success', 
        text: result.message || 'Application submitted successfully!' 
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
    } else {
      setMessage({ 
        type: 'error', 
        text: result.error || 'Failed to submit application' 
      });
    }
  } catch (error) {
    setMessage({ 
      type: 'error', 
      text: 'Network error. Please try again.' 
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="py-10 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto">
        <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white mb-6 border-b border-b-gray-300 pb-4">
          Scholarship Submission Form
        </h1>

        {/* Message Display */}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 p-4">
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
                    placeholder="Enter your Full Name"
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
                    placeholder="Enter your Email Address"
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
                    placeholder="Enter your Current Address"
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
                    placeholder="Enter your Phone Number"
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
                  University/School name *
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
                    placeholder="Enter University/School name"
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
                    placeholder="Enter Level of Study"
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
                    placeholder="Enter Year of Graduation"
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
                    placeholder="Enter Your Major"
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
                    placeholder="Enter Your GPA/Score"
                  />
                </div>
              </div>
            </div>

            {/* Scholarship Details */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Scholarship Applying for
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
                    placeholder="Enter Scholarship Name"
                  />
                </div>
              </div>

              <div className="pt-5">
                <label htmlFor="sch_country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Scholarship Country
                </label>
                <div className="mt-1">
                  <input
                    id="sch_country"
                    name="sch_country"
                    type="text"
                    value={formData.sch_country}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Enter Scholarship Country"
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
                    placeholder="Enter Scholarship University"
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
                    placeholder="Enter Scholarship Level"
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

          <div className="p-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="cursor-pointer px-7 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Form'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}