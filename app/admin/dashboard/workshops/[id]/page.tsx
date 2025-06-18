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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="-h8.4u4">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="1xr5tcp"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="oqdnfhh"
            >
                <p className="text-red-200" data-oid="ihy5h6o">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="ngaijrf"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="t3tqaq8">
            <div className="flex justify-between items-center mb-6" data-oid="xax5vs7">
                <div data-oid="f1uf6la">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="fl6_vl2"
                    >
                        <span className="mr-1" data-oid="atcyc-w">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="avg-jd:">
                        {workshop ? workshop.title : 'Workshop'} Registrations
                    </h1>
                    {workshop && (
                        <p className="text-gray-400 mt-1" data-oid="nn65lbs">
                            {new Date(workshop.date).toLocaleDateString()} at {workshop.location}
                        </p>
                    )}
                </div>
            </div>

            {registrations.length === 0 ? (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
                    data-oid="a3pk0c4"
                >
                    <p className="text-gray-400" data-oid="vu5kbtj">
                        No registrations found for this workshop.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="f71c2tb"
                >
                    <div className="overflow-x-auto" data-oid="r69lorf">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="67-qh.:">
                            <thead className="bg-gray-900" data-oid="sll71ma">
                                <tr data-oid="6a4pav5">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="-g7v6zq"
                                    >
                                        Participant Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="sv9fqs:"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="_ccvb.w"
                                    >
                                        Registered At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="z9u_t39"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid="a8qj30k"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="qw4zcle"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="6yk5:fu"
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="xohomt-"
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
