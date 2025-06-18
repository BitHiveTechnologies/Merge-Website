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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid=".dek5s0">
            <Navbar data-oid=":juvi8r" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="j.n577e"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="clpz_2n"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="14b3mdy"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="j53l-qz">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="twz20-u">
                        Your Learning{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="2nlpx6j"
                        >
                            Journey
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="tp6u51n">
                        Track your progress and continue learning with your enrolled courses.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="fwv_nki"
                    ></div>
                </div>
            </div>

            {/* Enrolled Courses Component */}
            <EnrolledCourses data-oid="3rh2svu" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="7dfrzcy"
            >
                <div className="max-w-6xl mx-auto" data-oid="59moz57">
                    <div className="text-center text-gray-500" data-oid="njbfm9t">
                        <p data-oid="t4tsgvm">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
