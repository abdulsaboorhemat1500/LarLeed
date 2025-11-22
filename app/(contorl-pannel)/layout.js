"use client";

import * as React from "react";
import "../globals.css";

import { useState, useEffect } from "react";
import {
  X,
  Menu,
  LogOut,
  User,
  ChevronDown,
  Settings,
  Users,
  Award,
  FileText,
  Users as TeamIcon,
  MessageSquare,
  PlaySquare,
  Mail,
  Contact,
  Type,
  Home,
  School,
  Paperclip,
  BookAIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ControlPanelLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
        setMobileMenuOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("user");
      document.cookie =
        "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    setUser(null);
    setIsDropdownOpen(false);
    setMobileMenuOpen(false);
    setSidebarOpen(false);
    router.push("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Navigation items for reuse
  const navigationItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/scholarships-programs-cp", icon: Award, label: "Scholarships" },
    {
      href: "/scholarship-stu-video-cp",
      icon: TeamIcon,
      label: "Student Stories",
    },
    {
      href: "/scholarship-resources-templates-cp",
      icon: BookAIcon,
      label: "Resources Templates",
    },
    {
      href: "/applying-for-sch-cp",
      icon: FileText,
      label: "Scholarships Forms",
    },
    {
      href: "/mentors-tmembers-cp",
      icon: TeamIcon,
      label: "Mentors/Team Member",
    },
    { href: "/posts-cp", icon: MessageSquare, label: "Posts/Roshangari" },
    { href: "/featured-videos-cp", icon: PlaySquare, label: "Featured Videos" },
    { href: "/school-cp", icon: School, label: "School Content" },
    { href: "/certifications-cp", icon: Paperclip, label: "Free Courses" },
    { href: "/contact-us-cp", icon: Contact, label: "Contact Us" },
    { href: "/hero-section-text", icon: Type, label: "About Us" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Hidden on small screens */}
      <aside
        className={`
            fixed lg:sticky top-0 left-0 z-40 h-screen w-70 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700
            transform transition-transform duration-300 ease-in-out
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="flex items-center">
              <img src="/logo.png" alt="LarLeed Logo" className="h-12 w-auto" />
            </Link>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer mb-2"
                onClick={closeSidebar}
              >
                <item.icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative user-dropdown">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-x-3 w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="size-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.fullName.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.role}
                  </p>
                </div>
                <ChevronDown
                  className={`size-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-2">
                    {/* User Info */}
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Only show Users Management for admin role */}
                    {user.role === "admin" && (
                      <Link
                        href="/user-list"
                        className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Users className="size-4" />
                        Users Management
                      </Link>
                    )}

                    {/* Settings */}
                    <Link
                      href="#"
                      className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="size-4" />
                      Settings
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-x-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 mt-1"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 sticky top-0 h-16 z-20 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-4 lg:px-8">
            {/* Left side - Menu button and Logo for mobile */}
            <div className="flex items-center gap-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="size-6" />
              </button>

              {/* Logo for mobile */}
              <Link href="/" className="lg:hidden">
                <img
                  src="/logo.png"
                  alt="LarLeed Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Center - Title (hidden on small screens, shown on medium and up) */}
            <div className="hidden md:flex items-center flex-1 justify-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white text-center">
                Connecting Afghan Youth through Education, Dialogue, and Vision
              </h1>
            </div>

            {/* Right side - User info for desktop */}
            <div className="hidden lg:flex items-center gap-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="size-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>

      {/* Mobile Menu with all navigation items */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-1.5 p-1.5"
              >
                <img
                  src="/logo.png"
                  alt="LarLeed Logo"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="size-6" />
              </button>
            </div>

            {/* Title in mobile menu */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white text-center">
                Connecting Afghan Youth through Education, Dialogue, and Vision
              </h2>
            </div>

            {/* User Info - Mobile */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700">
                <div className="space-y-2 py-6">
                  {/* Mobile navigation links */}
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <item.icon className="size-5" />
                      {item.label}
                    </Link>
                  ))}

                  {/* Mobile User Links */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {user.role === "admin" && (
                      <Link
                        href="/user-list"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Users className="size-5" />
                        Users Management
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <User className="size-5" />
                      My Profile
                    </Link>
                    <Link
                      href="#"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Settings className="size-5" />
                      Settings
                    </Link>
                  </div>
                </div>

                {/* Logout Button - Mobile */}
                <div className="py-6">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-x-3 w-full text-left -mx-3 rounded-lg px-3 py-2 text-base font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <LogOut className="size-5" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
