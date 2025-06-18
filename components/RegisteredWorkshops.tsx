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
        <div className="py-8 px-6 md:px-12 bg-black" data-oid="w48opcn">
            <div className="max-w-6xl mx-auto" data-oid=":p06t51">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="bdnlwto">
                    Your Registered Workshops
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20" data-oid="a:mu77u">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="1evg95q"
                        ></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12" data-oid="o8_yvh_">
                        <p className="text-red-400 mb-4" data-oid="e0s1nvo">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                            data-oid="d182bmr"
                        >
                            Retry
                        </button>
                    </div>
                ) : registrations.length === 0 ? (
                    <div
                        className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 p-8"
                        data-oid="e.2lfld"
                    >
                        <h3 className="text-xl font-semibold text-gray-300 mb-4" data-oid="n8zr1jx">
                            You haven't registered for any workshops yet
                        </h3>
                        <p className="text-gray-400 mb-6" data-oid="12v.:of">
                            Explore our workshops and register to enhance your skills!
                        </p>
                        <button
                            onClick={() => router.push('/workshops')}
                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="ok35k51"
                        >
                            Browse Workshops
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="ukem71g">
                        {registrations.map((registration) => (
                            <div
                                key={registration._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleWorkshopClick(registration.workshopId._id)}
                                data-oid="._edden"
                            >
                                <div className="relative h-48 overflow-hidden" data-oid="5-vqp8q">
                                    <img
                                        src={registration.workshopId.image}
                                        alt={registration.workshopId.title}
                                        className="w-full h-full object-cover"
                                        data-oid="l2r4kuc"
                                    />

                                    <div
                                        className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                        data-oid="olde9s8"
                                    >
                                        Registered
                                    </div>
                                </div>
                                <div className="p-6" data-oid="fq3ik17">
                                    <h3 className="text-xl font-semibold mb-2" data-oid="fs85gak">
                                        {registration.workshopId.title}
                                    </h3>
                                    <p
                                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                                        data-oid="7wxbyma"
                                    >
                                        {registration.workshopId.description}
                                    </p>
                                    <div className="flex items-center mb-3" data-oid="o4y0dzk">
                                        <div
                                            className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                            data-oid="a6:msxj"
                                        ></div>
                                        <span className="text-gray-300 text-sm" data-oid="xfiw-3-">
                                            {registration.workshopId.instructor}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between text-gray-400 text-sm mb-4"
                                        data-oid="f62al5i"
                                    >
                                        <span data-oid="e.0v:mg">
                                            {formatDate(registration.workshopId.date)}
                                        </span>
                                        <span data-oid="0-x0a3b">
                                            {registration.workshopId.time}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center"
                                        data-oid="wj.ub4a"
                                    >
                                        <span className="text-gray-300" data-oid="m8v4-k8">
                                            {registration.workshopId.location}
                                        </span>
                                        <span
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                                            data-oid="67ia8g4"
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
