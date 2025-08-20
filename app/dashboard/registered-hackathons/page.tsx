'use client';

import Navbar from '@/components/Navbar';
import RegisteredHackathons from '@/components/RegisteredHackathons';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function RegisteredHackathonsPage() {
    const router = useRouter();

    // Check if user is authenticated
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="p.6hxne">
            <Navbar data-oid="cbvt5vi" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="xy2mptg"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="bz:23xe"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="uxsg6t1"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="-907f98">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="t_iwxlf">
                        Your Hackathon{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="s95er7c"
                        >
                            Registrations
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="9blqz-x">
                        Track your hackathon registrations and prepare for upcoming events.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="fp_hae-"
                    ></div>
                </div>
            </div>

            {/* Registered Hackathons Component */}
            <RegisteredHackathons data-oid="lkwjdci" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="-:cy0u3"
            >
                <div className="max-w-6xl mx-auto" data-oid="8w__z7p">
                    <div className="text-center text-gray-500" data-oid="kdegqa4">
                        <p data-oid="-x0n7gd">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
