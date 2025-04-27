'use client';

import { adminApi } from '@/lib/adminApi';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Hackathon {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    prizes?: string[];
}

export default function AdminHackathonsPage() {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const data = await adminApi.hackathons.getAll();
                setHackathons(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch hackathons');
                console.error('Error fetching hackathons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHackathons();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="v-5kptu">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="e2rgn_c"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="2trvpvq"
            >
                <p className="text-red-200" data-oid="tzx4239">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="lyhzcci"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="spfkxx6">
            <div className="flex justify-between items-center mb-6" data-oid="qh9298t">
                <h1 className="text-3xl font-bold" data-oid="0oxhl2_">
                    Hackathons Management
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="16aspar"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                data-oid=".bi474f"
            >
                <div className="overflow-x-auto" data-oid=":-3m555">
                    <table className="min-w-full divide-y divide-gray-700" data-oid="chobg.2">
                        <thead className="bg-gray-900" data-oid="9g7tp29">
                            <tr data-oid="u7ho4f2">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="ze_:hw2"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="yuta80_"
                                >
                                    Dates
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="7s161qc"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="u2vbhnu"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700" data-oid="k4brr3g">
                            {hackathons.length === 0 ? (
                                <tr data-oid="bdy70jw">
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-gray-400"
                                        data-oid="x4xgtij"
                                    >
                                        No hackathons found
                                    </td>
                                </tr>
                            ) : (
                                hackathons.map((hackathon) => (
                                    <tr
                                        key={hackathon._id}
                                        className="hover:bg-gray-750"
                                        data-oid="fwbcoly"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="1:dqvrd"
                                        >
                                            {hackathon.title}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="_tyit38"
                                        >
                                            {new Date(hackathon.startDate).toLocaleDateString()} -{' '}
                                            {new Date(hackathon.endDate).toLocaleDateString()}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="lu_sfbl"
                                        >
                                            {hackathon.location}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="4:th:36"
                                        >
                                            <Link
                                                href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                className="text-purple-400 hover:text-purple-300 transition-colors"
                                                data-oid="2:ptdg8"
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
