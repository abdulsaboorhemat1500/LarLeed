'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Show 2 items per page for demonstration
  const dropdownRef = useRef(null);

  const scholarships = [
    {
      id: 1,
      name: "Name of the scholarship tell here",
      deadline: "34/34/2034",
      university: "Name of the university",
      country: "Country",
      description: "Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here…….",
      duration: "4 years",
      gender: "male/female",
      funding: "fully funded",
      language: "English",
      image: "/hero-section-image.jpg"
    },
    {
      id: 2,
      name: "DaaD scholarships",
      deadline: "34/34/2034",
      university: "Name of the university",
      country: "Country",
      description: "Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here…….",
      duration: "4 years",
      gender: "male/female",
      funding: "fully funded",
      language: "English",
      image: "/team-members/saboor.png"
    },
    {
      id: 3,
      name: "Turkey scholarships",
      deadline: "34/34/2034",
      university: "Name of the university",
      country: "Country",
      description: "Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here…….",
      duration: "4 years",
      gender: "male/female",
      funding: "fully funded",
      language: "English",
      image: "/team-members/saboor.png"
    },
    {
      id: 4,
      name: "DaaD scholarships",
      deadline: "34/34/2034",
      university: "Name of the university",
      country: "Country",
      description: "Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here…….",
      duration: "4 years",
      gender: "male/female",
      funding: "fully funded",
      language: "English",
      image: "/team-members/saboor.png"
    },
    {
      id: 5,
      name: "China scholarships",
      deadline: "34/34/2034",
      university: "Name of the university",
      country: "Country",
      description: "Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here…….",
      duration: "4 years",
      gender: "male/female",
      funding: "fully funded",
      language: "English",
      image: "/team-members/saboor.png"
    },
    {
      id: 6,
      name: "DaaD scholarships",
      deadline: "34/34/2034",
      university: "Name of the university",
      country: "Country",
      description: "Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here Detailed information here…….",
      duration: "4 years",
      gender: "male/female",
      funding: "fully funded",
      language: "English",
      image: "/team-members/saboor.png"
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter scholarships based on search
  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentScholarships = filteredScholarships.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleAction = (action, scholarshipId) => {
    setOpenDropdown(null);
    console.log(`${action} scholarship ${scholarshipId}`);
    // Add your update/delete logic here
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Add Scholarship Section */}
        <div className="flex justify-end items-center pb-6 mb-8 border-b border-gray-200">
          <Link href="/scholarships-programs-cp/add-scholarships-program-cp">
            <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Scholarship
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search scholarships..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>
        </div>

        {/* Scholarships List */}
        <div className="space-y-6 mb-6">
          {currentScholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/3 p-4">
                  <div className="w-full h-70 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={scholarship.image} 
                      alt={scholarship.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center text-gray-500">
                      <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">No Image</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {scholarship.name}
                      </h2>
                      <p className="text-red-600 font-medium">
                        Deadline: {scholarship.deadline}
                      </p>
                    </div>
                    
                    {/* Three dots dropdown with ref */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => handleDropdownToggle(scholarship.id)}
                        className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdown === scholarship.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button
                            onClick={() => handleAction('update', scholarship.id)}
                            className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleAction('delete', scholarship.id)}
                            className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* University and Country */}
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {scholarship.university} - {scholarship.country}
                    </p>
                  </div>

                  {/* Description - Limited to 4 lines */}
                  <div className="mb-6">
                    <p className="text-gray-600 leading-relaxed line-clamp-4">
                      {scholarship.description}
                    </p>
                  </div>

                  {/* Scholarship Details */}
                  <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      Duration: {scholarship.duration}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      Gender: {scholarship.gender}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      Funding: {scholarship.funding}
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                      Language: {scholarship.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredScholarships.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              {/* Page Info */}
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredScholarships.length)}
                </span> of{' '}
                <span className="font-medium">{filteredScholarships.length}</span> results
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
                  } transition-colors duration-200`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`px-3 py-1 rounded border ${
                        currentPage === number
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      } transition-colors duration-200 cursor-pointer`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
                  } transition-colors duration-200`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No results message */}
        {filteredScholarships.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No scholarships found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any scholarships matching "<span className="text-gray-700 font-medium">"{searchTerm}"</span>"
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}