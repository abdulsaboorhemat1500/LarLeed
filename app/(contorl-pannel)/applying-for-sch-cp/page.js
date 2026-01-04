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
  const [statusFilter, setStatusFilter] = useState("unreviewed"); // Default to unreviewed
  const [levelFilter, setLevelFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

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
  const handleMarkAsReviewed = async (applicationId) => {
    try {
      setUpdatingId(applicationId);

      const application = applications.find((app) => app.id === applicationId);
      if (!application) return;

      const formData = new FormData();

      Object.keys(application).forEach((key) => {
        if (
          key !== "id" &&
          key !== "created_at" &&
          key !== "updated_at" &&
          application[key] !== null &&
          application[key] !== undefined
        ) {
          formData.append(key, application[key]);
        }
      });

      formData.append("form_status", "reviewed");

      const result = await put(
        `/api/applyingScholarships/${applicationId}`,
        formData
      );

      if (result.success) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, form_status: "reviewed" } : app
          )
        );
        console.log("Application marked as reviewed");
      } else {
        throw new Error(result.error || "Failed to update application");
      }
    } catch (error) {
      console.error("Error marking as reviewed:", error);
      alert("Failed to mark as reviewed. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);

      const result = await put(
        `/api/applyingScholarships/${applicationId}`,
        { form_status: newStatus },
        true // Set to true to send as JSON
      );

      if (result.success) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, form_status: newStatus } : app
          )
        );
        console.log(`Application marked as ${newStatus}`);
      } else {
        throw new Error(result.error || "Failed to update application");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert(`Failed to mark as ${newStatus}. Please try again.`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Also update the handleMarkAsReviewed function similarly:
  // const handleMarkAsReviewed = async (applicationId) => {
  //   try {
  //     setUpdatingId(applicationId);

  //     // Create simple form data with ONLY the form_status
  //     const formData = new FormData();
  //     formData.append("form_status", "reviewed");

  //     const result = await put(
  //       `/api/applyingScholarships/${applicationId}`,
  //       formData
  //     );

  //     if (result.success) {
  //       setApplications((prevApplications) =>
  //         prevApplications.map((app) =>
  //           app.id === applicationId ? { ...app, form_status: "reviewed" } : app
  //         )
  //       );
  //       console.log("Application marked as reviewed");
  //     } else {
  //       throw new Error(result.error || "Failed to update application");
  //     }
  //   } catch (error) {
  //     console.error("Error marking as reviewed:", error);
  //     alert("Failed to mark as reviewed. Please try again.");
  //   } finally {
  //     setUpdatingId(null);
  //   }
  // };

  // Get unique values for filters
  const uniqueLevels = useMemo(() => {
    const levels = applications.map((app) => app.sch_level).filter(Boolean);
    return [...new Set(levels)];
  }, [applications]);

  const uniqueCountries = useMemo(() => {
    const countries = applications
      .map((app) => app.sch_country)
      .filter(Boolean);
    return [...new Set(countries)];
  }, [applications]);

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
          // Show applications that are not reviewed (form_status is false, null, empty, or 'pending')
          const isUnreviewed =
            !application.form_status ||
            application.form_status === "" ||
            application.form_status === "false" ||
            application.form_status.toLowerCase() === "pending" ||
            application.form_status === false;
          if (!isUnreviewed) return false;
        } else {
          // For other status filters, match exactly
          const appStatus = (application.form_status || "")
            .toString()
            .toLowerCase();
          const filterStatus = statusFilter.toLowerCase();
          if (appStatus !== filterStatus) return false;
        }
      }

      // Level filter
      if (levelFilter && application.sch_level !== levelFilter) {
        return false;
      }

      // Country filter
      if (countryFilter && application.sch_country !== countryFilter) {
        return false;
      }

      return true;
    });
  }, [applications, searchTerm, statusFilter, levelFilter, countryFilter]);

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
    setLevelFilter("");
    setCountryFilter("");
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

    switch (status.toString().toLowerCase()) {
      case "reviewed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Reviewed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Accepted
          </span>
        );
      case "unknown":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Quick status update buttons
  const StatusUpdateButtons = ({ application }) => {
    const isUnreviewed =
      !application.form_status ||
      application.form_status === "" ||
      application.form_status === "false" ||
      application.form_status === false ||
      application.form_status.toLowerCase() === "pending";

    if (!isUnreviewed) {
      return (
        <div className="text-xs text-gray-500 italic">
          Status: {application.form_status}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        <button
          onClick={() => handleStatusUpdate(application.id, "accepted")}
          disabled={updatingId === application.id}
          className="px-2 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded transition-colors duration-200 cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={() => handleStatusUpdate(application.id, "rejected")}
          disabled={updatingId === application.id}
          className="px-2 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors duration-200 cursor-pointer"
        >
          Reject
        </button>
        <button
          onClick={() => handleStatusUpdate(application.id, "reviewed")}
          disabled={updatingId === application.id}
          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded transition-colors duration-200 cursor-pointer"
        >
          Mark Reviewed
        </button>
        <button
          onClick={() => handleStatusUpdate(application.id, "unknown")}
          disabled={updatingId === application.id}
          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors duration-200 cursor-pointer"
        >
          Unknown
        </button>
      </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="unknown">Unknown</option>
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

              {/* Results Summary */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">
                  {filteredApplications.length}
                </span>{" "}
                applications found
                {statusFilter !== "all" && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    Filtered by: {statusFilter}
                  </span>
                )}
                {levelFilter && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Level: {levelFilter}
                  </span>
                )}
                {countryFilter && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    Country: {countryFilter}
                  </span>
                )}
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
                        LEVEL & COUNTRY
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
                          <div className="text-xs text-gray-400 mt-1">
                            GPA: {application.gpa || "N/A"}
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
                            Deadline: {formatDate(application.sch_deadline)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {application.sch_level || "N/A"}
                            </span>
                            {application.sch_country && (
                              <span className="text-xs text-gray-600">
                                {application.sch_country}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(
                            application.created_at || application.submitted_at
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-3">
                            <Link
                              href={`/applying-for-sch-cp/details-cp/${application.id}`}
                            >
                              <button
                                onClick={() =>
                                  handleViewDetails(application.id)
                                }
                                className="w-full px-3 py-2 text-sm text-blue-600 hover:text-blue-900 border border-blue-600 hover:bg-blue-50 rounded transition-colors duration-200 cursor-pointer text-center"
                              >
                                View Full Details
                              </button>
                            </Link>

                            <StatusUpdateButtons application={application} />

                            <div className="text-xs text-gray-400 text-center">
                              ID: {application.id}
                            </div>
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
