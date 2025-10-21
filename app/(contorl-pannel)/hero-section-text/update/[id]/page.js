// app/hero-text/update/[id]/page.tsx
'use client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApi } from '@/app/hooks/useApi';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';

export default function UpdateHeroText() {
  const [sevenLineText, setSevenLineText] = useState('');
  const [fullText, setFullText] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { get, put } = useApi();
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchTextData = async () => {
      try {
        setFetching(true);
        const result = await get(`/api/heroSectionText/${id}`);
        if (result.success && result.data) {
          setSevenLineText(result.data.seven_line_text || '');
          setFullText(result.data.full_text || '');
        }
      } catch (error) {
        console.error('Error fetching text data:', error);
        alert('Failed to load text data');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchTextData();
    }
  }, [id, get]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sevenLineText.trim() || !fullText.trim()) {
      alert('Both text fields are required');
      return;
    }

    try {
      setLoading(true);
      const result = await put(`/api/heroSectionText/${id}`, {
        seven_line_text: sevenLineText,
        full_text: fullText
      });

      if (result.success) {
        router.push('/hero-section-text');
      } else {
        alert('Failed to update text: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating text:', error);
      alert('Failed to update text');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Update Hero Section Text</h1>
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
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Text'}
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