'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is authenticated and fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthenticated()) {
                router.push('/login');
                return;
            }

            try {
                setIsLoading(true);
                const data = await getUser();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="gw:fwjg">
            <Navbar data-oid="rna9uov" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="c9hov9v"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="10yt3ac"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="721gh.z"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="cpylha7">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="ufg:a:w">
                        Profile{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="ucs98js"
                        >
                            Settings
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="tog-00i">
                        Manage your account information and preferences.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="z7guqy4"
                    ></div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="py-16 px-6 md:px-12 bg-black" data-oid=":tbaqth">
                <div className="max-w-4xl mx-auto" data-oid="9hak1nm">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="pq1j0qv">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="joj81s7"
                            ></div>
                        </div>
                    ) : userData ? (
                        <div
                            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                            data-oid="s0t-jr7"
                        >
                            <div className="p-8" data-oid="arj:3c9">
                                <div
                                    className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8"
                                    data-oid="y5wwaga"
                                >
                                    <div
                                        className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold"
                                        data-oid="on8-53m"
                                    >
                                        {userData.name
                                            ? userData.name.charAt(0).toUpperCase()
                                            : 'U'}
                                    </div>
                                    <div data-oid="zcnxi8b">
                                        <h2 className="text-2xl font-bold" data-oid="xv47l96">
                                            {userData.name || 'User'}
                                        </h2>
                                        <p className="text-gray-400" data-oid="nd0g2-n">
                                            {userData.email || 'No email provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8" data-oid="h0.x0qf">
                                    <div data-oid="i5-syia">
                                        <h3
                                            className="text-xl font-semibold mb-4 text-purple-400"
                                            data-oid="peev:yq"
                                        >
                                            Account Information
                                        </h3>
                                        <div className="space-y-4" data-oid="1ep0ocr">
                                            <div data-oid="ml7-8yl">
                                                <label
                                                    className="block text-gray-400 mb-1"
                                                    data-oid="tvx0pf6"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userData.name || ''}
                                                    readOnly
                                                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                                    data-oid="rolwosa"
                                                />
                                            </div>
                                            <div data-oid="wb7xzcp">
                                                <label
                                                    className="block text-gray-400 mb-1"
                                                    data-oid=":yk1sp_"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={userData.email || ''}
                                                    readOnly
                                                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                                    data-oid="p6d16oh"
                                                />
                                            </div>
                                            <div data-oid="5l1tubi">
                                                <label
                                                    className="block text-gray-400 mb-1"
                                                    data-oid="udy6-9x"
                                                >
                                                    Member Since
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        userData.createdAt
                                                            ? new Date(
                                                                  userData.createdAt,
                                                              ).toLocaleDateString()
                                                            : 'N/A'
                                                    }
                                                    readOnly
                                                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                                    data-oid="9tzw5.m"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div data-oid=".-urt6_">
                                        <h3
                                            className="text-xl font-semibold mb-4 text-purple-400"
                                            data-oid="rgma2y6"
                                        >
                                            Quick Links
                                        </h3>
                                        <div className="space-y-3" data-oid="0_6lx5x">
                                            <a
                                                href="/dashboard/enrolled-courses"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                                data-oid="-fwb0kq"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid=":a2_c7y"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                        data-oid="ll9.1_0"
                                                    />
                                                </svg>
                                                <span data-oid=".euoc35">My Enrolled Courses</span>
                                            </a>
                                            <a
                                                href="/courses"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                                data-oid="csm:754"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid="r9tpqkz"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                        data-oid="15_fthp"
                                                    />
                                                </svg>
                                                <span data-oid="4yu8jvo">Browse Courses</span>
                                            </a>
                                            <a
                                                href="/hackathons"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                                data-oid="msa29su"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid="7rfz8kg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                        data-oid="1q27:4z"
                                                    />
                                                </svg>
                                                <span data-oid="4z7hdi1">Upcoming Hackathons</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12" data-oid="i1xdfqf">
                            <p className="text-red-400 mb-4" data-oid="fl-e6sq">
                                Failed to load user data. Please try again later.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                                data-oid="5gjraal"
                            >
                                Retry
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="3etyc8d"
            >
                <div className="max-w-6xl mx-auto" data-oid="rm5lyil">
                    <div className="text-center text-gray-500" data-oid="2okjdp2">
                        <p data-oid="._h8tot">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
