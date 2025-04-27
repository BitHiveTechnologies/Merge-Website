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
    registeredAt: string;
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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="fsrdl-q">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="gidaxr2"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="4wdjq82"
            >
                <p className="text-red-200" data-oid="oefhys9">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="bonc-q0"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="q1m3z09">
            <div className="flex justify-between items-center mb-6" data-oid=":c:fenr">
                <div data-oid="e_2eu2n">
                    <Link
                        href="/admin/dashboard/workshops"
                        className="text-purple-400 hover:text-purple-300 transition-colors mb-2 inline-block"
                        data-oid="0ww.j_w"
                    >
                        ← Back to Workshops
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="ufdtvzz">
                        {workshop ? workshop.title : 'Workshop'} Registrations
                    </h1>
                    {workshop && (
                        <p className="text-gray-400 mt-1" data-oid="v5h41_e">
                            {new Date(workshop.date).toLocaleDateString()} at {workshop.location}
                        </p>
                    )}
                </div>
            </div>

            {registrations.length === 0 ? (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
                    data-oid="ktud281"
                >
                    <p className="text-gray-400" data-oid="rb21a4.">
                        No registrations found for this workshop.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="lb.zwm3"
                >
                    <div className="overflow-x-auto" data-oid="h-4.zhm">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="05wz:8_">
                            <thead className="bg-gray-900" data-oid="hyfl9mr">
                                <tr data-oid="wdg6gm9">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="kj13kcx"
                                    >
                                        Participant Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="lxc7saq"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="sddjy54"
                                    >
                                        Registered At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="e--qehb"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid="6hx.kz4"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="q0n6pcf"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="ksl-p0d"
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="f9wd_l9"
                                        >
                                            {new Date(
                                                registration.registeredAt,
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
