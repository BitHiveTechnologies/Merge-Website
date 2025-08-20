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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="9_eneom">
            <Navbar data-oid="3cuprxv" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="lzyrsl."
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="4z3kulm"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="79gpxbs"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="e8cn4zg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="fx558zw">
                        Your{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="zr5xk8m"
                        >
                            Workshops
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="6hgq.4n">
                        Track your registered workshops and upcoming sessions.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="xqw5053"
                    ></div>
                </div>
            </div>

            {/* Registered Workshops Component */}
            <RegisteredWorkshops data-oid="noh31ik" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="5vuynrl"
            >
                <div className="max-w-6xl mx-auto" data-oid="_0-b97e">
                    <div className="text-center text-gray-500" data-oid="f.6ifru">
                        <p data-oid="38ociau">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
