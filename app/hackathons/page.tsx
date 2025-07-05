'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import SalesBanner from '@/components/SalesBanner';

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

    // Fetch hackathons from API
    useEffect(() => {
        const fetchHackathons = async () => {
            setIsLoading(true);
            try {
                // Import the API service
                const { hackathonApi } = await import('@/lib/api');

                // Fetch hackathons
                const hackathonsData = await hackathonApi.getAll();

                // Transform API data to match our interface
                const transformedHackathons: Hackathon[] = hackathonsData.map((hack: any) => ({
                    id: hack._id,
                    title: hack.title || 'Untitled Hackathon',
                    organizer: hack.organizer || 'Unknown Organizer',
                    startDate: hack.startDate || new Date().toISOString(),
                    endDate: hack.endDate || new Date().toISOString(),
                    location: hack.location || 'Online',
                    description: hack.description || 'No description available',
                    image:
                        hack.image ||
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    registrationLink: `/hackathons/register/${hack._id}`,
                    isLive:
                        new Date(hack.startDate) <= new Date() &&
                        new Date(hack.endDate) >= new Date(),
                    isUpcoming: new Date(hack.startDate) > new Date(),
                    tracks: hack.tracks || ['General'],
                    prizes: hack.prizes || 'To be announced',
                }));

                setHackathons(transformedHackathons);

                // Fetch winners
                const winnersData = await hackathonApi.getWinners();

                // Transform winners data
                const transformedWinners: HackathonWinner[] = winnersData.map((winner: any) => ({
                    id: winner._id,
                    hackathonId: winner.hackathonId?._id || 'unknown',
                    hackathonName: winner.hackathonId?.title || 'Past Hackathon',
                    teamName: winner.teamName || 'Unknown Team',
                    projectName: winner.projectName || winner.teamName || 'Unnamed Project',
                    projectDescription: winner.projectDescription || 'No description available',
                    track: winner.track || 'General',
                    position: winner.position || '1st Place',
                    teamMembers: winner.teamMembers || ['Team Member'],
                    projectImage:
                        winner.projectImage ||
                        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    projectLink: winner.projectLink,
                }));

                setWinners(transformedWinners);
            } catch (error) {
                console.error('Failed to fetch hackathons:', error);
                // Fallback to sample data if API fails
                setHackathons([
                    {
                        id: 1,
                        title: 'HackBIT 2025',
                        organizer: 'BIT MESRA, PATNA',
                        startDate: '2025-03-15',
                        endDate: '2025-03-16',
                        location: 'BIT Mesra, Patna Campus',
                        description:
                            'HackBIT 2025 is a high-energy, innovation-driven hackathon where participants tackle real-world challenges using cutting-edge technologies.',
                        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                        registrationLink: '/hackathons/register/1',
                        isLive: false,
                        isUpcoming: true,
                        tracks: ['Web Development', 'AI/ML', 'Data Science'],
                        prizes: '₹50,000 for 1st Place, ₹30,000 for 2nd Place, ₹20,000 for 3rd Place',
                    },
                ]);

                setWinners([]);
            } finally {
                setIsLoading(false);
            }
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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="n139ael">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="2i0irpe" />
            <SalesBanner data-oid="zrjcfie" />
            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-24 pb-28 px-6 md:px-12 relative overflow-hidden"
                data-oid="-yoaoj0"
            >
                {/* Background elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="fsyk2iu"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="lnv.gf9"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="ltjs2-y"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10 py-8" data-oid="8s9vn9r">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                        data-oid="annbfrs"
                    >
                        {' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="tgz.so0"
                        >
                            Hackathons
                        </span>
                    </h1>
                    <p
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-6"
                        data-oid="q5y7ds5"
                    >
                        Join our Innovation-driven Hackathons to Solve Real-world Challenges,
                        Collaborate with Like-minded Individuals, and Win Exciting Prizes.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 mb-8"
                        data-oid="z7_mt54"
                    ></div>
                    <div className="flex flex-wrap gap-4 mt-8" data-oid="0zu_qyq">
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="nw0279l"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="ch4ow53"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="k:zc9d4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="1p.lz1p"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="sy479dn"
                            >
                                Exciting Prizes
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="c2m6pr4"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="rmfoby0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="l.6wcg2"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="ann31gw"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="gm08a2v"
                            >
                                Expert Mentorship
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="vhohddg"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="3r.jkls"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="ax.nn.g"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="gcjbkej"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="ke29gk3"
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
                data-oid="r:d9x.-"
            >
                <div className="max-w-6xl mx-auto" data-oid="nilopez">
                    <div className="flex space-x-4 border-b border-gray-800" data-oid="_3wd88p">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={cn(
                                'px-6 py-3 font-medium text-lg',
                                activeTab === 'upcoming'
                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300',
                            )}
                            data-oid="9-cllo:"
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
                            data-oid="-ezmk6f"
                        >
                            Past Winners
                        </button>
                    </div>
                </div>
            </div>

            {/* Hackathon Listings */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="rt7:h9w">
                <div className="max-w-6xl mx-auto" data-oid="q6nfkiy">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="_ed0dw9">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="uw0xixc"
                            ></div>
                        </div>
                    ) : activeTab === 'upcoming' ? (
                        <div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            data-oid="i_w18m3"
                        >
                            {hackathons.map((hackathon) => (
                                <div
                                    key={hackathon.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleHackathonClick(hackathon.id)}
                                    data-oid="1bm.w5k"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden"
                                        data-oid="3p_h_by"
                                    >
                                        <img
                                            src={hackathon.image}
                                            alt={hackathon.title}
                                            className="w-full h-full object-cover"
                                            data-oid="_7dt4nd"
                                        />

                                        {hackathon.isLive && (
                                            <div
                                                className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 animate-pulse"
                                                data-oid="_4hfi11"
                                            >
                                                LIVE NOW
                                            </div>
                                        )}
                                        {hackathon.isUpcoming && !hackathon.isLive && (
                                            <div
                                                className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                                data-oid="ih2ns7-"
                                            >
                                                {getDaysRemaining(hackathon.startDate)} days to go
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6" data-oid="pqow7j3">
                                        <div
                                            className="text-gray-400 text-sm mb-2"
                                            data-oid="dy8:tll"
                                        >
                                            {hackathon.organizer}
                                        </div>
                                        <h3
                                            className="text-xl font-semibold mb-2"
                                            data-oid="i__qbd2"
                                        >
                                            {hackathon.title}
                                        </h3>
                                        <p
                                            className="text-gray-400 text-sm mb-4 line-clamp-2"
                                            data-oid="0yjqxuc"
                                        >
                                            {hackathon.description}
                                        </p>
                                        <div
                                            className="flex justify-between text-gray-400 text-sm mb-4"
                                            data-oid="0985_ok"
                                        >
                                            <div className="flex items-center" data-oid="ipv299o">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 mr-1 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="a2vy:p:"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                        data-oid="fhlqjhf"
                                                    />
                                                </svg>
                                                <span data-oid="o96w82.">
                                                    {formatDate(hackathon.startDate)} -{' '}
                                                    {formatDate(hackathon.endDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center" data-oid="i9fx72f">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 mr-1 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="dnzaf8q"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                        data-oid="0hf_hkt"
                                                    />
                                                </svg>
                                                <span data-oid="v1:wg:g">{hackathon.location}</span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-wrap gap-2 mb-4"
                                            data-oid="c8q1848"
                                        >
                                            {hackathon.tracks.map((track, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                                                    data-oid="0rb9ytw"
                                                >
                                                    {track}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={(e) => handleRegisterClick(e, hackathon.id)}
                                            className="w-full py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium"
                                            data-oid="yxyjfdk"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-12" data-oid="in918_4">
                            <div className="mb-8" data-oid="qhr_otq">
                                <h2 className="text-3xl font-bold mb-6" data-oid="3_ohg0r">
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="b_u23-s"
                                    >
                                        Past Hackathon
                                    </span>{' '}
                                    Winners
                                </h2>
                                <p className="text-gray-300 mb-8 max-w-4xl" data-oid="iiov-6f">
                                    Celebrating the innovative solutions and talented teams from our
                                    previous hackathons. These projects showcase creativity,
                                    technical excellence, and problem-solving skills.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8" data-oid="1cw8u21">
                                {winners.map((winner) => (
                                    <div
                                        key={winner.id}
                                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all"
                                        data-oid="x9rp04g"
                                    >
                                        <div
                                            className="relative h-48 overflow-hidden"
                                            data-oid="lqd.mav"
                                        >
                                            <img
                                                src={winner.projectImage}
                                                alt={winner.projectName}
                                                className="w-full h-full object-cover"
                                                data-oid=":dndlmq"
                                            />

                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end"
                                                data-oid="c9n05t3"
                                            >
                                                <div className="p-6" data-oid=".-2syo6">
                                                    <div
                                                        className="text-purple-400 text-sm mb-1"
                                                        data-oid="sah3lji"
                                                    >
                                                        {winner.hackathonName}
                                                    </div>
                                                    <h3
                                                        className="text-xl font-bold"
                                                        data-oid="_9jq1mb"
                                                    >
                                                        {winner.projectName}
                                                    </h3>
                                                    <div
                                                        className="flex items-center mt-2"
                                                        data-oid="hlm.1i7"
                                                    >
                                                        <div
                                                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full"
                                                            data-oid="wyqutcu"
                                                        >
                                                            {winner.position}
                                                        </div>
                                                        <div
                                                            className="ml-2 text-gray-300 text-sm"
                                                            data-oid="id912d."
                                                        >
                                                            {winner.track}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6" data-oid="es:dae6">
                                            <div className="mb-4" data-oid="ppr4ife">
                                                <div
                                                    className="text-gray-400 text-sm mb-1"
                                                    data-oid="lza57g_"
                                                >
                                                    Team
                                                </div>
                                                <div className="font-medium" data-oid="46:12uu">
                                                    {winner.teamName}
                                                </div>
                                            </div>
                                            <p
                                                className="text-gray-300 text-sm mb-4"
                                                data-oid="ilotwj0"
                                            >
                                                {winner.projectDescription}
                                            </p>
                                            <div className="mb-4" data-oid="xzcv7dy">
                                                <div
                                                    className="text-gray-400 text-sm mb-2"
                                                    data-oid="xy.4u71"
                                                >
                                                    Team Members
                                                </div>
                                                <div
                                                    className="flex flex-wrap gap-2"
                                                    data-oid="fkio2ne"
                                                >
                                                    {winner.teamMembers.map((member, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                                            data-oid="0es7h-s"
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
                                                    data-oid="13qfts5"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-1"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        data-oid="nql1w4d"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                                            clipRule="evenodd"
                                                            data-oid="4v48tc-"
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
                data-oid="fz87lko"
            >
                <div className="max-w-6xl mx-auto" data-oid="ajec6rr">
                    <div className="text-center text-gray-500" data-oid="anh4kei">
                        <p data-oid="rc0yijd">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
