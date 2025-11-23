"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";

export default function UpdateSchoolModal({
  isOpen,
  onClose,
  school,
  onSchoolUpdated,
}) {
  const { put } = useApi();
  const { t } = useTranslations();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const contentTypes = [
    "Private School",
    "Public School",
    "University",
    "Training Center",
    "Other",
  ];
  const fundingTypes = [
    "Private",
    "Public",
    "Non-Profit",
    "International",
    "Hybrid",
  ];

  useEffect(() => {
    if (school) {
      setFormData({
        name_en: school.name_en || "",
        name_ps: school.name_ps || "",
        name_pa: school.name_pa || "",
        owner_name_en: school.owner_name_en || "",
        owner_name_ps: school.owner_name_ps || "",
        owner_name_pa: school.owner_name_pa || "",
        email: school.email || "",
        content_type: school.content_type || "",
        phone_number: school.phone_number || "",
        overview_en: school.overview_en || "",
        overview_ps: school.overview_ps || "",
        overview_pa: school.overview_pa || "",
        detailed_info_en: school.detailed_info_en || "",
        detailed_info_ps: school.detailed_info_ps || "",
        detailed_info_pa: school.detailed_info_pa || "",
        website_link: school.website_link || "",
        facebook_link: school.facebook_link || "",
        instagram_link: school.instagram_link || "",
        whatsapp_number: school.whatsapp_number || "",
        funding_type: school.funding_type || "",
        image: school.image || "",
      });
    }
  }, [school]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
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
    try {
      const result = await put(`/api/school/${school.id}`, formData);

      if (result.success) {
        onSchoolUpdated(result.data);
        handleClose();
      } else {
        setErrors({ submit: result.error || "Failed to update school" });
      }
    } catch (error) {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen || !school) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Update School</h2>
          <p className="text-gray-600 mt-1">Editing: {school.name_en}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {/* Same form structure as AddSchoolModal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Basic Information
              </h3>
            </div>

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
              />
            </div>

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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                value={formData.owner_name_en}
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
                value={formData.owner_name_ps}
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
                value={formData.owner_name_pa}
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
                value={formData.email}
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
                value={formData.phone_number}
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
                value={formData.whatsapp_number}
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

          {/* Description */}
          <div className="mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Description
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview (English)
                </label>
                <textarea
                  name="overview_en"
                  value={formData.overview_en}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief overview in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview (Pashto)
                </label>
                <textarea
                  name="overview_ps"
                  value={formData.overview_ps}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief overview in Pashto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview (Dari)
                </label>
                <textarea
                  name="overview_pa"
                  value={formData.overview_pa}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief overview in Dari"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Info (English)
                </label>
                <textarea
                  name="detailed_info_en"
                  value={formData.detailed_info_en}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed information in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Info (Pashto)
                </label>
                <textarea
                  name="detailed_info_ps"
                  value={formData.detailed_info_ps}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed information in Pashto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Info (Dari)
                </label>
                <textarea
                  name="detailed_info_pa"
                  value={formData.detailed_info_pa}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed information in Dari"
                />
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Updating..." : "Update School"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
