'use client';

import { useState, useEffect } from 'react';
import { isAuthenticated, getAuthToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { BACKEND_URL, cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

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
    registrationLink: string;
    isUpcoming: boolean;
    tags: string[];
    longDescription?: string;
    agenda?: { time: string; title: string; description: string }[];
    instructorBio?: string;
    instructorImage?: string;
}

interface WorkshopRegistration {
    _id: string;
    userId: string;
    workshopId: string;
}

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationLoading, setRegistrationLoading] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    // Fetch workshop details from API
    useEffect(() => {
        const fetchWorkshopDetails = async () => {
            setIsLoading(true);
            try {
                // Fetch workshop details
                const response = await fetch(`${BACKEND_URL}/api/workshops/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch workshop details');
                }

                const workshopData = await response.json();
                setWorkshop(workshopData);

                // Check if user is registered for this workshop
                if (isAuthenticated()) {
                    const token = getAuthToken();
                    const registrationsResponse = await fetch(
                        `${BACKEND_URL}/api/workshops/registrations`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    if (registrationsResponse.ok) {
                        const registrations = await registrationsResponse.json();
                        const isAlreadyRegistered = registrations.some(
                            (reg: WorkshopRegistration) => reg.workshopId === params.id,
                        );
                        setIsRegistered(isAlreadyRegistered);
                    }
                }
            } catch (error) {
                console.error('Error fetching workshop details:', error);
                setWorkshop(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkshopDetails();
    }, [params.id]);

    // Calculate time remaining for countdown timer
    useEffect(() => {
        if (!workshop || !workshop.isUpcoming) return;

        const calculateTimeRemaining = () => {
            const workshopDate = new Date(workshop.date);
            const now = new Date();

            // Parse the time string to get hours and minutes
            const timeString = workshop.time.split(' - ')[0]; // Get start time
            const [time, period] = timeString.split(' ');
            const [hours, minutes] = time.split(':').map(Number);

            // Set the hours and minutes on the workshop date
            workshopDate.setHours(
                period === 'PM' && hours !== 12
                    ? hours + 12
                    : hours === 12 && period === 'AM'
                      ? 0
                      : hours,
                minutes,
                0,
                0,
            );

            const difference = workshopDate.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeRemaining(null);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours: hoursRemaining, minutes: minutesRemaining, seconds });
        };

        calculateTimeRemaining();
        const timer = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(timer);
    }, [workshop]);

    // Format price for display
    const formatPrice = (price: number | 'Free') => {
        if (price === 'Free') return 'Free';
        return `₹${price.toLocaleString('en-IN')}`;
    };

    // Handle workshop registration
    const handleRegister = async () => {
        if (!isAuthenticated()) {
            // Redirect to login if not authenticated
            router.push('/login');
            return;
        }

        setRegistrationLoading(true);
        try {
            const token = getAuthToken();
            const response = await fetch(`${BACKEND_URL}/api/workshops/register/${params.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.msg === 'Already registered') {
                    setIsRegistered(true);
                    alert('You are already registered for this workshop.');
                } else {
                    throw new Error('Registration failed');
                }
            } else {
                const data = await response.json();
                setIsRegistered(true);
                alert('Successfully registered for the workshop!');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to register. Please try again.');
        } finally {
            setRegistrationLoading(false);
        }
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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="_4qv.pt">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="ltuk4x:" />

            {/* Workshop Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="ad.wf4f">
                <div className="max-w-6xl mx-auto" data-oid="en9.s6g">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="lz:xwk-">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="vicj_-f"
                            ></div>
                        </div>
                    ) : workshop ? (
                        <div data-oid="y2zfbji">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/workshops')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="ug90q.b"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid=".mbiqjg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="ugs5yc2"
                                    />
                                </svg>
                                Back to Workshops
                            </button>

                            {/* Workshop header */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12" data-oid="lrz3aks">
                                <div
                                    className="relative h-64 md:h-full rounded-xl overflow-hidden"
                                    data-oid="92k4eku"
                                >
                                    <img
                                        src={workshop.image}
                                        alt={workshop.title}
                                        className="w-full h-full object-cover"
                                        data-oid="nqd4d4u"
                                    />
                                </div>
                                <div className="flex flex-col justify-between" data-oid="77dxvxc">
                                    <div data-oid="wcwueim">
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="mxx2nin"
                                        >
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                                    data-oid="c7q_xpp"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="cbel0fe"
                                        >
                                            {workshop.title}
                                        </h1>
                                        <p className="text-gray-300 mb-6" data-oid="ca2p5_t">
                                            {workshop.description}
                                        </p>

                                        <div
                                            className="grid grid-cols-2 gap-4 mb-6"
                                            data-oid="gks85bv"
                                        >
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="tzh4m3u"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid=":5x1lva"
                                                >
                                                    Date
                                                </div>
                                                <div className="font-medium" data-oid="o3edyra">
                                                    {formatDate(workshop.date)}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="39g5_yn"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="fic3ywd"
                                                >
                                                    Time
                                                </div>
                                                <div className="font-medium" data-oid="08j8dlr">
                                                    {workshop.time}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="ny-32tq"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="p:lvzck"
                                                >
                                                    Location
                                                </div>
                                                <div className="font-medium" data-oid="l2ac4fa">
                                                    {workshop.location}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="86cn-j7"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="axe4pqm"
                                                >
                                                    Price
                                                </div>
                                                <div
                                                    className={cn(
                                                        'font-medium',
                                                        workshop.price === 'Free'
                                                            ? 'text-green-400'
                                                            : 'text-white',
                                                    )}
                                                    data-oid="gae:g30"
                                                >
                                                    {formatPrice(workshop.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Countdown timer */}
                                    {workshop.isUpcoming && timeRemaining && (
                                        <div className="mb-6" data-oid="5mlr-zk">
                                            <h3
                                                className="text-lg font-semibold mb-3"
                                                data-oid="9d.7a91"
                                            >
                                                Workshop starts in:
                                            </h3>
                                            <div
                                                className="grid grid-cols-4 gap-2 text-center"
                                                data-oid="v.rfd38"
                                            >
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="8pw34oi"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="2gblr.c"
                                                    >
                                                        {timeRemaining.days}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="vuxph1l"
                                                    >
                                                        Days
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="uv7v4bo"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="juq3nch"
                                                    >
                                                        {timeRemaining.hours}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="jk_a_p2"
                                                    >
                                                        Hours
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="arct886"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="u3f7mdj"
                                                    >
                                                        {timeRemaining.minutes}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="szdi-as"
                                                    >
                                                        Minutes
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="otcfofg"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="32xyibc"
                                                    >
                                                        {timeRemaining.seconds}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="fx0n2dh"
                                                    >
                                                        Seconds
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isRegistered ? (
                                        <button
                                            disabled
                                            className="w-full py-3 rounded-md bg-green-600 text-center font-medium cursor-default"
                                            data-oid="ymmeiic"
                                        >
                                            Already Registered
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleRegister}
                                            disabled={registrationLoading}
                                            className={`w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium ${
                                                registrationLoading ? 'opacity-70 cursor-wait' : ''
                                            }`}
                                            data-oid="rp-jyek"
                                        >
                                            {registrationLoading ? 'Processing...' : 'Register Now'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Workshop details */}
                            <div className="grid md:grid-cols-3 gap-8" data-oid="88bylv0">
                                <div className="md:col-span-2" data-oid="o0249cv">
                                    {/* About the workshop */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6 mb-8"
                                        data-oid="lxlr41j"
                                    >
                                        <h2 className="text-2xl font-bold mb-4" data-oid="4l9tlil">
                                            About the Workshop
                                        </h2>
                                        <div className="text-gray-300 space-y-4" data-oid="1p06sun">
                                            {workshop.longDescription
                                                ?.split('\n\n')
                                                .map((paragraph, index) => (
                                                    <p key={index} data-oid="koj1yt7">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Workshop agenda */}
                                    {workshop.agenda && (
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="5a-.7wf"
                                        >
                                            <h2
                                                className="text-2xl font-bold mb-4"
                                                data-oid=":.akkit"
                                            >
                                                Workshop Agenda
                                            </h2>
                                            <div className="space-y-6" data-oid="71:5am:">
                                                {workshop.agenda.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex"
                                                        data-oid="6mqd0u8"
                                                    >
                                                        <div
                                                            className="w-1/4 text-purple-400 font-medium"
                                                            data-oid="-45.-ys"
                                                        >
                                                            {item.time}
                                                        </div>
                                                        <div className="w-3/4" data-oid="xxqixtj">
                                                            <h3
                                                                className="font-semibold mb-1"
                                                                data-oid="gjk1_d2"
                                                            >
                                                                {item.title}
                                                            </h3>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="vd:nj8-"
                                                            >
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div data-oid="7g1jfcw">
                                    {/* Instructor info */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6"
                                        data-oid="mwz-9jt"
                                    >
                                        <h2 className="text-xl font-bold mb-4" data-oid="xn14_51">
                                            Instructor
                                        </h2>
                                        <div className="flex items-center mb-4" data-oid="dxpxq42">
                                            <div
                                                className="w-16 h-16 rounded-full overflow-hidden mr-4"
                                                data-oid="ufqyw6x"
                                            >
                                                <img
                                                    src={
                                                        workshop.instructorImage ||
                                                        'https://via.placeholder.com/150'
                                                    }
                                                    alt={workshop.instructor}
                                                    className="w-full h-full object-cover"
                                                    data-oid="x2kli.i"
                                                />
                                            </div>
                                            <div data-oid="qd778ed">
                                                <h3
                                                    className="font-semibold text-lg"
                                                    data-oid="3qqer:p"
                                                >
                                                    {workshop.instructor}
                                                </h3>
                                                <p
                                                    className="text-purple-400 text-sm"
                                                    data-oid="m:ilyom"
                                                >
                                                    Workshop Instructor
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 text-sm" data-oid="rc1uv42">
                                            {workshop.instructorBio || 'No bio available.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="vchlnff">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="tx:y2hg"
                            >
                                Workshop not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="_d71gw4">
                                The workshop you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/workshops')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="_q3gaz0"
                            >
                                Back to Workshops
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="l9cfh5h"
            >
                <div className="max-w-6xl mx-auto" data-oid=":i2uvk5">
                    <div className="text-center text-gray-500" data-oid="ue.m:b2">
                        <p data-oid="d5eee45">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
