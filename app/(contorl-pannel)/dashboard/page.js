'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardSection() {

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                
            </div>

           
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Add Scholarship', href: '/scholarships-programs-cp/add-scholarships-program-cp', icon: Plus, color: 'blue' },
                    { label: 'Create Post/Roshangari', href: '/posts-cp/add-post-cp', icon: Plus, color: 'blue' },
                    { label: 'Add Mentor/Team Member', href: '/mentors-tmembers-cp/add-mentor-tmember-cp', icon: Plus, color: 'blue' },
                ].map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                        className={`bg-${action.color}-500 hover:bg-${action.color}-600 text-white p-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2 text-center`}
                    >
                        <action.icon className="h-5 w-5" />
                        <span className="font-medium">{action.label}</span>
                    </Link>
                ))}
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
            </div>

        </div>
    );
}