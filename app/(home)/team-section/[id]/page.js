
import GetInTouchSection from '@/components/get-in-touch';
import BackButton from '@/components/ui/back-button';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TeamMemberDetails({ params }) {
  const { id } = params;

  return(

    <>
        <section className=" bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
            <BackButton />
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
                    <div className="lg:col-span-2 mx-auto text-center">
                        <div className="mb-5 mx-auto w-45 h-45 text-center">
                            <div className="cursor-pointer hover:shadow-xl w-full h-full rounded-full transform hover:scale-105 transition-transform duration-300  flex items-center justify-center overflow-hidden shadow-md">
                                <Image
                                    src="/team-members/saboor.png"
                                    alt="saboor hemat"
                                    width={180}
                                    height={180}
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 mt-2">
                                    saboor hemat
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    Web Developer
                                </p>
                            </div>
                        </div>
                            <div className="mt-20">
                                <p className="text-lg text-gray-500 dark:text-white font-medium">
                                    Hello guys my name is abdul saboor hemat, I am a web Developer working with next.js and Laravel.
                                    
                                    Hello guys my name is abdul saboor hemat, I am a web Developer working with next.js and Laravel.
                                </p>
                            </div>
                            {/* Social Media Links */}
                            <div className="flex space-x-4 text-white mx-auto justify-center mt-7">
                                <a 
                                    href="#" 
                                    className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="p-2 bg-gray-800 hover:bg-blue-400 rounded-lg transition-colors duration-200"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="p-2 bg-gray-800 hover:bg-pink-600 rounded-lg transition-colors duration-200"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors duration-200"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="p-2 bg-gray-800 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Member Details
                            </h2>
                            {/* Details List */}
                            <div className="space-y-4 justify-center">
                                <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-400">📅</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                                    <p className="font-medium text-gray-900 dark:text-white">2025</p>
                                </div>
                                </div>
            
                                <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600 dark:text-green-400">📍</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                    <p className="font-medium text-gray-900 dark:text-white">Kabul Afghanistan</p>
                                </div>
                                </div>
            
                                <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600 dark:text-purple-400">🌍</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                                    <p className="font-medium text-gray-900 dark:text-white">Afghanistan</p>
                                </div>
                                </div>
            
                                <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                    <span className="text-red-600 dark:text-red-400">✉️</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <a 
                                    href={`mailto:saboorhemat46`}
                                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                    saboorhemat@gmail.com
                                    </a>
                                </div>
                                </div>
            
                                <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                    <span className="text-orange-600 dark:text-orange-400">📞</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                    <a 
                                    href={`tel:080090909`}
                                    className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                    9898989898
                                    </a>
                                </div>
                                </div>
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                        Contact Saboor
                                    </button>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        </section>
    
      <GetInTouchSection />
    </>
  );

}