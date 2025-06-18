'use client';

import { adminApi } from '@/lib/adminApi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface WorkshopRegistration {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    workshopId: {
        _id: string;
        title: string;
    };
    registrationDate: string;
}

interface Workshop {
    _id: string;
    title: string;
    date: string;
    location: string;
}

export default function WorkshopRegistrationsPage() {
    const params = useParams();
    const workshopId = params.id as string;

    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch workshop details and registrations in parallel
                const [workshopsData, registrationsData] = await Promise.all([
                    adminApi.workshops.getAll(),
                    adminApi.workshops.getRegistrations(workshopId),
                ]);

                // Find the specific workshop
                const workshopDetails = workshopsData.find((w: Workshop) => w._id === workshopId);
                if (workshopDetails) {
                    setWorkshop(workshopDetails);
                }

                setRegistrations(registrationsData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
                console.error('Error fetching workshop data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [workshopId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="4y1n3bw">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="rn.aqpn"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="ss4o:5n"
            >
                <p className="text-red-200" data-oid="qdwwm1s">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="k60hnu0"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="r:6z67z">
            <div className="flex justify-between items-center mb-6" data-oid="-85btzl">
                <div data-oid="fs38qx9">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="tdidjph"
                    >
                        <span className="mr-1" data-oid="sws:q8c">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="j9i6999">
                        {workshop ? workshop.title : 'Workshop'} Registrations
                    </h1>
                    {workshop && (
                        <p className="text-gray-400 mt-1" data-oid="rxre-l-">
                            {new Date(workshop.date).toLocaleDateString()} at {workshop.location}
                        </p>
                    )}
                </div>
            </div>

            {registrations.length === 0 ? (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
                    data-oid="lmg-iw-"
                >
                    <p className="text-gray-400" data-oid="wan60b6">
                        No registrations found for this workshop.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="2_k9d5v"
                >
                    <div className="overflow-x-auto" data-oid="4vw6ki_">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="2ww4e1.">
                            <thead className="bg-gray-900" data-oid="u_85zf0">
                                <tr data-oid="7r0hi46">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="ud5hrjs"
                                    >
                                        Participant Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="z3pmq0x"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="foz6k_4"
                                    >
                                        Registered At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="-lnln.b"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid="j29agwx"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="eox0scj"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="g49zw4p"
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="ii.9pe-"
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
