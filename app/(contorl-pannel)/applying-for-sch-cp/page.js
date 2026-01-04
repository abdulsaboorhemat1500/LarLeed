"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useApi } from "@/app/hooks/useApi";

export default function ApplicationsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const { get, put } = useApi();

  // Filter states
  const [statusFilter, setStatusFilter] = useState("unreviewed");

  // Fetch applications from database
  const getApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultedData = await get("/api/applyingScholarships");

      if (resultedData.success) {
        setApplications(resultedData.data || []);
      } else {
        setError(resultedData.error || "Failed to fetch applications");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  // Handle mark as reviewed
  // Handle mark as reviewed - Use JSON instead
  const handleMarkAsReviewed = async (applicationId) => {
    try {
      setUpdatingId(applicationId);

      console.log("📤 Sending PUT request for ID:", applicationId);

      // Send as JSON
      const response = await fetch(
        `/api/applyingScholarships/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ form_status: "reviewed" }),
        }
      );

      console.log("📨 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ PUT Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("📨 PUT Response:", result);

      if (result.success) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, form_status: "reviewed" } : app
          )
        );
        console.log("✅ Application marked as reviewed");
      } else {
        console.error("❌ API returned error:", result);
        throw new Error(result.error || "Failed to update application");
      }
    } catch (error) {
      console.error("❌ Error in handleMarkAsReviewed:", error);
      alert(`Failed to mark as reviewed: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      // Search filter
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          application.full_name?.toLowerCase().includes(searchLower) ||
          application.sch_name?.toLowerCase().includes(searchLower) ||
          application.sch_country?.toLowerCase().includes(searchLower) ||
          application.uni_name?.toLowerCase().includes(searchLower) ||
          application.major?.toLowerCase().includes(searchLower) ||
          application.email?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "unreviewed") {
          // Show applications that are not reviewed
          const isUnreviewed =
            !application.form_status ||
            application.form_status === "" ||
            application.form_status === "false" ||
            application.form_status === false ||
            (application.form_status &&
              application.form_status.toLowerCase() === "pending");
          if (!isUnreviewed) return false;
        } else if (statusFilter === "reviewed") {
          // Show only reviewed applications
          const isReviewed =
            application.form_status &&
            application.form_status.toString().toLowerCase() === "reviewed";
          if (!isReviewed) return false;
        }
      }

      return true;
    });
  }, [applications, searchTerm, statusFilter]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("unreviewed");
    setCurrentPage(1);
  };

  const handleViewDetails = (applicationId) => {
    console.log("View details for application:", applicationId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    if (!status || status === "" || status === "false" || status === false) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Not Reviewed
        </span>
      );
    }

    const statusStr = status.toString().toLowerCase();

    if (statusStr === "reviewed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Reviewed
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {status}
      </span>
    );
  };

  // Quick status update button
  const StatusUpdateButton = ({ application }) => {
    const isUnreviewed =
      !application.form_status ||
      application.form_status === "" ||
      application.form_status === "false" ||
      application.form_status === false ||
      (application.form_status &&
        application.form_status.toLowerCase() === "pending");

    if (!isUnreviewed) {
      return (
        <div className="text-xs text-green-600 text-center italic">
          Already Reviewed
        </div>
      );
    }

    return (
      <button
        onClick={() => handleMarkAsReviewed(application.id)}
        disabled={updatingId === application.id}
        className={`   cursor-pointer text-center text-sm font-medium ${
          updatingId === application.id
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-blue-600 text-white "
        }`}
      >
        {updatingId === application.id ? "Marking..." : "Mark as Reviewed"}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Scholarship Applications Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and review scholarship applications from students
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Loading applications...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-4">Error: {error}</div>
            <button
              onClick={getApplications}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="unreviewed">Unreviewed (Default)</option>
                    <option value="all">All Statuses</option>
                    <option value="reviewed">Reviewed</option>
                  </select>
                </div>
              </div>

              {/* Reset Button */}
              <div className="mt-4">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 border border-gray-300 text-white rounded-lg bg-purple-500 hover:bg-purple-600 cursor-pointer transition-colors duration-200"
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        NAME
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        UNIVERSITY & MAJOR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        STATUS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SCHOLARSHIP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        APPLIED ON
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentApplications.map((application) => (
                      <tr
                        key={application.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {application.full_name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.email || "No email"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {application.uni_name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.major || "No major"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(application.form_status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {application.sch_name || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {application.sch_country || "No country"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(application.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 space-y-3">
                            <Link
                              href={`/applying-for-sch-cp/details-cp/${application.id}`}
                            >
                              <button
                                onClick={() =>
                                  handleViewDetails(application.id)
                                }
                                className="w-full px-3 py-2 text-sm text-blue-600 hover:text-blue-900 border border-blue-600 hover:bg-blue-50 rounded transition-colors duration-200 cursor-pointer text-center"
                              >
                                View Details
                              </button>
                            </Link>

                            <StatusUpdateButton application={application} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* No results message */}
              {filteredApplications.length === 0 && applications.length > 0 && (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No matching applications
                  </h3>
                  <p className="text-gray-500">
                    No applications match your current filters.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* No applications at all */}
            {applications.length === 0 && !loading && !error && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No applications yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    No students have applied for scholarships yet.
                  </p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredApplications.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  {/* Page Info */}
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredApplications.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredApplications.length}
                    </span>{" "}
                    results
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded border ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                      } transition-colors duration-200`}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                      {pageNumbers.map((number) => (
                        <button
                          key={number}
                          onClick={() => handlePageChange(number)}
                          className={`px-3 py-1 rounded border ${
                            currentPage === number
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          } transition-colors duration-200 cursor-pointer`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded border ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                      } transition-colors duration-200`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
