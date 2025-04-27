'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<'courses' | 'workshops' | 'hackathons'>('courses');

    return (
        <div data-oid="q2:b5ey">
            <h1 className="text-3xl font-bold mb-8" data-oid="5rg-3l_">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 mb-8" data-oid="lreem2i">
                <button
                    onClick={() => setActiveTab('courses')}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                        activeTab === 'courses'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    data-oid="5mzvjjb"
                >
                    Courses
                </button>
                <button
                    onClick={() => setActiveTab('workshops')}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                        activeTab === 'workshops'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    data-oid="wrzd5x9"
                >
                    Workshops
                </button>
                <button
                    onClick={() => setActiveTab('hackathons')}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                        activeTab === 'hackathons'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    data-oid="mg7ko4_"
                >
                    Hackathons
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-oid="mzja_jn">
                {activeTab === 'courses' && (
                    <div data-oid="1cnnjhi">
                        <h2 className="text-2xl font-bold mb-4" data-oid="1gbaejo">
                            Manage Courses
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="6jrvdwb">
                            View and manage all courses and their registrations.
                        </p>
                        <Link
                            href="/admin/dashboard/courses"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-md font-medium transition-colors"
                            data-oid="q8e:keh"
                        >
                            View All Courses
                        </Link>
                    </div>
                )}

                {activeTab === 'workshops' && (
                    <div data-oid="lu-oedk">
                        <h2 className="text-2xl font-bold mb-4" data-oid="3uyy7wy">
                            Manage Workshops
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="28l96gg">
                            View and manage all workshops and their registrations.
                        </p>
                        <Link
                            href="/admin/dashboard/workshops"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-md font-medium transition-colors"
                            data-oid="hhzt7_p"
                        >
                            View All Workshops
                        </Link>
                    </div>
                )}

                {activeTab === 'hackathons' && (
                    <div data-oid="1:rot0m">
                        <h2 className="text-2xl font-bold mb-4" data-oid="33341:3">
                            Manage Hackathons
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="o5m1kj.">
                            View and manage all hackathons and their registrations.
                        </p>
                        <Link
                            href="/admin/dashboard/hackathons"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-md font-medium transition-colors"
                            data-oid=".u7kice"
                        >
                            View All Hackathons
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
