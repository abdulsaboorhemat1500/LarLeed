'use client';

export const runtime = 'edge';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApi } from '@/app/hooks/useApi';

export default function UpdateTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params.id;
  const { get, put } = useApi();
  
  const [formData, setFormData] = useState({
    template_name: '',
    rt_scholarship_name: '',
    word_file: null
  });
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [removeFile, setRemoveFile] = useState(false);
  const [currentFile, setCurrentFile] = useState('');

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

  const fetchTemplateData = async () => {
    if (!templateId) return;
    
    try {
      setFetchLoading(true);
      const result = await get(`/api/scholarship-resources-templates/${templateId}`);
      if (result.success) {
        const template = result.data;
        setFormData({
          template_name: template.template_name || '',
          rt_scholarship_name: template.rt_scholarship_name || ''
        });
        if (template.word_file) {
          setCurrentFile(template.word_file);
        }
      } else {
        setMessage({ type: 'error', text: 'Error loading template: ' + result.error });
        router.push('/scholarship-resources-templates-cp');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load template data' });
      router.push('/scholarship-resources-templates-cp');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
    if (templateId) {
      fetchTemplateData();
    }
  }, [templateId]);

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
      setRemoveFile(false);
    }
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({
      ...prev,
      word_file: null
    }));
    setRemoveFile(true);
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
      
      if (removeFile) {
        submitData.append('remove_file', 'true');
      }

      const result = await put(`/api/scholarship-resources-templates/${templateId}`, submitData);

      if (result.success) {
        setMessage({ type: 'success', text: 'Template updated successfully! Redirecting...' });
        setTimeout(() => {
          router.push('/scholarship-resources-templates-cp');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update template' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update template. Please try again.' });
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
              <span className="ml-3 text-gray-600">Loading template data...</span>
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
            Update Scholarship Template
          </h1>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Template Name */}
            <div>
              <label htmlFor="template_name" className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* Word File */}
            <div>
              <label htmlFor="word_file" className="block text-sm font-medium text-gray-700 mb-2">
                Word File
              </label>
              {currentFile && (
                <div className="mb-3">
                  <a 
                    href={currentFile} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Current File
                  </a>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-3 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove current file
                  </button>
                </div>
              )}
              <input
                type="file"
                id="word_file"
                name="word_file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: .doc, .docx (Max 10MB)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/scholarship-resources-templates-cp')}
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
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Template'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}