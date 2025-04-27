'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Hackathon type definition
interface Hackathon {
    id: string;
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
    tracks: string[];
    structure: string[];
    prizes: string[];
    prerequisites: string[];
    faqs?: {
        question: string;
        answer: string;
    }[];
    sponsors?: string[];
    judges?: string[];
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

    // Fetch hackathon details from API
    useEffect(() => {
        const fetchHackathonDetails = async () => {
            setIsLoading(true);
            try {
                // Import the API service
                const { hackathonApi } = await import('@/lib/api');

                // Fetch hackathon by ID
                const hackathonData = await hackathonApi.getById(params.id);

                // Transform API data to match our interface
                const transformedHackathon: Hackathon = {
                    id: hackathonData._id,
                    title: hackathonData.title || 'Untitled Hackathon',
                    organizer: hackathonData.organizer || 'Unknown Organizer',
                    startDate: hackathonData.startDate || new Date().toISOString(),
                    endDate: hackathonData.endDate || new Date().toISOString(),
                    location: hackathonData.location || 'Online',
                    description: hackathonData.description || 'No description available',
                    longDescription:
                        hackathonData.description || 'No detailed description available',
                    image:
                        hackathonData.image ||
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    registrationLink: `/hackathons/register/${hackathonData._id}`,
                    isLive:
                        new Date(hackathonData.startDate) <= new Date() &&
                        new Date(hackathonData.endDate) >= new Date(),
                    isUpcoming:
                        hackathonData.isUpcoming !== undefined
                            ? hackathonData.isUpcoming
                            : new Date(hackathonData.startDate) > new Date(),

                    // Use tracks array directly from backend
                    tracks: hackathonData.tracks || ['General'],

                    // Use structure array directly from backend
                    structure: hackathonData.structure || [
                        'Registration: Complete the registration process to participate in the hackathon.',
                        'Hackathon Event: Participate in the hackathon and build your project.',
                        'Submission: Submit your project for evaluation.',
                    ],

                    prizes: hackathonData.prizes || ['To be announced'],

                    // Use prerequisites array directly from backend
                    prerequisites: hackathonData.prerequisites || [
                        'A laptop with necessary development tools',
                        'Basic programming knowledge',
                    ],

                    faqs: hackathonData.faqs || [
                        {
                            question: 'How can I register?',
                            answer: 'You can register by clicking the "Register Now" button and filling out the registration form.',
                        },
                    ],

                    judges: hackathonData.judges || [],
                    sponsors: hackathonData.sponsors || [],
                };

                setHackathon(transformedHackathon);
            } catch (error) {
                console.error('Failed to fetch hackathon details:', error);
                // If API fails, we'll show the "Hackathon not found" message
                setHackathon(null);
            } finally {
                setIsLoading(false);
            }
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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="za-7jae">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="e1x.gbq" />
            {/* Hackathon Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="qdi-.g1">
                <div className="max-w-6xl mx-auto" data-oid="v9fy.j_">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="6ejntgm">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="7v6xh-_"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <div data-oid="e-evrid">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="fqoz0_e"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="2p4591h"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="-:5yfi8"
                                    />
                                </svg>
                                Back to Hackathons
                            </button>

                            {/* Hackathon header */}
                            <div
                                className="relative rounded-xl overflow-hidden mb-12"
                                data-oid="791jl_y"
                            >
                                <div className="absolute inset-0" data-oid="esuh104">
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="w-full h-full object-cover"
                                        data-oid="8ilo_ow"
                                    />

                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"
                                        data-oid=":sqnfr0"
                                    ></div>
                                </div>
                                <div
                                    className="relative z-10 py-16 px-6 md:px-12"
                                    data-oid="ggw3eba"
                                >
                                    <div
                                        className="max-w-4xl mx-auto text-center"
                                        data-oid="c3zu2s6"
                                    >
                                        <div
                                            className="inline-block px-4 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-purple-300 text-sm font-medium mb-4"
                                            data-oid="f:zh0he"
                                        >
                                            {hackathon.organizer}
                                        </div>
                                        <h1
                                            className="text-4xl md:text-6xl font-bold mb-6"
                                            data-oid="debe9r3"
                                        >
                                            {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                                            data-oid="-wh19aa"
                                        >
                                            {hackathon.longDescription}
                                        </p>
                                        <div
                                            className="flex flex-wrap justify-center gap-6 mb-8"
                                            data-oid="f2-1hrj"
                                        >
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="h4.n3xa"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="1n27i6i"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                        data-oid="yyu..1q"
                                                    />
                                                </svg>
                                                <span data-oid="cy4a1xs">
                                                    {formatDate(hackathon.startDate)} -{' '}
                                                    {formatDate(hackathon.endDate)}
                                                </span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="s_jdt3o"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid=":e-e3fn"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                        data-oid="ub5:nm:"
                                                    />
                                                </svg>
                                                <span data-oid="xc36u-p">{hackathon.location}</span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="dvkrvnq"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid=":b4u00e"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                        data-oid="yc1b8r8"
                                                    />
                                                </svg>
                                                <span data-oid="wgt51o_">
                                                    Prizes: {hackathon.prizes.join(', ')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Countdown timer */}
                                        {hackathon.isUpcoming && timeRemaining && (
                                            <div className="mb-8" data-oid="i:2qxc3">
                                                <h3
                                                    className="text-lg font-semibold mb-3"
                                                    data-oid="w405i6-"
                                                >
                                                    Hackathon starts in:
                                                </h3>
                                                <div
                                                    className="flex justify-center gap-4"
                                                    data-oid="1se-_b2"
                                                >
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid=":h10n7j"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="h5w2oa1"
                                                        >
                                                            {timeRemaining.days}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="1kel3zg"
                                                        >
                                                            Days
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="zwxx2dl"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="cob7wzf"
                                                        >
                                                            {timeRemaining.hours}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="tgz6apf"
                                                        >
                                                            Hours
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="bgitl48"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="qi.a889"
                                                        >
                                                            {timeRemaining.minutes}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="raf65qm"
                                                        >
                                                            Minutes
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="u8o.lcu"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="5uflior"
                                                        >
                                                            {timeRemaining.seconds}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="._oizh3"
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
                                            data-oid="kl8y6rn"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation tabs */}
                            <div className="border-b border-gray-800 mb-12" data-oid="3nwybdu">
                                <div
                                    className="flex overflow-x-auto scrollbar-hide"
                                    data-oid="e6o71g1"
                                >
                                    <button
                                        onClick={() => setActiveSection('overview')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'overview'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="7vxas4f"
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
                                        data-oid="7rwj645"
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
                                        data-oid="k1c1hn2"
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
                                        data-oid="b0lzm1e"
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
                                            data-oid="id4hgxe"
                                        >
                                            FAQs
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="mb-16" data-oid="n:h:v_1">
                                {/* Overview section */}
                                {activeSection === 'overview' && (
                                    <div data-oid="qvujf0t">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="pts2sc3">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="t-38b1h"
                                            >
                                                Program
                                            </span>{' '}
                                            Overview
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="w_d_fgm"
                                        >
                                            {hackathon.longDescription}
                                        </p>

                                        {/* Judges section */}
                                        {hackathon.judges && hackathon.judges.length > 0 && (
                                            <div className="mt-12" data-oid="2s9c:t7">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="z8x:b2m"
                                                >
                                                    Meet Our Judges
                                                </h3>
                                                <div
                                                    className="grid md:grid-cols-3 gap-6"
                                                    data-oid="u.f8fi7"
                                                >
                                                    {hackathon.judges.map((judge, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-800/30 rounded-xl p-6 text-center"
                                                            data-oid="j.a4t98"
                                                        >
                                                            <h4
                                                                className="text-xl font-semibold mb-1"
                                                                data-oid="6spdrlh"
                                                            >
                                                                {judge}
                                                            </h4>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Sponsors section */}
                                        {hackathon.sponsors && hackathon.sponsors.length > 0 && (
                                            <div className="mt-12" data-oid="krbikbc">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="t69sfbk"
                                                >
                                                    Our Sponsors
                                                </h3>
                                                <div
                                                    className="flex flex-wrap gap-6 items-center"
                                                    data-oid="nglbzki"
                                                >
                                                    {hackathon.sponsors.map((sponsor, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-800/30 p-4 rounded-lg"
                                                            data-oid="m0du6-q"
                                                        >
                                                            <span
                                                                className="text-white"
                                                                data-oid="bo_fw_v"
                                                            >
                                                                {sponsor}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tracks section */}
                                {activeSection === 'tracks' && (
                                    <div data-oid="vfhbs6m">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="ao.vway">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="ckm_l5h"
                                            >
                                                Tracks
                                            </span>{' '}
                                            & Project Domains
                                        </h2>
                                        <div
                                            className="grid md:grid-cols-2 gap-8"
                                            data-oid="us07pco"
                                        >
                                            {hackathon.tracks.map((track, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="a80ybd1"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-4 text-purple-400"
                                                        data-oid="_8125mh"
                                                    >
                                                        🔹 {track}
                                                    </h3>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Structure section */}
                                {activeSection === 'structure' && (
                                    <div data-oid="94cktcf">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="tuh0jda">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="tznc-61"
                                            >
                                                Hackathon
                                            </span>{' '}
                                            Structure
                                        </h2>
                                        <div className="space-y-6" data-oid="-:2ja4b">
                                            {hackathon.structure.map((structureItem, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6 flex"
                                                    data-oid="nmzupyo"
                                                >
                                                    <div
                                                        className="mr-4 flex-shrink-0"
                                                        data-oid="x8jeuts"
                                                    >
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold"
                                                            data-oid="pgixz6:"
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div data-oid="ing97cz">
                                                        <p
                                                            className="text-gray-300"
                                                            data-oid="vly2gih"
                                                        >
                                                            {structureItem}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12" data-oid="gfkod3r">
                                            <h3
                                                className="text-2xl font-bold mb-4"
                                                data-oid="jn:feso"
                                            >
                                                Why Participate?
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-4"
                                                data-oid="ot8z172"
                                            >
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="k:nb5cf"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="xlz0t39"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="d24t5ij">
                                                        Hands-on experience with real-world tech
                                                        challenges
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="ee7n_k5"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="zzhy0mg"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="87z8:b7">
                                                        Networking with industry experts & mentors
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="q:me4bv"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid=":.1nwls"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="2tunwfc">
                                                        Exciting prizes, internship opportunities &
                                                        recognition
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="z7t.dt_"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="u7uxy89"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="8fl47s.">
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
                                    <div data-oid="h4don0t">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="5dccl3a">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="ce3jt_."
                                            >
                                                Prerequisites
                                            </span>
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="r3l90-h"
                                        >
                                            To ensure a smooth and productive hackathon experience,
                                            participants should meet the following prerequisites:
                                        </p>

                                        <div
                                            className="grid md:grid-cols-2 gap-4"
                                            data-oid="1rw.11y"
                                        >
                                            {hackathon.prerequisites.map((prerequisite, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="hihslff"
                                                >
                                                    <span
                                                        className="text-purple-400 mr-3"
                                                        data-oid="w82xuwu"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span
                                                        className="text-gray-300"
                                                        data-oid="sj6a4c_"
                                                    >
                                                        {prerequisite}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* FAQs section */}
                                {activeSection === 'faqs' && hackathon.faqs && (
                                    <div data-oid="30_b-e9">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="afosq.0">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="u_uodts"
                                            >
                                                Frequently Asked
                                            </span>{' '}
                                            Questions
                                        </h2>
                                        <div className="space-y-6" data-oid="6x1_2ph">
                                            {hackathon.faqs.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="_av6wwe"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-2"
                                                        data-oid="2xddr.r"
                                                    >
                                                        {faq.question}
                                                    </h3>
                                                    <p className="text-gray-300" data-oid="zhzstey">
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
                                data-oid="0dtrt93"
                            >
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-4"
                                    data-oid="st00lt3"
                                >
                                    Ready to join {hackathon.title}?
                                </h2>
                                <p
                                    className="text-gray-300 mb-6 max-w-2xl mx-auto"
                                    data-oid="_nt-330"
                                >
                                    Register now to secure your spot and start preparing for an
                                    amazing hackathon experience!
                                </p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium"
                                    data-oid="d:9m5xt"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="kna1x:p">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="fg2fzc_"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="od8bm:_">
                                The hackathon you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="3dp5p:e"
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
                data-oid="anwm2:1"
            >
                <div className="max-w-6xl mx-auto" data-oid="lpoqwly">
                    <div className="text-center text-gray-500" data-oid="hqzx8fz">
                        <p data-oid="twea_br">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
