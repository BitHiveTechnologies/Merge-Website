'use client';

import Navbar from '@/components/Navbar';
import RegisteredWorkshops from '@/components/RegisteredWorkshops';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function RegisteredWorkshopsPage() {
    const router = useRouter();

    // Check if user is authenticated
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="movluj5">
            <Navbar data-oid="cccnnxu" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="3.iu3dm"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="l-8dym8"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="jhig665"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="f2kcgq8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="c67t:-o">
                        Your{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="dto.pri"
                        >
                            Workshops
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="pkxwe-y">
                        Track your registered workshops and upcoming sessions.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="tvstpeb"
                    ></div>
                </div>
            </div>

            {/* Registered Workshops Component */}
            <RegisteredWorkshops data-oid="2eut.2z" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="juqa12b"
            >
                <div className="max-w-6xl mx-auto" data-oid="xy38.yl">
                    <div className="text-center text-gray-500" data-oid="e18nr08">
                        <p data-oid="bp5w32a">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
