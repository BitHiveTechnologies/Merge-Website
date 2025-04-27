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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid=":rgwevg">
            <Navbar data-oid="pmput1-" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-16 pb-20 px-6 md:px-12 relative overflow-hidden"
                data-oid=":_57zkb"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="-fvmgjb"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="2g3tq8z"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10" data-oid="d7e-icu">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-oid="vijh1he">
                        Your{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="pm6urd."
                        >
                            Workshops
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl" data-oid="al3:rv5">
                        Track your registered workshops and upcoming sessions.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"
                        data-oid="_59c2re"
                    ></div>
                </div>
            </div>

            {/* Registered Workshops Component */}
            <RegisteredWorkshops data-oid="p6t27di" />

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="nhkb18z"
            >
                <div className="max-w-6xl mx-auto" data-oid="ppftsag">
                    <div className="text-center text-gray-500" data-oid="zb9pa::">
                        <p data-oid="gxoyy3l">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
