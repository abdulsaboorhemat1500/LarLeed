// 'use client';
export const runtime = 'edge';
// export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { useRouter, useParams } from 'next/navigation';

export default function UpdateMentorPage() {
  const router = useRouter();
  const params = useParams();
  const mentorId = params.id;

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    category: '',
    experience: '',
    email: '',
    phone: '',
    bio: '',
    image: '',
    facebook: '',
    linkedin: '',
    twitter: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const { get, put } = useApi();

  const categories = [
    'mentor',
    'team-member'
  ];

  // Fetch mentor data on component mount
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        setFetchLoading(true);
        const result = await get(`/api/mentor-team/${mentorId}`);

        if (result.success) {
          const mentor = result.data;
          setFormData({
            name: mentor.full_name || '',
            title: mentor.job_title || '',
            category: mentor.category || '',
            experience: mentor.experience || '',
            email: mentor.email || '',
            phone: mentor.phone || '',
            bio: mentor.summary || '',
            image: mentor.image || '',
            facebook: mentor.facebook_link || '',
            linkedin: mentor.linkedin_link || '',
            twitter: mentor.youtube_link || '' // Map youtube_link to twitter
          });
          setCurrentImage(mentor.image || '');
        } else {
          setError(result.error || 'Failed to fetch mentor data');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error while fetching mentor data');
      } finally {
        setFetchLoading(false);
      }
    };

    if (mentorId) {
      fetchMentor();
    }
  }, [mentorId]);

  // Validation rules
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Full name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Full name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Professional title is required';
        } else if (value.length < 2) {
          newErrors.title = 'Title must be at least 2 characters';
        } else {
          delete newErrors.title;
        }
        break;

      case 'category':
        if (!value) {
          newErrors.category = 'Category is required';
        } else {
          delete newErrors.category;
        }
        break;

      case 'experience':
        if (!value.trim()) {
          newErrors.experience = 'Experience is required';
        } else {
          delete newErrors.experience;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'facebook':
      case 'linkedin':
      case 'twitter':
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          newErrors[name] = 'Please enter a valid URL';
        } else {
          delete newErrors[name];
        }
        break;

      case 'bio':
        if (!value.trim()) {
          newErrors.bio = 'Biography is required';
        } else if (value.length < 10) {
          newErrors.bio = 'Biography must be at least 10 characters';
        } else {
          delete newErrors.bio;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const requiredFields = ['name', 'title', 'category', 'experience', 'email', 'bio'];
    
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setImageFile(file);
    setFormData(prevState => ({
      ...prevState,
      image: file.name
    }));
    setError(''); // Clear any previous errors
  };

  const removeImage = () => {
    setImageFile(null);
    setFormData(prevState => ({
      ...prevState,
      image: ''
    }));
    setCurrentImage('');
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
    formDataToSend.append('full_name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('job_title', formData.title);
    formDataToSend.append('summary', formData.bio);
    formDataToSend.append('facebook_link', formData.facebook);
    formDataToSend.append('linkedin_link', formData.linkedin);
    formDataToSend.append('youtube_link', formData.twitter);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('experience', formData.experience);
    
    // Handle image removal/update
    if (!currentImage && !imageFile) {
      formDataToSend.append('remove_image', 'true');
    }
    
    // Append new image file if exists
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    // FIXED: Added method and body to the fetch call
    const result = await put(`/api/mentor-team/${mentorId}`, formDataToSend);
    console.log(result);
    
    if (result.success) {
      router.push('/mentors-tmembers-cp');
    } else {
      setError(result.error || 'Failed to update team member');
    }
  } catch (error) {
    console.error('Update error:', error);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

  // Check if form is valid for styling
  const isFormValid = () => {
    return formData.name && 
           formData.title && 
           formData.category && 
           formData.experience && 
           formData.email && 
           formData.bio &&
           !errors.name && 
           !errors.title && 
           !errors.category && 
           !errors.experience && 
           !errors.email && 
           !errors.bio;
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentor data...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
          <button
            onClick={() => router.back()}
            className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Update Mentor/Team Member</h1>
          <p className="text-gray-600 mt-2">Editing: {formData.name}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter mentor's full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Senior Education Consultant"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience *
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 5+ years"
              />
              {errors.experience && (
                <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="mentor@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Social Media Links */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Social Media Links
              </label>
              <div className="space-y-3">
                {/* Facebook */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.facebook ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://facebook.com/username"
                  />
                </div>
                {errors.facebook && (
                  <p className="mt-1 text-sm text-red-600 ml-11">{errors.facebook}</p>
                )}

                {/* LinkedIn */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.linkedin ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                {errors.linkedin && (
                  <p className="mt-1 text-sm text-red-600 ml-11">{errors.linkedin}</p>
                )}

                {/* Twitter/X */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.twitter ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                {errors.twitter && (
                  <p className="mt-1 text-sm text-red-600 ml-11">{errors.twitter}</p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              
              {/* Current Image */}
              {(currentImage || formData.image) && (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <img
                      src={currentImage || formData.image}
                      alt="Current"
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
                  <p className="text-sm text-gray-500 mt-2">
                    {currentImage && !formData.image ? 'Current image' : 'New image will replace current'}
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={currentImage ? "Keep current image or upload new" : "Upload new image"}
                    readOnly
                  />
                </div>
                <div>
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography *
                <span className="text-xs text-gray-500 ml-1">
                  ({formData.bio.length}/10 minimum)
                </span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.bio ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Write a brief biography about the mentor..."
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between space-x-4 mt-8 pt-6 border-t border-gray-200">
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
              disabled={loading || !isFormValid()}
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Mentor'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  
}