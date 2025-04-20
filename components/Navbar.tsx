'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800 bg-black bg-opacity-95 backdrop-blur-sm"
            data-oid="lowoczr"
        >
            <div className="flex items-center" data-oid="g6m3gi4">
                <div className="relative h-10 w-32" data-oid="oq:-h8.">
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-oid="vwftdeo"
                    >
                        <Link href="/" data-oid="l3kzhst">
                            <Image
                                src="/images/Merge.png"
                                alt="Merge logo"
                                width={200}
                                height={200}
                                data-oid="xoq2qa:"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-8" data-oid="xyoit9f">
                <Link
                    href="/"
                    className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="p7pnzgm"
                >
                    Home
                </Link>
                <Link
                    href="/courses"
                    className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid=":mj3kgv"
                >
                    Courses
                </Link>
                <Link
                    href="/workshops"
                    className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid=":6t2nhc"
                >
                    Workshops
                </Link>
                <Link
                    href="/hackathons"
                    className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="f54a-j."
                >
                    Hackathons
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4" data-oid="3bdsd85">
                <Link
                    href="/login"
                    className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                    data-oid="0dg6hus"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                    data-oid="5n:9snu"
                >
                    Sign Up
                </Link>
            </div>

            <button className="md:hidden text-white" data-oid="qmj2ttg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="o67fjlo"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                        data-oid="8jxbxjq"
                    />
                </svg>
            </button>
        </nav>
    );
}
