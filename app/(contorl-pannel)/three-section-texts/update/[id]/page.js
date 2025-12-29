// app/hero-text/update/[id]/page.tsx
"use client";

export const runtime = "edge";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApi } from "@/app/hooks/useApi";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

export default function UpdateHeroText() {
  const [formData, setFormData] = useState({
    mentorship_english: "",
    mentorship_pashto: "",
    mentorship_dari: "",
    donate_english: "",
    donate_pashto: "",
    donate_dari: "",
    about_english: "",
    about_pashto: "",
    about_dari: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errors, setErrors] = useState({});
  const { get, put } = useApi();
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchTextData = async () => {
      try {
        setFetching(true);
        const result = await get(`/api/threesectiontexts/${id}`);
        if (result.success && result.data) {
          setFormData({
            mentorship_english: result.data.mentorship_english || "",
            mentorship_pashto: result.data.mentorship_pashto || "",
            mentorship_dari: result.data.mentorship_dari || "",
            donate_english: result.data.donate_english || "",
            donate_pashto: result.data.donate_pashto || "",
            donate_dari: result.data.donate_dari || "",
            about_english: result.data.about_english || "",
            about_pashto: result.data.about_pashto || "",
            about_dari: result.data.about_dari || "",
          });
        }
      } catch (error) {
        console.error("Error fetching text data:", error);
        setErrors({ submit: "Failed to load text data" });
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchTextData();
    }
  }, [id, get]);

  const handleRichTextChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrors({});

      const result = await put(`/api/threesectiontexts/${id}`, formData);

      if (result.success) {
        router.push("/three-section-texts");
      } else {
        setErrors({ submit: result.error || "Failed to update text" });
      }
    } catch (error) {
      console.error("Error updating text:", error);
      setErrors({ submit: "Network error. Please try again." });
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Update Three Section Texts
          </h1>
          <Link
            href="/three-section-texts"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to View
          </Link>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mentorship Section */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-300">
              Mentorship Section
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Mentorship - English
                </label>
                <RichTextEditor
                  value={formData.mentorship_english}
                  onChange={(value) =>
                    handleRichTextChange("mentorship_english", value)
                  }
                  placeholder="Enter mentorship content in English..."
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Mentorship - Pashto
                </label>
                <RichTextEditor
                  value={formData.mentorship_pashto}
                  onChange={(value) =>
                    handleRichTextChange("mentorship_pashto", value)
                  }
                  placeholder="Enter mentorship content in Pashto..."
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Mentorship - Dari
                </label>
                <RichTextEditor
                  value={formData.mentorship_dari}
                  onChange={(value) =>
                    handleRichTextChange("mentorship_dari", value)
                  }
                  placeholder="Enter mentorship content in Dari..."
                  rows={8}
                />
              </div>
            </div>
          </div>

          {/* Donate Section */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h2 className="text-xl font-bold text-green-800 mb-4 pb-2 border-b border-green-300">
              Donate Section
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Donate - English
                </label>
                <RichTextEditor
                  value={formData.donate_english}
                  onChange={(value) =>
                    handleRichTextChange("donate_english", value)
                  }
                  placeholder="Enter donation content in English..."
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Donate - Pashto
                </label>
                <RichTextEditor
                  value={formData.donate_pashto}
                  onChange={(value) =>
                    handleRichTextChange("donate_pashto", value)
                  }
                  placeholder="Enter donation content in Pashto..."
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Donate - Dari
                </label>
                <RichTextEditor
                  value={formData.donate_dari}
                  onChange={(value) =>
                    handleRichTextChange("donate_dari", value)
                  }
                  placeholder="Enter donation content in Dari..."
                  rows={8}
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h2 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b border-purple-300">
              About Section
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  About - English
                </label>
                <RichTextEditor
                  value={formData.about_english}
                  onChange={(value) =>
                    handleRichTextChange("about_english", value)
                  }
                  placeholder="Enter about content in English..."
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  About - Pashto
                </label>
                <RichTextEditor
                  value={formData.about_pashto}
                  onChange={(value) =>
                    handleRichTextChange("about_pashto", value)
                  }
                  placeholder="Enter about content in Pashto..."
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  About - Dari
                </label>
                <RichTextEditor
                  value={formData.about_dari}
                  onChange={(value) =>
                    handleRichTextChange("about_dari", value)
                  }
                  placeholder="Enter about content in Dari..."
                  rows={8}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? (
                <span className="flex items-center">
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
                  Updating...
                </span>
              ) : (
                "Update All Texts"
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push("/three-section-texts")}
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
