'use client';

import { adminApi } from '@/lib/adminApi';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Workshop {
    _id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    speaker?: string;
}

export default function AdminWorkshopsPage() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const data = await adminApi.workshops.getAll();
                setWorkshops(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch workshops');
                console.error('Error fetching workshops:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="fbvpvl0">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="rtscf8-"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="p4l8dqg"
            >
                <p className="text-red-200" data-oid="lo414.7">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="_8r.s51"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="s0:ki_1">
            <div className="flex justify-between items-center mb-6" data-oid="p:8eg6n">
                <h1 className="text-3xl font-bold" data-oid="-2p76d-">
                    Workshops Management
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="m5-w.07"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                data-oid="ez963y2"
            >
                <div className="overflow-x-auto" data-oid="i1ku1nn">
                    <table className="min-w-full divide-y divide-gray-700" data-oid="hvh9m_.">
                        <thead className="bg-gray-900" data-oid="j6x-dc4">
                            <tr data-oid="m-yp_cj">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="hx46mlo"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="n7389vt"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="010swxh"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="zr3dp_c"
                                >
                                    Speaker
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="iy6-.t:"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700" data-oid="3jd--ab">
                            {workshops.length === 0 ? (
                                <tr data-oid="p64cr99">
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 text-center text-gray-400"
                                        data-oid="-dblmi7"
                                    >
                                        No workshops found
                                    </td>
                                </tr>
                            ) : (
                                workshops.map((workshop) => (
                                    <tr
                                        key={workshop._id}
                                        className="hover:bg-gray-750"
                                        data-oid="nixrq:e"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="m_r8c33"
                                        >
                                            {workshop.title}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="81ykkit"
                                        >
                                            {new Date(workshop.date).toLocaleDateString()}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="r0-8mwl"
                                        >
                                            {workshop.location}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="hmoqmnr"
                                        >
                                            {workshop.speaker || 'N/A'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="zfr6dow"
                                        >
                                            <Link
                                                href={`/admin/dashboard/workshops/${workshop._id}`}
                                                className="text-purple-400 hover:text-purple-300 transition-colors"
                                                data-oid="jikafe3"
                                            >
                                                View Registrations
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
