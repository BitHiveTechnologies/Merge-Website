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
        <div className="py-8 px-6 md:px-12 bg-black" data-oid="87-ylmg">
            <div className="max-w-6xl mx-auto" data-oid=":3ldqfc">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="w.nlg:x">
                    Your Registered Hackathons
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20" data-oid="evsm.j9">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="3n.jvl:"
                        ></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12" data-oid=":aolhb5">
                        <p className="text-red-400 mb-4" data-oid="t7:pfsl">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                            data-oid="y0s7h0q"
                        >
                            Retry
                        </button>
                    </div>
                ) : registrations.length === 0 ? (
                    <div
                        className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 p-8"
                        data-oid="rq2pn93"
                    >
                        <h3 className="text-xl font-semibold text-gray-300 mb-4" data-oid="1r4jeuc">
                            You haven't registered for any hackathons yet
                        </h3>
                        <p className="text-gray-400 mb-6" data-oid="1lm6845">
                            Explore our hackathons and register to showcase your skills!
                        </p>
                        <button
                            onClick={() => router.push('/hackathons')}
                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="np1usvb"
                        >
                            Browse Hackathons
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="-2ltp25">
                        {registrations.map((registration) => (
                            <div
                                key={registration._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleHackathonClick(registration.hackathonId._id)}
                                data-oid="56000v:"
                            >
                                <div className="relative h-48 overflow-hidden" data-oid="6norrna">
                                    <img
                                        src={registration.hackathonId.image}
                                        alt={registration.hackathonId.title}
                                        className="w-full h-full object-cover"
                                        data-oid="i0y3nkj"
                                    />

                                    <div
                                        className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                        data-oid="8:4xfsk"
                                    >
                                        Registered
                                    </div>
                                </div>
                                <div className="p-6" data-oid="dkpd_tv">
                                    <h3 className="text-xl font-semibold mb-2" data-oid="n:kdxu:">
                                        {registration.hackathonId.title}
                                    </h3>
                                    <p
                                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                                        data-oid="ti4pdad"
                                    >
                                        {registration.hackathonId.description}
                                    </p>
                                    <div
                                        className="flex justify-between text-gray-400 text-sm mb-4"
                                        data-oid="k9omb7o"
                                    >
                                        <span data-oid="pm-xuyd">
                                            {formatDate(registration.hackathonId.startDate)}
                                        </span>
                                        <span data-oid="yefb67b">
                                            to {formatDate(registration.hackathonId.endDate)}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center mb-4"
                                        data-oid="pktn:aj"
                                    >
                                        <span className="text-gray-300" data-oid="oiud42n">
                                            {registration.hackathonId.location}
                                        </span>
                                        <span
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                                            data-oid="na4-yi5"
                                        >
                                            {registration.hackathonId.isUpcoming
                                                ? 'Upcoming'
                                                : 'Past'}
                                        </span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-md" data-oid="1jd55m6">
                                        <div
                                            className="flex justify-between items-center mb-2"
                                            data-oid="82w:ct5"
                                        >
                                            <span
                                                className="text-sm font-medium text-purple-300"
                                                data-oid="gflqyem"
                                            >
                                                Team Details
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-300" data-oid="9vpxnxr">
                                            <p data-oid="c:4uaqs">
                                                <span className="text-gray-400" data-oid="d48jprn">
                                                    Team Name:
                                                </span>{' '}
                                                {registration.teamName}
                                            </p>
                                            <p data-oid="w_420u:">
                                                <span className="text-gray-400" data-oid="_12a82v">
                                                    Team Size:
                                                </span>{' '}
                                                {registration.teamSize}
                                            </p>
                                            <p data-oid="cppd6b2">
                                                <span className="text-gray-400" data-oid="mm97ava">
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
