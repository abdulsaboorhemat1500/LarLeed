"use client";

import { Plus, FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useApi } from "@/app/hooks/useApi";

export default function DashboardSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    reviewed: 0,
    unreviewed: 0,
    pending: 0,
  });

  const { get } = useApi();

  // Fetch application statistics
  const fetchApplicationStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await get("/api/applyingScholarships");

      if (result.success) {
        const applications = result.data || [];

        // Calculate statistics
        const total = applications.length;
        const reviewed = applications.filter(
          (app) =>
            app.form_status &&
            app.form_status.toString().toLowerCase() === "reviewed"
        ).length;

        const pending = applications.filter(
          (app) =>
            app.form_status &&
            app.form_status.toString().toLowerCase() === "pending"
        ).length;

        const unreviewed = applications.filter(
          (app) =>
            !app.form_status ||
            app.form_status === "" ||
            app.form_status === "false" ||
            app.form_status === false ||
            (app.form_status &&
              app.form_status.toString().toLowerCase() !== "reviewed" &&
              app.form_status.toString().toLowerCase() !== "pending")
        ).length;

        setStats({
          total,
          reviewed,
          unreviewed,
          pending,
        });
      } else {
        setError(result.error || "Failed to fetch applications");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching application stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Application Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Applications Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Applications
              </p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
              ) : (
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.total}
                </p>
              )}
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/applying-for-sch-cp"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
            >
              View all applications
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Reviewed Applications Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Reviewed
              </p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
              ) : (
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {stats.reviewed}
                </p>
              )}
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/applying-for-sch-cp?status=reviewed"
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium flex items-center gap-1"
            >
              View reviewed
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Unreviewed Applications Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Unreviewed
              </p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
              ) : (
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                  {stats.unreviewed}
                </p>
              )}
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/applying-for-sch-cp?status=unreviewed"
              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 text-sm font-medium flex items-center gap-1"
            >
              Review now
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Pending Applications Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Pending
              </p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
              ) : (
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                  {stats.pending}
                </p>
              )}
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/applying-for-sch-cp?status=pending"
              className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 text-sm font-medium flex items-center gap-1"
            >
              View pending
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                Error loading statistics
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                <p>{error}</p>
              </div>
              <div className="mt-3">
                <button
                  onClick={fetchApplicationStats}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-red-300 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Add Scholarship",
            href: "/scholarships-programs-cp/add-scholarships-program-cp",
            icon: Plus,
            color: "blue",
          },
          {
            label: "Create Post/Roshangari",
            href: "/posts-cp/add-post-cp",
            icon: Plus,
            color: "blue",
          },
          {
            label: "Add Mentor/Team Member",
            href: "/mentors-tmembers-cp/add-mentor-tmember-cp",
            icon: Plus,
            color: "blue",
          },
        ].map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2 text-center"
          >
            <action.icon className="h-5 w-5" />
            <span className="font-medium">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Applications Summary
        </h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Total Applications
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                {stats.total}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Reviewed Applications
                </span>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400">
                {stats.reviewed}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Unreviewed Applications
                </span>
              </div>
              <span className="font-bold text-yellow-600 dark:text-yellow-400">
                {stats.unreviewed}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Pending Applications
                </span>
              </div>
              <span className="font-bold text-orange-600 dark:text-orange-400">
                {stats.pending}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Review Progress</h3>
          {loading ? (
            <div className="h-4 bg-blue-400 rounded animate-pulse mb-2"></div>
          ) : stats.total > 0 ? (
            <>
              <div className="h-2 bg-blue-400 rounded-full mb-2">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${(stats.reviewed / stats.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm opacity-90">
                {stats.reviewed} of {stats.total} applications reviewed (
                {stats.total > 0
                  ? Math.round((stats.reviewed / stats.total) * 100)
                  : 0}
                %)
              </p>
            </>
          ) : (
            <p className="text-sm opacity-90">No applications to review yet</p>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/applying-for-sch-cp"
              className="flex items-center justify-between bg-purple-400/30 hover:bg-purple-400/40 p-3 rounded-lg transition-colors duration-200"
            >
              <span>Manage Applications</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/applying-for-sch-cp?status=unreviewed"
              className="flex items-center justify-between bg-purple-400/30 hover:bg-purple-400/40 p-3 rounded-lg transition-colors duration-200"
            >
              <span>Review Unreviewed</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
