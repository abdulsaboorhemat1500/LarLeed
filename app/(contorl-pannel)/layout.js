'use client';

import * as React from "react"
import "../globals.css";

import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import Link from 'next/link';

export default function ContorlPannelLayout({ children }) { // Add children prop here
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-900">
                    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <Link href="/dashboard" className="-m-1.5 p-1.5 flex lg:gap-x-1">
                                <p className="text-3xl font-bold">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">LarLeed</span>
                                </p>
                            </Link>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden">
                            <button 
                                type="button" 
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Menu className="size-6" />
                            </button>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:gap-x-8">
                            <Link href="/scholarships-programs-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                            Scholarships
                            </Link>
                            <Link href="/applying-for-sch-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                Applying for Scholarships
                            </Link>
                            <Link href="/mentors-tmembers-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                Mentors/Team Member
                            </Link>
                            <Link href="/posts-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                Posts/Roshangari
                            </Link>
                            <Link href="/contact-us-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                Contact Us
                            </Link>
                            <Link href="/get-in-touch-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                Get In Touch
                            </Link>
                           
                        </div>
                        
                    </nav>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden">
                            <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
                                        <p className="text-2xl font-bold">LarLeed</p>
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
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            <Link href="/scholarships-programs" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 ">
                                                Scholarships
                                            </Link>
                                            <Link href="/applying-for-sch-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                                Applying for Scholarships
                                            </Link>
                                            <Link href="/mentors-tmembers-cp" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 ">
                                                Mentors/Team Member
                                            </Link>
                                            <Link href="/posts-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                                Posts/Roshangari
                                            </Link>
                                            <Link href="/contact-us-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                                Contact Us
                                            </Link>
                                            <Link href="/get-in-touch-cp" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                                                Get In Touch
                                            </Link>
                                           
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