'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="d:my5:f">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="e17.foo" />
            {/* Hackathon Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="v61pd4y">
                <div className="max-w-6xl mx-auto" data-oid=":24-o.:">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="5r8_kxd">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="7bpg148"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <div data-oid="cj2q82z">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="j_4v3sg"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="..fnu0g"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="e_jc30c"
                                    />
                                </svg>
                                Back to Hackathons
                            </button>

                            {/* Hackathon header */}
                            <div
                                className="relative rounded-xl overflow-hidden mb-12"
                                data-oid="a6i7udg"
                            >
                                <div className="absolute inset-0" data-oid="s3-qlu9">
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="w-full h-full object-cover"
                                        data-oid="hokgxd_"
                                    />

                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"
                                        data-oid="qwh0dst"
                                    ></div>
                                </div>
                                <div
                                    className="relative z-10 py-16 px-6 md:px-12"
                                    data-oid=":vk337k"
                                >
                                    <div
                                        className="max-w-4xl mx-auto text-center"
                                        data-oid="47yaewm"
                                    >
                                        <div
                                            className="inline-block px-4 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-purple-300 text-sm font-medium mb-4"
                                            data-oid="fwjd034"
                                        >
                                            {hackathon.organizer}
                                        </div>
                                        <h1
                                            className="text-4xl md:text-6xl font-bold mb-6"
                                            data-oid="k84i64m"
                                        >
                                            {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                                            data-oid="9oeiy4b"
                                        >
                                            {hackathon.longDescription}
                                        </p>
                                        <div
                                            className="flex flex-wrap justify-center gap-6 mb-8"
                                            data-oid="g4o6n4n"
                                        >
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="nuv8lr8"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="dx6ekyu"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                        data-oid="-zh9_u0"
                                                    />
                                                </svg>
                                                <span data-oid="o-qfsgt">
                                                    {formatDate(hackathon.startDate)} -{' '}
                                                    {formatDate(hackathon.endDate)}
                                                </span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="hoqszn_"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="mpa3w9z"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                        data-oid="n6_h:jj"
                                                    />
                                                </svg>
                                                <span data-oid="ohwrcpn">{hackathon.location}</span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="t4_ot94"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="a-ozi7t"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                        data-oid="7l13o8j"
                                                    />
                                                </svg>
                                                <span data-oid="xg07vm4">
                                                    Prizes: {hackathon.prizes}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Countdown timer */}
                                        {hackathon.isUpcoming && timeRemaining && (
                                            <div className="mb-8" data-oid="np29k6d">
                                                <h3
                                                    className="text-lg font-semibold mb-3"
                                                    data-oid="2lvc97e"
                                                >
                                                    Hackathon starts in:
                                                </h3>
                                                <div
                                                    className="flex justify-center gap-4"
                                                    data-oid="lels-69"
                                                >
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="91c-8d4"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="ko:gkgm"
                                                        >
                                                            {timeRemaining.days}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="dw8.jn3"
                                                        >
                                                            Days
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="-dwy70s"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="p4edr:4"
                                                        >
                                                            {timeRemaining.hours}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="rxujdlw"
                                                        >
                                                            Hours
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="wv3kin9"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="fuw4r97"
                                                        >
                                                            {timeRemaining.minutes}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="mprr5qd"
                                                        >
                                                            Minutes
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid=":bb.izu"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="xutxkj3"
                                                        >
                                                            {timeRemaining.seconds}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="9sxpm4u"
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
                                            data-oid="dh1bp0e"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation tabs */}
                            <div className="border-b border-gray-800 mb-12" data-oid=":dxkmsz">
                                <div
                                    className="flex overflow-x-auto scrollbar-hide"
                                    data-oid="us2-ud."
                                >
                                    <button
                                        onClick={() => setActiveSection('overview')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'overview'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="q682u_3"
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
                                        data-oid=".:piu:c"
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
                                        data-oid="dv9do5w"
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
                                        data-oid="p4:bh.8"
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
                                            data-oid="3jycnji"
                                        >
                                            FAQs
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="mb-16" data-oid="ctoxcy2">
                                {/* Overview section */}
                                {activeSection === 'overview' && (
                                    <div data-oid="dew7_rv">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="66:_rqh">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="hq3poti"
                                            >
                                                Program
                                            </span>{' '}
                                            Overview
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="70ipi8t"
                                        >
                                            {hackathon.longDescription}
                                        </p>

                                        {/* Judges section */}
                                        {hackathon.judges && (
                                            <div className="mt-12" data-oid="rgu18iw">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="6jmua_r"
                                                >
                                                    Meet Our Judges
                                                </h3>
                                                <div
                                                    className="grid md:grid-cols-3 gap-6"
                                                    data-oid=".k17m5s"
                                                >
                                                    {hackathon.judges.map((judge, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-800/30 rounded-xl p-6 text-center"
                                                            data-oid="ho.7x9y"
                                                        >
                                                            <div
                                                                className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4"
                                                                data-oid="r:m2qos"
                                                            >
                                                                <img
                                                                    src={judge.image}
                                                                    alt={judge.name}
                                                                    className="w-full h-full object-cover"
                                                                    data-oid="8uija9f"
                                                                />
                                                            </div>
                                                            <h4
                                                                className="text-xl font-semibold mb-1"
                                                                data-oid="4-2k8oz"
                                                            >
                                                                {judge.name}
                                                            </h4>
                                                            <p
                                                                className="text-purple-400 mb-2"
                                                                data-oid="ly61bls"
                                                            >
                                                                {judge.position}
                                                            </p>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="_f09n00"
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
                                            <div className="mt-12" data-oid="oho4g7d">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="7hots-5"
                                                >
                                                    Our Sponsors
                                                </h3>
                                                <div className="space-y-8" data-oid="h95fqfk">
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
                                                                <div key={tier} data-oid="a4.:1k-">
                                                                    <h4
                                                                        className="text-lg font-medium mb-4 capitalize"
                                                                        data-oid="fo.fa:-"
                                                                    >
                                                                        {tier} Sponsors
                                                                    </h4>
                                                                    <div
                                                                        className="flex flex-wrap gap-6 items-center"
                                                                        data-oid="-j00_fo"
                                                                    >
                                                                        {tierSponsors.map(
                                                                            (sponsor, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="bg-gray-800/30 p-4 rounded-lg"
                                                                                    data-oid="3kg_j3q"
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            sponsor.logo
                                                                                        }
                                                                                        alt={
                                                                                            sponsor.name
                                                                                        }
                                                                                        className="h-12 object-contain"
                                                                                        data-oid=".s5bz80"
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
                                    <div data-oid="8-br4cu">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="kk34zdo">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="a380adg"
                                            >
                                                Tracks
                                            </span>{' '}
                                            & Project Domains
                                        </h2>
                                        <div
                                            className="grid md:grid-cols-2 gap-8"
                                            data-oid="k:q4avg"
                                        >
                                            {hackathon.tracks.map((track, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="al7c:u2"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-4 text-purple-400"
                                                        data-oid="tp_2wp6"
                                                    >
                                                        🔹 {track.name}
                                                    </h3>
                                                    <ul
                                                        className="space-y-2 text-gray-300"
                                                        data-oid="5uhess1"
                                                    >
                                                        {track.description.map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start"
                                                                data-oid="k16vghz"
                                                            >
                                                                <span
                                                                    className="text-purple-400 mr-2"
                                                                    data-oid="cw.qbby"
                                                                >
                                                                    •
                                                                </span>
                                                                <span data-oid="yiqokg0">
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
                                    <div data-oid="9h.8o:1">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="2umihx3">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="4nxe73w"
                                            >
                                                Hackathon
                                            </span>{' '}
                                            Structure
                                        </h2>
                                        <div className="space-y-6" data-oid="2hc_gm0">
                                            {hackathon.structure.map((step, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6 flex"
                                                    data-oid="z9rn:9h"
                                                >
                                                    <div
                                                        className="mr-4 flex-shrink-0"
                                                        data-oid="wxh9rlz"
                                                    >
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold"
                                                            data-oid="0ta8id-"
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div data-oid="_i2tkjo">
                                                        <h3
                                                            className="text-xl font-semibold mb-2"
                                                            data-oid="_i22x0:"
                                                        >
                                                            {step.step}
                                                        </h3>
                                                        <p
                                                            className="text-gray-300"
                                                            data-oid="sxwbxr6"
                                                        >
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12" data-oid="6l_4:.7">
                                            <h3
                                                className="text-2xl font-bold mb-4"
                                                data-oid="1h27bpo"
                                            >
                                                Why Participate?
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-4"
                                                data-oid="63izib1"
                                            >
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="7-io_mn"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="jyoug2-"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="yaij91x">
                                                        Hands-on experience with real-world tech
                                                        challenges
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid=":6yds9f"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="fam_yer"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="xe3cl.2">
                                                        Networking with industry experts & mentors
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="fd0qmrx"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="uzzm2-5"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="l2wwho1">
                                                        Exciting prizes, internship opportunities &
                                                        recognition
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="t3iw1ji"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="lqjxx_x"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="s2d8qs:">
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
                                    <div data-oid="v19ojvf">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="aa-14kd">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="ckklsu-"
                                            >
                                                Prerequisites
                                            </span>
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="gj1zqso"
                                        >
                                            To ensure a smooth and productive hackathon experience,
                                            participants should meet the following prerequisites:
                                        </p>

                                        <div className="space-y-8" data-oid="q-ksqea">
                                            {hackathon.prerequisites.map((category, index) => (
                                                <div key={index} data-oid="13._7ty">
                                                    <h3
                                                        className="text-xl font-semibold mb-4 flex items-center"
                                                        data-oid=".ga2i5:"
                                                    >
                                                        <span
                                                            className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold mr-2 text-sm"
                                                            data-oid="qq--fv8"
                                                        >
                                                            {index + 1}
                                                        </span>
                                                        <span data-oid="a66qq3n">
                                                            {category.category}
                                                        </span>
                                                    </h3>
                                                    <div
                                                        className="grid md:grid-cols-2 gap-4"
                                                        data-oid="ssg1l_t"
                                                    >
                                                        {category.items.map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                                data-oid="b47nd.."
                                                            >
                                                                {item.icon ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="bj50egz"
                                                                    >
                                                                        {item.icon}
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Technical Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="_s4kidn"
                                                                    >
                                                                        ✅
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Software & Tools' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="z8e0cw:"
                                                                    >
                                                                        🔹
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Team & Collaboration Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="v.c:21t"
                                                                    >
                                                                        💡
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="8m29cii"
                                                                    >
                                                                        ✔
                                                                    </span>
                                                                )}
                                                                <span
                                                                    className="text-gray-300"
                                                                    data-oid="lm8q-q:"
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
                                    <div data-oid="2d51-ul">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="57hcfr7">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="jn52g8n"
                                            >
                                                Frequently Asked
                                            </span>{' '}
                                            Questions
                                        </h2>
                                        <div className="space-y-6" data-oid="9cz4agv">
                                            {hackathon.faqs.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="48ivrvq"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-2"
                                                        data-oid="jl343mt"
                                                    >
                                                        {faq.question}
                                                    </h3>
                                                    <p className="text-gray-300" data-oid="gxpy4i5">
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
                                data-oid="4tp9a2z"
                            >
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-4"
                                    data-oid="lpc.nzl"
                                >
                                    Ready to join {hackathon.title}?
                                </h2>
                                <p
                                    className="text-gray-300 mb-6 max-w-2xl mx-auto"
                                    data-oid="9rkzfia"
                                >
                                    Register now to secure your spot and start preparing for an
                                    amazing hackathon experience!
                                </p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium"
                                    data-oid=".lleu94"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="ktjfpx3">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="vr97l6f"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="_eu057q">
                                The hackathon you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="ozjp5cv"
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
                data-oid="y7_ivsn"
            >
                <div className="max-w-6xl mx-auto" data-oid="g2pvc:r">
                    <div className="text-center text-gray-500" data-oid=".fi6a7v">
                        <p data-oid="m-nfpsl">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
