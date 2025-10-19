'use client'; // Add this at the top for Next.js App Router

import { useState } from 'react';
import { Button } from './ui/button';
export const runtime = 'edge';
import { useApi } from '@/app/hooks/useApi';

export default function GetInTouchSection() {
  const { post } = useApi();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await post('/api/getInTouch', { email });

      if (result.success) {
        setMessage({ type: 'success', text: 'Successfully subscribed!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: result.error || 'Subscription failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8">
              <img 
                  src="/logo.png"
                  alt="logo image"
                  className="h-20"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting Afghan Youth through Education, Dialogue, and Vision
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/ahamid.hatsaandh" 
                target="__blank"
                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/HamidHatsaandh" 
                target="__blank"
                className="p-2 bg-gray-800 hover:bg-blue-400 rounded-lg transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/hatsaandh/" 
                target="__blank"
                className="p-2 bg-gray-800 hover:bg-pink-600 rounded-lg transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@lomritob" 
                target="__blank"
                className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/hamidhatsaandh" 
                target="__blank"
                className="p-2 bg-gray-800 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          </div>
          <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Subscribe to our newsletter
            </h2>
            
            <p className="text-lg text-gray-500 dark:text-white font-medium">
            Get the latest news, updates, and special offers delivered right to your inbox.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="pt-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Enter Your Email..."
                    disabled={loading}
                  />
                </div>
                
                {loading && (
                  <div className="mt-3 flex items-center text-blue-600">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </div>
                )}

                {message.text && (
                  <div className={`mt-4 p-3 rounded-md ${
                    message.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="mt-4 cursor-pointer px-7"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Submit Form'}
              </Button>
            </form>
          </div>
        </div>    
      </div>
    </section>
  );
}