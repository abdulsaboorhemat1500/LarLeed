"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import RichTextEditor from "@/components/RichTextEditor";

export default function UpdateCourseModal({
  isOpen,
  onClose,
  course,
  onCourseUpdated,
}) {
  const { put } = useApi();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({});

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Language",
    "Science",
    "Mathematics",
    "Art",
    "Music",
    "Health",
    "Other",
  ];

  const feeOptions = ["Free", "Paid", "Subscription", "Freemium"];

  useEffect(() => {
    if (course) {
      setFormData({
        name_en: course.name_en || "",
        name_ps: course.name_ps || "",
        name_fa: course.name_fa || "",
        category_en: course.category_en || "",
        category_ps: course.category_ps || "",
        category_fa: course.category_fa || "",
        overview_en: course.overview_en || "",
        overview_ps: course.overview_ps || "",
        overview_fa: course.overview_fa || "",
        description_en: course.description_en || "",
        description_ps: course.description_ps || "",
        description_fa: course.description_fa || "",
        link: course.link || "",
        fee: course.fee || "Free",
      });
      if (course.image) {
        setImagePreview(course.image);
      }
    }
  }, [course]);

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

  const handleRichTextChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      setImageFile(file);
      setErrors((prev) => ({ ...prev, image: "" }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(course?.image || "");
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name_en.trim())
      newErrors.name_en = "English name is required";
    if (!formData.category_en.trim())
      newErrors.category_en = "Category is required";
    if (!formData.overview_en.trim())
      newErrors.overview_en = "Overview is required";
    if (!formData.description_en.trim())
      newErrors.description_en = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const submitData = new FormData();

      // Append all text fields
      submitData.append("name_en", formData.name_en);
      submitData.append("name_ps", formData.name_ps);
      submitData.append("name_fa", formData.name_fa);
      submitData.append("category_en", formData.category_en);
      submitData.append("category_ps", formData.category_ps);
      submitData.append("category_fa", formData.category_fa);
      submitData.append("overview_en", formData.overview_en);
      submitData.append("overview_ps", formData.overview_ps);
      submitData.append("overview_fa", formData.overview_fa);
      submitData.append("description_en", formData.description_en);
      submitData.append("description_ps", formData.description_ps);
      submitData.append("description_fa", formData.description_fa);
      submitData.append("link", formData.link);
      submitData.append("fee", formData.fee);

      // Append image file if exists
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const result = await put(`/api/course/${course.id}`, submitData);

      if (result.success) {
        onCourseUpdated(result.data);
        handleClose();
      } else {
        setErrors({ submit: result.error || "Failed to update course" });
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
    setImageFile(null);
    setImagePreview(course?.image || "");
    setErrors({});
    onClose();
  };

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Update Course</h2>
          <p className="text-gray-600 mt-1">Editing: {course.name_en}</p>
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

            {/* Course Names */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name (English) *
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
                Course Name (Pashto)
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
                Course Name (Farsi)
              </label>
              <input
                type="text"
                name="name_fa"
                value={formData.name_fa}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category (English) *
              </label>
              <select
                name="category_en"
                value={formData.category_en}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category_en ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category_en && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_en}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category (Pashto)
              </label>
              <input
                type="text"
                name="category_ps"
                value={formData.category_ps}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category (Farsi)
              </label>
              <input
                type="text"
                name="category_fa"
                value={formData.category_fa}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fee Type
              </label>
              <select
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {feeOptions.map((fee) => (
                  <option key={fee} value={fee}>
                    {fee}
                  </option>
                ))}
              </select>
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Image
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
              {imagePreview && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {imageFile ? "New Image Preview:" : "Current Image:"}
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
                      {imageFile && (
                        <>
                          <p className="text-sm text-gray-600">
                            {imageFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </>
                      )}
                      {!imageFile && course.image && (
                        <p className="text-sm text-gray-600">
                          Current course image
                        </p>
                      )}
                    </div>
                    {(imageFile || course.image) && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        {imageFile ? "Remove New" : "Remove Current"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Overview Section */}
          <div className="mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Overview
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview (English) *
                </label>
                <RichTextEditor
                  value={formData.overview_en}
                  onChange={(value) =>
                    handleRichTextChange("overview_en", value)
                  }
                  placeholder="Brief overview in English"
                />
                {errors.overview_en && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.overview_en}
                  </p>
                )}
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
                  Overview (Farsi)
                </label>
                <RichTextEditor
                  value={formData.overview_fa}
                  onChange={(value) =>
                    handleRichTextChange("overview_fa", value)
                  }
                  placeholder="Brief overview in Farsi"
                />
              </div>
            </div>
          </div>

          {/* Detailed Description Section */}
          <div className="mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Detailed Description
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (English) *
                </label>
                <RichTextEditor
                  value={formData.description_en}
                  onChange={(value) =>
                    handleRichTextChange("description_en", value)
                  }
                  placeholder="Detailed description in English"
                />
                {errors.description_en && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description_en}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Pashto)
                </label>
                <RichTextEditor
                  value={formData.description_ps}
                  onChange={(value) =>
                    handleRichTextChange("description_ps", value)
                  }
                  placeholder="Detailed description in Pashto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Farsi)
                </label>
                <RichTextEditor
                  value={formData.description_fa}
                  onChange={(value) =>
                    handleRichTextChange("description_fa", value)
                  }
                  placeholder="Detailed description in Farsi"
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{loading ? "Updating..." : "Update Course"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
