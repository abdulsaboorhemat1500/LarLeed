'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/app/hooks/useApi';

export default function AddTemplatePage() {
  const router = useRouter();
  const { get, post } = useApi();
  
  const [formData, setFormData] = useState({
    template_name: '',
    rt_scholarship_name: '',
    word_file: null
  });
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchScholarships = async () => {
    try {
      const result = await get('/api/scholarships');
      if (result.success) {
        setScholarships(result.data || []);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load scholarships' });
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        word_file: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.template_name || !formData.rt_scholarship_name) {
      setMessage({ type: 'error', text: 'Template name and scholarship name are required' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      
      const submitData = new FormData();
      submitData.append('template_name', formData.template_name);
      submitData.append('rt_scholarship_name', formData.rt_scholarship_name);
      
      if (formData.word_file) {
        submitData.append('word_file', formData.word_file);
      }

      const result = await post('/api/scholarship-resources-templates', submitData);

      if (result.success) {
        setMessage({ type: 'success', text: 'Template added successfully! Redirecting...' });
        setTimeout(() => {
          router.push('/scholarship-resources-templates-cp');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to add template' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add template. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Add Scholarship Template
          </h1>

          {/* Message Display */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              <div className="flex items-center">
                {message.type === "success" ? (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Template Name */}
            <div>
              <label
                htmlFor="template_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Template Name *
              </label>
              <input
                type="text"
                id="template_name"
                name="template_name"
                value={formData.template_name}
                onChange={handleInputChange}
                placeholder="Enter template name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Scholarship Name Dropdown */}
            <div>
              <label
                htmlFor="rt_scholarship_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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

            {/* Word File */}
            <div>
              <label
                htmlFor="word_file"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                File
              </label>
              <input
                type="file"
                id="word_file"
                name="word_file"
                accept=".doc,.docx,.pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: .doc, .docx, .pdf (Max 10MB)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() =>
                  router.push("/scholarship-resources-templates-cp")
                }
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200 flex items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Template"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}