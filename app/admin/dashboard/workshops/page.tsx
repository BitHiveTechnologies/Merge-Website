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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="qu:9p4s">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="2hnyp8p"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="5_4gdcx"
            >
                <p className="text-red-200" data-oid="cz4mp96">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="nkpi2:h"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="bzj9hqd">
            <div className="flex justify-between items-center mb-6" data-oid="472per2">
                <h1 className="text-3xl font-bold" data-oid="q55p962">
                    Workshops Management
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="nank1p1"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                data-oid="1tuui_y"
            >
                <div className="overflow-x-auto" data-oid=":7-::m-">
                    <table className="min-w-full divide-y divide-gray-700" data-oid="njq0.jm">
                        <thead className="bg-gray-900" data-oid="0_7vrti">
                            <tr data-oid="r3c0wki">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="5y4cl9."
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="klxw0pk"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="6g.k:uk"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="iiejny5"
                                >
                                    Speaker
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="886c81b"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700" data-oid="ij39fkg">
                            {workshops.length === 0 ? (
                                <tr data-oid="yg_0ig2">
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 text-center text-gray-400"
                                        data-oid="sixjufy"
                                    >
                                        No workshops found
                                    </td>
                                </tr>
                            ) : (
                                workshops.map((workshop) => (
                                    <tr
                                        key={workshop._id}
                                        className="hover:bg-gray-750"
                                        data-oid="uj:uxbu"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="jvukkq5"
                                        >
                                            {workshop.title}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="cwzjb91"
                                        >
                                            {new Date(workshop.date).toLocaleDateString()}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="gqi.qp4"
                                        >
                                            {workshop.location}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="mhc9yz6"
                                        >
                                            {workshop.speaker || 'N/A'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="-:fyeh8"
                                        >
                                            <Link
                                                href={`/admin/dashboard/workshops/${workshop._id}`}
                                                className="text-purple-400 hover:text-purple-300 transition-colors"
                                                data-oid="5am7niw"
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
