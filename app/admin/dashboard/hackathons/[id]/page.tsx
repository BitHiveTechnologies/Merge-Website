'use client';

import { adminApi } from '@/lib/adminApi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HackathonRegistration {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    hackathonId: {
        _id: string;
        title: string;
    };
    teamName: string;
    teamSize: number;
    track: string;
    registrationDate: string;
}

interface Hackathon {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
}

export default function HackathonRegistrationsPage() {
    const params = useParams();
    const hackathonId = params.id as string;

    const [hackathon, setHackathon] = useState<Hackathon | null>(null);
    const [registrations, setRegistrations] = useState<HackathonRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch hackathon details and registrations in parallel
                const [hackathonsData, registrationsData] = await Promise.all([
                    adminApi.hackathons.getAll(),
                    adminApi.hackathons.getRegistrations(hackathonId),
                ]);

                // Find the specific hackathon
                const hackathonDetails = hackathonsData.find(
                    (h: Hackathon) => h._id === hackathonId,
                );
                if (hackathonDetails) {
                    setHackathon(hackathonDetails);
                }

                setRegistrations(registrationsData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
                console.error('Error fetching hackathon data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hackathonId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="2.xr6_m">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="ltt1ulu"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="p-hr5y4"
            >
                <p className="text-red-200" data-oid="vgjs9d2">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="h_enut:"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="k.cz.q8">
            <div className="flex justify-between items-center mb-6" data-oid=":.x4m-6">
                <div data-oid="ghs6cng">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="-1e_6in"
                    >
                        <span className="mr-1" data-oid=".6a0fmb">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="igbo5qf">
                        {hackathon ? hackathon.title : 'Hackathon'} Registrations
                    </h1>
                    {hackathon && (
                        <p className="text-gray-400 mt-1" data-oid="hg8gnaz">
                            {new Date(hackathon.startDate).toLocaleDateString()} -{' '}
                            {new Date(hackathon.endDate).toLocaleDateString()} at{' '}
                            {hackathon.location}
                        </p>
                    )}
                </div>
            </div>

            {registrations.length === 0 ? (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
                    data-oid="m-nw6a2"
                >
                    <p className="text-gray-400" data-oid="nx.i0.r">
                        No registrations found for this hackathon.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="kq5ql4u"
                >
                    <div className="overflow-x-auto" data-oid="jxmi6oh">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="f1ytz9l">
                            <thead className="bg-gray-900" data-oid="_1p1._.">
                                <tr data-oid="aizmz30">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="d_kr7es"
                                    >
                                        Team Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="wc43op6"
                                    >
                                        Team Lead
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="ugt:7mo"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="c4u.v3h"
                                    >
                                        Team Size
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="7-:-uyv"
                                    >
                                        Track
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="i79vhju"
                                    >
                                        Registered At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="ij83721"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid="1xiuja:"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="sqg78hf"
                                        >
                                            {registration.teamName}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="byqqvmb"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="c2.do0b"
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="5v3j57r"
                                        >
                                            {registration.teamSize}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="hq:balm"
                                        >
                                            {registration.track}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="3j.zl:j"
                                        >
                                            {new Date(
                                                registration.registrationDate,
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
