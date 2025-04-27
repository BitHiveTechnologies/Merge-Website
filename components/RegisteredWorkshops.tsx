'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/auth';
import { userApi } from '@/lib/api';

// Workshop type definition
interface Workshop {
    _id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    instructor: string;
    description: string;
    price: number | 'Free';
    image: string;
    isUpcoming: boolean;
    tags: string[];
}

interface WorkshopRegistration {
    _id: string;
    userId: string;
    workshopId: Workshop;
}

export default function RegisteredWorkshops() {
    const router = useRouter();
    const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch registered workshops from backend
    useEffect(() => {
        const fetchRegisteredWorkshops = async () => {
            setIsLoading(true);
            try {
                const token = getAuthToken();
                if (!token) {
                    router.push('/login');
                    return;
                }

                const registrationsData = await userApi.getRegistrations();
                // Extract workshop registrations from the response
                setRegistrations(registrationsData.workshops || []);
            } catch (error) {
                console.error('Error fetching registered workshops:', error);
                setError('Failed to load your registered workshops. Please try again later.');
                setRegistrations([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRegisteredWorkshops();
    }, [router]);

    // Navigate to workshop detail
    const handleWorkshopClick = (workshopId: string) => {
        router.push(`/workshops/${workshopId}`);
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    return (
        <div className="py-8 px-6 md:px-12 bg-black" data-oid="o0n86s1">
            <div className="max-w-6xl mx-auto" data-oid="s6c1mq4">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="xn6_e-9">
                    Your Registered Workshops
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20" data-oid=".t_2j2o">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="4ubjzi8"
                        ></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12" data-oid="c2pj.n:">
                        <p className="text-red-400 mb-4" data-oid="ss17f0v">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                            data-oid="4c56u3-"
                        >
                            Retry
                        </button>
                    </div>
                ) : registrations.length === 0 ? (
                    <div
                        className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 p-8"
                        data-oid="u0kb3mv"
                    >
                        <h3 className="text-xl font-semibold text-gray-300 mb-4" data-oid="o2572u4">
                            You haven't registered for any workshops yet
                        </h3>
                        <p className="text-gray-400 mb-6" data-oid="8bq0qos">
                            Explore our workshops and register to enhance your skills!
                        </p>
                        <button
                            onClick={() => router.push('/workshops')}
                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="vlv1o1."
                        >
                            Browse Workshops
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="mc9lgvq">
                        {registrations.map((registration) => (
                            <div
                                key={registration._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleWorkshopClick(registration.workshopId._id)}
                                data-oid="8joskzm"
                            >
                                <div className="relative h-48 overflow-hidden" data-oid="khm.gp2">
                                    <img
                                        src={registration.workshopId.image}
                                        alt={registration.workshopId.title}
                                        className="w-full h-full object-cover"
                                        data-oid="ga5893y"
                                    />

                                    <div
                                        className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                        data-oid=":q3e4g."
                                    >
                                        Registered
                                    </div>
                                </div>
                                <div className="p-6" data-oid="spl4leb">
                                    <h3 className="text-xl font-semibold mb-2" data-oid="g49oygk">
                                        {registration.workshopId.title}
                                    </h3>
                                    <p
                                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                                        data-oid="j0uhc8v"
                                    >
                                        {registration.workshopId.description}
                                    </p>
                                    <div className="flex items-center mb-3" data-oid="sxlappn">
                                        <div
                                            className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                            data-oid="u4nopfp"
                                        ></div>
                                        <span className="text-gray-300 text-sm" data-oid="kguduv1">
                                            {registration.workshopId.instructor}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between text-gray-400 text-sm mb-4"
                                        data-oid="og1loms"
                                    >
                                        <span data-oid="xw6i.1-">
                                            {formatDate(registration.workshopId.date)}
                                        </span>
                                        <span data-oid="t4yr1ve">
                                            {registration.workshopId.time}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center"
                                        data-oid="fz3vzp8"
                                    >
                                        <span className="text-gray-300" data-oid="3i:_s4h">
                                            {registration.workshopId.location}
                                        </span>
                                        <span
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                                            data-oid="pl.julo"
                                        >
                                            {registration.workshopId.isUpcoming
                                                ? 'Upcoming'
                                                : 'Past'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
