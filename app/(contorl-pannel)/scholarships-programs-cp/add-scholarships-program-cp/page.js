'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApi } from '@/app/hooks/useApi';
import RichTextEditor from '@/components/RichTextEditor';

export default function AddScholarshipPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Scholarship Name - Multi-language
    s_name_eng: '',
    s_name_pash: '',
    s_name_dari: '',
    
    // University - Multi-language
    s_university_eng: '',
    s_university_pash: '',
    s_university_dari: '',
    
    // Country - Multi-language
    s_country_eng: '',
    s_country_pash: '',
    s_country_dari: '',
    
    // Language - Multi-language
    s_language_eng: '',
    s_language_pash: '',
    s_language_dari: '',
    
    // Gender - Multi-language
    s_gender_eng: '',
    s_gender_pash: '',
    s_gender_dari: '',
    
    // Study Level - Multi-language
    s_study_level_eng: '',
    s_study_level_pash: '',
    s_study_level_dari: '',
    
    // Duration - Multi-language
    s_duration_eng: '',
    s_duration_pash: '',
    s_duration_dari: '',
    
    // Funding Type - Multi-language
    s_funding_type_eng: '',
    s_funding_type_pash: '',
    s_funding_type_dari: '',
    
    // New Fields: Fields of Study - Multi-language
    s_fields_of_study_eng: '',
    s_fields_of_study_pash: '',
    s_fields_of_study_dari: '',
    
    // New Fields: Language Required - Multi-language
    s_language_required_eng: '',
    s_language_required_pash: '',
    s_language_required_dari: '',
    
    // New Fields: Eligible Countries - Multi-language
    s_eligible_countries_eng: '',
    s_eligible_countries_pash: '',
    s_eligible_countries_dari: '',
    
    // Overview - Multi-language
    s_overview_eng: '',
    s_overview_pash: '',
    s_overview_dari: '',
    
    // Detailed Information - Multi-language
    s_detailed_info_eng: '',
    s_detailed_info_pash: '',
    s_detailed_info_dari: '',
    
    // Eligibility Criteria - Multi-language
    s_eligibility_eng: '',
    s_eligibility_pash: '',
    s_eligibility_dari: '',
    
    // Application Process - Multi-language
    s_app_procces_eng: '',
    s_app_procces_pash: '',
    s_app_procces_dari: '',
    
    // Benefits - Multi-language
    s_benefits_eng: '',
    s_benefits_pash: '',
    s_benefits_dari: '',
    
    // Single language fields
    s_image: null,
    s_app_deadline: '',
    s_applying_link: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { post } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRichTextChange = (fieldName, value) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prevState => ({
      ...prevState,
      s_image: file
    }));

    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  setLoading(true);

  try {
    const formDataToSend = new FormData();
    
    // Debug: Log what we're sending
    console.log('🔄 Sending scholarship data:', {
      s_name_eng: formData.s_name_eng,
      s_university_eng: formData.s_university_eng,
      s_country_eng: formData.s_country_eng,
      has_image: !!formData.s_image
    });
    
    // Append all form data
    Object.keys(formData).forEach(key => {
      if (key !== 's_image' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });
    
    if (formData.s_image) {
      formDataToSend.append('s_image', formData.s_image);
    }

    const result = await post('/api/scholarships', formDataToSend);

    console.log('📨 API Response:', result);

    if (result.success) {
      router.push('/scholarships-programs-cp');
    } else {
      setError(result.error || 'Failed to create scholarship');
    }
  } catch (error) {
    console.error('💥 Submission error:', error);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const removeImage = () => {
    setFormData(prevState => ({
      ...prevState,
      s_image: null
    }));
    setImagePreview('');
  };

  // Helper function to render multi-language input group
  const renderMultiLanguageInput = (fieldBase, label, placeholder, isTextArea = false, isRichText = false) => (
    <div className="space-y-4">
      {/* English */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} (English)
        </label>
        {isRichText ? (
          <RichTextEditor
            value={formData[`${fieldBase}_eng`]}
            onChange={(value) => handleRichTextChange(`${fieldBase}_eng`, value)}
            placeholder={placeholder.eng}
            rows={4}
          />
        ) : isTextArea ? (
          <textarea
            name={`${fieldBase}_eng`}
            value={formData[`${fieldBase}_eng`]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder.eng}
            rows={4}
          />
        ) : (
          <input
            type="text"
            name={`${fieldBase}_eng`}
            value={formData[`${fieldBase}_eng`]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder.eng}
          />
        )}
      </div>

      {/* Pashto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} (پښتو)
        </label>
        {isRichText ? (
          <RichTextEditor
            value={formData[`${fieldBase}_pash`]}
            onChange={(value) => handleRichTextChange(`${fieldBase}_pash`, value)}
            placeholder={placeholder.pash}
            rows={4}
          />
        ) : isTextArea ? (
          <textarea
            name={`${fieldBase}_pash`}
            value={formData[`${fieldBase}_pash`]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder.pash}
            rows={4}
          />
        ) : (
          <input
            type="text"
            name={`${fieldBase}_pash`}
            value={formData[`${fieldBase}_pash`]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder.pash}
          />
        )}
      </div>

      {/* Dari */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} (دری)
        </label>
        {isRichText ? (
          <RichTextEditor
            value={formData[`${fieldBase}_dari`]}
            onChange={(value) => handleRichTextChange(`${fieldBase}_dari`, value)}
            placeholder={placeholder.dari}
            rows={4}
          />
        ) : isTextArea ? (
          <textarea
            name={`${fieldBase}_dari`}
            value={formData[`${fieldBase}_dari`]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder.dari}
            rows={4}
          />
        ) : (
          <input
            type="text"
            name={`${fieldBase}_dari`}
            value={formData[`${fieldBase}_dari`]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder.dari}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Scholarship Post</h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scholarship Name */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Scholarship Name</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_name', 'Scholarship Name', {
                  eng: 'Enter scholarship name',
                  pash: 'د بورس نوم داخل کړئ',
                  dari: 'اسم بورسیه را وارد نمایید'
                })}
              </div>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scholarship Image
              </label>
              
              {imagePreview && (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Upload an image (JPEG, PNG, max 5MB) - Optional
              </p>
            </div>

            {/* Country */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Country</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_country', 'Country', {
                  eng: 'Enter country',
                  pash: 'هیواد داخل کړئ',
                  dari: 'کشور را وارد نمایید'
                })}
              </div>
            </div>

            {/* University */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">University</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_university', 'University', {
                  eng: 'Enter university name',
                  pash: 'د پوهنتون نوم داخل کړئ',
                  dari: 'اسم دانشگاه را وارد نمایید'
                })}
              </div>
            </div>

            {/* Language */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Language</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_language', 'Language', {
                  eng: 'Enter language',
                  pash: 'ژبه داخل کړئ',
                  dari: 'زبان را وارد نمایید'
                })}
              </div>
            </div>

            {/* Gender */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Gender</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_gender', 'Gender', {
                  eng: 'Enter gender requirements',
                  pash: 'د جنس اړتیاګانې داخل کړئ',
                  dari: 'مقررات جنسیت را وارد نمایید'
                })}
              </div>
            </div>

            {/* Study Level */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Study Level</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_study_level', 'Study Level', {
                  eng: 'Enter study level',
                  pash: 'د زده کړې کچه داخل کړئ',
                  dari: 'سطح تحصیل را وارد نمایید'
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Duration</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_duration', 'Duration', {
                  eng: 'e.g., 4 years, 2 semesters',
                  pash: 'لکه: ۴ کاله، ۲ سمستر',
                  dari: 'مثال: ۴ سال، ۲ سمستر'
                })}
              </div>
            </div>

            {/* Funding Type */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Funding Type</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_funding_type', 'Funding Type', {
                  eng: 'Enter funding type',
                  pash: 'د مالي ملاتړ ډول داخل کړئ',
                  dari: 'نوعیت تامین مالی را وارد نمایید'
                })}
              </div>
            </div>

            {/* New Fields: Fields of Study */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Fields of Study</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_fields_of_study', 'Fields of Study', {
                  eng: 'Enter available fields of study',
                  pash: 'د زده کړې ساحې داخل کړئ',
                  dari: 'رشته های تحصیلی را وارد نمایید'
                }, true)}
              </div>
            </div>

            {/* New Fields: Language Required */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Language Required</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_language_required', 'Language Required', {
                  eng: 'Enter language requirements',
                  pash: 'د ژبې اړتیاګانې داخل کړئ',
                  dari: 'مقررات زبان را وارد نمایید'
                }, true)}
              </div>
            </div>

            {/* New Fields: Eligible Countries */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Eligible Countries</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_eligible_countries', 'Eligible Countries', {
                  eng: 'Enter eligible countries',
                  pash: 'وړ هیوادونه داخل کړئ',
                  dari: 'کشورهای واجد شرایط را وارد نمایید'
                }, true)}
              </div>
            </div>

            {/* Application Deadline */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                name="s_app_deadline"
                value={formData.s_app_deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Applying Link */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Applying Link
              </label>
              <input
                type="url"
                name="s_applying_link"
                value={formData.s_applying_link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/apply"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the application link (Optional)
              </p>
            </div>

            {/* Overview */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Overview</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_overview', 'Overview', {
                  eng: 'Provide a brief overview of the scholarship',
                  pash: 'د بورس لنډه کتنه ورکړئ',
                  dari: 'خلاصه ای از بورسیه ارائه دهید'
                }, false, true)}
              </div>
            </div>

            {/* Detailed Information */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Detailed Information</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_detailed_info', 'Detailed Information', {
                  eng: 'Provide detailed information about the scholarship',
                  pash: 'د بورس په اړه مفصله معلومات ورکړئ',
                  dari: 'اطلاعات مفصلی در مورد بورسیه ارائه دهید'
                }, false, true)}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Eligibility Criteria</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_eligibility', 'Eligibility Criteria', {
                  eng: 'List the eligibility requirements',
                  pash: 'د وړتیا اړتیاګانې لیست کړئ',
                  dari: 'معیارهای واجد شرایط را فهرست کنید'
                }, false, true)}
              </div>
            </div>

            {/* Application Process */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Application Process</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_app_procces', 'Application Process', {
                  eng: 'Describe the application process step by step',
                  pash: 'د غوښتنلیک پروسه ګام په ګام تشریح کړئ',
                  dari: 'فرآیند درخواست را مرحله به مرحله شرح دهید'
                }, false, true)}
              </div>
            </div>

            {/* Benefits */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Benefits</h2>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-sm p-4">
                {renderMultiLanguageInput('s_benefits', 'Benefits', {
                  eng: 'List the benefits offered by this scholarship',
                  pash: 'د دې بورس ګټې لیست کړئ',
                  dari: 'مزایای ارائه شده توسط این بورسیه را فهرست کنید'
                }, false, true)}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              disabled={loading}
            >
              Back To previous page
            </button>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Scholarship'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}