// app/hero-text/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/app/hooks/useApi';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';

export default function AddHeroText() {
  const [sevenLineText, setSevenLineText] = useState('');
  const [fullText, setFullText] = useState('');
  const [loading, setLoading] = useState(false);
  const { post } = useApi();
  const router = useRouter();   

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sevenLineText.trim() || !fullText.trim()) {
      alert('Both text fields are required');
      return;
    }

    try {
      setLoading(true);
      const result = await post('/api/heroSectionText', {
        seven_line_text: sevenLineText,
        full_text: fullText
      });

      if (result.success) {
        router.push('/hero-section-text');
      } else {
        alert('Failed to add text: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding text:', error);
      alert('Failed to add text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add Hero Section Text</h1>
          <Link 
            href="/hero-section-text"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to View
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seven Line Text Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Small Text (7 Lines)
            </label>
            <textarea
              value={sevenLineText}
              onChange={(e) => setSevenLineText(e.target.value)}
              placeholder="Enter text that should appear in 7 lines..."
              rows={7}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Full Text Input with Rich Text Editor */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              All Text (Rich Text Editor)
            </label>
            <RichTextEditor
              value={fullText}
              onChange={setFullText}
              placeholder="Enter the complete text with formatting..."
              rows={10}
            />
            <p className="text-sm text-gray-500 mt-2">
              Use the toolbar to format your text with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and lists.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Text'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/hero-section-text')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}