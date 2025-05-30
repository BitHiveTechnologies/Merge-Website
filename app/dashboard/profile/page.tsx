'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import { userApi } from '@/lib/api';

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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="h9bq2xb">
            <Navbar data-oid="iw_1wqg" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="3qi2tm7"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="-e:un6g"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="g8v465-"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="git14ya">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="pq8zy1e">
                        Profile{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="cnj9w:l"
                        >
                            Settings
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="57prbnl">
                        Manage your account information and preferences.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="pky2fo8"
                    ></div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="py-16 px-6 md:px-12 bg-black" data-oid="9g:8ekj">
                <div className="max-w-4xl mx-auto" data-oid="bvbtue1">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="5nbq1kr">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="mh4o6nj"
                            ></div>
                        </div>
                    ) : userData ? (
                        <div
                            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                            data-oid="2:-4sik"
                        >
                            <div className="p-8" data-oid="wqode77">
                                <div
                                    className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8"
                                    data-oid="bmax12."
                                >
                                    <div
                                        className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold"
                                        data-oid="5p6egsy"
                                    >
                                        {userData.name
                                            ? userData.name.charAt(0).toUpperCase()
                                            : 'U'}
                                    </div>
                                    <div data-oid="tklzl8z">
                                        <h2 className="text-2xl font-bold" data-oid="r5qe0z_">
                                            {userData.name || 'User'}
                                        </h2>
                                        <p className="text-gray-400" data-oid="juni_4o">
                                            {userData.email || 'No email provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8" data-oid="n7p-_oh">
                                    <div data-oid="3lqjkre">
                                        <h3
                                            className="text-xl font-semibold mb-4 text-purple-400"
                                            data-oid="1ffs1ux"
                                        >
                                            Account Information
                                        </h3>
                                        <div className="space-y-4" data-oid="um:u48s">
                                            <div data-oid=":q44vor">
                                                <label
                                                    className="block text-gray-400 mb-1"
                                                    data-oid="b0yjefn"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userData.name || ''}
                                                    onChange={(e) =>
                                                        setUserData({
                                                            ...userData,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                                    data-oid="n7uj9ed"
                                                />
                                            </div>
                                            <div data-oid="r25up8x">
                                                <label
                                                    className="block text-gray-400 mb-1"
                                                    data-oid="vwzrkuj"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={userData.email || ''}
                                                    onChange={(e) =>
                                                        setUserData({
                                                            ...userData,
                                                            email: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                                    data-oid=".vl4a_3"
                                                />
                                            </div>
                                            <div data-oid="p9.zhbi">
                                                <label
                                                    className="block text-gray-400 mb-1"
                                                    data-oid="tm-_107"
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
                                                    data-oid="ksjdqpp"
                                                />
                                            </div>
                                            <div className="mt-6" data-oid="lzm1qc3">
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await userApi.updateProfile({
                                                                name: userData.name,
                                                                email: userData.email,
                                                            });
                                                            alert('Profile updated successfully!');
                                                        } catch (error) {
                                                            console.error(
                                                                'Error updating profile:',
                                                                error,
                                                            );
                                                            alert(
                                                                'Failed to update profile. Please try again.',
                                                            );
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-md transition-colors"
                                                    data-oid=":ms-073"
                                                >
                                                    Update Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div data-oid="u3nrfva">
                                        <h3
                                            className="text-xl font-semibold mb-4 text-purple-400"
                                            data-oid="gn7yzc5"
                                        >
                                            Quick Links
                                        </h3>
                                        <div className="space-y-3" data-oid="3yq6mv9">
                                            <a
                                                href="/dashboard/enrolled-courses"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors mb-3"
                                                data-oid="3zh2k.d"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid="fq6txua"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                        data-oid="kme772c"
                                                    />
                                                </svg>
                                                <span data-oid="4ev9_ra">My Enrolled Courses</span>
                                            </a>
                                            <a
                                                href="/dashboard/registered-workshops"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors mb-3"
                                                data-oid="r3mqxs-"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid="9_k.31h"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        data-oid="m9qpc_0"
                                                    />
                                                </svg>
                                                <span data-oid="z1ko:gt">
                                                    My Registered Workshops
                                                </span>
                                            </a>
                                            <a
                                                href="/dashboard/registered-hackathons"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors mb-3"
                                                data-oid="5b9_uli"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid="p4z4zrs"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                                        data-oid="mfpdk0z"
                                                    />
                                                </svg>
                                                <span data-oid="_t3soo9">
                                                    My Registered Hackathons
                                                </span>
                                            </a>
                                            <a
                                                href="/courses"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                                data-oid="pw39ely"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid="ei1.6sg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                        data-oid="v3z1.q:"
                                                    />
                                                </svg>
                                                <span data-oid="eapb_6y">Browse Courses</span>
                                            </a>
                                            <a
                                                href="/hackathons"
                                                className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                                data-oid="29lj-i0"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-purple-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    data-oid="3tz.ya2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                        data-oid="wle-jf1"
                                                    />
                                                </svg>
                                                <span data-oid="_x8g7bj">Upcoming Hackathons</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12" data-oid=":sbuhhq">
                            <p className="text-red-400 mb-4" data-oid="lli1dk3">
                                Failed to load user data. Please try again later.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                                data-oid="5t8e36:"
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
                data-oid="g4s1yde"
            >
                <div className="max-w-6xl mx-auto" data-oid="wrso-z2">
                    <div className="text-center text-gray-500" data-oid="r.qwi.p">
                        <p data-oid="xz-9qyv">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
