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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="pabrlup">
            <Navbar data-oid="v-recmm" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid="9ij1_d-"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="l822p.b"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="gtfcgo9"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="yatweqe">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="t0sgh7l">
                        Your Hackathon{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="qimoey5"
                        >
                            Registrations
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="t-i36t.">
                        Track your hackathon registrations and prepare for upcoming events.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid=":8cyf4r"
                    ></div>
                </div>
            </div>

            {/* Registered Hackathons Component */}
            <RegisteredHackathons data-oid="5nm1wm." />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="ybk4n.x"
            >
                <div className="max-w-6xl mx-auto" data-oid="rq34v8_">
                    <div className="text-center text-gray-500" data-oid="jfxq_34">
                        <p data-oid="6y_gv4g">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
