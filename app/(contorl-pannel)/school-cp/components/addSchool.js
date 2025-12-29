"use client";
import { useState } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import RichTextEditor from "@/components/RichTextEditor";

export default function AddSchoolModal({ isOpen, onClose, onSchoolAdded }) {
  const { post } = useApi();
  const { t } = useTranslations();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name_en: "",
    name_ps: "",
    name_pa: "",
    owner_name_en: "",
    owner_name_ps: "",
    owner_name_pa: "",
    email: "",
    content_type: "",
    phone_number: "",
    overview_en: "",
    overview_ps: "",
    overview_pa: "",
    detailed_info_en: "",
    detailed_info_ps: "",
    detailed_info_pa: "",
    website_link: "",
    facebook_link: "",
    instagram_link: "",
    whatsapp_number: "",
    funding_type: "",
  });

  const contentTypes = [
    "Zoom Meetings",
    "Google Meet",
    "WhatsApp Based",
    "Other",
  ];
  const fundingTypes = ["Free", "Half Free", "Fee needed"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Special handler for RichTextEditor components
  const handleRichTextChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file (JPEG, PNG, GIF, WebP)",
        }));
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      setImageFile(file);
      setErrors((prev) => ({ ...prev, image: "" }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name_en.trim())
      newErrors.name_en = "English name is required";
    if (!formData.owner_name_en.trim())
      newErrors.owner_name_en = "Owner English name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone number is required";
    if (!formData.content_type)
      newErrors.content_type = "Content type is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Valid email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Create FormData object for file upload
      const submitData = new FormData();

      // Append all text fields
      submitData.append("name_en", formData.name_en);
      submitData.append("name_ps", formData.name_ps);
      submitData.append("name_pa", formData.name_pa);
      submitData.append("owner_name_en", formData.owner_name_en);
      submitData.append("owner_name_ps", formData.owner_name_ps);
      submitData.append("owner_name_pa", formData.owner_name_pa);
      submitData.append("email", formData.email);
      submitData.append("content_type", formData.content_type);
      submitData.append("phone_number", formData.phone_number);
      submitData.append("overview_en", formData.overview_en);
      submitData.append("overview_ps", formData.overview_ps);
      submitData.append("overview_pa", formData.overview_pa);
      submitData.append("detailed_info_en", formData.detailed_info_en);
      submitData.append("detailed_info_ps", formData.detailed_info_ps);
      submitData.append("detailed_info_pa", formData.detailed_info_pa);
      submitData.append("website_link", formData.website_link);
      submitData.append("facebook_link", formData.facebook_link);
      submitData.append("instagram_link", formData.instagram_link);
      submitData.append("whatsapp_number", formData.whatsapp_number);
      submitData.append("funding_type", formData.funding_type);

      // Append image file if exists
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      // Call the POST API
      const result = await post("/api/school", submitData);

      if (result.success) {
        onSchoolAdded(result.data);
        handleClose();
      } else {
        setErrors({ submit: result.error || "Failed to add school" });
      }
    } catch (error) {
      setErrors({
        submit: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name_en: "",
      name_ps: "",
      name_pa: "",
      owner_name_en: "",
      owner_name_ps: "",
      owner_name_pa: "",
      email: "",
      content_type: "",
      phone_number: "",
      overview_en: "",
      overview_ps: "",
      overview_pa: "",
      detailed_info_en: "",
      detailed_info_ps: "",
      detailed_info_pa: "",
      website_link: "",
      facebook_link: "",
      instagram_link: "",
      whatsapp_number: "",
      funding_type: "",
    });
    setImageFile(null);
    setImagePreview("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Add New School</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Basic Information
              </h3>
            </div>

            {/* Names */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name (English) *
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name_en ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter school name in English"
              />
              {errors.name_en && (
                <p className="text-red-500 text-sm mt-1">{errors.name_en}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name (Pashto)
              </label>
              <input
                type="text"
                name="name_ps"
                value={formData.name_ps}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter school name in Pashto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name (Dari)
              </label>
              <input
                type="text"
                name="name_pa"
                value={formData.name_pa}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter school name in Dari"
              />
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Type *
              </label>
              <select
                name="content_type"
                value={formData.content_type}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.content_type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select content type</option>
                {contentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.content_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content_type}
                </p>
              )}
            </div>

            {/* Funding Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Funding Type
              </label>
              <select
                name="funding_type"
                value={formData.funding_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select funding type</option>
                {fundingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Image
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: JPG, PNG, WebP, GIF. Max size: 5MB
              </p>

              {/* Selected Image Preview */}
              {imageFile && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Image:
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{imageFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Owner Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Owner Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name (English) *
              </label>
              <input
                type="text"
                name="owner_name_en"
                value={formData.owner_name_en || "name"}
                disabled
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.owner_name_en ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter owner name in English"
              />
              {errors.owner_name_en && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.owner_name_en}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name (Pashto)
              </label>
              <input
                type="text"
                name="owner_name_ps"
                value={formData.owner_name_ps || "name"}
                disabled
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter owner name in Pashto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name (Dari)
              </label>
              <input
                type="text"
                name="owner_name_pa"
                value={formData.owner_name_pa || "name"}
                disabled
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter owner name in Dari"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Contact Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || "email@gmail.com"}
                disabled
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="school@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number || "000000000000"}
                disabled
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone_number ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+93 XXX XXX XXX"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp_number"
                value={formData.whatsapp_number || "00000000000"}
                disabled
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+93 XXX XXX XXX"
              />
            </div>
          </div>

          {/* Social Media & Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Social Media & Links
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website Link
              </label>
              <input
                type="url"
                name="website_link"
                value={formData.website_link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook Link
              </label>
              <input
                type="url"
                name="facebook_link"
                value={formData.facebook_link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://facebook.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram Link
              </label>
              <input
                type="url"
                name="instagram_link"
                value={formData.instagram_link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Description
              </h3>
            </div>

            <div className="space-y-6">
              {/* Overview Section */}
              <div>
                <h4 className="text-md font-semibold mb-3 text-gray-700">
                  Overview
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Overview (English)
                    </label>
                    <RichTextEditor
                      value={formData.overview_en}
                      onChange={(value) =>
                        handleRichTextChange("overview_en", value)
                      }
                      placeholder="Brief overview in English"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Overview (Pashto)
                    </label>
                    <RichTextEditor
                      value={formData.overview_ps}
                      onChange={(value) =>
                        handleRichTextChange("overview_ps", value)
                      }
                      placeholder="Brief overview in Pashto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Overview (Dari)
                    </label>
                    <RichTextEditor
                      value={formData.overview_pa}
                      onChange={(value) =>
                        handleRichTextChange("overview_pa", value)
                      }
                      placeholder="Brief overview in Dari"
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Info Section */}
              <div>
                <h4 className="text-md font-semibold mb-3 text-gray-700">
                  Detailed Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Info (English)
                    </label>
                    <RichTextEditor
                      value={formData.detailed_info_en}
                      onChange={(value) =>
                        handleRichTextChange("detailed_info_en", value)
                      }
                      placeholder="Detailed information in English"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Info (Pashto)
                    </label>
                    <RichTextEditor
                      value={formData.detailed_info_ps}
                      onChange={(value) =>
                        handleRichTextChange("detailed_info_ps", value)
                      }
                      placeholder="Detailed information in Pashto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Info (Dari)
                    </label>
                    <RichTextEditor
                      value={formData.detailed_info_pa}
                      onChange={(value) =>
                        handleRichTextChange("detailed_info_pa", value)
                      }
                      placeholder="Detailed information in Dari"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{loading ? "Adding..." : "Add School"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
