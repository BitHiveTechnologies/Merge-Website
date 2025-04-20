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
}

// Past workshop type definition
interface PastWorkshop {
    id: number;
    institution: string;
    date: string;
    topic: string;
    highlights: string[];
    mediaLinks: string[];
}

export default function WorkshopsPage() {
    const router = useRouter();
    const [upcomingWorkshops, setUpcomingWorkshops] = useState<Workshop[]>([]);
    const [pastWorkshops, setPastWorkshops] = useState<PastWorkshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    // Fetch workshops (simulated)
    useEffect(() => {
        // In a real app, this would be an API call
        const fetchWorkshops = () => {
            setIsLoading(true);

            // Simulated API response for upcoming workshops
            const upcomingWorkshopsData: Workshop[] = [
                {
                    id: 1,
                    title: 'Introduction to Open Source Contributions',
                    date: '2023-06-15',
                    time: '10:00 AM - 12:00 PM IST',
                    location: 'Online (Zoom)',
                    instructor: 'Rahul Sharma',
                    description:
                        'Learn how to start contributing to open source projects and make your first pull request. This workshop will cover the basics of Git, GitHub, and the open source ecosystem.',
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    registrationLink: 'https://example.com/register/1',
                    isUpcoming: true,
                    tags: ['Open Source', 'Git', 'GitHub', 'Beginner'],
                },
                {
                    id: 2,
                    title: 'Advanced Git Workflows for Teams',
                    date: '2023-06-22',
                    time: '2:00 PM - 4:00 PM IST',
                    location: 'Online (Zoom)',
                    instructor: 'Priya Patel',
                    description:
                        'Take your Git skills to the next level with advanced workflows, branching strategies, and collaboration techniques used by professional development teams.',
                    price: 499,
                    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    registrationLink: 'https://example.com/register/2',
                    isUpcoming: true,
                    tags: ['Git', 'GitHub', 'Team Collaboration', 'Advanced'],
                },
                {
                    id: 3,
                    title: 'Preparing for Google Summer of Code 2023',
                    date: '2023-07-05',
                    time: '11:00 AM - 1:00 PM IST',
                    location: 'Online (Zoom)',
                    instructor: 'Amit Kumar',
                    description:
                        'Learn how to prepare for Google Summer of Code, from selecting organizations to writing successful proposals and completing your projects.',
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    registrationLink: 'https://example.com/register/3',
                    isUpcoming: true,
                    tags: ['GSoC', 'Open Source', 'Student Programs'],
                },
            ];

            // Simulated API response for past workshops
            const pastWorkshopsData: PastWorkshop[] = [
                {
                    id: 1,
                    institution: 'BIT Mesra',
                    date: '16 Feb',
                    topic: 'Introduction to Google Summer of Code',
                    highlights: [
                        'Hands-on session on Google Summer of code',
                        'Live demonstration of pull requests and open-source contributions',
                        'Q&A session with interactive participation',
                    ],

                    mediaLinks: [
                        'https://drive.google.com/file/d/1U2k1TQVQrvQxMchAGq7H6xBTL0cXK1FZ/view?usp=sharing',
                        'https://drive.google.com/file/d/1Yp7GXSJYUmG0XiABIoynhvmAydfQzDv3/view?usp=sharing',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7302371781523255296/',
                    ],
                },
                {
                    id: 2,
                    institution: 'IIT Patna',
                    date: '21 Feb',
                    topic: 'Google Summer of Code and Github',
                    highlights: [
                        'Deep dive into Git workflows and branching strategies',
                        'Understanding the open-source ecosystem and real-world collaboration',
                        'Guidance on applying for GSoC and MLH Fellowship',
                    ],

                    mediaLinks: [
                        'https://drive.google.com/file/d/1kVLiABjC214SraRgAKUdIgZKjtlUfmzN/view?usp=sharing',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7298731374025351168/',
                    ],
                },
                {
                    id: 3,
                    institution: 'Nirma University',
                    date: '26 Feb',
                    topic: 'Google Summer of Code',
                    highlights: [
                        'Importance of version control in software development In Open Source',
                        'Hands-on Google summer of code',
                        'Best practices for writing clean commits and managing issues',
                    ],

                    mediaLinks: [
                        'https://drive.google.com/file/d/168ja6-1LsX7vGx_k6Tnv_6J7zLYyw8Jl/view?usp=sharing',
                        'https://drive.google.com/file/d/1X4uzDLUR1JfKWWBpYA7dhXvZIdYDiage/view?usp=sharing',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7300533593871634433/',
                    ],
                },
                {
                    id: 4,
                    institution: 'NIAMT Ranchi',
                    date: '8 March',
                    topic: 'Google Summer of Code',
                    highlights: [
                        'Overview on Google summer of Code',
                        'How to Run open Source Project in Your Machine',
                        'Live project contributions & Q&A session',
                    ],

                    mediaLinks: [
                        'https://drive.google.com/drive/folders/1Jd4YIXbjABB6SFoPkLZ6VlITBXRWka6O?usp=sharing',
                        'https://drive.google.com/file/d/1ic2iwY66JyHSHNO0Lahy0507YkgSYwnC/view?usp=sharing',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7304144150486994944/',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7305117422796115968/',
                    ],
                },
                {
                    id: 5,
                    institution: 'DA-IICT',
                    date: '11 March',
                    topic: 'Google Summer of Code',
                    highlights: [
                        'Overview on Google summer of Code',
                        'How to Run open Source Project in Your Machine',
                        'Live Demonstration of Contribution',
                    ],

                    mediaLinks: [
                        'https://drive.google.com/file/d/1lAx8ns1rNnZOsXIxVOI9jhch-C5WIR_S/view?usp=sharing',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7305230926886617089/',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7307852927312814081/',
                    ],
                },
                {
                    id: 6,
                    institution: 'BIT Mesra',
                    date: '19 March',
                    topic: 'Git & Github',
                    highlights: [
                        'Hands-on session on Git Commands',
                        'Live demonstration of pull requests from open-source Projects',
                        'Q&A session with interactive participation',
                    ],

                    mediaLinks: [
                        'https://drive.google.com/drive/folders/19QXw7STJYEn1dmn7Ziaqtrb76ORC_RPk?usp=sharing',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7308136071177875457/',
                    ],
                },
                {
                    id: 7,
                    institution: 'Quantum University',
                    date: '23 March',
                    topic: 'Open Source',
                    highlights: [
                        'Hands-on session on Google Summer of code',
                        'Hands on Session on Summer of Bitcoin',
                        'Live Demonstration of Contribution',
                        'Q&A session with interactive participation',
                    ],

                    mediaLinks: [
                        'https://drive.google.com/file/d/1ObAImm9SQxhcfrIEyxWPbn-Iw2cIFvGG/view?usp=sharing',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7309604624653565953/',
                    ],
                },
                {
                    id: 8,
                    institution: 'IES University Noida',
                    date: '12 April',
                    topic: 'Open Source',
                    highlights: [
                        'Hands-on session on Google Summer of code',
                        'Hands on Session on Summer of Bitcoin',
                        'Live Demonstration of Contribution',
                        'Q&A session with interactive participation',
                    ],

                    mediaLinks: [
                        'https://gdg.community.dev/events/details/google-gdg-on-campus-iec-college-of-engineering-technology-greater-noida-india-presents-unveiling-the-path-to-open-source-success-google-summer-of-code-gsoc-and-beyond/',
                        'https://www.linkedin.com/feed/update/urn:li:activity:7316814199454646274/',
                    ],
                },
                {
                    id: 9,
                    institution: 'TIT Institute Bhopal',
                    date: '18 & 19 April',
                    topic: 'Open Source & Git and Github',
                    highlights: [
                        'Hands-on session on Google Summer of code',
                        'Hands on Session on Summer of Bitcoin',
                        'Live Demonstration of Contribution',
                        'Git and Github',
                        'Q&A session with interactive participation',
                    ],

                    mediaLinks: [
                        'https://www.linkedin.com/feed/update/urn:li:activity:7319392414148804608/',
                    ],
                },
            ];

            setUpcomingWorkshops(upcomingWorkshopsData);
            setPastWorkshops(pastWorkshopsData);
            setIsLoading(false);
        };

        fetchWorkshops();
    }, []);

    // Navigate to workshop detail
    const handleWorkshopClick = (workshopId: number) => {
        router.push(`/workshops/${workshopId}`);
    };

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
        <div className="min-h-screen bg-black text-white font-sans" data-oid=".yit17g">
            {/* Navbar - reusing from main page */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="_30t5b9"
            >
                <div className="flex items-center" data-oid="b20zz6j">
                    <div className="relative h-10 w-32" data-oid="ffujizy">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid="wd-8s.d"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid="1bat_-h"
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid="lnfq_ws">
                    <a
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="5g41we6"
                    >
                        Home
                    </a>
                    <a
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="qr3mxo9"
                    >
                        Courses
                    </a>
                    <a
                        href="/workshops"
                        className="text-purple-400 transition-colors"
                        data-oid="p_8-5wt"
                    >
                        Workshops
                    </a>
                    <a
                        href="/hackathons"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="u2654sq"
                    >
                        Hackathons
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="je5v:kr">
                    <a
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid="dxy6rpx"
                    >
                        Login
                    </a>
                    <a
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="dd9tb9z"
                    >
                        Sign Up
                    </a>
                </div>

                <button className="md:hidden text-white" data-oid="-ptquo0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="pwtky3."
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="yanc5l0"
                        />
                    </svg>
                </button>
            </nav>

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-24 pb-28 px-6 md:px-12 relative overflow-hidden"
                data-oid="ar6pmdf"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="hdmoqu8"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="99keerk"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="jls5jkb"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10 py-8" data-oid="3zb88c6">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                        data-oid="453xp4z"
                    >
                        Our{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="4-u6tci"
                        >
                            Workshops
                        </span>
                    </h1>
                    <p
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-6"
                        data-oid="q4z_mn."
                    >
                        Join our interactive workshops and webinars to enhance your skills in
                        open-source, Git, GitHub, and more.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 mb-8"
                        data-oid="w_6r350"
                    ></div>
                    <div className="flex flex-wrap gap-4 mt-8" data-oid="e7rspqh">
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="iyvchgs"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="gdpnbm-"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="pa1wc-l"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="e0ec1v1"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="o2ralaa"
                            >
                                Expert Instructors
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="3::8:r5"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="vbz4ta0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="1.s9nd2"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="ffzxdzh"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="j2sd6y_"
                            >
                                Interactive Sessions
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="q.8:b2d"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="mqdkzp-"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="cw1n6-0"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="noaxpn1"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="otbplm4"
                            >
                                Hands-on Learning
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div
                className="bg-gray-900 py-8 px-6 md:px-12 border-b border-black"
                data-oid="whd01-s"
            >
                <div className="max-w-6xl mx-auto" data-oid="56y66x.">
                    <div className="flex space-x-4 border-b border-gray-800" data-oid="9luv4jc">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={cn(
                                'px-6 py-3 font-medium text-lg',
                                activeTab === 'upcoming'
                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300',
                            )}
                            data-oid="h2_go9s"
                        >
                            Upcoming Workshops
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={cn(
                                'px-6 py-3 font-medium text-lg',
                                activeTab === 'past'
                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300',
                            )}
                            data-oid="8yohoor"
                        >
                            Past Workshops
                        </button>
                    </div>
                </div>
            </div>

            {/* Workshop Listings */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid=":dlkkjt">
                <div className="max-w-6xl mx-auto" data-oid="1827-4p">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="hzcuq_a">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="u13kjgq"
                            ></div>
                        </div>
                    ) : activeTab === 'upcoming' ? (
                        <div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            data-oid="-oser7z"
                        >
                            {upcomingWorkshops.map((workshop) => (
                                <div
                                    key={workshop.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleWorkshopClick(workshop.id)}
                                    data-oid="__mmghf"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden"
                                        data-oid=":v-cxpo"
                                    >
                                        <img
                                            src={workshop.image}
                                            alt={workshop.title}
                                            className="w-full h-full object-cover"
                                            data-oid=":xe_ysb"
                                        />

                                        <div
                                            className="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1"
                                            data-oid="zq_j7xx"
                                        >
                                            {formatDate(workshop.date)}
                                        </div>
                                    </div>
                                    <div className="p-6" data-oid="hz72_4f">
                                        <h3
                                            className="text-xl font-semibold mb-2"
                                            data-oid="jh6l5n."
                                        >
                                            {workshop.title}
                                        </h3>
                                        <p
                                            className="text-gray-400 text-sm mb-4 line-clamp-2"
                                            data-oid="2g0ue_q"
                                        >
                                            {workshop.description}
                                        </p>
                                        <div className="flex items-center mb-3" data-oid="xfefg_b">
                                            <div
                                                className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                                data-oid="y0dk50v"
                                            ></div>
                                            <span
                                                className="text-gray-300 text-sm"
                                                data-oid="nk53f6x"
                                            >
                                                {workshop.instructor}
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between text-gray-400 text-sm mb-4"
                                            data-oid="8p96-gs"
                                        >
                                            <span data-oid="3u683v3">{workshop.time}</span>
                                            <span data-oid="mihtr97">{workshop.location}</span>
                                        </div>
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="bpf:hs2"
                                        >
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                                                    data-oid="0r8v98g"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="0e4dkna"
                                        >
                                            <span
                                                className={cn(
                                                    'font-medium text-lg',
                                                    workshop.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white',
                                                )}
                                                data-oid="uyg44-5"
                                            >
                                                {formatPrice(workshop.price)}
                                            </span>
                                            <button
                                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium"
                                                data-oid="ejuh8yw"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-12" data-oid="jitq0d8">
                            <div className="mb-8" data-oid="1ugbmov">
                                <h2 className="text-3xl font-bold mb-6" data-oid="ho:ndjh">
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="qqc5t3p"
                                    >
                                        Successful Webinars
                                    </span>{' '}
                                    Conducted by Merge
                                </h2>
                                <p className="text-gray-300 mb-8 max-w-4xl" data-oid="2iqx6bf">
                                    At Merge, we are committed to empowering students with hands-on
                                    knowledge and skills in open-source contributions, Git, GitHub,
                                    and software development. We have successfully organized free
                                    webinars at various prestigious institutions, helping students
                                    kickstart their journey into open-source and version control.
                                </p>
                            </div>

                            <div className="grid gap-8" data-oid="8.ctcun">
                                {pastWorkshops.map((workshop) => (
                                    <div
                                        key={workshop.id}
                                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 p-6"
                                        data-oid="agufok_"
                                    >
                                        <div
                                            className="flex flex-col md:flex-row gap-6"
                                            data-oid="yqm_1xw"
                                        >
                                            <div className="md:w-1/4" data-oid="0:5a7ej">
                                                <h3
                                                    className="text-2xl font-bold text-purple-400 mb-2"
                                                    data-oid="d.5tngp"
                                                >
                                                    {workshop.institution}
                                                </h3>
                                                <div
                                                    className="flex items-center mb-4"
                                                    data-oid="d0lc4q4"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-pink-500 mr-2"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        data-oid="mq.9khv"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                            clipRule="evenodd"
                                                            data-oid="gjmz3gl"
                                                        />
                                                    </svg>
                                                    <span
                                                        className="text-gray-300"
                                                        data-oid="4d-q66a"
                                                    >
                                                        {workshop.date}
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium px-3 py-2 rounded-md inline-block"
                                                    data-oid="j22xhz8"
                                                >
                                                    {workshop.topic}
                                                </div>
                                            </div>
                                            <div className="md:w-3/4" data-oid="f9w-5er">
                                                <div className="mb-4" data-oid="bp_:5vj">
                                                    <h4
                                                        className="text-lg font-semibold mb-2"
                                                        data-oid="erttv0w"
                                                    >
                                                        Highlights:
                                                    </h4>
                                                    <ul
                                                        className="list-disc pl-5 space-y-1 text-gray-300"
                                                        data-oid="15gjrw_"
                                                    >
                                                        {workshop.highlights.map(
                                                            (highlight, index) => (
                                                                <li key={index} data-oid="a0rcac0">
                                                                    {highlight}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                                <div data-oid="mslwjdf">
                                                    <h4
                                                        className="text-lg font-semibold mb-2"
                                                        data-oid="f0fohkm"
                                                    >
                                                        Media Links:
                                                    </h4>
                                                    <div
                                                        className="flex flex-wrap gap-2"
                                                        data-oid="jwssed_"
                                                    >
                                                        {workshop.mediaLinks.map((link, index) => (
                                                            <a
                                                                key={index}
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-purple-400 hover:text-purple-300 underline text-sm"
                                                                data-oid="--4bw68"
                                                            >
                                                                {index === 0
                                                                    ? 'Photos'
                                                                    : index === 1
                                                                      ? 'Videos'
                                                                      : `Link ${index}`}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="rhdj8he"
            >
                <div className="max-w-6xl mx-auto" data-oid="upgmwed">
                    <div className="text-center text-gray-500" data-oid="vohf6m_">
                        <p data-oid="ckub.4e">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
