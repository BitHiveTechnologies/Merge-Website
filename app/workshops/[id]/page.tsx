'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Workshop type definition
interface Workshop {
    id: number;
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

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    // Fetch workshop details (simulated)
    useEffect(() => {
        const fetchWorkshopDetails = () => {
            setIsLoading(true);

            // In a real app, this would be an API call with the ID
            setTimeout(() => {
                // Simulated API response
                const workshopData: Workshop = {
                    id: parseInt(params.id),
                    title: 'Introduction to Open Source Contributions',
                    date: '2023-06-15',
                    time: '10:00 AM - 12:00 PM IST',
                    location: 'Online (Zoom)',
                    instructor: 'Rahul Sharma',
                    description:
                        'Learn how to start contributing to open source projects and make your first pull request.',
                    longDescription:
                        "This comprehensive workshop will guide you through the entire process of contributing to open source projects. From setting up your development environment to submitting your first pull request, you'll learn all the essential skills needed to become an active contributor to the open source community.\n\nWe'll cover Git fundamentals, GitHub workflows, how to find beginner-friendly projects, understanding project guidelines, and best practices for creating valuable contributions. By the end of this workshop, you'll have the confidence and knowledge to start making meaningful contributions to open source projects.",
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    registrationLink: 'https://example.com/register/1',
                    isUpcoming: true,
                    tags: ['Open Source', 'Git', 'GitHub', 'Beginner'],
                    agenda: [
                        {
                            time: '10:00 AM - 10:15 AM',
                            title: 'Introduction',
                            description: 'Overview of the workshop and introduction to open source',
                        },
                        {
                            time: '10:15 AM - 10:45 AM',
                            title: 'Git Basics',
                            description: 'Essential Git commands and workflows',
                        },
                        {
                            time: '10:45 AM - 11:15 AM',
                            title: 'Finding Projects',
                            description: 'How to find beginner-friendly projects and issues',
                        },
                        {
                            time: '11:15 AM - 11:45 AM',
                            title: 'Making Contributions',
                            description: 'Step-by-step guide to making your first pull request',
                        },
                        {
                            time: '11:45 AM - 12:00 PM',
                            title: 'Q&A Session',
                            description: 'Open discussion and questions',
                        },
                    ],

                    instructorBio:
                        'Rahul Sharma is an experienced open source contributor with over 5 years of experience in the field. He has contributed to various popular projects including React, Node.js, and TensorFlow. Rahul is passionate about helping newcomers navigate the open source ecosystem and has mentored numerous students in programs like Google Summer of Code.',
                    instructorImage:
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                };

                setWorkshop(workshopData);
                setIsLoading(false);
            }, 1000);
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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="efzb324">
            {/* Navbar - reusing from main page */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="cm22jw_"
            >
                <div className="flex items-center" data-oid="-.40bcd">
                    <div className="relative h-10 w-32" data-oid="ebbcisi">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid="cjj2svy"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid="xdnygss"
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid="03ot57.">
                    <a
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="t9kwsl:"
                    >
                        Home
                    </a>
                    <a
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="57zqv_b"
                    >
                        Courses
                    </a>
                    <a
                        href="/workshops"
                        className="text-purple-400 transition-colors"
                        data-oid="lc-9dlq"
                    >
                        Workshops
                    </a>
                    <a
                        href="/hackathons"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="0yey25a"
                    >
                        Hackathons
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="c5gpyxz">
                    <a
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid="6-x41m7"
                    >
                        Login
                    </a>
                    <a
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="lvx.18p"
                    >
                        Sign Up
                    </a>
                </div>

                <button className="md:hidden text-white" data-oid="sh5ogyq">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="7632itb"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="i4t_an-"
                        />
                    </svg>
                </button>
            </nav>

            {/* Workshop Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="pq-.b43">
                <div className="max-w-6xl mx-auto" data-oid="ecw.1kg">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="t3jws2u">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="3v3rfhi"
                            ></div>
                        </div>
                    ) : workshop ? (
                        <div data-oid="ri6:g0s">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/workshops')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="0vrgrnw"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="-3.htm4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="cg9l0i_"
                                    />
                                </svg>
                                Back to Workshops
                            </button>

                            {/* Workshop header */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12" data-oid="78d687m">
                                <div
                                    className="relative h-64 md:h-full rounded-xl overflow-hidden"
                                    data-oid="xjglw2k"
                                >
                                    <img
                                        src={workshop.image}
                                        alt={workshop.title}
                                        className="w-full h-full object-cover"
                                        data-oid="5yxgki_"
                                    />
                                </div>
                                <div className="flex flex-col justify-between" data-oid="qt48twd">
                                    <div data-oid="yjydz1g">
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="atlh9a:"
                                        >
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                                    data-oid="z90y7m-"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="q91wuex"
                                        >
                                            {workshop.title}
                                        </h1>
                                        <p className="text-gray-300 mb-6" data-oid="55mg81e">
                                            {workshop.description}
                                        </p>

                                        <div
                                            className="grid grid-cols-2 gap-4 mb-6"
                                            data-oid="9vf-_8t"
                                        >
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="_54iz7_"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="kfig7xn"
                                                >
                                                    Date
                                                </div>
                                                <div className="font-medium" data-oid=".u_16gh">
                                                    {formatDate(workshop.date)}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="1_74qrp"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="at49t6t"
                                                >
                                                    Time
                                                </div>
                                                <div className="font-medium" data-oid="xpshl..">
                                                    {workshop.time}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="5hkrymf"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="rjf7h9d"
                                                >
                                                    Location
                                                </div>
                                                <div className="font-medium" data-oid="r3sl_43">
                                                    {workshop.location}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="e8irj5h"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="x56ahlp"
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
                                                    data-oid="km98_jo"
                                                >
                                                    {formatPrice(workshop.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Countdown timer */}
                                    {workshop.isUpcoming && timeRemaining && (
                                        <div className="mb-6" data-oid="5w2a0ba">
                                            <h3
                                                className="text-lg font-semibold mb-3"
                                                data-oid="vee08-i"
                                            >
                                                Workshop starts in:
                                            </h3>
                                            <div
                                                className="grid grid-cols-4 gap-2 text-center"
                                                data-oid="uds8o6w"
                                            >
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="m2:aimv"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="j9ct_ob"
                                                    >
                                                        {timeRemaining.days}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="snyn2jx"
                                                    >
                                                        Days
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="b--r.v:"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="e_f2v99"
                                                    >
                                                        {timeRemaining.hours}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="g7ccoy-"
                                                    >
                                                        Hours
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="r72wlbm"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="ppw97d:"
                                                    >
                                                        {timeRemaining.minutes}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="s_po2xn"
                                                    >
                                                        Minutes
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid=".27l:rl"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="-bmgedl"
                                                    >
                                                        {timeRemaining.seconds}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="4s_n-je"
                                                    >
                                                        Seconds
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <a
                                        href={workshop.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium"
                                        data-oid="4pgi2uk"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </div>

                            {/* Workshop details */}
                            <div className="grid md:grid-cols-3 gap-8" data-oid="tt_km_d">
                                <div className="md:col-span-2" data-oid="f91zf55">
                                    {/* About the workshop */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6 mb-8"
                                        data-oid="o0zixag"
                                    >
                                        <h2 className="text-2xl font-bold mb-4" data-oid="crllp9h">
                                            About the Workshop
                                        </h2>
                                        <div className="text-gray-300 space-y-4" data-oid="frvlixg">
                                            {workshop.longDescription
                                                ?.split('\n\n')
                                                .map((paragraph, index) => (
                                                    <p key={index} data-oid="9yyx9zv">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Workshop agenda */}
                                    {workshop.agenda && (
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="y9i:wqb"
                                        >
                                            <h2
                                                className="text-2xl font-bold mb-4"
                                                data-oid="fys82-s"
                                            >
                                                Workshop Agenda
                                            </h2>
                                            <div className="space-y-6" data-oid="p9mzsme">
                                                {workshop.agenda.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex"
                                                        data-oid="vcn-0fu"
                                                    >
                                                        <div
                                                            className="w-1/4 text-purple-400 font-medium"
                                                            data-oid="loo1lr5"
                                                        >
                                                            {item.time}
                                                        </div>
                                                        <div className="w-3/4" data-oid="42q:970">
                                                            <h3
                                                                className="font-semibold mb-1"
                                                                data-oid="0c-b:lp"
                                                            >
                                                                {item.title}
                                                            </h3>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="bu8nacp"
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

                                <div data-oid="wnh6nhu">
                                    {/* Instructor info */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6"
                                        data-oid="4vei5e6"
                                    >
                                        <h2 className="text-xl font-bold mb-4" data-oid="uks9c:4">
                                            Instructor
                                        </h2>
                                        <div className="flex items-center mb-4" data-oid="u02peuk">
                                            <div
                                                className="w-16 h-16 rounded-full overflow-hidden mr-4"
                                                data-oid="p-h-_at"
                                            >
                                                <img
                                                    src={
                                                        workshop.instructorImage ||
                                                        'https://via.placeholder.com/150'
                                                    }
                                                    alt={workshop.instructor}
                                                    className="w-full h-full object-cover"
                                                    data-oid="u:fmokk"
                                                />
                                            </div>
                                            <div data-oid="m4wp20z">
                                                <h3
                                                    className="font-semibold text-lg"
                                                    data-oid="-e554:z"
                                                >
                                                    {workshop.instructor}
                                                </h3>
                                                <p
                                                    className="text-purple-400 text-sm"
                                                    data-oid="o2_b02y"
                                                >
                                                    Workshop Instructor
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 text-sm" data-oid="740_xfj">
                                            {workshop.instructorBio || 'No bio available.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="e4:z152">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="shg.pnd"
                            >
                                Workshop not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="7vmun:w">
                                The workshop you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/workshops')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="nfuxr:n"
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
                data-oid="vdiqas4"
            >
                <div className="max-w-6xl mx-auto" data-oid="xwqgm7v">
                    <div className="text-center text-gray-500" data-oid="z2lwhq5">
                        <p data-oid="y.8ecni">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
