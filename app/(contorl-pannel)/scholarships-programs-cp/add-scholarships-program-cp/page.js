'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function AddScholarshipPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    s_name: '',
    s_image: null,
    s_country: '',
    s_university: '',
    s_language: '',
    s_gender: '',
    s_study_level: '',
    s_app_deadline: '',
    s_duration: '',
    s_funding_type: '',
    s_overview: '',
    s_detailed_info: '',
    s_eligibility: '',
    s_app_procces: '',
    s_benefits: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { post } = useApi();

  // Validation rules - FIXED: Now returns the errors instead of just setting state
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 's_name':
        if (!value.trim()) {
          newErrors.s_name = 'Scholarship name is required';
        } else if (value.length < 3) {
          newErrors.s_name = 'Scholarship name must be at least 3 characters';
        } else {
          delete newErrors.s_name;
        }
        break;

      case 's_country':
        if (!value.trim()) {
          newErrors.s_country = 'Country is required';
        } else {
          delete newErrors.s_country;
        }
        break;

      case 's_university':
        if (!value.trim()) {
          newErrors.s_university = 'University is required';
        } else {
          delete newErrors.s_university;
        }
        break;

      case 's_language':
        if (!value.trim()) {
          newErrors.s_language = 'Language is required';
        } else {
          delete newErrors.s_language;
        }
        break;

      case 's_study_level':
        if (!value) {
          newErrors.s_study_level = 'Study level is required';
        } else {
          delete newErrors.s_study_level;
        }
        break;

      case 's_app_deadline':
        if (!value) {
          newErrors.s_app_deadline = 'Application deadline is required';
        } else if (new Date(value) <= new Date()) {
          newErrors.s_app_deadline = 'Deadline must be in the future';
        } else {
          delete newErrors.s_app_deadline;
        }
        break;

      case 's_duration':
        if (!value.trim()) {
          newErrors.s_duration = 'Duration is required';
        } else {
          delete newErrors.s_duration;
        }
        break;

      case 's_funding_type':
        if (!value) {
          newErrors.s_funding_type = 'Funding type is required';
        } else {
          delete newErrors.s_funding_type;
        }
        break;

      case 's_overview':
        if (!value.trim()) {
          newErrors.s_overview = 'Overview is required';
        } else if (value.length < 50) {
          newErrors.s_overview = 'Overview must be at least 50 characters';
        } else {
          delete newErrors.s_overview;
        }
        break;

      case 's_detailed_info':
        if (!value.trim()) {
          newErrors.s_detailed_info = 'Detailed information is required';
        } else if (value.length < 100) {
          newErrors.s_detailed_info = 'Detailed information must be at least 100 characters';
        } else {
          delete newErrors.s_detailed_info;
        }
        break;

      case 's_eligibility':
        if (!value.trim()) {
          newErrors.s_eligibility = 'Eligibility criteria is required';
        } else if (value.length < 50) {
          newErrors.s_eligibility = 'Eligibility criteria must be at least 50 characters';
        } else {
          delete newErrors.s_eligibility;
        }
        break;

      case 's_app_procces':
        if (!value.trim()) {
          newErrors.s_app_procces = 'Application process is required';
        } else if (value.length < 50) {
          newErrors.s_app_procces = 'Application process must be at least 50 characters';
        } else {
          delete newErrors.s_app_procces;
        }
        break;

      case 's_benefits':
        if (!value.trim()) {
          newErrors.s_benefits = 'Benefits are required';
        } else if (value.length < 30) {
          newErrors.s_benefits = 'Benefits must be at least 30 characters';
        } else {
          delete newErrors.s_benefits;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return newErrors; // Return the updated errors
  };

  // FIXED: This function now properly validates all fields and returns the result
  const validateForm = () => {
    const requiredFields = [
      's_name', 's_country', 's_university', 's_language', 's_study_level',
      's_app_deadline', 's_duration', 's_funding_type', 's_overview',
      's_detailed_info', 's_eligibility', 's_app_procces', 's_benefits'
    ];

    let formErrors = { ...errors };

    // Validate each required field
    requiredFields.forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      formErrors = { ...formErrors, ...fieldErrors };
    });

    // Also check character limits for text areas
    if (formData.s_overview.length < 50) {
      formErrors.s_overview = 'Overview must be at least 50 characters';
    }
    if (formData.s_detailed_info.length < 100) {
      formErrors.s_detailed_info = 'Detailed information must be at least 100 characters';
    }
    if (formData.s_eligibility.length < 50) {
      formErrors.s_eligibility = 'Eligibility criteria must be at least 50 characters';
    }
    if (formData.s_app_procces.length < 50) {
      formErrors.s_app_procces = 'Application process must be at least 50 characters';
    }
    if (formData.s_benefits.length < 30) {
      formErrors.s_benefits = 'Benefits must be at least 30 characters';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Validate field on change
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      s_image: file
    }));

    // Clear any previous image errors
    setErrors(prev => ({ ...prev, s_image: undefined }));
    setError(''); // Clear general error

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields before submission - FIXED: Use the return value
    const isValid = validateForm();
    if (!isValid) {
      setError('Please fix the validation errors before submitting');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append('s_name', formData.s_name);
      formDataToSend.append('s_country', formData.s_country);
      formDataToSend.append('s_university', formData.s_university);
      formDataToSend.append('s_language', formData.s_language);
      formDataToSend.append('s_gender', formData.s_gender);
      formDataToSend.append('s_study_level', formData.s_study_level);
      formDataToSend.append('s_app_deadline', formData.s_app_deadline);
      formDataToSend.append('s_duration', formData.s_duration);
      formDataToSend.append('s_funding_type', formData.s_funding_type);
      formDataToSend.append('s_overview', formData.s_overview);
      formDataToSend.append('s_detailed_info', formData.s_detailed_info);
      formDataToSend.append('s_eligibility', formData.s_eligibility);
      formDataToSend.append('s_app_procces', formData.s_app_procces);
      formDataToSend.append('s_benefits', formData.s_benefits);
      
      // Append image file if exists
      if (formData.s_image) {
        formDataToSend.append('s_image', formData.s_image);
      }

      const result = await post('/api/scholarships', formDataToSend);

      if (result.success) {
        router.push('/scholarships-programs-cp');
      } else {
        setError(result.error || 'Failed to create scholarship');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Submission error:', error);
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

  // FIXED: Check if form is valid for button enablement
  const isFormValid = () => {
    const requiredFields = [
      's_name', 's_country', 's_university', 's_language', 's_study_level',
      's_app_deadline', 's_duration', 's_funding_type', 's_overview',
      's_detailed_info', 's_eligibility', 's_app_procces', 's_benefits'
    ];

    // Check if all required fields have values
    const hasAllRequiredFields = requiredFields.every(field => 
      formData[field] && formData[field].toString().trim() !== ''
    );

    // Check character limits
    const meetsLengthRequirements = 
      formData.s_overview.length >= 50 &&
      formData.s_detailed_info.length >= 100 &&
      formData.s_eligibility.length >= 50 &&
      formData.s_app_procces.length >= 50 &&
      formData.s_benefits.length >= 30;

    // Check date is in future
    const isFutureDate = formData.s_app_deadline && new Date(formData.s_app_deadline) > new Date();

    return hasAllRequiredFields && meetsLengthRequirements && isFutureDate && Object.keys(errors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Scholarship Post</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ... (all your existing form fields remain the same) ... */}
          </div>

          {/* Submit Button - FIXED: Use isFormValid() instead of errors.length */}
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
              disabled={loading || !isFormValid()}
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