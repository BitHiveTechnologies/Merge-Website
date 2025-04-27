'use client';

import Navbar from '@/components/Navbar';
import EnrolledCourses from '@/components/EnrolledCourses';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function EnrolledCoursesPage() {
    const router = useRouter();

    // Check if user is authenticated
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="xglp_98">
            <Navbar data-oid="4tl3._8" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="0pomeaw"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="j0um7up"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="l9r43p2"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="hwdpth:">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="f:ruadw">
                        Your Learning{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="d-ogqna"
                        >
                            Journey
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="sthw68k">
                        Track your progress and continue learning with your enrolled courses.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="izzl72t"
                    ></div>
                </div>
            </div>

            {/* Enrolled Courses Component */}
            <EnrolledCourses data-oid="fw-2v6w" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="nt46kfb"
            >
                <div className="max-w-6xl mx-auto" data-oid="aju2vno">
                    <div className="text-center text-gray-500" data-oid="nw0aelk">
                        <p data-oid="j2cc2g5">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
