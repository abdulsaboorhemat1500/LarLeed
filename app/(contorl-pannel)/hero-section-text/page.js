// app/hero-text/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';
import Link from 'next/link';

export default function HeroTextPage() {
  const [textData, setTextData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  const fetchTextData = async () => {
    try {
      setLoading(true);
      const result = await get('/api/heroSectionText');
      if (result.success && result.data.length > 0) {
        setTextData(result.data[0]);
      }
    } catch (error) {
      console.error('Error fetching text data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTextData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Hero Section Text</h1>
          <div className="flex gap-4">
            <Link 
              href="/hero-section-text/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Text
            </Link>
            {textData && (
              <Link 
                href={`/hero-section-text/update/${textData.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Update Text
              </Link>
            )}
          </div>
        </div>

        {/* Text Display Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Seven Line Text Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Small Text (7 Lines)</h2>
            <div className="bg-white p-4 rounded border min-h-[200px]">
              {textData ? (
                <div className="whitespace-pre-line text-gray-600">
                  {textData.seven_line_text}
                </div>
              ) : (
                <div className="text-gray-400 italic">No text available. Click "Add Text" to create.</div>
              )}
            </div>
          </div>

          {/* Full Text Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">All Text</h2>
            <div className="bg-white p-4 rounded border min-h-[200px]">
              {textData ? (
                <div className="text-gray-600 rich-text-content" dangerouslySetInnerHTML={{ __html: textData.full_text }} />
              ) : (
                <div className="text-gray-400 italic">No text available. Click "Add Text" to create.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}