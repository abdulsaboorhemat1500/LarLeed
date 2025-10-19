'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function MentorListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { get, delete: del } = useApi();

  const categories = ["mentor", "team-member"];

  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const result = await get('/api/mentor-team');

        if (result.success) {
          setMentors(result.data);
        } else {
          setError(result.error || 'Failed to fetch mentors');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // Delete mentor function
  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      const result = await del(`/api/mentor-team/${id}`);

      if (result.success) {
        // Remove the deleted mentor from state
        setMentors(prev => prev.filter(mentor => mentor.id !== id));
        alert('Mentor deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete mentor');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Network error. Please try again.');
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Filter mentors based on search and category
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mentor.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMentors = filteredMentors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Mentors</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center pb-6 mb-8 border-b border-gray-200">
          {/* Header */}
          <div className="">
            <h1 className="text-2xl font-bold text-gray-900">Mentors and Team Members Table</h1>
            <p className="text-gray-600 mt-1">Total: {mentors.length} members</p>
          </div>
          <Link href="/mentors-tmembers-cp/add-mentor-tmember-cp">
            <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Mentor/Team Member
            </button>
          </Link>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Categories Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Reset Button */}
            <div>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 border border-gray-300 text-white rounded-lg bg-purple-500 hover:bg-purple-600 cursor-pointer transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Mentors Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expertise
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMentors.map((mentor) => (
                  <tr key={mentor.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {mentor.profile_image ? (
                          <img
                            src={mentor.profile_image }
                            alt={mentor.full_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`${mentor.profile_image ? 'hidden' : 'flex'} items-center justify-center text-gray-400 text-xs bg-gray-100 w-full h-full`}>
                          <span>No Image</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {mentor.full_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {mentor.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {mentor.job_title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs">
                        {mentor.summary?.substring(0, 50)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {mentor.experience || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        mentor.category === 'mentor' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {mentor.category || 'team-member'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(mentor.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link 
                        href={`/mentors-tmembers-cp/${mentor.id}`}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                      >
                        Update
                      </Link>
                      <button 
                        onClick={() => handleDelete(mentor.id, mentor.full_name)}
                        className="cursor-pointer text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No results message */}
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No mentors found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredMentors.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              {/* Page Info */}
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredMentors.length)}
                </span> of{' '}
                <span className="font-medium">{filteredMentors.length}</span> results
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
      </div>
    </div>
  );
}