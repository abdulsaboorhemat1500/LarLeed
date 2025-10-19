'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { useApi } from '@/app/hooks/useApi';

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const { post } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      const result = await post('/api/contact', formData);

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Contact Us
            </h2>
            
            <div>
              <p className="text-lg text-gray-500 dark:text-white font-medium">
                Hello guys my name is abdul saboor hemat, I am a web Developer working with next.js and Laravel.
              </p>
            </div>
            <div className="space-y-4 justify-center mt-10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">🌍</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                  <p className="font-medium text-gray-900 dark:text-white">Afghanistan</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400">✉️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a 
                    href="mailto:saboorhemat4600@gmail.com"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    saboorhemat4600@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 pb-10">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400">📞</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <a 
                    href="tel:+93790161600"
                    className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    +93 790 161 600
                  </a>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <a href="mailto:saboorhemat4600@gmail.com">
                  <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    Contact Via Email
                  </button>
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">Thank you! Your message has been sent successfully.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">Failed to send message. Please try again.</p>
                </div>
              )}

              <div className="pt-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Enter Your Full Name..."
                  />
                </div>
              </div>
              
              <div className="pt-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email *
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Enter Your Email..."
                  />
                </div>
              </div>
              
              <div className="pt-5">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Enter Your Phone Number..."
                  />
                </div>
              </div>
              
              <div className="pt-5">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject *
                </label>
                <div className="mt-1">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Enter message subject..."
                  />
                </div>
              </div>
              
              <div className="pt-5">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm resize-vertical"
                    placeholder="Enter your message..."
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="mt-4 cursor-pointer px-7"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
              </Button>
            </form>
          </div>
        </div>    
      </div>
    </section>
  );
}