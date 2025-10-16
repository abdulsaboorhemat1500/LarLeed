'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddScholarshipPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    s_name: '',
    s_image: null,
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
    s_app_procces: '',
    s_benefits: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Validation rules (same as update component)
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 's_name':
        if (!value.trim()) {
          newErrors.s_name = 'Scholarship name is required';
        } else if (value.length < 3) {
          newErrors.s_name = 'Scholarship name must be at least 3 characters';
        } else {
          delete newErrors.s_name;
        }
        break;

      case 's_country':
        if (!value.trim()) {
          newErrors.s_country = 'Country is required';
        } else {
          delete newErrors.s_country;
        }
        break;

      case 's_university':
        if (!value.trim()) {
          newErrors.s_university = 'University is required';
        } else {
          delete newErrors.s_university;
        }
        break;

      case 's_language':
        if (!value.trim()) {
          newErrors.s_language = 'Language is required';
        } else {
          delete newErrors.s_language;
        }
        break;

      case 's_study_level':
        if (!value) {
          newErrors.s_study_level = 'Study level is required';
        } else {
          delete newErrors.s_study_level;
        }
        break;

      case 's_app_deadline':
        if (!value) {
          newErrors.s_app_deadline = 'Application deadline is required';
        } else if (new Date(value) <= new Date()) {
          newErrors.s_app_deadline = 'Deadline must be in the future';
        } else {
          delete newErrors.s_app_deadline;
        }
        break;

      case 's_duration':
        if (!value.trim()) {
          newErrors.s_duration = 'Duration is required';
        } else {
          delete newErrors.s_duration;
        }
        break;

      case 's_funding_type':
        if (!value) {
          newErrors.s_funding_type = 'Funding type is required';
        } else {
          delete newErrors.s_funding_type;
        }
        break;

      case 's_overview':
        if (!value.trim()) {
          newErrors.s_overview = 'Overview is required';
        } else if (value.length < 300) {
          newErrors.s_overview = 'Overview must be at least 50 characters';
        } else {
          delete newErrors.s_overview;
        }
        break;

      case 's_detailed_info':
        if (!value.trim()) {
          newErrors.s_detailed_info = 'Detailed information is required';
        } else if (value.length < 300) {
          newErrors.s_detailed_info = 'Detailed information must be at least 100 characters';
        } else {
          delete newErrors.s_detailed_info;
        }
        break;

      case 's_eligibility':
        if (!value.trim()) {
          newErrors.s_eligibility = 'Eligibility criteria is required';
        } else if (value.length < 300) {
          newErrors.s_eligibility = 'Eligibility criteria must be at least 50 characters';
        } else {
          delete newErrors.s_eligibility;
        }
        break;

      case 's_app_procces':
        if (!value.trim()) {
          newErrors.s_app_procces = 'Application process is required';
        } else if (value.length < 300) {
          newErrors.s_app_procces = 'Application process must be at least 50 characters';
        } else {
          delete newErrors.s_app_procces;
        }
        break;

      case 's_benefits':
        if (!value.trim()) {
          newErrors.s_benefits = 'Benefits are required';
        } else if (value.length < 300) {
          newErrors.s_benefits = 'Benefits must be at least 30 characters';
        } else {
          delete newErrors.s_benefits;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const requiredFields = [
      's_name', 's_country', 's_university', 's_language', 's_study_level',
      's_app_deadline', 's_duration', 's_funding_type', 's_overview',
      's_detailed_info', 's_eligibility', 's_app_procces', 's_benefits'
    ];

    requiredFields.forEach(field => {
      validateField(field, formData[field]);
    });

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Validate field on change
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      s_image: file
    }));

    // Clear any previous image errors
    setErrors(prev => ({ ...prev, s_image: undefined }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields before submission
    if (!validateForm()) {
      setError('Please fix the validation errors before submitting');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append('s_name', formData.s_name);
      formDataToSend.append('s_country', formData.s_country);
      formDataToSend.append('s_university', formData.s_university);
      formDataToSend.append('s_language', formData.s_language);
      formDataToSend.append('s_gender', formData.s_gender);
      formDataToSend.append('s_study_level', formData.s_study_level);
      formDataToSend.append('s_app_deadline', formData.s_app_deadline);
      formDataToSend.append('s_duration', formData.s_duration);
      formDataToSend.append('s_funding_type', formData.s_funding_type);
      formDataToSend.append('s_overview', formData.s_overview);
      formDataToSend.append('s_detailed_info', formData.s_detailed_info);
      formDataToSend.append('s_eligibility', formData.s_eligibility);
      formDataToSend.append('s_app_procces', formData.s_app_procces);
      formDataToSend.append('s_benefits', formData.s_benefits);
      
      // Append image file if exists
      if (formData.s_image) {
        formDataToSend.append('s_image', formData.s_image);
      }

      const response = await fetch('/api/scholarships', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        router.push('/scholarships-programs-cp');
      } else {
        setError(result.error || 'Failed to create scholarship');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setFormData(prevState => ({
      ...prevState,
      s_image: null
    }));
    setImagePreview('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Scholarship Post</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter scholarship name"
              />
              {errors.s_name && (
                <p className="mt-1 text-sm text-red-600">{errors.s_name}</p>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scholarship Image
              </label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Upload an image (JPEG, PNG, max 5MB) - Optional
              </p>
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_country ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter country"
              />
              {errors.s_country && (
                <p className="mt-1 text-sm text-red-600">{errors.s_country}</p>
              )}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_university ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter university name"
              />
              {errors.s_university && (
                <p className="mt-1 text-sm text-red-600">{errors.s_university}</p>
              )}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_language ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter Language..."
              />
              {errors.s_language && (
                <p className="mt-1 text-sm text-red-600">{errors.s_language}</p>
              )}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_study_level ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select study level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
                <option value="School">School</option>
              </select>
              {errors.s_study_level && (
                <p className="mt-1 text-sm text-red-600">{errors.s_study_level}</p>
              )}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_app_deadline ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.s_app_deadline && (
                <p className="mt-1 text-sm text-red-600">{errors.s_app_deadline}</p>
              )}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_duration ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 4 years, 2 semesters"
              />
              {errors.s_duration && (
                <p className="mt-1 text-sm text-red-600">{errors.s_duration}</p>
              )}
            </div>

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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_funding_type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select funding type</option>
                <option value="Fully Funded">Fully Funded</option>
                <option value="Partially Funded">Partially Funded</option>
                <option value="Tuition Waiver">Tuition Waiver</option>
                <option value="Stipend">Stipend</option>
                <option value="Research Grant">Research Grant</option>
              </select>
              {errors.s_funding_type && (
                <p className="mt-1 text-sm text-red-600">{errors.s_funding_type}</p>
              )}
            </div>

            {/* Overview */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview *
                <span className="text-xs text-gray-500 ml-1">
                  ({formData.s_overview.length}/50 minimum)
                </span>
              </label>
              <textarea
                name="s_overview"
                value={formData.s_overview}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_overview ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide a brief overview of the scholarship"
              />
              {errors.s_overview && (
                <p className="mt-1 text-sm text-red-600">{errors.s_overview}</p>
              )}
            </div>

            {/* Detailed Information */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Information *
                <span className="text-xs text-gray-500 ml-1">
                  ({formData.s_detailed_info.length}/100 minimum)
                </span>
              </label>
              <textarea
                name="s_detailed_info"
                value={formData.s_detailed_info}
                onChange={handleChange}
                required
                rows="6"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_detailed_info ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide detailed information about the scholarship"
              />
              {errors.s_detailed_info && (
                <p className="mt-1 text-sm text-red-600">{errors.s_detailed_info}</p>
              )}
            </div>

            {/* Eligibility Criteria */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eligibility Criteria *
                <span className="text-xs text-gray-500 ml-1">
                  ({formData.s_eligibility.length}/50 minimum)
                </span>
              </label>
              <textarea
                name="s_eligibility"
                value={formData.s_eligibility}
                onChange={handleChange}
                required
                rows="5"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_eligibility ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="List the eligibility requirements"
              />
              {errors.s_eligibility && (
                <p className="mt-1 text-sm text-red-600">{errors.s_eligibility}</p>
              )}
            </div>

            {/* Application Process */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Process *
                <span className="text-xs text-gray-500 ml-1">
                  ({formData.s_app_procces.length}/50 minimum)
                </span>
              </label>
              <textarea
                name="s_app_procces"
                value={formData.s_app_procces}
                onChange={handleChange}
                required
                rows="5"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_app_procces ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the application process step by step"
              />
              {errors.s_app_procces && (
                <p className="mt-1 text-sm text-red-600">{errors.s_app_procces}</p>
              )}
            </div>

            {/* Benefits */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits *
                <span className="text-xs text-gray-500 ml-1">
                  ({formData.s_benefits.length}/30 minimum)
                </span>
              </label>
              <textarea
                name="s_benefits"
                value={formData.s_benefits}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.s_benefits ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="List the benefits offered by this scholarship"
              />
              {errors.s_benefits && (
                <p className="mt-1 text-sm text-red-600">{errors.s_benefits}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              disabled={loading}
            >
              Back To previous page
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Scholarship'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}