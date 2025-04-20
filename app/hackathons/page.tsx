'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
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
    image: string;
    registrationLink: string;
    isLive: boolean;
    isUpcoming: boolean;
    tracks: string[];
    prizes: string;
}

// Past hackathon winner type
interface HackathonWinner {
    id: number;
    hackathonId: number;
    hackathonName: string;
    teamName: string;
    projectName: string;
    projectDescription: string;
    track: string;
    position: string;
    teamMembers: string[];
    projectImage: string;
    projectLink?: string;
}

export default function HackathonsPage() {
    const router = useRouter();
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [winners, setWinners] = useState<HackathonWinner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    // Fetch hackathons (simulated)
    useEffect(() => {
        // In a real app, this would be an API call
        const fetchHackathons = () => {
            setIsLoading(true);

            // Simulated API response
            const hackathonsData: Hackathon[] = [
                {
                    id: 1,
                    title: 'HackBIT 2025',
                    organizer: 'BIT MESRA, PATNA',
                    startDate: '2025-03-15',
                    endDate: '2025-03-16',
                    location: 'BIT Mesra, Patna Campus',
                    description:
                        'HackBIT 2025 is a high-energy, innovation-driven hackathon where participants tackle real-world challenges using cutting-edge technologies. Open to students and professionals, the event encourages collaboration, rapid prototyping, and creative problem-solving.',
                    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    registrationLink: '/hackathons/register/1',
                    isLive: false,
                    isUpcoming: true,
                    tracks: ['Web Development', 'AI/ML', 'Data Science'],
                    prizes: '₹50,000 for 1st Place, ₹30,000 for 2nd Place, ₹20,000 for 3rd Place',
                },
                {
                    id: 2,
                    title: 'CodeFest 2024',
                    organizer: 'IIT Patna',
                    startDate: '2024-12-10',
                    endDate: '2024-12-11',
                    location: 'IIT Patna Campus',
                    description:
                        'A 24-hour coding marathon where participants build innovative solutions to real-world problems. Join us for a weekend of coding, learning, and networking.',
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    registrationLink: '/hackathons/register/2',
                    isLive: false,
                    isUpcoming: true,
                    tracks: ['Blockchain', 'IoT', 'Mobile Apps'],
                    prizes: '₹40,000 for 1st Place, ₹25,000 for 2nd Place, ₹15,000 for 3rd Place',
                },
                {
                    id: 3,
                    title: 'DataHack 2024',
                    organizer: 'DA-IICT',
                    startDate: '2024-11-05',
                    endDate: '2024-11-06',
                    location: 'Online (Virtual Event)',
                    description:
                        'A data science hackathon focused on solving complex problems using machine learning, data analysis, and visualization techniques.',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    registrationLink: '/hackathons/register/3',
                    isLive: true,
                    isUpcoming: false,
                    tracks: ['Data Science', 'Machine Learning', 'Data Visualization'],
                    prizes: '₹35,000 for 1st Place, ₹20,000 for 2nd Place, ₹10,000 for 3rd Place',
                },
            ];

            // Simulated past hackathon winners
            const winnersData: HackathonWinner[] = [
                {
                    id: 1,
                    hackathonId: 101,
                    hackathonName: 'HackBIT 2023',
                    teamName: 'CodeCrafters',
                    projectName: 'EcoTrack',
                    projectDescription:
                        'A sustainable living app that tracks carbon footprint and suggests eco-friendly alternatives.',
                    track: 'Web Development',
                    position: '1st Place',
                    teamMembers: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar'],
                    projectImage:
                        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    projectLink: 'https://github.com/codecrafters/ecotrack',
                },
                {
                    id: 2,
                    hackathonId: 101,
                    hackathonName: 'HackBIT 2023',
                    teamName: 'DataMinds',
                    projectName: 'HealthPredict',
                    projectDescription:
                        'An AI-powered health prediction system that analyzes symptoms and suggests potential diagnoses.',
                    track: 'AI/ML',
                    position: '2nd Place',
                    teamMembers: ['Neha Singh', 'Vikram Reddy', 'Sanjay Gupta'],
                    projectImage:
                        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    projectLink: 'https://github.com/dataminds/healthpredict',
                },
                {
                    id: 3,
                    hackathonId: 102,
                    hackathonName: 'CodeFest 2023',
                    teamName: 'BlockChainers',
                    projectName: 'SecureVote',
                    projectDescription:
                        'A blockchain-based voting system ensuring transparent and tamper-proof elections.',
                    track: 'Blockchain',
                    position: '1st Place',
                    teamMembers: ['Arjun Mehta', 'Kavya Sharma', 'Rohan Joshi'],
                    projectImage:
                        'https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    projectLink: 'https://github.com/blockchainers/securevote',
                },
            ];

            setHackathons(hackathonsData);
            setWinners(winnersData);
            setIsLoading(false);
        };

        fetchHackathons();
    }, []);

    // Navigate to hackathon detail
    const handleHackathonClick = (hackathonId: number) => {
        router.push(`/hackathons/${hackathonId}`);
    };

    // Navigate to registration page
    const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>, hackathonId: number) => {
        e.stopPropagation();
        router.push(`/hackathons/register/${hackathonId}`);
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

    // Calculate days remaining
    const getDaysRemaining = (dateString: string) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="8r1_7ep">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="_udth97" />

            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-24 pb-28 px-6 md:px-12 relative overflow-hidden"
                data-oid="aighixq"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="it:fy16"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="b.jw381"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="6aqd48_"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10 py-8" data-oid="nq63jgc">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                        data-oid="cd2u0f:"
                    >
                        {' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="bkj:.90"
                        >
                            Hackathons
                        </span>
                    </h1>
                    <p
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-6"
                        data-oid="3z3kqhn"
                    >
                        Join our innovation-driven hackathons to solve real-world challenges,
                        collaborate with like-minded individuals, and win exciting prizes.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 mb-8"
                        data-oid="q82hekk"
                    ></div>
                    <div className="flex flex-wrap gap-4 mt-8" data-oid="yzvb2sk">
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="qz4gshi"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="3ceb.g8"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="xv8rlpj"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="vljfj:q"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="32f9g_g"
                            >
                                Exciting Prizes
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="0:hzz63"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="fbxydkm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="7qxmspc"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="rkzphr6"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="2913x5z"
                            >
                                Expert Mentorship
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="uflnim4"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="7iw7yvh"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="q:e78ei"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="1ae89h6"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="xbsp.wo"
                            >
                                Networking Opportunities
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div
                className="bg-gray-900 py-8 px-6 md:px-12 border-b border-gray-800"
                data-oid="e:2z26s"
            >
                <div className="max-w-6xl mx-auto" data-oid="_eob7k4">
                    <div className="flex space-x-4 border-b border-gray-800" data-oid="v428uqr">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={cn(
                                'px-6 py-3 font-medium text-lg',
                                activeTab === 'upcoming'
                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300',
                            )}
                            data-oid="x:0kkmu"
                        >
                            Upcoming & Live Hackathons
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={cn(
                                'px-6 py-3 font-medium text-lg',
                                activeTab === 'past'
                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300',
                            )}
                            data-oid="oeuegz9"
                        >
                            Past Winners
                        </button>
                    </div>
                </div>
            </div>

            {/* Hackathon Listings */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="79f_q5e">
                <div className="max-w-6xl mx-auto" data-oid="cxveffc">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="v7-.-a0">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="auk-j4_"
                            ></div>
                        </div>
                    ) : activeTab === 'upcoming' ? (
                        <div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            data-oid="omftv38"
                        >
                            {hackathons.map((hackathon) => (
                                <div
                                    key={hackathon.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleHackathonClick(hackathon.id)}
                                    data-oid="i72hngz"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden"
                                        data-oid="sgyxe6:"
                                    >
                                        <img
                                            src={hackathon.image}
                                            alt={hackathon.title}
                                            className="w-full h-full object-cover"
                                            data-oid="lhbwr4:"
                                        />

                                        {hackathon.isLive && (
                                            <div
                                                className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 animate-pulse"
                                                data-oid="idgxxpk"
                                            >
                                                LIVE NOW
                                            </div>
                                        )}
                                        {hackathon.isUpcoming && !hackathon.isLive && (
                                            <div
                                                className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                                data-oid="74xf03p"
                                            >
                                                {getDaysRemaining(hackathon.startDate)} days to go
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6" data-oid="1wj4o9r">
                                        <div
                                            className="text-gray-400 text-sm mb-2"
                                            data-oid="e1h6hs4"
                                        >
                                            {hackathon.organizer}
                                        </div>
                                        <h3
                                            className="text-xl font-semibold mb-2"
                                            data-oid="rc.tzvk"
                                        >
                                            {hackathon.title}
                                        </h3>
                                        <p
                                            className="text-gray-400 text-sm mb-4 line-clamp-2"
                                            data-oid="hji0v1:"
                                        >
                                            {hackathon.description}
                                        </p>
                                        <div
                                            className="flex justify-between text-gray-400 text-sm mb-4"
                                            data-oid="7eh0adl"
                                        >
                                            <div className="flex items-center" data-oid="t0zzt4n">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 mr-1 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="q2828bf"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                        data-oid="._k0t7_"
                                                    />
                                                </svg>
                                                <span data-oid="qgkm3ux">
                                                    {formatDate(hackathon.startDate)} -{' '}
                                                    {formatDate(hackathon.endDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center" data-oid="cphx3vy">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 mr-1 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid=":h5kvwe"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                        data-oid="b3cgvv3"
                                                    />
                                                </svg>
                                                <span data-oid="g:of463">{hackathon.location}</span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="_pbt3qa"
                                        >
                                            {hackathon.tracks.map((track, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                                                    data-oid="5enrrtr"
                                                >
                                                    {track}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={(e) => handleRegisterClick(e, hackathon.id)}
                                            className="w-full py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium"
                                            data-oid="zdcladf"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-12" data-oid="ofg15di">
                            <div className="mb-8" data-oid="_lqwd35">
                                <h2 className="text-3xl font-bold mb-6" data-oid="geqzaui">
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="457fvpd"
                                    >
                                        Past Hackathon
                                    </span>{' '}
                                    Winners
                                </h2>
                                <p className="text-gray-300 mb-8 max-w-4xl" data-oid="z0xvr.5">
                                    Celebrating the innovative solutions and talented teams from our
                                    previous hackathons. These projects showcase creativity,
                                    technical excellence, and problem-solving skills.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8" data-oid=":kfp3.s">
                                {winners.map((winner) => (
                                    <div
                                        key={winner.id}
                                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all"
                                        data-oid="i12wgjr"
                                    >
                                        <div
                                            className="relative h-48 overflow-hidden"
                                            data-oid=".:urmg7"
                                        >
                                            <img
                                                src={winner.projectImage}
                                                alt={winner.projectName}
                                                className="w-full h-full object-cover"
                                                data-oid="k_e-m19"
                                            />

                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end"
                                                data-oid=".jn07n1"
                                            >
                                                <div className="p-6" data-oid="-njzgly">
                                                    <div
                                                        className="text-purple-400 text-sm mb-1"
                                                        data-oid="ea48z-s"
                                                    >
                                                        {winner.hackathonName}
                                                    </div>
                                                    <h3
                                                        className="text-xl font-bold"
                                                        data-oid="o9kxqcp"
                                                    >
                                                        {winner.projectName}
                                                    </h3>
                                                    <div
                                                        className="flex items-center mt-2"
                                                        data-oid="obq1xe1"
                                                    >
                                                        <div
                                                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full"
                                                            data-oid="j2h6.xs"
                                                        >
                                                            {winner.position}
                                                        </div>
                                                        <div
                                                            className="ml-2 text-gray-300 text-sm"
                                                            data-oid="xyy7wo2"
                                                        >
                                                            {winner.track}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6" data-oid="63v2r_g">
                                            <div className="mb-4" data-oid="m9-4c5h">
                                                <div
                                                    className="text-gray-400 text-sm mb-1"
                                                    data-oid="oy8fcng"
                                                >
                                                    Team
                                                </div>
                                                <div className="font-medium" data-oid="5gi0hed">
                                                    {winner.teamName}
                                                </div>
                                            </div>
                                            <p
                                                className="text-gray-300 text-sm mb-4"
                                                data-oid="9y4gk0."
                                            >
                                                {winner.projectDescription}
                                            </p>
                                            <div className="mb-4" data-oid="mvftfb-">
                                                <div
                                                    className="text-gray-400 text-sm mb-2"
                                                    data-oid="vaamsa0"
                                                >
                                                    Team Members
                                                </div>
                                                <div
                                                    className="flex flex-wrap gap-2"
                                                    data-oid="l795s-o"
                                                >
                                                    {winner.teamMembers.map((member, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                                            data-oid="xvmhouc"
                                                        >
                                                            {member}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {winner.projectLink && (
                                                <a
                                                    href={winner.projectLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                                                    onClick={(e) => e.stopPropagation()}
                                                    data-oid="d0a830."
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-1"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        data-oid="x7_g186"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                                            clipRule="evenodd"
                                                            data-oid="0a58o1e"
                                                        />
                                                    </svg>
                                                    View Project
                                                </a>
                                            )}
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
                data-oid="kv_vs8a"
            >
                <div className="max-w-6xl mx-auto" data-oid="k31w567">
                    <div className="text-center text-gray-500" data-oid="zdrhv7q">
                        <p data-oid="5s5gdh6">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
