'use client';

import { isAdminAuthenticated, adminLogout } from '@/lib/adminAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    // Check if admin is authenticated
    useEffect(() => {
        if (!isAdminAuthenticated()) {
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        adminLogout();
    };

    return (
        <div className="min-h-screen bg-black text-white" data-oid="jl_ar6f">
            {/* Admin Header */}
            <header className="bg-gray-900 border-b border-gray-800" data-oid="kj5f1ef">
                <div
                    className="container mx-auto px-4 py-4 flex justify-between items-center"
                    data-oid="kt.m8lh"
                >
                    <Link href="/" data-oid="6r11s6d">
                        <Image
                            src="/images/Merge.png"
                            alt="Merge logo"
                            width={150}
                            height={150}
                            data-oid="3myz14w"
                        />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                        data-oid="57bl-6i"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8" data-oid="x793696">
                {children}
            </main>
        </div>
    );
}
