'use client';

import * as React from "react"
import "../globals.css";

import { useState, useEffect } from 'react';
import { X, Menu, LogOut, User, ChevronDown, Settings, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users } from "lucide-react";

export default function ContorlPannelLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // New state for more dropdown
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
            if (isMoreDropdownOpen && !event.target.closest('.more-dropdown')) {
                setIsMoreDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, isMoreDropdownOpen]);

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
        // Clear all session data
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('rememberMe');
            sessionStorage.removeItem('user');
            
            // Clear the auth cookie
            document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        
        // Clear user state and close dropdown
        setUser(null);
        setIsDropdownOpen(false);
        
        // Redirect to login page
        router.push('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMoreDropdown = () => {
        setIsMoreDropdownOpen(!isMoreDropdownOpen);
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

    // Don't render layout if no user
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-900">
                <nav aria-label="Global" className="mx-auto flex container items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/dashboard" className="-m-1.5 p-1.5 flex lg:gap-x-1">
                            <p className="text-3xl font-bold">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">LarLeed</span>
                            </p>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:gap-x-8 items-center">
                        <Link href="/scholarships-programs-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105">
                            Scholarships
                        </Link>
                        <Link href="/applying-for-sch-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105">
                            Applying for Scholarships
                        </Link>
                        <Link href="/mentors-tmembers-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105">
                            Mentors/Team Member
                        </Link>
                        <Link href="/posts-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105">
                            Posts/Roshangari
                        </Link>
                        <Link href="/featured-videos-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105">
                            Featured Videos
                        </Link>
                        
                        {/* More Options Dropdown */}
                        <div className="relative more-dropdown">
                            <button
                                onClick={toggleMoreDropdown}
                                className="cursor-pointer flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <MoreVertical className="size-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            {/* More Dropdown Menu */}
                            {isMoreDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <div className="p-2">
                                        <Link 
                                            href="/get-in-touch-cp" 
                                            className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                                            onClick={() => setIsMoreDropdownOpen(false)}
                                        >
                                            Get In Touch
                                        </Link>
                                        <Link 
                                            href="/contact-us-cp" 
                                            className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                                            onClick={() => setIsMoreDropdownOpen(false)}
                                        >
                                            Contact Us
                                        </Link>
                                        <Link 
                                            href="/hero-section-text" 
                                            className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                                            onClick={() => setIsMoreDropdownOpen(false)}
                                        >
                                            Hero Section Text
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Dropdown - Desktop */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div className="relative user-dropdown">
                            <button
                                onClick={toggleDropdown}
                                className="cursor-pointer flex items-center gap-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <User className="size-4 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.fullName.split(' ')[0]} {/* First name only */}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {user.role}
                                        </p>
                                    </div>
                                </div>
                                <ChevronDown 
                                    className={`size-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                                        isDropdownOpen ? 'rotate-180' : ''
                                    }`} 
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="p-2">
                                        {/* User Info */}
                                        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
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
                                                className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <Users className="size-4" />
                                                Users Management
                                            </Link>
                                        )}

                                        {/* Logout Button */}
                                        <button
                                            onClick={handleLogout}
                                            className="cursor-pointer flex items-center gap-x-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 mt-1"
                                        >
                                            <LogOut className="size-4" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button 
                            type="button" 
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Menu className="size-6" />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">LarLeed</p>
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
                                        <Link href="/scholarships-programs-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Scholarships
                                        </Link>
                                        <Link href="/applying-for-sch-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Applying for Scholarships
                                        </Link>
                                        <Link href="/mentors-tmembers-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Mentors/Team Member
                                        </Link>
                                        <Link href="/posts-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Posts/Roshangari
                                        </Link>
                                        <Link href="/featured-videos-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Featured Videos
                                        </Link>
                                        
                                        {/* Additional links in mobile menu (no dropdown) */}
                                        <Link href="/get-in-touch-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Get In Touch
                                        </Link>
                                        <Link href="/contact-us-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Contact Us
                                        </Link>
                                        <Link href="/hero-section-text" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Hero Section Text
                                        </Link>

                                        {/* Mobile User Links - Only show Users Management for admin */}
                                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                            {user.role === 'admin' && (
                                                <Link href="/user-list" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    Users Management
                                                </Link>
                                            )}
                                            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                                                My Profile
                                            </Link>
                                            <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
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
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}