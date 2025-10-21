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
              rows={12}
            />
            <div className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold mb-2">Formatting Guide:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Headings:</strong> Use H1, H2, H3 for different heading levels</li>
                <li><strong>Bold:</strong> Highlight text and click <strong>B</strong></li>
                <li><strong>Italic:</strong> Highlight text and click <em>I</em></li>
                <li><strong>Underline:</strong> Highlight text and click <u>U</u></li>
                <li><strong>Lists:</strong> Create bullet points or numbered lists</li>
                <li><strong>Alignment:</strong> Left, center, or right align your text</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                'Add Text'
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/hero-section-text')}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}