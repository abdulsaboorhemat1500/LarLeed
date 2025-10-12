'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddScholarshipPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    s_name: '',
    s_image: '',
    s_country: '',
    s_university: '',
    s_language: '',
    s_gender: '',
    s_study_level: '',
    s_app_deadline: '',
    s_duration: '',
    s_funding_type: '',
    s_overview: '',
    s_detailed_info: '',
    s_eligibility: '',
    s_app_process: '',
    s_benefits: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        s_image: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Scholarship Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scholarship Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scholarship Name *
              </label>
              <input
                type="text"
                name="s_name"
                value={formData.s_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter scholarship name"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                name="s_country"
                value={formData.s_country}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter country"
              />
            </div>

            {/* University */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University *
              </label>
              <input
                type="text"
                name="s_university"
                value={formData.s_university}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter university name"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language *
              </label>
              
              <input
                type="text"
                name="s_language"
                value={formData.s_language}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Language..."
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="s_gender"
                value={formData.s_gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Both">Male/Female</option>
              </select>
            </div>

            {/* Study Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Level *
              </label>
              <select
                name="s_study_level"
                value={formData.s_study_level}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select study level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                name="s_app_deadline"
                value={formData.s_app_deadline}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                name="s_duration"
                value={formData.s_duration}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 4 years, 2 semesters"
              />
            </div>
             {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scholarship Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="s_image"
                    value={formData.s_image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Image URL or upload file"
                  />
                </div>
                <div>
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Upload an image or paste the image URL
              </p>
            </div>

            {/* Image Preview */}
            {formData.s_image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="w-32 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={formData.s_image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Funding Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Type *
              </label>
              <select
                name="s_funding_type"
                value={formData.s_funding_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select funding type</option>
                <option value="Fully Funded">Fully Funded</option>
                <option value="Partially Funded">Partially Funded</option>
                <option value="Tuition Waiver">Tuition Waiver</option>
                <option value="Stipend">Stipend</option>
                <option value="Research Grant">Research Grant</option>
              </select>
            </div>

            {/* Overview */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview *
              </label>
              <textarea
                name="s_overview"
                value={formData.s_overview}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide a brief overview of the scholarship"
              />
            </div>

            {/* Detailed Information */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Information *
              </label>
              <textarea
                name="s_detailed_info"
                value={formData.s_detailed_info}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide detailed information about the scholarship"
              />
            </div>

            {/* Eligibility Criteria */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eligibility Criteria *
              </label>
              <textarea
                name="s_eligibility"
                value={formData.s_eligibility}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="List the eligibility requirements"
              />
            </div>

            {/* Application Process */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Process *
              </label>
              <textarea
                name="s_app_process"
                value={formData.s_app_process}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the application process step by step"
              />
            </div>

            {/* Benefits */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits *
              </label>
              <textarea
                name="s_benefits"
                value={formData.s_benefits}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="List the benefits offered by this scholarship"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
                onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back To previous page
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Create Scholarship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}