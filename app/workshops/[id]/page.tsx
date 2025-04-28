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
        if (!price) return 'Free';
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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="den48rm">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="cuvoof1" />

            {/* Workshop Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="zaswtha">
                <div className="max-w-6xl mx-auto" data-oid="9jigd0t">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="zaxfuys">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="vn9u7js"
                            ></div>
                        </div>
                    ) : workshop ? (
                        <div data-oid="p0a5i8q">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/workshops')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="kpp5iym"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="4h7jyrj"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="vd5k4oh"
                                    />
                                </svg>
                                Back to Workshops
                            </button>

                            {/* Workshop header */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12" data-oid="of.x0d2">
                                <div
                                    className="relative h-64 md:h-full rounded-xl overflow-hidden"
                                    data-oid="agrk4vo"
                                >
                                    <img
                                        src={workshop.image}
                                        alt={workshop.title}
                                        className="w-full h-full object-cover"
                                        data-oid="7v5yns-"
                                    />
                                </div>
                                <div className="flex flex-col justify-between" data-oid="j9334c-">
                                    <div data-oid="kfd9dym">
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="zx:axtg"
                                        >
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                                    data-oid="oxq2ieu"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="fd1ms:n"
                                        >
                                            {workshop.title}
                                        </h1>
                                        <p className="text-gray-300 mb-6" data-oid="etq3g02">
                                            {workshop.description}
                                        </p>

                                        <div
                                            className="grid grid-cols-2 gap-4 mb-6"
                                            data-oid="j:.eke8"
                                        >
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="mcik3g_"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="dfh:aw0"
                                                >
                                                    Date
                                                </div>
                                                <div className="font-medium" data-oid="p:ymuyk">
                                                    {formatDate(workshop.date)}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="z9dzqg0"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="8:l0zgt"
                                                >
                                                    Time
                                                </div>
                                                <div className="font-medium" data-oid="ezxj6th">
                                                    {workshop.time}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="ra8hiq1"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="o__has8"
                                                >
                                                    Location
                                                </div>
                                                <div className="font-medium" data-oid=".jnzktr">
                                                    {workshop.location}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="157bqvu"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="bv6qfi2"
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
                                                    data-oid="kejml28"
                                                >
                                                    {formatPrice(workshop.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Countdown timer */}
                                    {workshop.isUpcoming && timeRemaining && (
                                        <div className="mb-6" data-oid="39ng4is">
                                            <h3
                                                className="text-lg font-semibold mb-3"
                                                data-oid="jw_l2ky"
                                            >
                                                Workshop starts in:
                                            </h3>
                                            <div
                                                className="grid grid-cols-4 gap-2 text-center"
                                                data-oid="9g4t-xs"
                                            >
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="riveqtt"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="b_hn27b"
                                                    >
                                                        {timeRemaining.days}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="96q-.lp"
                                                    >
                                                        Days
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="e2:8s1k"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="wrtal1t"
                                                    >
                                                        {timeRemaining.hours}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="tynuwy6"
                                                    >
                                                        Hours
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="4ws8kyb"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="l3lu-um"
                                                    >
                                                        {timeRemaining.minutes}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="trr1.q."
                                                    >
                                                        Minutes
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="eojcoiw"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="5eihn4i"
                                                    >
                                                        {timeRemaining.seconds}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="c9dners"
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
                                            data-oid="pib2c6h"
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
                                            data-oid="1627rsz"
                                        >
                                            {registrationLoading ? 'Processing...' : 'Register Now'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Workshop details */}
                            <div className="grid md:grid-cols-3 gap-8" data-oid="vrp.-4i">
                                <div className="md:col-span-2" data-oid="ou-:0e:">
                                    {/* About the workshop */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6 mb-8"
                                        data-oid="rkd-in."
                                    >
                                        <h2 className="text-2xl font-bold mb-4" data-oid="382asy.">
                                            About the Workshop
                                        </h2>
                                        <div className="text-gray-300 space-y-4" data-oid="4plfkit">
                                            {workshop.longDescription
                                                ?.split('\n\n')
                                                .map((paragraph, index) => (
                                                    <p key={index} data-oid="m:4zyud">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Workshop agenda */}
                                    {workshop.agenda && (
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="m_ilq7z"
                                        >
                                            <h2
                                                className="text-2xl font-bold mb-4"
                                                data-oid="xi5p.e7"
                                            >
                                                Workshop Agenda
                                            </h2>
                                            <div className="space-y-6" data-oid="bsahvnf">
                                                {workshop.agenda.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex"
                                                        data-oid="hk3y45p"
                                                    >
                                                        <div
                                                            className="w-1/4 text-purple-400 font-medium"
                                                            data-oid="21l4hr-"
                                                        >
                                                            {item.time}
                                                        </div>
                                                        <div className="w-3/4" data-oid="jc180gg">
                                                            <h3
                                                                className="font-semibold mb-1"
                                                                data-oid="k_aicbx"
                                                            >
                                                                {item.title}
                                                            </h3>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="svzd3m-"
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

                                <div data-oid="612rvq4">
                                    {/* Instructor info */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6"
                                        data-oid="wakehj8"
                                    >
                                        <h2 className="text-xl font-bold mb-4" data-oid="dnnxsfm">
                                            Instructor
                                        </h2>
                                        <div className="flex items-center mb-4" data-oid="kcpc1fi">
                                            <div
                                                className="w-16 h-16 rounded-full overflow-hidden mr-4"
                                                data-oid="f-:6._d"
                                            >
                                                <img
                                                    src={
                                                        'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                    }
                                                    alt={workshop.instructor}
                                                    className="w-full h-full object-cover"
                                                    data-oid="1:7l:0h"
                                                />
                                            </div>
                                            <div data-oid="gkd1d5c">
                                                <h3
                                                    className="font-semibold text-lg"
                                                    data-oid="kp5dd4a"
                                                >
                                                    {workshop.instructor}
                                                </h3>
                                                <p
                                                    className="text-purple-400 text-sm"
                                                    data-oid="j2w5ib4"
                                                >
                                                    Workshop Instructor
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="u3nspnn">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="s8jizd:"
                            >
                                Workshop not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="n.kfwae">
                                The workshop you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/workshops')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="ct8gud5"
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
                data-oid="c:zts9k"
            >
                <div className="max-w-6xl mx-auto" data-oid="8xys_8w">
                    <div className="text-center text-gray-500" data-oid="q461yhw">
                        <p data-oid="o5tg13v">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
