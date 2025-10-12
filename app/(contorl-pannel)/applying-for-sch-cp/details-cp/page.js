'use client';
import { useRouter } from 'next/navigation';

export default function ApplicationDetailsPage() {
  const router = useRouter();

  // Mock data - in real app, this would come from props or API
  const application = {
    id: 1,
    full_name: "Kate Keith",
    email: "kate.keith@example.com",
    address: "123 Main Street, New York, NY 10001, United States",
    phone: "+1 (555) 123-4567",
    date_of_birth: "1995-03-15",
    uni_name: "Harvard University",
    level_of_study: "Undergraduate",
    graduation_year: "2024",
    major: "Computer Science",
    gpa: "3.8",
    sch_name: "Fulbright Scholarship Program",
    sch_country: "United States",
    sch_university: "Harvard University",
    sch_level: "Graduate",
    sch_deadline: "February 24, 2026"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
            </div>
            <button
              onClick={() => router.back()}
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.full_name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.email}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.address}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.phone}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {new Date(application.date_of_birth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Academic Information</h2>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.uni_name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level of Study</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.level_of_study}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.graduation_year}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Major/Field of Study</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.major}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {application.gpa}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarship Information Section */}
          <div>
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Scholarship Information</h2>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_country}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {application.sch_university}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Study Level</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {application.sch_level}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                  <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      new Date(application.sch_deadline) > new Date() 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {application.sch_deadline}
                      {new Date(application.sch_deadline) > new Date() ? ' (Active)' : ' (Expired)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            {/* <div className="flex justify-end space-x-4">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Download Application
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Approve Application
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}