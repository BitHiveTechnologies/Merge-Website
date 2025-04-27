'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<'courses' | 'workshops' | 'hackathons'>('courses');

    return (
        <div data-oid="q2:b5ey">
            <h1 className="text-3xl font-bold mb-8" data-oid="5rg-3l_">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div
                className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800"
                data-oid="lreem2i"
            >
                <div className="flex space-x-4 border-b border-gray-800" data-oid="acuz_mk">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="5mzvjjb"
                    >
                        Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('workshops')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'workshops'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="wrzd5x9"
                    >
                        Workshops
                    </button>
                    <button
                        onClick={() => setActiveTab('hackathons')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'hackathons'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="mg7ko4_"
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700"
                data-oid="mzja_jn"
            >
                {activeTab === 'courses' && (
                    <div data-oid="1cnnjhi">
                        <h2
                            className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="1gbaejo"
                        >
                            Manage Courses
                        </h2>
                        <p className="text-gray-300 mb-6" data-oid="6jrvdwb">
                            View and manage all courses and their registrations. Add new courses,
                            update existing ones, and track student enrollments.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8" data-oid="_jmi2wv">
                            <Link
                                href="/admin/dashboard/courses"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="q8e:keh"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="go5e80w"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="_ml2:vf"
                                    >
                                        <path
                                            d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
                                            data-oid="q.7punj"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="4aw8eza"
                                >
                                    View All Courses
                                </span>
                            </Link>
                            <Link
                                href="/admin/dashboard/courses/new"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="kkluel."
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="qzdv6sc"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="3esv8ny"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                            data-oid="54862f9"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="dlmk2er"
                                >
                                    Add New Course
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'workshops' && (
                    <div data-oid="lu-oedk">
                        <h2
                            className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="3uyy7wy"
                        >
                            Manage Workshops
                        </h2>
                        <p className="text-gray-300 mb-6" data-oid="28l96gg">
                            View and manage all workshops and their registrations. Create new
                            workshops, update details, and track participant registrations.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8" data-oid="3wgvaw7">
                            <Link
                                href="/admin/dashboard/workshops"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="hhzt7_p"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="sceorj9"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="ajylgx3"
                                    >
                                        <path
                                            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                            data-oid="qsfy3n6"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="dcy2k::"
                                >
                                    View All Workshops
                                </span>
                            </Link>
                            <Link
                                href="/admin/dashboard/workshops/new"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="t938m97"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="dpadxg_"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="kfe:jx-"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                            data-oid="z0eidaa"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="pq-ysrj"
                                >
                                    Add New Workshop
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'hackathons' && (
                    <div data-oid="1:rot0m">
                        <h2
                            className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="33341:3"
                        >
                            Manage Hackathons
                        </h2>
                        <p className="text-gray-300 mb-6" data-oid="o5m1kj.">
                            View and manage all hackathons and their registrations. Create new
                            hackathons, update details, and track team registrations.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8" data-oid="jsd5kcr">
                            <Link
                                href="/admin/dashboard/hackathons"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid=".u7kice"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="ulynldk"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="4thj9mm"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                            clipRule="evenodd"
                                            data-oid="aw210wx"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="q-8cpwj"
                                >
                                    View All Hackathons
                                </span>
                            </Link>
                            <Link
                                href="/admin/dashboard/hackathons/new"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="colo0at"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="b8lmo85"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="ux756hg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                            data-oid="qhwa4i3"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="j55efx9"
                                >
                                    Add New Hackathon
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
