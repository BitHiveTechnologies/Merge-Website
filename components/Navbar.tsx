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
            data-oid="zeiyf6l"
        >
            <div className="flex items-center" data-oid="ghbz.tt">
                <div className="relative h-10 w-32" data-oid="bm54x--">
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-oid="7jgs4z4"
                    >
                        <Link href="/" data-oid="urdp8vj">
                            <Image
                                src="/images/Merge.png"
                                alt="Merge logo"
                                width={200}
                                height={200}
                                data-oid="8djpfx5"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-8" data-oid="bh3r7kz">
                <Link
                    href="/"
                    className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="o7o_iha"
                >
                    Home
                </Link>
                <Link
                    href="/courses"
                    className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="iefcf5f"
                >
                    Courses
                </Link>
                <Link
                    href="/workshops"
                    className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="2hbfgrd"
                >
                    Workshops
                </Link>
                <Link
                    href="/hackathons"
                    className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="vjfl4j."
                >
                    Hackathons
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4" data-oid="6fap3ep">
                {isLoggedIn ? (
                    <div
                        className="flex items-center space-x-3 relative"
                        ref={dropdownRef}
                        data-oid="1l9w1r8"
                    >
                        <div
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 rounded-full px-2 py-1 transition-colors"
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            data-oid="0brbk_z"
                        >
                            <div
                                className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                data-oid="wpncits"
                            >
                                <span className="text-white font-medium" data-oid="hj2xqke">
                                    {username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-white" data-oid="ys.l3yz">
                                {username}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                data-oid="p.0e0w-"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                    data-oid="0hh-cnu"
                                />
                            </svg>
                        </div>

                        {/* Profile Dropdown */}
                        {profileDropdownOpen && (
                            <div
                                className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                                data-oid="s_yagqs"
                            >
                                <Link
                                    href="/dashboard/enrolled-courses"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="dy05i3q"
                                >
                                    <div className="flex items-center" data-oid="j:.j8xz">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="nzgmiw1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="cl9d2ct"
                                            />
                                        </svg>
                                        My Enrolled Courses
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/registered-workshops"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="3s7q3tb"
                                >
                                    <div className="flex items-center" data-oid="6ylhzzh">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="714mc2-"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="-ytikw:"
                                            />
                                        </svg>
                                        My Registered Workshops
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/profile"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="g7.va7h"
                                >
                                    <div className="flex items-center" data-oid="9fz56s9">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="2oqbmlx"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid="sdq5oag"
                                            />
                                        </svg>
                                        Profile Settings
                                    </div>
                                </Link>
                                <div
                                    className="border-t border-gray-700 my-1"
                                    data-oid="2_i3lmw"
                                ></div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setProfileDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-red-400 transition-colors"
                                    data-oid="u4vu628"
                                >
                                    <div className="flex items-center" data-oid="t500f2j">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid=".:3lmgc"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid="j9ph43k"
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
                            data-oid="4nq9c0u"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                            data-oid="s1kky0j"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            <button className="md:hidden text-white" onClick={toggleMobileMenu} data-oid="7tkg_5l">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="39490r."
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                        data-oid="kuth7hm"
                    />
                </svg>
            </button>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm border-b border-gray-800 py-4 px-6"
                    data-oid="nk_i1_4"
                >
                    <div className="flex flex-col space-y-4" data-oid="tx-6vkb">
                        <Link
                            href="/"
                            className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="bl9q_-f"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="3w7v_r7"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/workshops"
                            className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="of1oy-f"
                        >
                            Workshops
                        </Link>
                        <Link
                            href="/hackathons"
                            className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="nrh0y8o"
                        >
                            Hackathons
                        </Link>
                        <div
                            className="flex flex-col space-y-2 pt-2 border-t border-gray-800"
                            data-oid="opjast3"
                        >
                            {isLoggedIn ? (
                                <>
                                    <div
                                        className="flex items-center space-x-2 py-2"
                                        data-oid="pifdseu"
                                    >
                                        <div
                                            className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                            data-oid="j2uxa5p"
                                        >
                                            <span
                                                className="text-white font-medium"
                                                data-oid="s_86x:y"
                                            >
                                                {username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-white" data-oid="9da:m0p">
                                            {username}
                                        </span>
                                    </div>
                                    <Link
                                        href="/dashboard/enrolled-courses"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="13c-ihw"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="9lv70kz"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="y2771gm"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="_z7-l5z"
                                        >
                                            My Enrolled Courses
                                        </span>
                                    </Link>
                                    <Link
                                        href="/dashboard/registered-workshops"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="pmqw_6o"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="lpq:p3e"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="iky7b7."
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="n5uktdq"
                                        >
                                            My Registered Workshops
                                        </span>
                                    </Link>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="xbbqils"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="0n7ybdc"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid="74k7rbn"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="g6gg779"
                                        >
                                            Profile Settings
                                        </span>
                                    </Link>
                                    <div
                                        className="border-t border-gray-800 my-2"
                                        data-oid="a_5m:i7"
                                    ></div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-400 hover:text-red-500 group"
                                        data-oid="2f4z1n3"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            data-oid="3jx9alw"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid="jve-iob"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="vdnujpn"
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
                                        data-oid="s7ux_pf"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="y6f9mah"
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
