'use client';

import * as React from "react"
import "../globals.css";

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ControlPanelLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const checkAuth = () => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('rememberMe');
            sessionStorage.removeItem('user');
            document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        
        setUser(null);
        setIsDropdownOpen(false);
        router.push('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
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

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-40 h-screen w-70 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700
                transform transition-transform duration-300 ease-in-out
               
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-center p-2 border-b border-gray-200 dark:border-gray-700">
                        <Link href="/dashboard" className="flex items-center">
                            <img 
                                src="/logo.png"
                                alt="LarLeed Logo"
                                className="h-16 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        {/* Main Navigation Items */}
                        <Link 
                            href="/dashboard"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <Home className="size-5" />
                            <span className="font-medium">Dashboard</span>
                        </Link>

                        <Link 
                            href="/scholarships-programs-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <Award className="size-5" />
                            <span className="font-medium">Scholarships</span>
                        </Link>
                        <Link 
                            href="/scholarship-stu-video-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <TeamIcon className="size-5" />
                            <span className="font-medium">Student Stories</span>
                        </Link>
                        <Link 
                            href="/scholarship-resources-templates-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <BookAIcon className="size-5" />
                            <span className="font-medium">Resources Templates</span>
                        </Link>

                        <Link 
                            href="/applying-for-sch-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <FileText className="size-5" />
                            <span className="font-medium">Scholarships Forms</span>
                        </Link>

                        <Link 
                            href="/mentors-tmembers-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <TeamIcon className="size-5" />
                            <span className="font-medium">Mentors/Team Member</span>
                        </Link>

                        <Link 
                            href="/posts-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <MessageSquare className="size-5" />
                            <span className="font-medium">Posts/Roshangari</span>
                        </Link>
                        <Link 
                            href="/featured-videos-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <PlaySquare className="size-5" />
                            <span className="font-medium">Featured Videos</span>
                        </Link>
                        <Link 
                            href="/school-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <School className="size-5" />
                            <span className="font-medium">School Content</span>
                        </Link>
                        <Link 
                            href="/certifications-cp"
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <Paperclip className="size-5" />
                            <span className="font-medium">Free Courses</span>
                        </Link>
                        <Link 
                            href="/get-in-touch-cp" 
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            
                        >
                            <Mail className="size-5" />
                            <span className="font-medium">Get In Touch</span>
                        </Link>
                        <Link 
                            href="/contact-us-cp" 
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"  
                        >
                            <Contact className="size-5" />
                            <span className="font-medium">Contact Us</span>
                        </Link>
                        <Link 
                            href="/hero-section-text" 
                            className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            <Type className="size-5" />
                            <span className="font-medium">About Us</span>
                        </Link>
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="relative user-dropdown">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-x-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="size-4 text-white" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {user.fullName.split(' ')[0]}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user.role}
                                    </p>
                                </div>
                                <ChevronDown 
                                    className={`size-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                                        isDropdownOpen ? 'rotate-180' : ''
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
                                        {user.role === 'admin' && (
                                            <Link 
                                                href="/user-list" 
                                                className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <Users className="size-4" />
                                                Users Management
                                            </Link>
                                        )}

                                        {/* Settings */}
                                        <Link 
                                            href="#" 
                                            className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
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

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 sticky top-0 h-20 z-30 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center p-4 mt-2 lg:px-8">
                        {/* Logo and Title */}
                        <div className="flex items-center gap-x-4">
                            <div className="flex items-center gap-x-3">
                                <Link href="/" className="lg:hidden">
                                    <img 
                                        src="/logo.png"
                                        alt="LarLeed Logo"
                                        className="h-8 w-auto"
                                    />
                                </Link>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Connecting Afghan Youth through Education, Dialogue, and Vision
                                </h1>
                            </div>
                        </div>

                        {/* Mobile Menu Button (for mobile menu that's already in your code) */}
                        <div className="flex lg:hidden">
                            <button 
                                type="button" 
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open mobile menu</span>
                                <Menu className="size-6" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </div>

            {/* Mobile Menu (existing code - keep as backup) */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
                                <img 
                                    src="/logo.png"
                                    alt="LarLeed Logo"
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <button 
                                type="button" 
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="size-6" />
                            </button>
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
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Dashboard
                                    </Link>
                                    <Link href="/scholarships-programs-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Scholarships
                                    </Link>
                                    <Link href="/scholarships-stu-video-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Students Stories
                                    </Link>
                                    <Link href="/scholarship-resources-templates-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Resources Templates
                                    </Link>
                                    <Link href="/applying-for-sch-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Applying for Scholarships
                                    </Link>
                                    <Link href="/mentors-tmembers-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Mentors/Team Member
                                    </Link>
                                    <Link href="/posts-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Posts/Roshangari
                                    </Link>
                                    <Link href="/featured-videos-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Featured Videos
                                    </Link>
                                    <Link href="/school-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        School Content
                                    </Link>
                                    <Link href="/certifications-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Free Courses
                                    </Link>
                                    <Link href="/get-in-touch-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Get In Touch
                                    </Link>
                                    <Link href="/contact-us-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        Contact Us
                                    </Link>
                                    <Link href="/hero-section-text" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                        About Us
                                    </Link>

                                    {/* Mobile User Links */}
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        {user.role === 'admin' && (
                                            <Link href="/user-list" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                                Users Management
                                            </Link>
                                        )}
                                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                                            My Profile
                                        </Link>
                                        <Link href="#" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
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
                                        className="flex items-center gap-x-2 w-full text-left -mx-3 rounded-lg px-3 py-2 text-base font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                                    >
                                        <LogOut className="size-4" />
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