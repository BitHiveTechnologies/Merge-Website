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
        <div className="min-h-screen bg-black text-white" data-oid="o3n:q8g">
            {/* Admin Header */}
            <header className="bg-gray-900 border-b border-gray-800" data-oid="hxrdkg1">
                <div
                    className="container mx-auto px-4 py-4 flex justify-between items-center"
                    data-oid=":pvyswd"
                >
                    <Link href="/" data-oid="u2y2g1x">
                        <Image
                            src="/images/Merge.png"
                            alt="Merge logo"
                            width={150}
                            height={150}
                            data-oid="koocazq"
                        />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                        data-oid=":p8x9dz"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8" data-oid="la6_vcw">
                {children}
            </main>
        </div>
    );
}
