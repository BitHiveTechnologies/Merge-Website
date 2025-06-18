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
        <div className="min-h-screen bg-black text-white" data-oid="xnjbdr4">
            {/* Admin Header */}
            <header className="bg-gray-900 border-b border-gray-800" data-oid="8u0q6f6">
                <div
                    className="container mx-auto px-4 py-4 flex justify-between items-center"
                    data-oid=":p7sjlf"
                >
                    <Link href="/" data-oid="a1h9c1s">
                        <Image
                            src="/images/Merge.png"
                            alt="Merge logo"
                            width={150}
                            height={150}
                            data-oid="exdk7nn"
                        />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                        data-oid="hmv6i-u"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8" data-oid="sarijjx">
                {children}
            </main>
        </div>
    );
}
