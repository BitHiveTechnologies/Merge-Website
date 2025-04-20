'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="t6c8_7-">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="7opuojp" />

            {/* Workshop Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="v0luar0">
                <div className="max-w-6xl mx-auto" data-oid="bj2:ymw">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="8b6.-_x">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="tj83dw5"
                            ></div>
                        </div>
                    ) : workshop ? (
                        <div data-oid="jh-2x8b">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/workshops')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="2-lu6i5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="vd8jdoh"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="rekx:jk"
                                    />
                                </svg>
                                Back to Workshops
                            </button>

                            {/* Workshop header */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12" data-oid="r.131d0">
                                <div
                                    className="relative h-64 md:h-full rounded-xl overflow-hidden"
                                    data-oid="fzmuuyw"
                                >
                                    <img
                                        src={workshop.image}
                                        alt={workshop.title}
                                        className="w-full h-full object-cover"
                                        data-oid="2bymz1h"
                                    />
                                </div>
                                <div className="flex flex-col justify-between" data-oid="o2edq.8">
                                    <div data-oid="zv9g5hd">
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="j64hs_l"
                                        >
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                                    data-oid="hdyzjf2"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="g8q2hxc"
                                        >
                                            {workshop.title}
                                        </h1>
                                        <p className="text-gray-300 mb-6" data-oid="z4a0su0">
                                            {workshop.description}
                                        </p>

                                        <div
                                            className="grid grid-cols-2 gap-4 mb-6"
                                            data-oid="5lrgd0a"
                                        >
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="9a06j:q"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="vo043l-"
                                                >
                                                    Date
                                                </div>
                                                <div className="font-medium" data-oid="6mdq80d">
                                                    {formatDate(workshop.date)}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="_0vcjn0"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="665s498"
                                                >
                                                    Time
                                                </div>
                                                <div className="font-medium" data-oid="8qnh3u1">
                                                    {workshop.time}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid=":3x349d"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid="8asm702"
                                                >
                                                    Location
                                                </div>
                                                <div className="font-medium" data-oid="op5xn3n">
                                                    {workshop.location}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 p-4 rounded-lg"
                                                data-oid="fw9qys1"
                                            >
                                                <div
                                                    className="text-purple-400 mb-1 text-sm"
                                                    data-oid=":1bsemd"
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
                                                    data-oid="fq9-m_e"
                                                >
                                                    {formatPrice(workshop.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Countdown timer */}
                                    {workshop.isUpcoming && timeRemaining && (
                                        <div className="mb-6" data-oid="b8jlkls">
                                            <h3
                                                className="text-lg font-semibold mb-3"
                                                data-oid="wf39sur"
                                            >
                                                Workshop starts in:
                                            </h3>
                                            <div
                                                className="grid grid-cols-4 gap-2 text-center"
                                                data-oid="bu7g92d"
                                            >
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="cx_:8n3"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="ukavxj_"
                                                    >
                                                        {timeRemaining.days}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="trj4nr9"
                                                    >
                                                        Days
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="iggbn7z"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="dxf0_xy"
                                                    >
                                                        {timeRemaining.hours}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="dq2.rgu"
                                                    >
                                                        Hours
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="wscqqkc"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="ctq_c1u"
                                                    >
                                                        {timeRemaining.minutes}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="-rrt58w"
                                                    >
                                                        Minutes
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-gray-800 p-3 rounded-lg"
                                                    data-oid="tv-f4im"
                                                >
                                                    <div
                                                        className="text-2xl font-bold text-purple-400"
                                                        data-oid="8jj5.d7"
                                                    >
                                                        {timeRemaining.seconds}
                                                    </div>
                                                    <div
                                                        className="text-xs text-gray-400"
                                                        data-oid="u3k6mz8"
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
                                        data-oid="5-..7lz"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </div>

                            {/* Workshop details */}
                            <div className="grid md:grid-cols-3 gap-8" data-oid="u5lnog2">
                                <div className="md:col-span-2" data-oid="q:dzhu3">
                                    {/* About the workshop */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6 mb-8"
                                        data-oid="4y_vz4c"
                                    >
                                        <h2 className="text-2xl font-bold mb-4" data-oid="j_blpw5">
                                            About the Workshop
                                        </h2>
                                        <div className="text-gray-300 space-y-4" data-oid="d.3id7c">
                                            {workshop.longDescription
                                                ?.split('\n\n')
                                                .map((paragraph, index) => (
                                                    <p key={index} data-oid="vpin.tt">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Workshop agenda */}
                                    {workshop.agenda && (
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="wdjp9sl"
                                        >
                                            <h2
                                                className="text-2xl font-bold mb-4"
                                                data-oid="v7fc4fn"
                                            >
                                                Workshop Agenda
                                            </h2>
                                            <div className="space-y-6" data-oid="k9l15.i">
                                                {workshop.agenda.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex"
                                                        data-oid="grz:rqp"
                                                    >
                                                        <div
                                                            className="w-1/4 text-purple-400 font-medium"
                                                            data-oid="vpgoal1"
                                                        >
                                                            {item.time}
                                                        </div>
                                                        <div className="w-3/4" data-oid="07973ue">
                                                            <h3
                                                                className="font-semibold mb-1"
                                                                data-oid="__n6e6."
                                                            >
                                                                {item.title}
                                                            </h3>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="3:2vvi."
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

                                <div data-oid="5nuyxrv">
                                    {/* Instructor info */}
                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6"
                                        data-oid="mhf95kj"
                                    >
                                        <h2 className="text-xl font-bold mb-4" data-oid="v7qc.7s">
                                            Instructor
                                        </h2>
                                        <div className="flex items-center mb-4" data-oid=".iqf7n5">
                                            <div
                                                className="w-16 h-16 rounded-full overflow-hidden mr-4"
                                                data-oid="k3so85s"
                                            >
                                                <img
                                                    src={
                                                        workshop.instructorImage ||
                                                        'https://via.placeholder.com/150'
                                                    }
                                                    alt={workshop.instructor}
                                                    className="w-full h-full object-cover"
                                                    data-oid="zmkd.-8"
                                                />
                                            </div>
                                            <div data-oid="dsoau-3">
                                                <h3
                                                    className="font-semibold text-lg"
                                                    data-oid="8mefcgx"
                                                >
                                                    {workshop.instructor}
                                                </h3>
                                                <p
                                                    className="text-purple-400 text-sm"
                                                    data-oid="ru514.p"
                                                >
                                                    Workshop Instructor
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 text-sm" data-oid="m86.6g-">
                                            {workshop.instructorBio || 'No bio available.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="1m677cm">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="cqhg6ie"
                            >
                                Workshop not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="w-0yx5b">
                                The workshop you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/workshops')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="duie.0e"
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
                data-oid="zqgrrww"
            >
                <div className="max-w-6xl mx-auto" data-oid="4yfclaz">
                    <div className="text-center text-gray-500" data-oid="-f:an62">
                        <p data-oid="--rugo.">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
