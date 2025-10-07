import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> LarLeed</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting Afghan Youth through Education, Dialogue, and Vision
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
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

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Program 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Program 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Program 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Program 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Program 1
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Resources 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Resources 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Resources 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Resources 1
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Resources 1
                </Link>
              </li>
            </ul>
          </div>

         
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Form
                </Link>
              </li>
              <li>
                <a href="mailto:info@larleed.org" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <Mail className="w-4 h-4 mr-2" />
                  info@larleed.org
                </a>
              </li>
              <li className="text-gray-300">
                Kabul, Afghanistan
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} LarLeed. All rights reserved.
            </div>
            {/* <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-200">
                Sitemap
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}