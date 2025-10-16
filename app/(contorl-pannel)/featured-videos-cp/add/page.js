'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddFeaturedVideoPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    v_title: '',
    v_creature: '',
    v_link: '',
    v_description: '',
    v_category: ''
  });
  
  const [videoImage, setVideoImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'educational',
    'entertainment',
    'tutorial',
    'documentary',
    'inspirational'
  ];

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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setVideoImage(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      
      // Append text fields
      submitData.append('v_title', formData.v_title);
      submitData.append('v_creature', formData.v_creature);
      submitData.append('v_link', formData.v_link);
      submitData.append('v_description', formData.v_description);
      submitData.append('v_category', formData.v_category);
      
      // Append image file if exists
      if (videoImage) {
        submitData.append('v_image', videoImage);
      }

      // Call the POST API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/featured-videos`, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to videos list or show success message
        router.push('/featured-videos-cp');
      } else {
        setError(result.error || 'Failed to create video');
      }
    } catch (error) {
      console.error('Error creating video:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setVideoImage(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Featured Video</h1>
          <p className="text-gray-600 mt-2">Create a new featured video entry</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* Video Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                name="v_title"
                value={formData.v_title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter video title"
              />
            </div>

            {/* Creature/Creator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Creator/Creature
              </label>
              <input
                type="text"
                name="v_creature"
                value={formData.v_creature}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter creator name or creature"
              />
            </div>

            {/* Video Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Link
              </label>
              <input
                type="url"
                name="v_link"
                value={formData.v_link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/video"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="v_category"
                value={formData.v_category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Thumbnail Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: JPG, PNG, WebP. Max size: 5MB
              </p>
              
              {/* Selected Image Preview */}
              {videoImage && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Image:
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={URL.createObjectURL(videoImage)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{videoImage.name}</p>
                      <p className="text-sm text-gray-500">
                        {(videoImage.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Description
              </label>
              <textarea
                name="v_description"
                value={formData.v_description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder="Enter video description..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 disabled:bg-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{isSubmitting ? 'Creating...' : 'Create Video'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}