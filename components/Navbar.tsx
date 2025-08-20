'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { isAuthenticated, logout, getUser } from '@/lib/auth';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('User');
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isLoggedIn = isAuthenticated();
            setIsLoggedIn(isLoggedIn);

            if (isLoggedIn) {
                try {
                    // Fetch user data from backend
                    const userData = await getUser();
                    if (userData && userData.name) {
                        setUsername(userData.name);
                    } else if (userData && userData.email) {
                        // Fallback to email if name is not available
                        setUsername(userData.email.split('@')[0]);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        checkAuth();

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800 bg-black bg-opacity-95 backdrop-blur-sm"
            data-oid="r0d4k1-"
        >
            <div className="flex items-center" data-oid="kbeyhcp">
                <div className="relative h-10 w-32" data-oid="71ybw91">
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-oid="d1r5iis"
                    >
                        <Link href="/" data-oid="y:q6xnz">
                            <Image
                                src="/images/Merge.png"
                                alt="Merge logo"
                                width={200}
                                height={200}
                                data-oid="7bw1ufj"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-8" data-oid="x_8l78u">
                <Link
                    href="/"
                    className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid=".afrv38"
                >
                    Home
                </Link>

                <Link
                    href="/aboutUs"
                    className={`${isActive('/aboutUs') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="rmfycup"
                >
                    About Us
                </Link>
                <Link
                    href="/courses"
                    className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="_h4csxi"
                >
                    Courses
                </Link>
                <Link
                    href="/workshops"
                    className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="oz.w2qw"
                >
                    Workshops
                </Link>

                <Link
                    href="/collaborations"
                    className={`${isActive('/collaborations') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="prylo1f"
                >
                    Collaborations
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4" data-oid=".3tt7jc">
                {isLoggedIn ? (
                    <div
                        className="flex items-center space-x-3 relative"
                        ref={dropdownRef}
                        data-oid="h6hb4v_"
                    >
                        <div
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 rounded-full px-2 py-1 transition-colors"
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            data-oid="tov2x3i"
                        >
                            <div
                                className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                data-oid="ek4p-w-"
                            >
                                <span className="text-white font-medium" data-oid="_w.26un">
                                    {username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-white" data-oid="rje9yqy">
                                {username}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                data-oid="cm6m262"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                    data-oid="z8ikctv"
                                />
                            </svg>
                        </div>

                        {/* Profile Dropdown */}
                        {profileDropdownOpen && (
                            <div
                                className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                                data-oid="-8i45:-"
                            >
                                <Link
                                    href="/dashboard/enrolled-courses"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="u1hdyox"
                                >
                                    <div className="flex items-center" data-oid="yzg-idm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="fhofcd9"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="e_.6n5a"
                                            />
                                        </svg>
                                        My Enrolled Courses
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/registered-workshops"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="6jxenou"
                                >
                                    <div className="flex items-center" data-oid="wia42qr">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="tj0ex-x"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="q5m1:30"
                                            />
                                        </svg>
                                        My Registered Workshops
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/profile"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid=".f3xikk"
                                >
                                    <div className="flex items-center" data-oid="1g.54jo">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="9sy0kaj"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid="dvu:n0y"
                                            />
                                        </svg>
                                        Profile Settings
                                    </div>
                                </Link>
                                <div
                                    className="border-t border-gray-700 my-1"
                                    data-oid=".zda14:"
                                ></div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setProfileDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-red-400 transition-colors"
                                    data-oid="8fo3-65"
                                >
                                    <div className="flex items-center" data-oid="y-makj.">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="bgjzn78"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid="mtgy78h"
                                            />
                                        </svg>
                                        Logout
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                            data-oid="ovb3q7i"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                            data-oid="9qivno-"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            <button className="md:hidden text-white" onClick={toggleMobileMenu} data-oid="fk:lqz.">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="qbopayp"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                        data-oid="ybxd.l4"
                    />
                </svg>
            </button>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm border-b border-gray-800 py-4 px-6"
                    data-oid="3ek31vi"
                >
                    <div className="flex flex-col space-y-4" data-oid="6ur1aqc">
                        <Link
                            href="/"
                            className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="a5h2s86"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="ks1wngm"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/workshops"
                            className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="0d-ligb"
                        >
                            Workshops
                        </Link>
                        <Link
                            href="/hackathons"
                            className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="0i574p5"
                        >
                            Hackathons
                        </Link>
                        <Link
                            href="/aboutUs"
                            className={`${isActive('/aboutUs') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="cl8f-x9"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/collaborations"
                            className={`${isActive('/collaborations') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="nx5mthu"
                        >
                            Collaborations
                        </Link>
                        <div
                            className="flex flex-col space-y-2 pt-2 border-t border-gray-800"
                            data-oid="ia_uihf"
                        >
                            {isLoggedIn ? (
                                <>
                                    <div
                                        className="flex items-center space-x-2 py-2"
                                        data-oid="oda22ex"
                                    >
                                        <div
                                            className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                            data-oid="p55t6w8"
                                        >
                                            <span
                                                className="text-white font-medium"
                                                data-oid="_r-8bmw"
                                            >
                                                {username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-white" data-oid="qfl0pj8">
                                            {username}
                                        </span>
                                    </div>
                                    <Link
                                        href="/dashboard/enrolled-courses"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="lrdbk2-"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="swtgfp8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="plwn0ue"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="r-m78sm"
                                        >
                                            My Enrolled Courses
                                        </span>
                                    </Link>
                                    <Link
                                        href="/dashboard/registered-workshops"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="ip4r1an"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid=":37-nio"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="y_otrbp"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="x16zbcx"
                                        >
                                            My Registered Workshops
                                        </span>
                                    </Link>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="k:o:m.9"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="w1k.723"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid=".io89pk"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="z.mvm_8"
                                        >
                                            Profile Settings
                                        </span>
                                    </Link>
                                    <div
                                        className="border-t border-gray-800 my-2"
                                        data-oid="xdxrvwm"
                                    ></div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-400 hover:text-red-500 group"
                                        data-oid="pzhzybg"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            data-oid="m_jkw0m"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid="hidk06h"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="8rdee2q"
                                        >
                                            Logout
                                        </span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="m3s9jo_"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="mh8hwv."
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
