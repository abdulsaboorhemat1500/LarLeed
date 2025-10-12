'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddPostPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    post_title: '',
    post_category: '',
    post_image: '',
    post_description: '',
    post_link: '',
    author_name: '',
    author_job_title: '',
    author_email: ''
  });

  const categories = [
    'story',
    'roshangari'
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
      setFormData(prevState => ({
        ...prevState,
        post_image: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* Post Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                name="post_title"
                value={formData.post_title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter post title"
              />
            </div>

            {/* Author Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Author's full name"
                />
              </div>

              {/* Author Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="author_job_title"
                  value={formData.author_job_title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Content Writer, Editor"
                />
              </div>

              {/* Author Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Email *
                </label>
                <input
                  type="email"
                  name="author_email"
                  value={formData.author_email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="author@example.com"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="post_category"
                value={formData.post_category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="post_image"
                    value={formData.post_image}
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
            {formData.post_image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="w-32 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={formData.post_image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Description *
              </label>
              <textarea
                name="post_description"
                value={formData.post_description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder="Enter post description or summary..."
              />
            </div>

            {/* Post Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Link (Optional)
              </label>
              <input
                type="url"
                name="post_link"
                value={formData.post_link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/post-url"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back To previous page
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}