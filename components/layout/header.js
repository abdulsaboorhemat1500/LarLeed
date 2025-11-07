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
import { useTranslations } from '../../hooks/useTranslations';

  
import { useState } from 'react';
import {X, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useParams } from 'next/navigation';

export default function HeaderSection(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { setTheme } = useTheme();
    const { t } = useTranslations();
    const { locale } = useParams();
    
    // Check if current locale is Pashto or Dari
    const isRtlLanguage = locale === 'ps' || locale === 'fa'; // Assuming 'ps' for Pashto and 'fa' for Dari
    
    // Text size classes based on language
    const textSizeClass = isRtlLanguage ? 'text-lg' : 'text-md';
    const mobileTextSizeClass = isRtlLanguage ? 'text-lg' : 'text-base';

    return (
        <header className="bg-gradient-to-r from-blue-50 to-indigo-50  sticky top-0 z-50 shadow-sm border-b">
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
                    <Link href={`/${locale}/certifications`} className={`${textSizeClass} font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                        {t('Header.certifications')}
                    </Link>
                    <Link href={`/${locale}/school`} className={`${textSizeClass} font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                        {t('Header.school')}
                    </Link>
                    
                    <Link href={`/${locale}/scholarships-programs`} className={`${textSizeClass} text-center font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                       {t('Header.scholarshipsPrograms')}
                    </Link>
                    <Link href={`/${locale}/mentorships`} className={`${textSizeClass} font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                        {t('Header.mentorships')}
                    </Link>
                    <Link href={`/${locale}/roshangari`} className={`${textSizeClass} font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                        {t('Header.roshangari')}
                    </Link>
                    <Link href={`/${locale}/donate`} className={`${textSizeClass} font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                        {t('Header.donate')}
                    </Link>
                    <Link href={`/${locale}/#contact-section`} className={`${textSizeClass} font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                        {t('Header.contactUs')}
                    </Link>
                    <Link href={`/${locale}/about`} className={`${textSizeClass} font-bold text-gray-900 hover:text-blue-600 transition-all duration-200 transform hover:scale-105`}>
                        {t('Header.aboutUs')}
                    </Link>
                </div>
                <div className=" lg:flex lg:flex-1 lg:justify-end lg:gap-4 md:gap-2 sm:gap-4">
                    <SimpleLanguageDropdown />
                    {/* Remove dark mode toggle if no longer needed */}
                    {/* <DropdownMenu>
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
                    </DropdownMenu> */}

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
                                    <Link href={`/${locale}/certifications`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.certifications')}
                                    </Link>
                                    <Link href={`/${locale}/school`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.school')}
                                    </Link>
                                    <Link href={`/${locale}/scholarships-programs`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.scholarshipsPrograms')}
                                    </Link>
                                    <Link href={`/${locale}/mentorships`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.mentorships')}
                                    </Link>
                                    <Link href={`/${locale}/roshangari`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.roshangari')}
                                    </Link>
                                    <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.contactUs')}
                                    </Link>
                                    <Link href={`/${locale}/about`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.aboutUs')}
                                    </Link>
                                    <Link href={`/${locale}/donate`} onClick={() => setMobileMenuOpen(false)} className={`-mx-3 block rounded-lg px-3 py-2 ${mobileTextSizeClass} font-bold text-gray-900 hover:bg-gray-50`}>
                                        {t('Header.donate')}
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