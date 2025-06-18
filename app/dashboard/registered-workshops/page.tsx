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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="o26y65i">
            <Navbar data-oid="vzf1425" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="s1.5z8q"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="dq.o-rw"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="p-xhbjs"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="2w:.6sd">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="fehd1uz">
                        Your{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="cv2kigx"
                        >
                            Workshops
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="w3ot-:6">
                        Track your registered workshops and upcoming sessions.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="-pzjksk"
                    ></div>
                </div>
            </div>

            {/* Registered Workshops Component */}
            <RegisteredWorkshops data-oid="3qrx3n8" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="etd325_"
            >
                <div className="max-w-6xl mx-auto" data-oid="bpprjp0">
                    <div className="text-center text-gray-500" data-oid="075l3f0">
                        <p data-oid="0kpo_0t">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
