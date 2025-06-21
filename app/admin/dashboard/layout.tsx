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
        <div className="min-h-screen bg-black text-white" data-oid="4t1jmot">
            {/* Admin Header */}
            <header className="bg-gray-900 border-b border-gray-800" data-oid="h41vlhn">
                <div
                    className="container mx-auto px-4 py-4 flex justify-between items-center"
                    data-oid="7gekj5t"
                >
                    <Link href="/" data-oid="jw.zqe2">
                        <Image
                            src="/images/Merge.png"
                            alt="Merge logo"
                            width={150}
                            height={150}
                            data-oid="_cacamq"
                        />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                        data-oid="tl27s6r"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8" data-oid="ab_-yi-">
                {children}
            </main>
        </div>
    );
}
