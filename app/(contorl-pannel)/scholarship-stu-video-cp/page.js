'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function ScholarshipStudentVideosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get, delete: del } = useApi();
  const dropdownButtonRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  // Fetch videos from database
  const getVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultedData = await get('/api/scholarship-stu-videos');
      if (resultedData.success) {
        setVideos(resultedData.data || []);
      } else {
        console.log('❌ API returned error:', resultedData.error);
      }
    } catch (error) {
      setError(error.message);
      console.log('🚨 Fetch error:', error);
    } finally {
      setLoading(false);
      console.log("🏁 Fetch completed");
    }
  };

  const handleDelete = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await del(`/api/scholarship-stu-videos/${videoId}`);

      if (result.success) {
        // Refresh the list
        getVideos();
        alert('Video deleted successfully!');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete video');
    }
  };

  useEffect(() => {
    getVideos();
    const handleClickOutside = (event) => {
      const isOutsideButton = dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target);
      const isOutsideMenu = dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target);
      
      if (isOutsideButton && isOutsideMenu) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter videos based on search
  const filteredVideos = videos.filter(video => {
    const matches = 
      video.rt_scholarship_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.video_link?.toLowerCase().includes(searchTerm.toLowerCase());
    return matches;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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
        {/* Add Video Section */}
        <div className="flex justify-end items-center pb-6 mb-8 border-b border-gray-200">
          <Link href="/scholarship-stu-video-cp/add">
            <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Student Video
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
              placeholder="Search videos..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading videos...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-4">
              Error: {error}
            </div>
            <button
              onClick={getVideos}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Video Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Video Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Video Link
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scholarship Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* Video Title */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={video.video_title}>
                        {video.video_title}
                      </div>
                    </td>
                    
                    {/* Video Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {video.video_image ? (
                          <img 
                            src={video.video_image} 
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`flex-col items-center justify-center text-gray-500 ${video.video_image ? 'hidden' : 'flex'}`}>
                          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">No Image</span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Video Link */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a 
                        href={video.video_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs block"
                        title={video.video_link}
                      >
                        {video.video_link}
                      </a>
                    </td>
                    
                    {/* Scholarship Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium max-w-xs truncate" title={video.rt_scholarship_name}>
                        {video.rt_scholarship_name}
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="relative" ref={dropdownButtonRef}>
                        <button
                          onClick={() => handleDropdownToggle(video.id)}
                          className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === video.id && (
                          <div 
                            ref={dropdownMenuRef}
                            className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                          >
                            <Link 
                              href={`/scholarship-stu-video-cp/update/${video.id}`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <button className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                                Update
                              </button>
                            </Link>
                            <button
                              onClick={() => {
                                setOpenDropdown(null);
                                handleDelete(video.id);
                              }}
                              className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && filteredVideos.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
            <div className="flex items-center justify-between">
              {/* Page Info */}
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredVideos.length)}
                </span> of{' '}
                <span className="font-medium">{filteredVideos.length}</span> results
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
        {!loading && !error && filteredVideos.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any videos matching "<span className="text-gray-700 font-medium">"{searchTerm}"</span>"
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

        {/* No videos at all */}
        {!loading && !error && videos.length === 0 && !searchTerm && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos available</h3>
              <p className="text-gray-500 mb-6">
                Get started by adding your first student video.
              </p>
              <Link href="/scholarship-stu-videos-cp/add">
                <button className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add First Video
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}