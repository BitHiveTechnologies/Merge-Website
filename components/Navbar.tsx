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
            data-oid="wza-eop"
        >
            <div className="flex items-center" data-oid="88i58ie">
                <div className="relative h-10 w-32" data-oid="v9k59jx">
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-oid="ozmyg:x"
                    >
                        <Link href="/" data-oid="0cm6cwr">
                            <Image
                                src="/images/Merge.png"
                                alt="Merge logo"
                                width={200}
                                height={200}
                                data-oid="-1-yn88"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-8" data-oid="23a0mpr">
                <Link
                    href="/"
                    className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="l_lvq01"
                >
                    Home
                </Link>
                <Link
                    href="/courses"
                    className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="ynsv_rs"
                >
                    Courses
                </Link>
                <Link
                    href="/workshops"
                    className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="aze24np"
                >
                    Workshops
                </Link>
                <Link
                    href="/hackathons"
                    className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="wqxgzep"
                >
                    Hackathons
                </Link>
                <Link
                    href="/aboutUs"
                    className={`${isActive('/aboutUs') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="6sohbgg"
                >
                    About Us
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4" data-oid="ggi_q.r">
                {isLoggedIn ? (
                    <div
                        className="flex items-center space-x-3 relative"
                        ref={dropdownRef}
                        data-oid="rd9u67j"
                    >
                        <div
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 rounded-full px-2 py-1 transition-colors"
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            data-oid=":d4or9e"
                        >
                            <div
                                className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                data-oid="mt4vahi"
                            >
                                <span className="text-white font-medium" data-oid="0-5pa2l">
                                    {username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-white" data-oid="fs7-b93">
                                {username}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                data-oid="20i00xb"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                    data-oid="hc65eef"
                                />
                            </svg>
                        </div>

                        {/* Profile Dropdown */}
                        {profileDropdownOpen && (
                            <div
                                className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                                data-oid="ty13pj3"
                            >
                                <Link
                                    href="/dashboard/enrolled-courses"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="8e6:rmc"
                                >
                                    <div className="flex items-center" data-oid="bveblwe">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="jtyvd5e"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="-6nma25"
                                            />
                                        </svg>
                                        My Enrolled Courses
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/registered-workshops"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="_4t-us9"
                                >
                                    <div className="flex items-center" data-oid="s0qa:gf">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="56ge.57"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="uvug6qo"
                                            />
                                        </svg>
                                        My Registered Workshops
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/profile"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                                    onClick={() => setProfileDropdownOpen(false)}
                                    data-oid="g2j5hsz"
                                >
                                    <div className="flex items-center" data-oid="lxk6g._">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid=".xwp7l_"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid="yl2sub9"
                                            />
                                        </svg>
                                        Profile Settings
                                    </div>
                                </Link>
                                <div
                                    className="border-t border-gray-700 my-1"
                                    data-oid="iv3x.m3"
                                ></div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setProfileDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-red-400 transition-colors"
                                    data-oid="oaya:5a"
                                >
                                    <div className="flex items-center" data-oid="171r20l">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="gzo-0mz"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid="p8rc.bh"
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
                            data-oid="9:ti::x"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                            data-oid="3hkw1kq"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            <button className="md:hidden text-white" onClick={toggleMobileMenu} data-oid="ymz1:5i">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="g-81h0_"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                        data-oid="iyd-lhd"
                    />
                </svg>
            </button>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm border-b border-gray-800 py-4 px-6"
                    data-oid="4i:u8dg"
                >
                    <div className="flex flex-col space-y-4" data-oid="ajx21:j">
                        <Link
                            href="/"
                            className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="pi5npim"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="x7r_6ir"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/workshops"
                            className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="ke5fl63"
                        >
                            Workshops
                        </Link>
                        <Link
                            href="/hackathons"
                            className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="is0lrow"
                        >
                            Hackathons
                        </Link>
                        <Link
                            href="/aboutUs"
                            className={`${isActive('/aboutUs') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                            onClick={() => setMobileMenuOpen(false)}
                            data-oid="x1ce9k:"
                        >
                            About Us
                        </Link>
                        <div
                            className="flex flex-col space-y-2 pt-2 border-t border-gray-800"
                            data-oid=".-7tz2k"
                        >
                            {isLoggedIn ? (
                                <>
                                    <div
                                        className="flex items-center space-x-2 py-2"
                                        data-oid="0tggkw2"
                                    >
                                        <div
                                            className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"
                                            data-oid="jyljyx5"
                                        >
                                            <span
                                                className="text-white font-medium"
                                                data-oid="939q-z1"
                                            >
                                                {username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-white" data-oid="eo9::h6">
                                            {username}
                                        </span>
                                    </div>
                                    <Link
                                        href="/dashboard/enrolled-courses"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="5o4rc26"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="zcqfwxx"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="_tqdwcr"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="0jke.s7"
                                        >
                                            My Enrolled Courses
                                        </span>
                                    </Link>
                                    <Link
                                        href="/dashboard/registered-workshops"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="xpv83tu"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="bd2gc4x"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="mq1xvqs"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="55qrdtw"
                                        >
                                            My Registered Workshops
                                        </span>
                                    </Link>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-purple-400 group"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="35v:th6"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="z1g.x30"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                data-oid="vi3qt-t"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="r7zm5:a"
                                        >
                                            Profile Settings
                                        </span>
                                    </Link>
                                    <div
                                        className="border-t border-gray-800 my-2"
                                        data-oid="io5n0y5"
                                    ></div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 text-gray-400 hover:text-red-500 group"
                                        data-oid="lk.-qqs"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            data-oid="7bonf9g"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                data-oid="47sd.qs"
                                            />
                                        </svg>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            data-oid="ol67bg:"
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
                                        data-oid="x9r5-m8"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-oid="g36jisz"
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
