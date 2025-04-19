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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="3hbsqzp">
            {/* Navbar - reusing from main page */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="mic-q4l"
            >
                <div className="flex items-center" data-oid="v2i.2h5">
                    <div className="relative h-10 w-32" data-oid=":ml.on7">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid="7:2zoa0"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid="1sub10q"
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid="t8-k8tr">
                    <a
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="socq-.x"
                    >
                        Home
                    </a>
                    <a
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="eneon-a"
                    >
                        Courses
                    </a>
                    <a
                        href="/workshops"
                        className="text-purple-400 transition-colors"
                        data-oid="7x8or_."
                    >
                        Workshops
                    </a>
                    <a
                        href="/hackathons"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="j5d2or-"
                    >
                        Hackathons
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="y5hc6zt">
                    <a
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid="h358xc_"
                    >
                        Login
                    </a>
                    <a
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="x:h::b7"
                    >
                        Sign Up
                    </a>
                </div>

                <button className="md:hidden text-white" data-oid="n6-zt_k">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="59h.sc8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="rfty_0d"
                        />
                    </svg>
                </button>
            </nav>

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-24 pb-28 px-6 md:px-12 relative overflow-hidden"
                data-oid="ncv6_lj"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="uvjbu2b"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="nomcmff"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="67gm9aa"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10 py-8" data-oid="eozq.hr">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                        data-oid="eqz2u3k"
                    >
                        Our{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="qx:4atk"
                        >
                            Workshops
                        </span>
                    </h1>
                    <p
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-6"
                        data-oid="rt63stq"
                    >
                        Join our interactive workshops and webinars to enhance your skills in
                        open-source, Git, GitHub, and more.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 mb-8"
                        data-oid="p0s8t7b"
                    ></div>
                    <div className="flex flex-wrap gap-4 mt-8" data-oid="bxydc46">
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                            data-oid="pc.aqeq"
                        >
                            <span className="text-purple-400 mr-2" data-oid="saetfl7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="es-xr75"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        data-oid="kykjs5x"
                                    />
                                </svg>
                            </span>
                            <span data-oid="9nyldte">Expert Instructors</span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                            data-oid="0r6z3oz"
                        >
                            <span className="text-purple-400 mr-2" data-oid="wf6sk-f">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="q91:xer"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        data-oid="p73o-_k"
                                    />
                                </svg>
                            </span>
                            <span data-oid="2j-z_au">Interactive Sessions</span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                            data-oid="1rx7rl."
                        >
                            <span className="text-purple-400 mr-2" data-oid="rc7jd.:">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="-pd8mxw"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        data-oid="4yo1bz."
                                    />
                                </svg>
                            </span>
                            <span data-oid="_jht2mw">Hands-on Learning</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div
                className="bg-gray-900 py-8 px-6 md:px-12 border-b border-gray-800"
                data-oid="1srfy5h"
            >
                <div className="max-w-6xl mx-auto" data-oid="4uf06ov">
                    <div className="flex space-x-4 border-b border-gray-800" data-oid="qxq6mf5">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={cn(
                                'px-6 py-3 font-medium text-lg',
                                activeTab === 'upcoming'
                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300',
                            )}
                            data-oid="f_7fpz."
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
                            data-oid="zuuq4c6"
                        >
                            Past Workshops
                        </button>
                    </div>
                </div>
            </div>

            {/* Workshop Listings */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="9s3owkd">
                <div className="max-w-6xl mx-auto" data-oid="3m.hri6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="7ah8j4:">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="2igtq63"
                            ></div>
                        </div>
                    ) : activeTab === 'upcoming' ? (
                        <div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            data-oid="1g0fs-."
                        >
                            {upcomingWorkshops.map((workshop) => (
                                <div
                                    key={workshop.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleWorkshopClick(workshop.id)}
                                    data-oid="jm6t:-8"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden"
                                        data-oid="8nmy34s"
                                    >
                                        <img
                                            src={workshop.image}
                                            alt={workshop.title}
                                            className="w-full h-full object-cover"
                                            data-oid="ld3nnm1"
                                        />

                                        <div
                                            className="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1"
                                            data-oid="ebppe.l"
                                        >
                                            {formatDate(workshop.date)}
                                        </div>
                                    </div>
                                    <div className="p-6" data-oid="jmzrs5b">
                                        <h3
                                            className="text-xl font-semibold mb-2"
                                            data-oid="bmo1hkx"
                                        >
                                            {workshop.title}
                                        </h3>
                                        <p
                                            className="text-gray-400 text-sm mb-4 line-clamp-2"
                                            data-oid="gyf7r9y"
                                        >
                                            {workshop.description}
                                        </p>
                                        <div className="flex items-center mb-3" data-oid="ib:r-1d">
                                            <div
                                                className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                                data-oid="b.jf430"
                                            ></div>
                                            <span
                                                className="text-gray-300 text-sm"
                                                data-oid="yjrkswu"
                                            >
                                                {workshop.instructor}
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between text-gray-400 text-sm mb-4"
                                            data-oid="faonhbe"
                                        >
                                            <span data-oid="s5ht5.-">{workshop.time}</span>
                                            <span data-oid="cl0c2mo">{workshop.location}</span>
                                        </div>
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="pcdp1en"
                                        >
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                                                    data-oid=".un:.l-"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="ejycxm5"
                                        >
                                            <span
                                                className={cn(
                                                    'font-medium text-lg',
                                                    workshop.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white',
                                                )}
                                                data-oid="oe.v9xz"
                                            >
                                                {formatPrice(workshop.price)}
                                            </span>
                                            <button
                                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium"
                                                data-oid="ssh37at"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-12" data-oid="cxslvt8">
                            <div className="mb-8" data-oid="s6kfhfn">
                                <h2 className="text-3xl font-bold mb-6" data-oid="t2cdd2u">
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="v3tyt9e"
                                    >
                                        Successful Webinars
                                    </span>{' '}
                                    Conducted by Merge
                                </h2>
                                <p className="text-gray-300 mb-8 max-w-4xl" data-oid="ve32ckv">
                                    At Merge, we are committed to empowering students with hands-on
                                    knowledge and skills in open-source contributions, Git, GitHub,
                                    and software development. We have successfully organized free
                                    webinars at various prestigious institutions, helping students
                                    kickstart their journey into open-source and version control.
                                </p>
                            </div>

                            <div className="grid gap-8" data-oid="f5ora42">
                                {pastWorkshops.map((workshop) => (
                                    <div
                                        key={workshop.id}
                                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 p-6"
                                        data-oid="_olqt9p"
                                    >
                                        <div
                                            className="flex flex-col md:flex-row gap-6"
                                            data-oid="hxilf6p"
                                        >
                                            <div className="md:w-1/4" data-oid="x:tu0.:">
                                                <h3
                                                    className="text-2xl font-bold text-purple-400 mb-2"
                                                    data-oid=":wi9hxx"
                                                >
                                                    {workshop.institution}
                                                </h3>
                                                <div
                                                    className="flex items-center mb-4"
                                                    data-oid="e-zgyw4"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-pink-500 mr-2"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        data-oid="cgzn8dj"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                            clipRule="evenodd"
                                                            data-oid="3-dpw9l"
                                                        />
                                                    </svg>
                                                    <span
                                                        className="text-gray-300"
                                                        data-oid="b-dxqcu"
                                                    >
                                                        {workshop.date}
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium px-3 py-2 rounded-md inline-block"
                                                    data-oid="va8vn.5"
                                                >
                                                    {workshop.topic}
                                                </div>
                                            </div>
                                            <div className="md:w-3/4" data-oid="8y2.c3k">
                                                <div className="mb-4" data-oid="ja2p_ww">
                                                    <h4
                                                        className="text-lg font-semibold mb-2"
                                                        data-oid="paqb1ba"
                                                    >
                                                        Highlights:
                                                    </h4>
                                                    <ul
                                                        className="list-disc pl-5 space-y-1 text-gray-300"
                                                        data-oid="g.9gc4:"
                                                    >
                                                        {workshop.highlights.map(
                                                            (highlight, index) => (
                                                                <li key={index} data-oid="j:rn8ec">
                                                                    {highlight}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                                <div data-oid="805ab0-">
                                                    <h4
                                                        className="text-lg font-semibold mb-2"
                                                        data-oid="1ovqgi."
                                                    >
                                                        Media Links:
                                                    </h4>
                                                    <div
                                                        className="flex flex-wrap gap-2"
                                                        data-oid="7nw2xwp"
                                                    >
                                                        {workshop.mediaLinks.map((link, index) => (
                                                            <a
                                                                key={index}
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-purple-400 hover:text-purple-300 underline text-sm"
                                                                data-oid="cldbtok"
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
                data-oid="0i7vkz_"
            >
                <div className="max-w-6xl mx-auto" data-oid="qhnnfgf">
                    <div className="text-center text-gray-500" data-oid="cwntbho">
                        <p data-oid="4wokqyx">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
