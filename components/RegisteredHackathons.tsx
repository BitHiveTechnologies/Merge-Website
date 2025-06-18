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
        <div className="py-8 px-6 md:px-12 bg-black" data-oid="pjo3fe0">
            <div className="max-w-6xl mx-auto" data-oid="u4z35ps">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="1dh88_x">
                    Your Registered Hackathons
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20" data-oid="mcufgnq">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="uxboo42"
                        ></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12" data-oid="89dnfx7">
                        <p className="text-red-400 mb-4" data-oid="rrasttf">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                            data-oid="3dt49sx"
                        >
                            Retry
                        </button>
                    </div>
                ) : registrations.length === 0 ? (
                    <div
                        className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 p-8"
                        data-oid="t2a8ok-"
                    >
                        <h3 className="text-xl font-semibold text-gray-300 mb-4" data-oid=".htvn77">
                            You haven't registered for any hackathons yet
                        </h3>
                        <p className="text-gray-400 mb-6" data-oid="m5lj.01">
                            Explore our hackathons and register to showcase your skills!
                        </p>
                        <button
                            onClick={() => router.push('/hackathons')}
                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="stb:fs0"
                        >
                            Browse Hackathons
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="v6xy4s0">
                        {registrations.map((registration) => (
                            <div
                                key={registration._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleHackathonClick(registration.hackathonId._id)}
                                data-oid="xo6nfgd"
                            >
                                <div className="relative h-48 overflow-hidden" data-oid="i8k11yn">
                                    <img
                                        src={registration.hackathonId.image}
                                        alt={registration.hackathonId.title}
                                        className="w-full h-full object-cover"
                                        data-oid="zz8c1dy"
                                    />

                                    <div
                                        className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                        data-oid="zat_2hv"
                                    >
                                        Registered
                                    </div>
                                </div>
                                <div className="p-6" data-oid="59c:g-7">
                                    <h3 className="text-xl font-semibold mb-2" data-oid="h3gyin3">
                                        {registration.hackathonId.title}
                                    </h3>
                                    <p
                                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                                        data-oid="rxr-2bc"
                                    >
                                        {registration.hackathonId.description}
                                    </p>
                                    <div
                                        className="flex justify-between text-gray-400 text-sm mb-4"
                                        data-oid="hm6_4in"
                                    >
                                        <span data-oid="xrq.twi">
                                            {formatDate(registration.hackathonId.startDate)}
                                        </span>
                                        <span data-oid="m_8frsq">
                                            to {formatDate(registration.hackathonId.endDate)}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center mb-4"
                                        data-oid="_dwmgjx"
                                    >
                                        <span className="text-gray-300" data-oid="-nj.thv">
                                            {registration.hackathonId.location}
                                        </span>
                                        <span
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                                            data-oid="07.6z_8"
                                        >
                                            {registration.hackathonId.isUpcoming
                                                ? 'Upcoming'
                                                : 'Past'}
                                        </span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-md" data-oid="7o8dt1r">
                                        <div
                                            className="flex justify-between items-center mb-2"
                                            data-oid="tar5t8f"
                                        >
                                            <span
                                                className="text-sm font-medium text-purple-300"
                                                data-oid="zhht.tb"
                                            >
                                                Team Details
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-300" data-oid="s8_7z9n">
                                            <p data-oid="gtjcepu">
                                                <span className="text-gray-400" data-oid="bbd8fpp">
                                                    Team Name:
                                                </span>{' '}
                                                {registration.teamName}
                                            </p>
                                            <p data-oid="_0rdjyy">
                                                <span className="text-gray-400" data-oid="ftq8eu_">
                                                    Team Size:
                                                </span>{' '}
                                                {registration.teamSize}
                                            </p>
                                            <p data-oid="x8_lcp2">
                                                <span className="text-gray-400" data-oid="tro9ksi">
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
