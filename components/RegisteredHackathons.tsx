'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/auth';
import { userApi } from '@/lib/api';

// Hackathon type definition
interface Hackathon {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    prizes: string[];
    image: string;
    isUpcoming: boolean;
    tracks: string[];
}

interface HackathonRegistration {
    _id: string;
    userId: string;
    hackathonId: Hackathon;
    teamName: string;
    teamSize: number;
    track: string;
}

export default function RegisteredHackathons() {
    const router = useRouter();
    const [registrations, setRegistrations] = useState<HackathonRegistration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch registered hackathons from backend
    useEffect(() => {
        const fetchRegisteredHackathons = async () => {
            setIsLoading(true);
            try {
                const token = getAuthToken();
                if (!token) {
                    router.push('/login');
                    return;
                }

                const registrationsData = await userApi.getRegistrations();
                // Extract hackathon registrations from the response
                setRegistrations(registrationsData.hackathons || []);
            } catch (error) {
                console.error('Error fetching registered hackathons:', error);
                setError('Failed to load your registered hackathons. Please try again later.');
                setRegistrations([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRegisteredHackathons();
    }, [router]);

    // Navigate to hackathon detail
    const handleHackathonClick = (hackathonId: string) => {
        router.push(`/hackathons/${hackathonId}`);
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
        <div className="py-8 px-6 md:px-12 bg-black" data-oid="3cvlc-e">
            <div className="max-w-6xl mx-auto" data-oid="h6-7hw-">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="tq_udvq">
                    Your Registered Hackathons
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20" data-oid="0u:27xi">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="yi0qkqj"
                        ></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12" data-oid="f_gbstt">
                        <p className="text-red-400 mb-4" data-oid="9xp4vya">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                            data-oid="0wc6iy4"
                        >
                            Retry
                        </button>
                    </div>
                ) : registrations.length === 0 ? (
                    <div
                        className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 p-8"
                        data-oid="vo6.t1t"
                    >
                        <h3 className="text-xl font-semibold text-gray-300 mb-4" data-oid="hwt3b_m">
                            You haven't registered for any hackathons yet
                        </h3>
                        <p className="text-gray-400 mb-6" data-oid="ho21qj3">
                            Explore our hackathons and register to showcase your skills!
                        </p>
                        <button
                            onClick={() => router.push('/hackathons')}
                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="2-k_08n"
                        >
                            Browse Hackathons
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="cis4x0n">
                        {registrations.map((registration) => (
                            <div
                                key={registration._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleHackathonClick(registration.hackathonId._id)}
                                data-oid="tpxhph2"
                            >
                                <div className="relative h-48 overflow-hidden" data-oid="9wk8z9v">
                                    <img
                                        src={registration.hackathonId.image}
                                        alt={registration.hackathonId.title}
                                        className="w-full h-full object-cover"
                                        data-oid=".shid.2"
                                    />

                                    <div
                                        className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                        data-oid="d6f.8gk"
                                    >
                                        Registered
                                    </div>
                                </div>
                                <div className="p-6" data-oid="v7o6aci">
                                    <h3 className="text-xl font-semibold mb-2" data-oid="0s-0e4a">
                                        {registration.hackathonId.title}
                                    </h3>
                                    <p
                                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                                        data-oid=":xjem17"
                                    >
                                        {registration.hackathonId.description}
                                    </p>
                                    <div
                                        className="flex justify-between text-gray-400 text-sm mb-4"
                                        data-oid="m:wiq0o"
                                    >
                                        <span data-oid="w34k6_6">
                                            {formatDate(registration.hackathonId.startDate)}
                                        </span>
                                        <span data-oid="2ho44:i">
                                            to {formatDate(registration.hackathonId.endDate)}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center mb-4"
                                        data-oid="6..5w1o"
                                    >
                                        <span className="text-gray-300" data-oid="lcooeci">
                                            {registration.hackathonId.location}
                                        </span>
                                        <span
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                                            data-oid="nbuvd50"
                                        >
                                            {registration.hackathonId.isUpcoming
                                                ? 'Upcoming'
                                                : 'Past'}
                                        </span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-md" data-oid="yy7a60f">
                                        <div
                                            className="flex justify-between items-center mb-2"
                                            data-oid="6vkk4l1"
                                        >
                                            <span
                                                className="text-sm font-medium text-purple-300"
                                                data-oid="p8izd-j"
                                            >
                                                Team Details
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-300" data-oid="7920ppn">
                                            <p data-oid="jlfb2ki">
                                                <span className="text-gray-400" data-oid="6wc8j0w">
                                                    Team Name:
                                                </span>{' '}
                                                {registration.teamName}
                                            </p>
                                            <p data-oid="46qvfh_">
                                                <span className="text-gray-400" data-oid="06ee-fq">
                                                    Team Size:
                                                </span>{' '}
                                                {registration.teamSize}
                                            </p>
                                            <p data-oid="j:5vukv">
                                                <span className="text-gray-400" data-oid="d-t97vf">
                                                    Track:
                                                </span>{' '}
                                                {registration.track}
                                            </p>
                                        </div>
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
