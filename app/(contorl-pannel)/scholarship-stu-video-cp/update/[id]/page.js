'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApi } from '@/app/hooks/useApi';

export default function UpdateVideoPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.id;
  const { get, put } = useApi();
  
  const [formData, setFormData] = useState({
    video_title: '',
    video_image: null,
    video_link: '',
    rt_scholarship_name: ''
  });
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [removeImage, setRemoveImage] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  // Fetch scholarships for dropdown
  const fetchScholarships = async () => {
    try {
      const result = await get('/api/scholarships');
      if (result.success) {
        setScholarships(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    }
  };

  // Fetch video data for update
  const fetchVideoData = async () => {
    if (!videoId) return;
    
    try {
      setFetchLoading(true);
      const result = await get(`/api/scholarship-stu-videos/${videoId}`);
      if (result.success) {
        const video = result.data;
        setFormData({
          video_link: video.video_link || '',
          rt_scholarship_name: video.rt_scholarship_name || ''
        });
        if (video.video_image) {
          setImagePreview(video.video_image);
          setCurrentImage(video.video_image);
        }
      } else {
        alert('Error loading video: ' + result.error);
        router.push('/scholarship-stu-videos-cp');
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
      alert('Failed to load video data');
      router.push('/scholarship-stu-videos-cp');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        video_image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      video_image: null
    }));
    setImagePreview('');
    setRemoveImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.video_link || !formData.rt_scholarship_name) {
      alert('Video link and scholarship name are required');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = new FormData();
      submitData.append('video_link', formData.video_link);
      submitData.append('rt_scholarship_name', formData.rt_scholarship_name);
      
      if (formData.video_image) {
        submitData.append('video_image', formData.video_image);
      }
      
      if (removeImage) {
        submitData.append('remove_image', 'true');
      }

      const result = await put(`/api/scholarship-stu-videos/${videoId}`, submitData);

      if (result.success) {
        alert('Video updated successfully!');
        router.push('/scholarship-stu-videos-cp');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update video');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading video data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Update Student Video
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            // Add this to both Add and Update form components:

            {/* Video Title */}
            <div>
            <label htmlFor="video_title" className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
            </label>
            <input
                type="text"
                id="video_title"
                name="video_title"
                value={formData.video_title}
                onChange={handleInputChange}
                placeholder="Enter video title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>
            {/* Video Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: Square image, max 5MB
                  </p>
                  {(imagePreview || currentImage) && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove current image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Video Link */}
            <div>
              <label htmlFor="video_link" className="block text-sm font-medium text-gray-700 mb-2">
                Video Link *
              </label>
              <input
                type="url"
                id="video_link"
                name="video_link"
                value={formData.video_link}
                onChange={handleInputChange}
                placeholder="https://youtube.com/embed/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Scholarship Name Dropdown */}
            <div>
              <label htmlFor="rt_scholarship_name" className="block text-sm font-medium text-gray-700 mb-2">
                Scholarship Name *
              </label>
              <select
                id="rt_scholarship_name"
                name="rt_scholarship_name"
                value={formData.rt_scholarship_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a scholarship</option>
                {scholarships.map((scholarship) => (
                  <option key={scholarship.id} value={scholarship.s_name_eng}>
                    {scholarship.s_name_eng}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/scholarship-stu-videos-cp')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200"
              >
                {loading ? 'Updating...' : 'Update Video'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}