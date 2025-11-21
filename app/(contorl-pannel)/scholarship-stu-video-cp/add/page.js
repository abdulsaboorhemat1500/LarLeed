"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/app/hooks/useApi";

export default function AddVideoPage() {
  const router = useRouter();
  const { get, post } = useApi();

  const [formData, setFormData] = useState({
    video_image: null,
    video_link: "",
    video_title: "",
    rt_scholarship_name: "",
    vd_status: "Status", // Default value
  });
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchScholarships = async () => {
    try {
      const result = await get("/api/scholarships");
      if (result.success) {
        setScholarships(result.data || []);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load scholarships" });
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        video_image: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      video_image: null,
    }));
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.video_link ||
      !formData.video_title ||
      !formData.rt_scholarship_name ||
      !formData.vd_status
    ) {
      setMessage({
        type: "error",
        text: "Video link, video title, scholarship name, and status are required",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const submitData = new FormData();
      submitData.append("video_link", formData.video_link);
      submitData.append("video_title", formData.video_title);
      submitData.append("rt_scholarship_name", formData.rt_scholarship_name);
      submitData.append("vd_status", formData.vd_status);

      if (formData.video_image) {
        submitData.append("video_image", formData.video_image);
      }

      const result = await post("/api/scholarship-stu-videos", submitData);

      if (result.success) {
        setMessage({
          type: "success",
          text: "Video added successfully! Redirecting...",
        });
        setTimeout(() => {
          router.push("/scholarship-stu-video-cp");
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to add video",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to add video. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Add Student Video
          </h1>

          {/* Message Display */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              <div className="flex items-center">
                {message.type === "success" ? (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <svg
                        className="w-8 h-8 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: Square image, max 5MB
                  </p>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove image
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="video_link"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Video Link *
              </label>
              <input
                type="url"
                id="video_link"
                name="video_link"
                value={formData.video_link}
                onChange={handleInputChange}
                placeholder="https://youtube.com/embed/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="video_title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Video Title *
              </label>
              <input
                type="text"
                id="video_title"
                name="video_title"
                value={formData.video_title}
                onChange={handleInputChange}
                placeholder="Enter video title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="rt_scholarship_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Scholarship Name *
              </label>
              <select
                id="rt_scholarship_name"
                name="rt_scholarship_name"
                value={formData.rt_scholarship_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a scholarship</option>
                {scholarships.map((scholarship) => (
                  <option key={scholarship.id} value={scholarship.s_name_eng}>
                    {scholarship.s_name_eng}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Field - NEW */}
            <div>
              <label
                htmlFor="vd_status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status *
              </label>
              <select
                id="vd_status"
                name="vd_status"
                value={formData.vd_status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Student Story">Student Story</option>
                <option value="How to Apply">How to Apply</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push("/scholarship-stu-video-cp")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200 flex items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Video"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
