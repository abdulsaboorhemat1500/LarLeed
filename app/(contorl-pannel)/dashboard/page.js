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
          </div>
        )}
      </div>
    </div>
  );
}
