// app/three-section-texts/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import Link from "next/link";
import { Check, X, FileText } from "lucide-react";

export default function ThreeSectionTextsPage() {
  const [textData, setTextData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  const fetchTextData = async () => {
    try {
      setLoading(true);
      const result = await get("/api/threesectiontexts");
      if (result.success) {
        setTextData(result.data);
      }
    } catch (error) {
      console.error("Error fetching text data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTextData();
  }, []);

  // Function to check if a field has data
  const hasData = (field) => {
    return field && field.trim().length > 0;
  };

  // Function to get all field names grouped by section
  const getFieldGroups = () => {
    return [
      {
        title: "Mentorship Section",
        fields: [
          { key: "mentorship_english", label: "Mentorship - English" },
          { key: "mentorship_pashto", label: "Mentorship - Pashto" },
          { key: "mentorship_dari", label: "Mentorship - Dari" },
        ],
      },
      {
        title: "Donate Section",
        fields: [
          { key: "donate_english", label: "Donate - English" },
          { key: "donate_pashto", label: "Donate - Pashto" },
          { key: "donate_dari", label: "Donate - Dari" },
        ],
      },
      {
        title: "About Section",
        fields: [
          { key: "about_english", label: "About - English" },
          { key: "about_pashto", label: "About - Pashto" },
          { key: "about_dari", label: "About - Dari" },
        ],
      },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Three Section Texts
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage all section texts
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/three-section-texts/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Add Texts
            </Link>
          </div>
        </div>

        {/* No data message */}
        {textData.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Texts Found
            </h3>
            <p className="text-gray-500 mb-6">
              Click "Add Texts" to start adding content to all sections.
            </p>
            <Link
              href="/three-section-texts/add"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              Add Your First Texts
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {textData.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                {/* Header with actions */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Text Entry #{index + 1}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/three-section-texts/update/${item.id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>

                {/* Field Groups */}
                <div className="p-6">
                  {getFieldGroups().map((group) => (
                    <div key={group.title} className="mb-8 last:mb-0">
                      <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                        {group.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {group.fields.map((field) => {
                          const hasFieldData = hasData(item[field.key]);
                          return (
                            <div
                              key={field.key}
                              className={`p-4 rounded-lg border flex items-center justify-between ${
                                hasFieldData
                                  ? "bg-green-50 border-green-200"
                                  : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    hasFieldData
                                      ? "bg-green-100"
                                      : "bg-gray-100"
                                  }`}
                                >
                                  {hasFieldData ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <X className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-800">
                                    {field.label}
                                  </span>
                                  <p className="text-sm text-gray-500">
                                    {hasFieldData
                                      ? "Content available"
                                      : "No content"}
                                  </p>
                                </div>
                              </div>
                              {hasFieldData && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                                  ✓ Filled
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {textData.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {textData.length}
                </div>
                <div className="text-sm text-gray-600">Total Text Entries</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {textData.reduce((total, item) => {
                    const fields = getFieldGroups().flatMap((g) =>
                      g.fields.map((f) => f.key)
                    );
                    return (
                      total + fields.filter((f) => hasData(item[f])).length
                    );
                  }, 0)}
                </div>
                <div className="text-sm text-gray-600">Filled Fields</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {getFieldGroups().flatMap((g) => g.fields).length *
                    textData.length}
                </div>
                <div className="text-sm text-gray-600">Total Fields</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
