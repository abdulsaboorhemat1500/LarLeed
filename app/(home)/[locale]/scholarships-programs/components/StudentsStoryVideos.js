'use client';
import { useState, useEffect, useRef } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function StudentStoriesSection({ scholarshipName = null }) {
  const { get } = useApi();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);

  // Fetch student videos
  const fetchStudentVideos = async () => {
    try {
      setLoading(true);
      const result = await get("/api/scholarship-stu-videos");
      if (result.success) {
        const allVideos = result.data || [];
        setVideos(allVideos);

        // Filter videos if scholarshipName is provided
        if (scholarshipName) {
          const filtered = allVideos.filter(
            (video) =>
              video.rt_scholarship_name?.toLowerCase() ===
              scholarshipName.toLowerCase()
          );
          setFilteredVideos(filtered);
        } else {
          setFilteredVideos(allVideos);
        }
      }
    } catch (error) {
      console.error("Error fetching student videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentVideos();
  }, [scholarshipName]); // Re-fetch when scholarshipName changes

  // Update filtered videos when scholarshipName or videos change
  useEffect(() => {
    if (scholarshipName && videos.length > 0) {
      const filtered = videos.filter(
        (video) =>
          video.rt_scholarship_name?.toLowerCase() ===
          scholarshipName.toLowerCase()
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [scholarshipName, videos]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Get embed URL
  const getEmbedUrl = (videoUrl) => {
    const videoId = getYouTubeVideoId(videoUrl);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return videoUrl; // Return original URL if not YouTube
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading student stories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (filteredVideos.length === 0) {
    if (scholarshipName) {
      return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Need Help?
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you need our help with this scholarship then fill the
                  following form. Our experts will guide you through the entire
                  application process and maximize your chances of success.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setIsMentorModalOpen(true)}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Open Scholarship Form
                  </button>
                </div>

                {/* Modal Component */}
                <ScholarshipFormModal
                  isOpen={isMentorModalOpen}
                  onClose={() => setIsMentorModalOpen(false)}
                />
              </div>

              {/* Right Column - Video */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <iframe
                    src="https://www.youtube.com/embed/rqYhq03nOv4?si=pu9lgxTvIKLpzzwn"
                    title="Scholarship Guidance Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-80 lg:h-96 rounded-2xl border-4 border-white dark:border-gray-800"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-50 -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-full opacity-50 -z-10"></div>
              </div>
            </div>
          </div>
        </section>
      );
    }
    return null; // Don't show section if no videos and no specific scholarship
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories of Graduation Students
              {scholarshipName && (
                <span className="block text-2xl text-blue-600 mt-2">
                  for {scholarshipName}
                </span>
              )}
            </h2>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {filteredVideos.length > 3 && (
              <>
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Videos Slider */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto scrollbar-hide space-x-6 pb-8 pt-2 px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-80 bg-blue-100 rounded-2xl shadow-sm transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Video Card */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    {/* Video Thumbnail */}
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => openVideoModal(video)}
                    >
                      <div className="w-full h-50 bg-gray-200 overflow-hidden">
                        {video.video_image ? (
                          <img
                            src={video.video_image}
                            alt={video.video_title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-white opacity-80"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Play Button (Always visible but smaller) */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 rounded-full p-2">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {video.video_title}
                    </h3>
                    {!scholarshipName && (
                      <p className="text-sm text-gray-600 mb-3">
                        {video.rt_scholarship_name}
                      </p>
                    )}
                    <button
                      onClick={() => openVideoModal(video)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Watch Story
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Modal */}
          {isModalOpen && selectedVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedVideo.video_title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {selectedVideo.rt_scholarship_name}
                    </p>
                  </div>
                  <button
                    onClick={closeVideoModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Video Player */}
                <div className="p-6">
                  <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={getEmbedUrl(selectedVideo.video_link)}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedVideo.video_title}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Custom CSS for hiding scrollbar */}
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Need Help?
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                If you need our help with this scholarship then fill the
                following form. Our experts will guide you through the entire
                application process and maximize your chances of success.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setIsMentorModalOpen(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Open Scholarship Form
                </button>
              </div>

              {/* Modal Component */}
              <ScholarshipFormModal
                isOpen={isMentorModalOpen}
                onClose={() => setIsMentorModalOpen(false)}
              />
            </div>

            {/* Right Column - Video */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <iframe
                  src="https://www.youtube.com/embed/rqYhq03nOv4?si=pu9lgxTvIKLpzzwn"
                  title="Scholarship Guidance Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-80 lg:h-96 rounded-2xl border-4 border-white dark:border-gray-800"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-50 -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-full opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}