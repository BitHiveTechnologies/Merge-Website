'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

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
                            answer: 'HackBIT 2025 is open to all students and professionals with an interest in technology and innovation. Whether you&apos;re a beginner or an experienced developer, you&apos;re welcome to join!',
                        },
                        {
                            question: 'Do I need to have a team to register?',
                            answer: 'No, you can register individually and form a team during the event. We&apos;ll have a team formation session at the beginning of the hackathon.',
                        },
                        {
                            question: 'What should I bring to the hackathon?',
                            answer: 'You should bring your laptop, charger, any necessary peripherals, and your student/professional ID. If it&apos;s an in-person event, consider bringing toiletries and a change of clothes for overnight stays.',
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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="7hhs2z_">
            {/* Navbar - reusing from main page */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="r35_d6d"
            >
                <div className="flex items-center" data-oid="5a5f2nc">
                    <div className="relative h-10 w-32" data-oid="8j0mdad">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid="pwx62ja"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid="-fkd43l"
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid="oq__.zs">
                    <Link
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="pc4jgpl"
                    >
                        Home
                    </Link>
                    <Link
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="-7eui8g"
                    >
                        Courses
                    </Link>
                    <Link
                        href="/workshops"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="fx7mwbg"
                    >
                        Workshops
                    </Link>
                    <Link
                        href="/hackathons"
                        className="text-purple-400 transition-colors"
                        data-oid="n-9dyvj"
                    >
                        Hackathons
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="-n9x0fl">
                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid=".738s7e"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="jys_pcf"
                    >
                        Sign Up
                    </Link>
                </div>

                <button className="md:hidden text-white" data-oid="teiwbnb">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="c.l8gm4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="d1a7l0j"
                        />
                    </svg>
                </button>
            </nav>

            {/* Hackathon Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="siiht:f">
                <div className="max-w-6xl mx-auto" data-oid="l3kfuk:">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="n44ccrs">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="2remmd-"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <div data-oid="hyuos-l">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="n6bdyoe"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="c68afn7"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="esb68n4"
                                    />
                                </svg>
                                Back to Hackathons
                            </button>

                            {/* Hackathon header */}
                            <div
                                className="relative rounded-xl overflow-hidden mb-12"
                                data-oid="zrsxy9l"
                            >
                                <div className="absolute inset-0" data-oid="pkkg9jt">
                                    <div className="relative w-full h-full" data-oid="yi7u2tm">
                                        <Image
                                            src={hackathon.image}
                                            alt={hackathon.title}
                                            fill
                                            className="object-cover"
                                            data-oid="nw-vddp"
                                        />
                                    </div>

                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"
                                        data-oid="n1r-fg3"
                                    ></div>
                                </div>
                                <div
                                    className="relative z-10 py-16 px-6 md:px-12"
                                    data-oid="42:x5tv"
                                >
                                    <div
                                        className="max-w-4xl mx-auto text-center"
                                        data-oid="axw9x5d"
                                    >
                                        <div
                                            className="inline-block px-4 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-purple-300 text-sm font-medium mb-4"
                                            data-oid=".44b7x7"
                                        >
                                            {hackathon.organizer}
                                        </div>
                                        <h1
                                            className="text-4xl md:text-6xl font-bold mb-6"
                                            data-oid="jeo219d"
                                        >
                                            {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                                            data-oid="p0ek2u:"
                                        >
                                            {hackathon.longDescription}
                                        </p>
                                        <div
                                            className="flex flex-wrap justify-center gap-6 mb-8"
                                            data-oid="n6:9ywc"
                                        >
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="-x.75dl"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="mn4:8e:"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                        data-oid="ns-c4pw"
                                                    />
                                                </svg>
                                                <span data-oid=".j5ccm3">
                                                    {formatDate(hackathon.startDate)} -{' '}
                                                    {formatDate(hackathon.endDate)}
                                                </span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="n5p2s9y"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid=":4sr0:y"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                        data-oid="k401ke2"
                                                    />
                                                </svg>
                                                <span data-oid="0mtyfpn">{hackathon.location}</span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="kop_rg3"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid=".9x077:"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                        data-oid=":h.a1qh"
                                                    />
                                                </svg>
                                                <span data-oid="dgmlybg">
                                                    Prizes: {hackathon.prizes}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Countdown timer */}
                                        {hackathon.isUpcoming && timeRemaining && (
                                            <div className="mb-8" data-oid="3mh02og">
                                                <h3
                                                    className="text-lg font-semibold mb-3"
                                                    data-oid="7-hsdim"
                                                >
                                                    Hackathon starts in:
                                                </h3>
                                                <div
                                                    className="flex justify-center gap-4"
                                                    data-oid="a0_ap.w"
                                                >
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="uut:nhn"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="bqd-nhw"
                                                        >
                                                            {timeRemaining.days}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="b12fzkx"
                                                        >
                                                            Days
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="4m46hvk"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="lnq3slx"
                                                        >
                                                            {timeRemaining.hours}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="lb-hjvv"
                                                        >
                                                            Hours
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="x1p11sq"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="99rdga9"
                                                        >
                                                            {timeRemaining.minutes}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="wh:u_5l"
                                                        >
                                                            Minutes
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="j9_dkbe"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="l.i27pr"
                                                        >
                                                            {timeRemaining.seconds}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="x.eaew."
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
                                            data-oid="fc._2u5"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation tabs */}
                            <div className="border-b border-gray-800 mb-12" data-oid="1gkoc8x">
                                <div
                                    className="flex overflow-x-auto scrollbar-hide"
                                    data-oid="azbd3h2"
                                >
                                    <button
                                        onClick={() => setActiveSection('overview')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'overview'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="8sgqbu1"
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
                                        data-oid="-_13uvl"
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
                                        data-oid="xdpojg-"
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
                                        data-oid=":.u23oj"
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
                                            data-oid="7ldq0g6"
                                        >
                                            FAQs
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="mb-16" data-oid="270w.3:">
                                {/* Overview section */}
                                {activeSection === 'overview' && (
                                    <div data-oid="45qmus7">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="52g0q5h">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="512b:6s"
                                            >
                                                Program
                                            </span>{' '}
                                            Overview
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="fpkgd_8"
                                        >
                                            {hackathon.longDescription}
                                        </p>

                                        {/* Judges section */}
                                        {hackathon.judges && (
                                            <div className="mt-12" data-oid="wgd-nzo">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="jhj0q-9"
                                                >
                                                    Meet Our Judges
                                                </h3>
                                                <div
                                                    className="grid md:grid-cols-3 gap-6"
                                                    data-oid="0iqm:0c"
                                                >
                                                    {hackathon.judges.map((judge, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-800/30 rounded-xl p-6 text-center"
                                                            data-oid="46cid45"
                                                        >
                                                            <div
                                                                className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4"
                                                                data-oid=".3:1sw8"
                                                            >
                                                                <div
                                                                    className="relative w-full h-full"
                                                                    data-oid="2_atiip"
                                                                >
                                                                    <Image
                                                                        src={judge.image}
                                                                        alt={judge.name}
                                                                        fill
                                                                        className="object-cover"
                                                                        data-oid="nx:tuhc"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <h4
                                                                className="text-xl font-semibold mb-1"
                                                                data-oid="r_dsxja"
                                                            >
                                                                {judge.name}
                                                            </h4>
                                                            <p
                                                                className="text-purple-400 mb-2"
                                                                data-oid="::8jfcb"
                                                            >
                                                                {judge.position}
                                                            </p>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="a-ao0ya"
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
                                            <div className="mt-12" data-oid="2:nqq26">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="6nu9c6_"
                                                >
                                                    Our Sponsors
                                                </h3>
                                                <div className="space-y-8" data-oid="lnt6m70">
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
                                                                <div key={tier} data-oid="pyobuqn">
                                                                    <h4
                                                                        className="text-lg font-medium mb-4 capitalize"
                                                                        data-oid="m.a92ni"
                                                                    >
                                                                        {tier} Sponsors
                                                                    </h4>
                                                                    <div
                                                                        className="flex flex-wrap gap-6 items-center"
                                                                        data-oid="bckfxjj"
                                                                    >
                                                                        {tierSponsors.map(
                                                                            (sponsor, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="bg-gray-800/30 p-4 rounded-lg"
                                                                                    data-oid="ztw0g83"
                                                                                >
                                                                                    <div
                                                                                        className="relative h-12 w-full"
                                                                                        data-oid="jexier_"
                                                                                    >
                                                                                        <Image
                                                                                            src={
                                                                                                sponsor.logo
                                                                                            }
                                                                                            alt={
                                                                                                sponsor.name
                                                                                            }
                                                                                            fill
                                                                                            className="object-contain"
                                                                                            data-oid="gdofrnb"
                                                                                        />
                                                                                    </div>
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
                                    <div data-oid="56ns5n3">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="uqqx_:m">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="dni.ad0"
                                            >
                                                Tracks
                                            </span>{' '}
                                            & Project Domains
                                        </h2>
                                        <div
                                            className="grid md:grid-cols-2 gap-8"
                                            data-oid="4581r2q"
                                        >
                                            {hackathon.tracks.map((track, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="0llcql4"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-4 text-purple-400"
                                                        data-oid="vm6fn7e"
                                                    >
                                                        🔹 {track.name}
                                                    </h3>
                                                    <ul
                                                        className="space-y-2 text-gray-300"
                                                        data-oid="6kg46en"
                                                    >
                                                        {track.description.map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start"
                                                                data-oid="4.2hzai"
                                                            >
                                                                <span
                                                                    className="text-purple-400 mr-2"
                                                                    data-oid="42y-9go"
                                                                >
                                                                    •
                                                                </span>
                                                                <span data-oid="f_bgodl">
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
                                    <div data-oid=":0z0q6:">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="4wnav.5">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="-tudl30"
                                            >
                                                Hackathon
                                            </span>{' '}
                                            Structure
                                        </h2>
                                        <div className="space-y-6" data-oid="tnxlyvu">
                                            {hackathon.structure.map((step, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6 flex"
                                                    data-oid="a7.r_wd"
                                                >
                                                    <div
                                                        className="mr-4 flex-shrink-0"
                                                        data-oid="g:g-_9g"
                                                    >
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold"
                                                            data-oid="zqplqdk"
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div data-oid="7s4_4mq">
                                                        <h3
                                                            className="text-xl font-semibold mb-2"
                                                            data-oid="cy8ae66"
                                                        >
                                                            {step.step}
                                                        </h3>
                                                        <p
                                                            className="text-gray-300"
                                                            data-oid=":mmrjcu"
                                                        >
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12" data-oid="l9ib4n0">
                                            <h3
                                                className="text-2xl font-bold mb-4"
                                                data-oid="ioc.84t"
                                            >
                                                Why Participate?
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-4"
                                                data-oid=".s9g6tl"
                                            >
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="ie0b4fu"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="v-1uhq."
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="vzt4_yu">
                                                        Hands-on experience with real-world tech
                                                        challenges
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="ptjy_or"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="72cmgki"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="__v8y_z">
                                                        Networking with industry experts & mentors
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="su7tal9"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="wfd04b2"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="g79jltf">
                                                        Exciting prizes, internship opportunities &
                                                        recognition
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="hd_d0b-"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="_trvil."
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="dc03q.v">
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
                                    <div data-oid="4m:gvfv">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="wi8hlgg">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="gea.92o"
                                            >
                                                Prerequisites
                                            </span>
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="yx02pyz"
                                        >
                                            To ensure a smooth and productive hackathon experience,
                                            participants should meet the following prerequisites:
                                        </p>

                                        <div className="space-y-8" data-oid="dp.w2yq">
                                            {hackathon.prerequisites.map((category, index) => (
                                                <div key={index} data-oid="2uftkcz">
                                                    <h3
                                                        className="text-xl font-semibold mb-4 flex items-center"
                                                        data-oid="isyu234"
                                                    >
                                                        <span
                                                            className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold mr-2 text-sm"
                                                            data-oid="vnslll."
                                                        >
                                                            {index + 1}
                                                        </span>
                                                        <span data-oid="jjv0djp">
                                                            {category.category}
                                                        </span>
                                                    </h3>
                                                    <div
                                                        className="grid md:grid-cols-2 gap-4"
                                                        data-oid="o3sl20i"
                                                    >
                                                        {category.items.map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                                data-oid="4z1xsq2"
                                                            >
                                                                {item.icon ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="qc:di_7"
                                                                    >
                                                                        {item.icon}
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Technical Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="a.yawx2"
                                                                    >
                                                                        ✅
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Software & Tools' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="08.vvph"
                                                                    >
                                                                        🔹
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Team & Collaboration Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="fpx5dyq"
                                                                    >
                                                                        💡
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="8424mos"
                                                                    >
                                                                        ✔
                                                                    </span>
                                                                )}
                                                                <span
                                                                    className="text-gray-300"
                                                                    data-oid="4q__2qa"
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
                                    <div data-oid="s.-jqoc">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="0-_4-q8">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid=".zw.:yu"
                                            >
                                                Frequently Asked
                                            </span>{' '}
                                            Questions
                                        </h2>
                                        <div className="space-y-6" data-oid="oi_4384">
                                            {hackathon.faqs.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="gjm_6pa"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-2"
                                                        data-oid="b1h3v1e"
                                                    >
                                                        {faq.question}
                                                    </h3>
                                                    <p className="text-gray-300" data-oid="h11yu6k">
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
                                data-oid="nglfnub"
                            >
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-4"
                                    data-oid="726b_p_"
                                >
                                    Ready to join {hackathon.title}?
                                </h2>
                                <p
                                    className="text-gray-300 mb-6 max-w-2xl mx-auto"
                                    data-oid="h0g1-:r"
                                >
                                    Register now to secure your spot and start preparing for an
                                    amazing hackathon experience!
                                </p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium"
                                    data-oid="2o4cnfr"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid=":ft4iax">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid=".x-bhhb"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="mzpbb4v">
                                The hackathon you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="g.n9fqr"
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
                data-oid="ad71a__"
            >
                <div className="max-w-6xl mx-auto" data-oid="njtimhr">
                    <div className="text-center text-gray-500" data-oid="ljga-2o">
                        <p data-oid="-z6ryv3">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
