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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="iguvi9r">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="i594_j-" />

            {/* Workshop Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="9.a-df.">
                <div className="max-w-6xl mx-auto" data-oid="fsnu2eh">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="dvumxd0">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="xc2t8zf"
                            ></div>
                        </div>
                    ) : workshop ? (
                        <div data-oid="-xdnejc">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/workshops')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="_yo4d4k"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="-onlt5o"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="xy9ht3k"
                                    />
                                </svg>
                                Back to Workshops
                            </button>

                            {/* Workshop header */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12" data-oid="1qesefx">
                                <div
                                    className="relative h-64 md:h-full rounded-xl overflow-hidden"
                                    data-oid="ixeohpq"
                                >
                                    <img
                                        src={workshop.image}
                                        alt={workshop.title}
                                        className="w-full h-full object-cover"
                                        data-oid="s6w7ab-"
                                    />
                                </div>
                                <div className="flex flex-col justify-between" data-oid="rvxu2:d">
                                    <div data-oid="em-0dpl">
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="5u.7a-6"
                                        >
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                                    data-oid="rnn0nlk"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="tyk-z1m"
                                        >
                                            {workshop.title}
                                        </h1>
                                        <p className="text-gray-300 mb-6" data-oid="lvpiwb_">
                                            {workshop.description}
                                        </p>

                                        <div
                                            className="grid grid-cols-2 gap-4 mb-6"
                                            data-oid="0qcjw-o"
                                        >
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="46rr:bx"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="7b4347z"
                                                >
                                                    Date
                                                </div>
                                                <div className="font-medium" data-oid="mc5k8j:">
                                                    {formatDate(workshop.date)}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="yhmvbhp"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="e4a..0x"
                                                >
                                                    Time
                                                </div>
                                                <div className="font-medium" data-oid="j.h96_d">
                                                    {workshop.time}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="dr0kyxl"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="h7rwt6s"
                                                >
                                                    Location
                                                </div>
                                                <div className="font-medium" data-oid="cgew-2k">
                                                    {workshop.location}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="7y...-q"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="pn4bpfi"
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
                                                    data-oid="5wzwawn"
                                                >
                                                    {formatPrice(workshop.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Countdown timer */}
                                    {workshop.isUpcoming && timeRemaining && (
                                        <div className="mb-6" data-oid="x75n04o">
                                            <h3
                                                className="text-lg font-semibold mb-3"
                                                data-oid="7c32sb2"
                                            >
                                                Workshop starts in:
                                            </h3>
                                            <div
                                                className="grid grid-cols-4 gap-2 text-center"
                                                data-oid="swspg6t"
                                            >
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="wml4w4_"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="cryt__-"
                                                    >
                                                        {timeRemaining.days}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="u2i0qvn"
                                                    >
                                                        Days
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="xxpcua2"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="4-u3_ro"
                                                    >
                                                        {timeRemaining.hours}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="9jsxf8l"
                                                    >
                                                        Hours
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="s23bny2"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="va_2zon"
                                                    >
                                                        {timeRemaining.minutes}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="si::0:-"
                                                    >
                                                        Minutes
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="u__ws4r"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="kv79pp-"
                                                    >
                                                        {timeRemaining.seconds}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="1:wd1-r"
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
                                            data-oid="gvyfv8e"
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
                                            data-oid="qi2u00w"
                                        >
                                            {registrationLoading ? 'Processing...' : 'Register Now'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Workshop details */}
                            <div className="grid md:grid-cols-3 gap-8" data-oid=".nkq3-0">
                                <div className="md:col-span-2" data-oid="z5gh2l2">
                                    {/* Workshop agenda */}
                                    {workshop.agenda && (
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="9g972a6"
                                        >
                                            <h2
                                                className="text-2xl font-bold mb-4"
                                                data-oid="_i8oz6y"
                                            >
                                                Workshop Agenda
                                            </h2>
                                            <div className="space-y-6" data-oid="0y09eno">
                                                {workshop.agenda.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex"
                                                        data-oid="7q3vwyz"
                                                    >
                                                        <div
                                                            className="w-1/4 text-purple-400 font-medium"
                                                            data-oid=":nz-43m"
                                                        >
                                                            {item.time}
                                                        </div>
                                                        <div className="w-3/4" data-oid="3x--qlz">
                                                            <h3
                                                                className="font-semibold mb-1"
                                                                data-oid="iq7.uoq"
                                                            >
                                                                {item.title}
                                                            </h3>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="norj2-n"
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

                                <div data-oid="girz646">
                                    {/* Instructor info */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6"
                                        data-oid="qz2:om9"
                                    >
                                        <h2 className="text-xl font-bold mb-4" data-oid=":hrvyh1">
                                            Instructor
                                        </h2>
                                        <div className="flex items-center mb-4" data-oid="-r87onm">
                                            <div
                                                className="w-16 h-16 rounded-full overflow-hidden mr-4"
                                                data-oid="rlvhqp0"
                                            >
                                                <img
                                                    src={
                                                        'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                    }
                                                    alt={workshop.instructor}
                                                    className="w-full h-full object-cover"
                                                    data-oid="n3n:bem"
                                                />
                                            </div>
                                            <div data-oid="bxwr3qr">
                                                <h3
                                                    className="font-semibold text-lg"
                                                    data-oid="-v3-uz4"
                                                >
                                                    {workshop.instructor}
                                                </h3>
                                                <p
                                                    className="text-purple-400 text-sm"
                                                    data-oid="9dibbnm"
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
                        <div className="text-center py-20" data-oid="s_nmwh0">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="yzt0-cn"
                            >
                                Workshop not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="_8-5jif">
                                The workshop you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/workshops')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="rkjtxo_"
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
                data-oid="8.:-tt9"
            >
                <div className="max-w-6xl mx-auto" data-oid="-8wv.eh">
                    <div className="text-center text-gray-500" data-oid="r-14pr8">
                        <p data-oid="3bub8zg">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
