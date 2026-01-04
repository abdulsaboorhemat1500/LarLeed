"use client";
export const runtime = "edge";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useTranslations } from "@/hooks/useTranslations";
import AddCourseModal from "./components/addCourse";
import UpdateCourseModal from "./components/updateCourse";

export default function CoursesListPage() {
  const { get, delete: deleteApi } = useApi();
  const { t } = useTranslations();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

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

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const result = await get("/api/course");

      if (result.success) {
        setCourses(result.data || []);
      } else {
        setError(result.error || "Failed to fetch courses");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const result = await deleteApi(`/api/course/${courseId}`);

      if (result.success) {
        setCourses((prev) => prev.filter((course) => course.id !== courseId));
      } else {
        alert(result.error || "Failed to delete course");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowUpdateModal(true);
  };

  const handleCourseAdded = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleCourseUpdated = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  // Filter courses based on search and filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.overview_en.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      !filterCategory || course.category_en === filterCategory;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Courses Management
          </h1>
          <p className="text-gray-600">
            Manage all courses and educational content
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Course
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                {/* Course Image */}
                <div className="h-48 bg-gray-200 relative">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.name_en}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {course.fee}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    👁️ {course.views || 0}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.name_en}
                    </h3>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {course.category_en}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.overview_en}
                  </p>

                  {course.link && (
                    <div className="mb-3">
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Course Link
                      </a>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(course)}
                      className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-4">
              {courses.length === 0
                ? "Get started by adding your first course."
                : "No courses match your search criteria."}
            </p>
            {courses.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First Course
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddCourseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCourseAdded={handleCourseAdded}
      />

      <UpdateCourseModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        course={selectedCourse}
        onCourseUpdated={handleCourseUpdated}
      />
    </div>
  );
}
