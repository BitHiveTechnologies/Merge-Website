'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<'courses' | 'workshops' | 'hackathons'>('courses');

    return (
        <div data-oid="b:xfv:s">
            <h1 className="text-3xl font-bold mb-8" data-oid="8jgmowu">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div
                className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800"
                data-oid="ua2lrwh"
            >
                <div className="flex space-x-4 border-b border-gray-800" data-oid="ruk-.ya">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="u3.cgtu"
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
                        data-oid="qpczyvt"
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
                        data-oid="rykmajc"
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700"
                data-oid="t-7pkam"
            >
                {activeTab === 'courses' && (
                    <div data-oid="mrpqz3f">
                        <h2
                            className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="6zfh0t."
                        >
                            Manage Courses
                        </h2>
                        <p className="text-gray-300 mb-6" data-oid="merajzu">
                            View and manage all courses and their registrations. Add new courses,
                            update existing ones, and track student enrollments.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8" data-oid="4zjyh7s">
                            <Link
                                href="/admin/dashboard/courses"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="qskl6nh"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="gh-hg5n"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="ywt-l4f"
                                    >
                                        <path
                                            d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
                                            data-oid="zevgbu3"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="5iq2rse"
                                >
                                    View All Courses
                                </span>
                            </Link>
                            <Link
                                href="/admin/dashboard/courses/new"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="21irvpf"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="45l.mzx"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid=":oioepu"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                            data-oid="dq_bl85"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid=".zy-poj"
                                >
                                    Add New Course
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'workshops' && (
                    <div data-oid="dx:.hnu">
                        <h2
                            className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="es5-mf1"
                        >
                            Manage Workshops
                        </h2>
                        <p className="text-gray-300 mb-6" data-oid="de82sa.">
                            View and manage all workshops and their registrations. Create new
                            workshops, update details, and track participant registrations.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8" data-oid="7i1iv:p">
                            <Link
                                href="/admin/dashboard/workshops"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="b.:uzql"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="q6diygn"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="14jugr2"
                                    >
                                        <path
                                            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                            data-oid="52tol1k"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="ef500qz"
                                >
                                    View All Workshops
                                </span>
                            </Link>
                            <Link
                                href="/admin/dashboard/workshops/new"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="0q2y6ei"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="jil-iih"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="-dw7u5d"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                            data-oid="atv0xxj"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="-__qvdg"
                                >
                                    Add New Workshop
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'hackathons' && (
                    <div data-oid="l1o78ny">
                        <h2
                            className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="9bl:e_j"
                        >
                            Manage Hackathons
                        </h2>
                        <p className="text-gray-300 mb-6" data-oid="y6rgmrs">
                            View and manage all hackathons and their registrations. Create new
                            hackathons, update details, and track team registrations.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8" data-oid="jnzf6_v">
                            <Link
                                href="/admin/dashboard/hackathons"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="1i-44bj"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="3s:fw4g"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="4v6_4ro"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                            clipRule="evenodd"
                                            data-oid="y2iz1ov"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="4f6-k0r"
                                >
                                    View All Hackathons
                                </span>
                            </Link>
                            <Link
                                href="/admin/dashboard/hackathons/new"
                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
                                data-oid="38-73gn"
                            >
                                <span
                                    className="text-purple-400 mr-2 group-hover:text-purple-300"
                                    data-oid="vc8n5mo"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="3y9wh0u"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                            data-oid="zd2ern1"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="group-hover:text-white transition-colors duration-300"
                                    data-oid="tttymmt"
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
