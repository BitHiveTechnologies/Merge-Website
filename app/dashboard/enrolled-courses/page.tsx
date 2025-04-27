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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="d1o.jtr">
            <Navbar data-oid="f:-nnah" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="k0d3unq"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="-l.001l"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="e2s3-ap"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="7tr-st6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="d4bhyjf">
                        Your Learning{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="x777zaf"
                        >
                            Journey
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="f84zxp1">
                        Track your progress and continue learning with your enrolled courses.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="5n3gipx"
                    ></div>
                </div>
            </div>

            {/* Enrolled Courses Component */}
            <EnrolledCourses data-oid="bg23l5b" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="pl-htmo"
            >
                <div className="max-w-6xl mx-auto" data-oid="vevo:xc">
                    <div className="text-center text-gray-500" data-oid="qc26bcc">
                        <p data-oid="uaj_43p">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
