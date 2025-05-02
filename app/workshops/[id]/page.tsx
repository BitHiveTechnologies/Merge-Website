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

            {/* Back Button */}
            <div className="bg-gray-900 py-4 px-6 md:px-12" data-oid="o0b50c.">
                <div className="max-w-6xl mx-auto" data-oid="jii-f:q">
                    <button
                        onClick={() => router.push('/workshops')}
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
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
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32" data-oid="dvumxd0">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                        data-oid="xc2t8zf"
                    ></div>
                </div>
            ) : workshop ? (
                <>
                    {/* Workshop Hero Section */}
                    <div
                        className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 md:px-12"
                        data-oid="xaupipf"
                    >
                        <div
                            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
                            data-oid="at7brv_"
                        >
                            <div
                                className="rounded-xl overflow-hidden border border-gray-700"
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
                                    <div className="flex items-center mb-4" data-oid="i.m5om:">
                                        <div className="flex flex-wrap gap-2" data-oid="5u.7a-6">
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

                                    {/* Instructor info */}
                                    <div className="flex items-center mb-6" data-oid="r7l4pp1">
                                        <div
                                            className="w-8 h-8 rounded-full overflow-hidden mr-4"
                                            data-oid="ax61u08"
                                        >
                                            <img
                                                src={
                                                    workshop.instructorImage ||
                                                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                }
                                                alt={workshop.instructor}
                                                className="w-full h-full object-cover"
                                                data-oid="e6dcw9d"
                                            />
                                        </div>
                                        <div data-oid="3qhtypn">
                                            <h3 className="font-medium" data-oid=":.2g:9n">
                                                Instructor
                                            </h3>
                                            <p className="text-gray-300" data-oid="mzjwfce">
                                                {workshop.instructor}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Workshop details */}
                                    <div className="grid grid-cols-2 gap-4 mb-6" data-oid="0qcjw-o">
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

                                    <div
                                        className="flex items-center justify-between mb-6"
                                        data-oid="o.ns2j."
                                    >
                                        <div className="text-3xl font-bold" data-oid="x0szto3">
                                            <span
                                                className={
                                                    workshop.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white'
                                                }
                                                data-oid="6f4t7kz"
                                            >
                                                {formatPrice(workshop.price)}
                                            </span>
                                        </div>
                                        {isRegistered ? (
                                            <button
                                                disabled
                                                className="px-8 py-3 rounded-md bg-green-600 text-center font-medium cursor-default"
                                                data-oid="gvyfv8e"
                                            >
                                                Already Registered
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleRegister}
                                                disabled={registrationLoading}
                                                className={`px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium ${
                                                    registrationLoading
                                                        ? 'opacity-70 cursor-wait'
                                                        : ''
                                                }`}
                                                data-oid="qi2u00w"
                                            >
                                                {registrationLoading
                                                    ? 'Processing...'
                                                    : 'Register Now'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Workshop agenda */}
                    {workshop.agenda && (
                        <div className="py-16 px-6 md:px-12 bg-black" data-oid="pdh0ehr">
                            <div className="max-w-6xl mx-auto" data-oid="wkyt91y">
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-8"
                                    data-oid="_i8oz6y"
                                >
                                    Workshop Agenda
                                </h2>
                                <div className="space-y-6" data-oid="n:yvhxa">
                                    <div
                                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                                        data-oid="wn-clry"
                                    >
                                        <div className="p-6" data-oid="4n.w9qk">
                                            <ul className="space-y-4" data-oid="3uv5.mw">
                                                {workshop.agenda.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between items-center border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                                                        data-oid="9o0nppv"
                                                    >
                                                        <div
                                                            className="flex items-center"
                                                            data-oid="0utwmoe"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mr-3 text-purple-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                data-oid="e57n7g:"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    data-oid="9an:vpm"
                                                                />
                                                            </svg>
                                                            <div
                                                                className="flex flex-col"
                                                                data-oid="j:0y-yy"
                                                            >
                                                                <span
                                                                    className="font-medium"
                                                                    data-oid="f1oe38_"
                                                                >
                                                                    {item.title}
                                                                </span>
                                                                <p
                                                                    className="text-sm text-gray-400 mt-1"
                                                                    data-oid="2dj2tu7"
                                                                >
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className="text-purple-400 text-sm ml-4"
                                                            data-oid="vrvyt3y"
                                                        >
                                                            {item.time}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Instructor Bio Section */}
                    {workshop.instructorBio && (
                        <div
                            className="py-16 px-6 md:px-12 bg-gray-900"
                            data-oid="instructor-bio-section"
                        >
                            <div className="max-w-6xl mx-auto" data-oid="instructor-bio-container">
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-8"
                                    data-oid="instructor-bio-title"
                                >
                                    About the Instructor
                                </h2>
                                <div
                                    className="bg-gray-800/50 rounded-xl p-6"
                                    data-oid="instructor-bio-card"
                                >
                                    <div
                                        className="flex flex-col md:flex-row gap-6"
                                        data-oid="instructor-bio-content"
                                    >
                                        <div
                                            className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0"
                                            data-oid="instructor-image-container"
                                        >
                                            <img
                                                src={
                                                    workshop.instructorImage ||
                                                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                }
                                                alt={workshop.instructor}
                                                className="w-full h-full object-cover"
                                                data-oid="instructor-image"
                                            />
                                        </div>
                                        <div data-oid="instructor-details">
                                            <h3
                                                className="text-xl font-semibold mb-2 text-center md:text-left"
                                                data-oid="instructor-name"
                                            >
                                                {workshop.instructor}
                                            </h3>
                                            <p
                                                className="text-gray-300"
                                                data-oid="instructor-bio-text"
                                            >
                                                {workshop.instructorBio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-32" data-oid=".dommgr">
                    <div className="text-center" data-oid="3lixhh.">
                        <h2 className="text-2xl font-bold mb-4" data-oid=":ziwai4">
                            Workshop not found
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="qhprk_6">
                            The workshop you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => router.push('/workshops')}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="rkjtxo_"
                        >
                            Back to Workshops
                        </button>
                    </div>
                </div>
            )}

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
