'use client';

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SimpleLanguageDropdown from "../homePage/languageDropDown";

  
import { useState } from 'react';
import {X, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function HeaderSection(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { setTheme } = useTheme()

    return (
        <header className="bg-white  dark:bg-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-900">
            <nav aria-label="Global" className="mx-auto flex container items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex lg:gap-x-1">
                        <img 
                            src="/logo.png"
                            alt="logo image"
                            className="h-12"
                        />
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
                    <Link href="/scholarships-programs" className="text-md text-center font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                       Scholarships <br /> Programs
                    </Link>
                    <Link href="/mentorships" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                        Mentorship
                    </Link>
                    <Link href="/roshangari" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                        Roshangari
                    </Link>
                    <Link href="/donate" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                        Donate
                    </Link>
                    <Link href="/#contact-section" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                        Contact Us
                    </Link>
                    <Link href="/about" className="text-md font-semibold text-gray-900 hover:text-blue-600 dark:text-white transition-all duration-200 transform hover:scale-105 ">
                        About Us
                    </Link>
                </div>
                <div className=" lg:flex lg:flex-1 lg:justify-end lg:gap-4 md:gap-2 sm:gap-4">
                    <SimpleLanguageDropdown />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
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
                                        Scholarships <br /> Programs
                                    </Link>
                                    <Link href="/mentorships" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 ">
                                        Mentorship
                                    </Link>
                                    <Link href="/roshangari" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                        Roshangari
                                    </Link>
                                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                        Contact Us
                                    </Link>
                                    <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                        About Us
                                    </Link>
                                    <Link href="/donate" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                        Donate
                                    </Link>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}