'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Hackathon type definition
interface Hackathon {
    id: number;
    title: string;
    organizer: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    longDescription?: string;
    image: string;
    registrationLink: string;
    isLive: boolean;
    isUpcoming: boolean;
    tracks: {
        name: string;
        description: string[];
    }[];
    structure: {
        step: string;
        description: string;
    }[];
    prizes: string;
    prerequisites: {
        category: string;
        items: {
            icon?: string;
            text: string;
        }[];
    }[];
    faqs?: {
        question: string;
        answer: string;
    }[];
    sponsors?: {
        name: string;
        logo: string;
        tier: 'platinum' | 'gold' | 'silver' | 'bronze';
    }[];
    judges?: {
        name: string;
        position: string;
        company: string;
        image: string;
    }[];
}

export default function HackathonDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [hackathon, setHackathon] = useState<Hackathon | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [timeRemaining, setTimeRemaining] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    // Fetch hackathon details (simulated)
    useEffect(() => {
        const fetchHackathonDetails = () => {
            setIsLoading(true);

            // In a real app, this would be an API call with the ID
            setTimeout(() => {
                // Simulated API response
                const hackathonData: Hackathon = {
                    id: parseInt(params.id),
                    title: 'HackBIT 2025',
                    organizer: 'BIT MESRA, PATNA',
                    startDate: '2025-03-15',
                    endDate: '2025-03-16',
                    location: 'BIT Mesra, Patna Campus',
                    description:
                        'HackBIT 2025 is a high-energy, innovation-driven hackathon where participants tackle real-world challenges using cutting-edge technologies.',
                    longDescription:
                        'HackBIT 2025 is a high-energy, innovation-driven hackathon where participants tackle real-world challenges using cutting-edge technologies. Open to students and professionals, the event encourages collaboration, rapid prototyping, and creative problem-solving. Participants can work individually or in teams to build groundbreaking solutions in Web Development, AI/ML, and Data Science.',
                    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    registrationLink: '/hackathons/register/1',
                    isLive: false,
                    isUpcoming: true,
                    tracks: [
                        {
                            name: 'Web Development',
                            description: [
                                'Full-stack applications (MERN, Django, etc.)',
                                'Progressive Web Apps (PWAs)',
                                'Blockchain-integrated solutions',
                                'Cybersecurity and authentication-based projects',
                            ],
                        },
                        {
                            name: 'AI/ML & Data Science',
                            description: [
                                'Computer vision & image recognition',
                                'NLP-based applications (chatbots, sentiment analysis)',
                                'Predictive analytics & recommendation systems',
                                'Deep learning & generative AI models',
                                'Getting Insights And Decision Making From A Raw Datasets',
                            ],
                        },
                    ],

                    structure: [
                        {
                            step: 'Kickoff & Problem Statement Reveal',
                            description:
                                'Introduction to the hackathon, rules, and revealing the problem statements.',
                        },
                        {
                            step: 'Ideation & Team Formation',
                            description:
                                'Brainstorming ideas and forming teams to tackle the challenges.',
                        },
                        {
                            step: 'Development Phase (12 hours of coding)',
                            description: 'Intensive coding session to build your solution.',
                        },
                        {
                            step: 'Mentorship & Midway Review',
                            description: 'Get feedback and guidance from industry experts.',
                        },
                        {
                            step: 'Project Submission & Demos',
                            description: 'Submit your project and present it to the judges.',
                        },
                        {
                            step: 'Judging & Prize Distribution',
                            description: 'Projects are evaluated and winners are announced.',
                        },
                    ],

                    prizes: '₹50,000 for 1st Place, ₹30,000 for 2nd Place, ₹20,000 for 3rd Place',
                    prerequisites: [
                        {
                            category: 'Technical Skills',
                            items: [
                                {
                                    text: 'Web Development: Basic knowledge of HTML, CSS, JavaScript, and frameworks like React, Angular, or Django is recommended. Familiarity with databases (SQL, Firebase, MongoDB) is a plus.',
                                },
                                {
                                    text: 'AI/ML & Data Science: Understanding of Python, machine learning frameworks (TensorFlow, PyTorch, Scikit-Learn), and data handling using Pandas & NumPy. Experience with Jupyter Notebooks and APIs is beneficial.',
                                },
                            ],
                        },
                        {
                            category: 'Software & Tools',
                            items: [
                                {
                                    text: 'Laptop with necessary software installed (VS Code, Jupyter Notebook, Postman, etc.)',
                                },
                                {
                                    text: 'GitHub/GitLab account for version control and collaboration',
                                },
                                {
                                    text: 'Cloud computing familiarity (Google Colab, AWS, Azure, or GCP) is a plus',
                                },
                                {
                                    text: 'API knowledge for data fetching and integrations',
                                },
                            ],
                        },
                        {
                            category: 'Team & Collaboration Skills',
                            items: [
                                {
                                    text: 'Ability to brainstorm innovative solutions',
                                },
                                {
                                    text: 'Effective communication & teamwork',
                                },
                                {
                                    text: 'Familiarity with hackathon workflows (agile development, sprints)',
                                },
                            ],
                        },
                        {
                            category: 'Additional Requirements',
                            items: [
                                {
                                    text: 'A valid student/participant ID for verification',
                                },
                                {
                                    text: 'Pre-registration and confirmation of participation',
                                },
                                {
                                    text: 'Enthusiasm, problem-solving mindset, and a willingness to learn!',
                                },
                            ],
                        },
                    ],

                    faqs: [
                        {
                            question: 'Who can participate in HackBIT 2025?',
                            answer: "HackBIT 2025 is open to all students and professionals with an interest in technology and innovation. Whether you're a beginner or an experienced developer, you're welcome to join!",
                        },
                        {
                            question: 'Do I need to have a team to register?',
                            answer: "No, you can register individually and form a team during the event. We'll have a team formation session at the beginning of the hackathon.",
                        },
                        {
                            question: 'What should I bring to the hackathon?',
                            answer: "You should bring your laptop, charger, any necessary peripherals, and your student/professional ID. If it's an in-person event, consider bringing toiletries and a change of clothes for overnight stays.",
                        },
                        {
                            question: 'Is there a registration fee?',
                            answer: 'No, participation in HackBIT 2025 is completely free of charge.',
                        },
                        {
                            question: 'Will food and refreshments be provided?',
                            answer: 'Yes, meals and refreshments will be provided throughout the event for all participants.',
                        },
                    ],

                    judges: [
                        {
                            name: 'Dr. Rajesh Kumar',
                            position: 'CTO',
                            company: 'TechInnovate',
                            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                        },
                        {
                            name: 'Priya Sharma',
                            position: 'AI Research Lead',
                            company: 'DataMinds',
                            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                        },
                        {
                            name: 'Vikram Reddy',
                            position: 'Senior Developer',
                            company: 'Google',
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                        },
                    ],

                    sponsors: [
                        {
                            name: 'TechCorp',
                            logo: 'https://via.placeholder.com/150',
                            tier: 'platinum',
                        },
                        {
                            name: 'DataSystems',
                            logo: 'https://via.placeholder.com/150',
                            tier: 'gold',
                        },
                        {
                            name: 'CloudNet',
                            logo: 'https://via.placeholder.com/150',
                            tier: 'silver',
                        },
                    ],
                };

                setHackathon(hackathonData);
                setIsLoading(false);
            }, 1000);
        };

        fetchHackathonDetails();
    }, [params.id]);

    // Calculate time remaining for countdown timer
    useEffect(() => {
        if (!hackathon || !hackathon.isUpcoming) return;

        const calculateTimeRemaining = () => {
            const hackathonDate = new Date(hackathon.startDate);
            const now = new Date();

            const difference = hackathonDate.getTime() - now.getTime();

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
    }, [hackathon]);

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    // Navigate to registration page
    const handleRegisterClick = () => {
        if (hackathon) {
            router.push(`/hackathons/register/${hackathon.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="e3f1r83">
            {/* Navbar - reusing from main page */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="d7t_cig"
            >
                <div className="flex items-center" data-oid=".knp3nw">
                    <div className="relative h-10 w-32" data-oid="uhy4pgr">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid="wm6pdc6"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid="hxnf32h"
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid="vm_pc7x">
                    <a
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="jduensn"
                    >
                        Home
                    </a>
                    <a
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="7eb7nap"
                    >
                        Courses
                    </a>
                    <a
                        href="/workshops"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="p1gr-of"
                    >
                        Workshops
                    </a>
                    <a
                        href="/hackathons"
                        className="text-purple-400 transition-colors"
                        data-oid="r38-a3g"
                    >
                        Hackathons
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="xkuoplf">
                    <a
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid="gl2q3-m"
                    >
                        Login
                    </a>
                    <a
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="4uva-by"
                    >
                        Sign Up
                    </a>
                </div>

                <button className="md:hidden text-white" data-oid=":dcqmi9">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="75ogo6l"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="3yfrp1k"
                        />
                    </svg>
                </button>
            </nav>

            {/* Hackathon Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid=":oy1:ub">
                <div className="max-w-6xl mx-auto" data-oid="n_i5a_f">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="h524n2x">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="q:pj5bo"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <div data-oid="sq4o:i8">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="89k1vj."
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="syn6o7d"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="u1mos9l"
                                    />
                                </svg>
                                Back to Hackathons
                            </button>

                            {/* Hackathon header */}
                            <div
                                className="relative rounded-xl overflow-hidden mb-12"
                                data-oid="_6pyncp"
                            >
                                <div className="absolute inset-0" data-oid="86iho2w">
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="w-full h-full object-cover"
                                        data-oid="ye0.6ed"
                                    />

                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"
                                        data-oid="rh63mlr"
                                    ></div>
                                </div>
                                <div
                                    className="relative z-10 py-16 px-6 md:px-12"
                                    data-oid="stxq-39"
                                >
                                    <div
                                        className="max-w-4xl mx-auto text-center"
                                        data-oid="8ztlbc2"
                                    >
                                        <div
                                            className="inline-block px-4 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-purple-300 text-sm font-medium mb-4"
                                            data-oid="3z2qr-f"
                                        >
                                            {hackathon.organizer}
                                        </div>
                                        <h1
                                            className="text-4xl md:text-6xl font-bold mb-6"
                                            data-oid="nc37f8-"
                                        >
                                            {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                                            data-oid="d3pn7pt"
                                        >
                                            {hackathon.longDescription}
                                        </p>
                                        <div
                                            className="flex flex-wrap justify-center gap-6 mb-8"
                                            data-oid="u-57pkj"
                                        >
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="q2i98e5"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="ihhx_c9"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                        data-oid="1-l2joz"
                                                    />
                                                </svg>
                                                <span data-oid="jx2.73p">
                                                    {formatDate(hackathon.startDate)} -{' '}
                                                    {formatDate(hackathon.endDate)}
                                                </span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="3n27_1c"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="m-_ag-1"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                        data-oid="dz-bxsn"
                                                    />
                                                </svg>
                                                <span data-oid="i54kgr0">{hackathon.location}</span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="icdjmxi"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="pbbs-t3"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                        data-oid="b5a94a_"
                                                    />
                                                </svg>
                                                <span data-oid="c1xwj6b">
                                                    Prizes: {hackathon.prizes}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Countdown timer */}
                                        {hackathon.isUpcoming && timeRemaining && (
                                            <div className="mb-8" data-oid=".d537i5">
                                                <h3
                                                    className="text-lg font-semibold mb-3"
                                                    data-oid="08hzr06"
                                                >
                                                    Hackathon starts in:
                                                </h3>
                                                <div
                                                    className="flex justify-center gap-4"
                                                    data-oid="3y3g3r5"
                                                >
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="2p2bvg4"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="rcfm-iq"
                                                        >
                                                            {timeRemaining.days}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="wzvvepe"
                                                        >
                                                            Days
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="3.ngnlz"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="buf0uf-"
                                                        >
                                                            {timeRemaining.hours}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="v41gxov"
                                                        >
                                                            Hours
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="ql2do1:"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="twztky9"
                                                        >
                                                            {timeRemaining.minutes}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="rongez-"
                                                        >
                                                            Minutes
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="ai.d_b9"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="n.rnhlr"
                                                        >
                                                            {timeRemaining.seconds}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="t6upyza"
                                                        >
                                                            Seconds
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleRegisterClick}
                                            className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium"
                                            data-oid="s57s2ez"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation tabs */}
                            <div className="border-b border-gray-800 mb-12" data-oid="hox_3w9">
                                <div
                                    className="flex overflow-x-auto scrollbar-hide"
                                    data-oid="iuv.qx0"
                                >
                                    <button
                                        onClick={() => setActiveSection('overview')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'overview'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="l6ghu05"
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveSection('tracks')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'tracks'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="291ueji"
                                    >
                                        Tracks & Domains
                                    </button>
                                    <button
                                        onClick={() => setActiveSection('structure')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'structure'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="is34w.j"
                                    >
                                        Hackathon Structure
                                    </button>
                                    <button
                                        onClick={() => setActiveSection('prerequisites')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'prerequisites'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="yrtutm_"
                                    >
                                        Prerequisites
                                    </button>
                                    {hackathon.faqs && (
                                        <button
                                            onClick={() => setActiveSection('faqs')}
                                            className={cn(
                                                'px-6 py-3 font-medium whitespace-nowrap',
                                                activeSection === 'faqs'
                                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                                    : 'text-gray-400 hover:text-gray-300',
                                            )}
                                            data-oid="4r32zk."
                                        >
                                            FAQs
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="mb-16" data-oid="w2ns7jl">
                                {/* Overview section */}
                                {activeSection === 'overview' && (
                                    <div data-oid="kjed6vl">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="aa:vr3w">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="f:f5cqi"
                                            >
                                                Program
                                            </span>{' '}
                                            Overview
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid=".7k82v3"
                                        >
                                            {hackathon.longDescription}
                                        </p>

                                        {/* Judges section */}
                                        {hackathon.judges && (
                                            <div className="mt-12" data-oid="ftt3b_5">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="qgjji7o"
                                                >
                                                    Meet Our Judges
                                                </h3>
                                                <div
                                                    className="grid md:grid-cols-3 gap-6"
                                                    data-oid="ky.wtuu"
                                                >
                                                    {hackathon.judges.map((judge, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-800/30 rounded-xl p-6 text-center"
                                                            data-oid="fxymjjl"
                                                        >
                                                            <div
                                                                className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4"
                                                                data-oid="7sita_8"
                                                            >
                                                                <img
                                                                    src={judge.image}
                                                                    alt={judge.name}
                                                                    className="w-full h-full object-cover"
                                                                    data-oid=".tb57ol"
                                                                />
                                                            </div>
                                                            <h4
                                                                className="text-xl font-semibold mb-1"
                                                                data-oid="l04b519"
                                                            >
                                                                {judge.name}
                                                            </h4>
                                                            <p
                                                                className="text-purple-400 mb-2"
                                                                data-oid="gfg0bf5"
                                                            >
                                                                {judge.position}
                                                            </p>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="z6tlg8v"
                                                            >
                                                                {judge.company}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Sponsors section */}
                                        {hackathon.sponsors && (
                                            <div className="mt-12" data-oid="h0_6sxl">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="_q3uf86"
                                                >
                                                    Our Sponsors
                                                </h3>
                                                <div className="space-y-8" data-oid="haw33uj">
                                                    {['platinum', 'gold', 'silver', 'bronze'].map(
                                                        (tier) => {
                                                            const tierSponsors =
                                                                hackathon.sponsors?.filter(
                                                                    (s) => s.tier === tier,
                                                                );
                                                            if (
                                                                !tierSponsors ||
                                                                tierSponsors.length === 0
                                                            )
                                                                return null;

                                                            return (
                                                                <div key={tier} data-oid="g0j4lod">
                                                                    <h4
                                                                        className="text-lg font-medium mb-4 capitalize"
                                                                        data-oid="8_vycfe"
                                                                    >
                                                                        {tier} Sponsors
                                                                    </h4>
                                                                    <div
                                                                        className="flex flex-wrap gap-6 items-center"
                                                                        data-oid="11.ot8l"
                                                                    >
                                                                        {tierSponsors.map(
                                                                            (sponsor, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="bg-gray-800/30 p-4 rounded-lg"
                                                                                    data-oid="f.k3yjv"
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            sponsor.logo
                                                                                        }
                                                                                        alt={
                                                                                            sponsor.name
                                                                                        }
                                                                                        className="h-12 object-contain"
                                                                                        data-oid=".x_4aax"
                                                                                    />
                                                                                </div>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tracks section */}
                                {activeSection === 'tracks' && (
                                    <div data-oid="15jnd0w">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="vrnq:4h">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="480ueoz"
                                            >
                                                Tracks
                                            </span>{' '}
                                            & Project Domains
                                        </h2>
                                        <div
                                            className="grid md:grid-cols-2 gap-8"
                                            data-oid="sezg.cn"
                                        >
                                            {hackathon.tracks.map((track, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="rn-cp5p"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-4 text-purple-400"
                                                        data-oid="koibc9d"
                                                    >
                                                        🔹 {track.name}
                                                    </h3>
                                                    <ul
                                                        className="space-y-2 text-gray-300"
                                                        data-oid="fu-.r-5"
                                                    >
                                                        {track.description.map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start"
                                                                data-oid="2_n0mhu"
                                                            >
                                                                <span
                                                                    className="text-purple-400 mr-2"
                                                                    data-oid="mnrd0v-"
                                                                >
                                                                    •
                                                                </span>
                                                                <span data-oid="g-2w-vx">
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Structure section */}
                                {activeSection === 'structure' && (
                                    <div data-oid="u6p8vpg">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="f9j5:dk">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="6_qkbz8"
                                            >
                                                Hackathon
                                            </span>{' '}
                                            Structure
                                        </h2>
                                        <div className="space-y-6" data-oid="uk84ged">
                                            {hackathon.structure.map((step, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6 flex"
                                                    data-oid="f.tcgfu"
                                                >
                                                    <div
                                                        className="mr-4 flex-shrink-0"
                                                        data-oid="9rh7m8o"
                                                    >
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold"
                                                            data-oid="nn9kekq"
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div data-oid="643-yq7">
                                                        <h3
                                                            className="text-xl font-semibold mb-2"
                                                            data-oid="hvtc_-f"
                                                        >
                                                            {step.step}
                                                        </h3>
                                                        <p
                                                            className="text-gray-300"
                                                            data-oid="rfh01lf"
                                                        >
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12" data-oid="hqjibj5">
                                            <h3
                                                className="text-2xl font-bold mb-4"
                                                data-oid="89ah27n"
                                            >
                                                Why Participate?
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-4"
                                                data-oid="psuy9:c"
                                            >
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="t9_u3hx"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="b4tlxz2"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="r-l2pgx">
                                                        Hands-on experience with real-world tech
                                                        challenges
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="go4mlm."
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="r41ikj_"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="vr6ajrn">
                                                        Networking with industry experts & mentors
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="t8u9zug"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="c_i2ka0"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="uouez8h">
                                                        Exciting prizes, internship opportunities &
                                                        recognition
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="ff0outt"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="m7zx84."
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="i7igbd:">
                                                        Certificate of participation & winning
                                                        trophies
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Prerequisites section */}
                                {activeSection === 'prerequisites' && (
                                    <div data-oid="7lqf2nx">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="62u1aw3">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="f7hyfrj"
                                            >
                                                Prerequisites
                                            </span>
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="8jk_lb:"
                                        >
                                            To ensure a smooth and productive hackathon experience,
                                            participants should meet the following prerequisites:
                                        </p>

                                        <div className="space-y-8" data-oid="fsnn3e0">
                                            {hackathon.prerequisites.map((category, index) => (
                                                <div key={index} data-oid="ju-kxou">
                                                    <h3
                                                        className="text-xl font-semibold mb-4 flex items-center"
                                                        data-oid="vu:c75v"
                                                    >
                                                        <span
                                                            className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold mr-2 text-sm"
                                                            data-oid="hcedp8p"
                                                        >
                                                            {index + 1}
                                                        </span>
                                                        <span data-oid="8xqqk.5">
                                                            {category.category}
                                                        </span>
                                                    </h3>
                                                    <div
                                                        className="grid md:grid-cols-2 gap-4"
                                                        data-oid="0akk3w3"
                                                    >
                                                        {category.items.map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                                data-oid=":oszc-d"
                                                            >
                                                                {item.icon ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="o0ow-96"
                                                                    >
                                                                        {item.icon}
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Technical Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="cf1w_7b"
                                                                    >
                                                                        ✅
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Software & Tools' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid=".uwho6l"
                                                                    >
                                                                        🔹
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Team & Collaboration Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="v4zec46"
                                                                    >
                                                                        💡
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="i:g_fqc"
                                                                    >
                                                                        ✔
                                                                    </span>
                                                                )}
                                                                <span
                                                                    className="text-gray-300"
                                                                    data-oid="u-q5d_l"
                                                                >
                                                                    {item.text}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* FAQs section */}
                                {activeSection === 'faqs' && hackathon.faqs && (
                                    <div data-oid="l:tfvdy">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="iqzhymo">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="2763ub6"
                                            >
                                                Frequently Asked
                                            </span>{' '}
                                            Questions
                                        </h2>
                                        <div className="space-y-6" data-oid="13qo62j">
                                            {hackathon.faqs.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="mvsok0h"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-2"
                                                        data-oid="--c3674"
                                                    >
                                                        {faq.question}
                                                    </h3>
                                                    <p className="text-gray-300" data-oid="xgoee2e">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Registration CTA */}
                            <div
                                className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-8 text-center"
                                data-oid="su4n63x"
                            >
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-4"
                                    data-oid="71.0i.v"
                                >
                                    Ready to join {hackathon.title}?
                                </h2>
                                <p
                                    className="text-gray-300 mb-6 max-w-2xl mx-auto"
                                    data-oid="b1ln49c"
                                >
                                    Register now to secure your spot and start preparing for an
                                    amazing hackathon experience!
                                </p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium"
                                    data-oid="v3ks6k7"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="jj:na0-">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="pdts65m"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="3228ol3">
                                The hackathon you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="8hhanvd"
                            >
                                Back to Hackathons
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="fie-sy5"
            >
                <div className="max-w-6xl mx-auto" data-oid="m-jm6k5">
                    <div className="text-center text-gray-500" data-oid="uink1bz">
                        <p data-oid="x32_j0d">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
