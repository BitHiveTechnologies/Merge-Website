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
            data-oid=":_678mh"
        >
            <div className="flex items-center" data-oid="98hkro5">
                <div className="relative h-10 w-32" data-oid="qpscqjo">
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-oid="gg2indv"
                    >
                        <Link href="/" data-oid="4:uc3l3">
                            <Image
                                src="/images/Merge.png"
                                alt="Merge logo"
                                width={200}
                                height={200}
                                data-oid="0i9o21:"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-8" data-oid="isd8odo">
                <Link
                    href="/"
                    className={`${isActive('/') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="_xn8hf:"
                >
                    Home
                </Link>
                <Link
                    href="/courses"
                    className={`${isActive('/courses') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="t40on.a"
                >
                    Courses
                </Link>
                <Link
                    href="/workshops"
                    className={`${isActive('/workshops') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="t3:sw:g"
                >
                    Workshops
                </Link>
                <Link
                    href="/hackathons"
                    className={`${isActive('/hackathons') ? 'text-purple-400' : 'hover:text-purple-400'} transition-colors`}
                    data-oid="-cjphib"
                >
                    Hackathons
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4" data-oid="0r:-c6n">
                <Link
                    href="/login"
                    className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                    data-oid="8brfig6"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                    data-oid="oljkrbb"
                >
                    Sign Up
                </Link>
            </div>

            <button className="md:hidden text-white" data-oid="6wkj-h9">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="qdmpn89"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                        data-oid="0_c7apc"
                    />
                </svg>
            </button>
        </nav>
    );
}
