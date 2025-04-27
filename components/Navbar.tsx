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
            data-oid="i7wlsh5"
        >
            <div className="flex items-center" data-oid="f2eac01">
                <div className="relative h-10 w-32" data-oid="wldn30r">
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-oid="ehl:t9w"
                    >
                        <Link href="/" data-oid="np979l2">
                            <Image
                                src="/images/Merge.png"
                                alt="Merge logo"
                                width={200}
                                height={200}
                                data-oid="jguunez"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-8" data-oid="_94wvgt">
                <Link
                    href="/"
                    className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="p1mdy80"
                >
                    Home
                </Link>
                <Link
                    href="/courses"
                    className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="ytn1jw-"
                >
                    Courses
                </Link>
                <Link
                    href="/workshops"
                    className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="mgnm:ik"
                >
                    Workshops
                </Link>
                <Link
                    href="/hackathons"
                    className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid=".bn-i8n"
                >
                    Hackathons
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4" data-oid=".rhimv6">
                {isLoggedIn ? (
                    <div
                        className="flex items-center space-x-3 relative"
                        ref={dropdownRef}
                        data-oid="p2ewj_g"
                    >
                        <div
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 rounded-full px-2 py-1 transition-colors"
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            data-oid="kmdol66"
                        >
                            <div
                                className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                data-oid="uma.7lu"
                            >
                                <span className="text-white font-medium" data-oid="wyqgq5d">
                                    {username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-white" data-oid="54ci4dt">
                                {username}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                data-oid="y:g.xlk"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                    data-oid="lpgbete"
                                />
                            </svg>
                        </div>

                        {/* Profile Dropdown */}
                        {profileDropdownOpen && (
                            <div
                                className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                                data-oid="t9ad:2h"
                            >
                                <Link
                                    href="/dashboard/enrolled-courses"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="zja0lj:"
                                >
                                    <div className="flex items-center" data-oid="l:jvxn.">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="dj.nx6p"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="b7xxzsm"
                                            />
                                        </svg>
                                        My Enrolled Courses
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/profile"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="9i3-5km"
                                >
                                    <div className="flex items-center" data-oid="7ji8u3.">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="9pcz4np"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid="2b4vnpb"
                                            />
                                        </svg>
                                        Profile Settings
                                    </div>
                                </Link>
                                <div
                                    className="border-t border-gray-700 my-1"
                                    data-oid="xxu8vho"
                                ></div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setProfileDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-red-400 transition-colors"
                                    data-oid="dlkjzp_"
                                >
                                    <div className="flex items-center" data-oid="7n317zv">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="6kio39f"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid="jolvb1l"
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
                            data-oid="ptw-ks."
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                            data-oid="cs0hs8y"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            <button className="md:hidden text-white" onClick={toggleMobileMenu} data-oid="dux:l:k">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="x:xs-n."
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                        data-oid="p1stdg5"
                    />
                </svg>
            </button>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm border-b border-gray-800 py-4 px-6"
                    data-oid="hsfgsrw"
                >
                    <div className="flex flex-col space-y-4" data-oid="n23nquy">
                        <Link
                            href="/"
                            className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="rugqww8"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="z5qoxfu"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/workshops"
                            className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="rq.zbr2"
                        >
                            Workshops
                        </Link>
                        <Link
                            href="/hackathons"
                            className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="s7qetrc"
                        >
                            Hackathons
                        </Link>
                        <div
                            className="flex flex-col space-y-2 pt-2 border-t border-gray-800"
                            data-oid="j2x:zks"
                        >
                            {isLoggedIn ? (
                                <>
                                    <div
                                        className="flex items-center space-x-2 py-2"
                                        data-oid="lg23iw0"
                                    >
                                        <div
                                            className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                            data-oid="v4l29.-"
                                        >
                                            <span
                                                className="text-white font-medium"
                                                data-oid="e01_8gw"
                                            >
                                                {username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-white" data-oid="h0on2:7">
                                            {username}
                                        </span>
                                    </div>
                                    <Link
                                        href="/dashboard/enrolled-courses"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="q3vmbsn"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="utd49ez"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="3ks2qfx"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="g2.xxrg"
                                        >
                                            My Enrolled Courses
                                        </span>
                                    </Link>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="zjqkx11"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="lk-aoaz"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid="x05vz:u"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid=".j56m7m"
                                        >
                                            Profile Settings
                                        </span>
                                    </Link>
                                    <div
                                        className="border-t border-gray-800 my-2"
                                        data-oid="18hizt-"
                                    ></div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-400 hover:text-red-500 group"
                                        data-oid="1bpr2yy"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            data-oid="ebqn7dj"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid=":x5kwft"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="ll-u.jk"
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
                                        data-oid="cbec0wj"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="g:ls54h"
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
