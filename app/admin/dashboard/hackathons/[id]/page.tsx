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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="20tclhq">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="ywt5ex8"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="klpbuhy"
            >
                <p className="text-red-200" data-oid="z1k6iep">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="j3ggbrm"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="ljpfmtf">
            <div className="flex justify-between items-center mb-6" data-oid="1n81.o-">
                <div data-oid="f_mdk05">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="qtusefj"
                    >
                        <span className="mr-1" data-oid="p3koovf">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="hb.mp3j">
                        {hackathon ? hackathon.title : 'Hackathon'} Registrations
                    </h1>
                    {hackathon && (
                        <p className="text-gray-400 mt-1" data-oid="-v45v.z">
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
                    data-oid="e-0z1gl"
                >
                    <p className="text-gray-400" data-oid="k3obm77">
                        No registrations found for this hackathon.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="eyrcp5n"
                >
                    <div className="overflow-x-auto" data-oid=".nqsx8u">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="n7ahk9p">
                            <thead className="bg-gray-900" data-oid="zh3kol8">
                                <tr data-oid="6raj6gq">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="jxb4mhb"
                                    >
                                        Team Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="2xj9zev"
                                    >
                                        Team Lead
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="z.ek-u7"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="er:8df:"
                                    >
                                        Team Size
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="r120-9c"
                                    >
                                        Track
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid=":r2dl6d"
                                    >
                                        Registered At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="qyr6xt4"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid="4:ed:.8"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="8a8j:ld"
                                        >
                                            {registration.teamName}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="z47ffte"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="x9p269j"
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="9q.9g54"
                                        >
                                            {registration.teamSize}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="vy-lrq2"
                                        >
                                            {registration.track}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="mb1hrl6"
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
