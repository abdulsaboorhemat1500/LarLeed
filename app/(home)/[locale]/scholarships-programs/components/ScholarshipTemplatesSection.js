'use client';
import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function ScholarshipTemplatesSection({ scholarshipName = null }) {
  const { get } = useApi();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all templates
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const result = await get('/api/scholarship-resources-templates');
      if (result.success) {
        const allTemplates = result.data || [];
        setTemplates(allTemplates);
        
        // Filter templates if scholarshipName is provided
        if (scholarshipName) {
          const filtered = allTemplates.filter(template => 
            template.rt_scholarship_name?.toLowerCase() === scholarshipName.toLowerCase()
          );
          setFilteredTemplates(filtered);
        } else {
          setFilteredTemplates(allTemplates);
        }
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [scholarshipName]);

  // Update filtered templates when scholarshipName or templates change
  useEffect(() => {
    if (scholarshipName && templates.length > 0) {
      const filtered = templates.filter(template => 
        template.rt_scholarship_name?.toLowerCase() === scholarshipName.toLowerCase()
      );
      setFilteredTemplates(filtered);
    } else {
      setFilteredTemplates(templates);
    }
  }, [scholarshipName, templates]);

  // Handle template download
  const handleDownload = (template) => {
    if (template.word_file) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = template.word_file;
      link.download = `${template.template_name}.docx`; // You can make this dynamic based on file extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading templates...</p>
          </div>
        </div>
      </section>
    );
  }

  if (filteredTemplates.length === 0) {
    if (scholarshipName) {
      return (
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Scholarship Templates
              </h3>
              <p className="text-gray-500">
                No templates available for {scholarshipName} yet.
              </p>
            </div>
          </div>
        </section>
      );
    }
    return null;
  }

  return (
    <section className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Scholarship Resources Templates
            {scholarshipName && (
              <span className="block text-lg text-blue-600 mt-1">
                for {scholarshipName}
              </span>
            )}
          </h1>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleDownload(template)}
              className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 hover:shadow-md ${
                template.word_file 
                  ? 'border-blue-500 hover:border-blue-600 hover:bg-blue-50' 
                  : 'border-gray-300 cursor-not-allowed opacity-50'
              }`}
              title={template.word_file ? `Download ${template.template_name}` : 'File not available'}
            >
              {/* File Icon */}
              <div className="mb-3">
                {template.word_file ? (
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Template Name */}
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                {template.template_name}
              </h3>

              {/* File Status */}
              <p className={`text-xs ${
                template.word_file ? 'text-green-600' : 'text-gray-500'
              }`}>
                {template.word_file ? 'Click to download' : 'File not available'}
              </p>

              {/* Scholarship Name (only show if not filtered) */}
              {!scholarshipName && (
                <p className="text-xs text-gray-500 mt-2 truncate" title={template.rt_scholarship_name}>
                  {template.rt_scholarship_name}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Template Count */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            {scholarshipName && ` for ${scholarshipName}`}
          </p>
        </div>
      </div>

      {/* Custom CSS for line clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}