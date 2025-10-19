'use client';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function UpdatePostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  
  const [formData, setFormData] = useState({
    post_title: '',
    post_category: '',
    post_description: '',
    author_name: '',
    author_job_title: '',
    author_email: ''
  });
  
  const [postImage, setPostImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { get, put } = useApi();

  const categories = [
    'story',
    'roshangari'
  ];

  // Fetch post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const result = await get(`/api/posts/${postId}`);

        if (result.success) {
          const post = result.data;
          setFormData({
            post_title: post.post_title || '',
            category: post.category || '',
            post_description: post.post_description || '',
            author_name: post.author_name || '',
            author_job_title: post.author_job_title || '',
            author_email: post.author_email || ''
          });
          setCurrentImage(post.post_image || '');
        } else {
          setError(result.error || 'Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

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
      
      setPostImage(file);
      setRemoveCurrentImage(false); // If uploading new image, don't remove current one
      setError('');
    }
  };

  const handleRemoveCurrentImage = () => {
    setRemoveCurrentImage(true);
    setCurrentImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      
      // Append text fields
      submitData.append('post_title', formData.post_title);
      submitData.append('author_name', formData.author_name);
      submitData.append('author_email', formData.author_email);
      submitData.append('author_job_title', formData.author_job_title);
      submitData.append('category', formData.category);
      submitData.append('post_description', formData.post_description);
      submitData.append('remove_image', removeCurrentImage.toString());
      
      // Append image file if exists
      if (postImage) {
        submitData.append('post_image', postImage);
      }

      // Call the PUT API
      const result = await put(`/api/posts/${postId}`, submitData);
      console.log('Update result:', result);

      if (result.success) {
        console.log('Post updated successfully:', result.data);
        // Redirect to posts list
        router.push('/posts-cp');
      } else {
        setError(result.error || 'Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeNewImage = () => {
    setPostImage(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading post data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Update Post</h1>
          <p className="text-gray-600 mt-2">Edit post information for Roshangari</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

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
                value={formData.category}
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
                Post Image
              </label>
              
              {/* Current Image Preview */}
              {currentImage && !removeCurrentImage && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Image:
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={currentImage}
                        alt="Current post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Current image</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCurrentImage}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove Current Image
                    </button>
                  </div>
                </div>
              )}

              {/* New Image Upload */}
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
              
              {/* New Selected Image Preview */}
              {postImage && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Selected Image:
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={URL.createObjectURL(postImage)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{postImage.name}</p>
                      <p className="text-sm text-gray-500">
                        {(postImage.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeNewImage}
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
          </div>

          {/* Submit Button */}
          <div className="flex justify-between space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 disabled:bg-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back To Previous Page
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{isSubmitting ? 'Updating...' : 'Update Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}