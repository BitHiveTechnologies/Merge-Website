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
                        hackathonData.longDescription ||
                        hackathonData.description ||
                        'No detailed description available',
                    image:
                        hackathonData.image ||
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    registrationLink: `/hackathons/register/${hackathonData._id}`,
                    isLive:
                        new Date(hackathonData.startDate) <= new Date() &&
                        new Date(hackathonData.endDate) >= new Date(),
                    isUpcoming: new Date(hackathonData.startDate) > new Date(),

                    // Default tracks if not provided
                    tracks: hackathonData.tracks
                        ? hackathonData.tracks.map((track: any) => ({
                              name: track.name || 'General',
                              description: track.description || ['No specific requirements'],
                          }))
                        : [
                              {
                                  name: 'General',
                                  description: ['Open to all types of projects'],
                              },
                          ],

                    // Default structure if not provided
                    structure: hackathonData.structure || [
                        {
                            step: 'Registration',
                            description:
                                'Complete the registration process to participate in the hackathon.',
                        },
                        {
                            step: 'Hackathon Event',
                            description: 'Participate in the hackathon and build your project.',
                        },
                        {
                            step: 'Submission',
                            description: 'Submit your project for evaluation.',
                        },
                    ],

                    prizes: hackathonData.prizes || 'To be announced',

                    // Default prerequisites if not provided
                    prerequisites: hackathonData.prerequisites || [
                        {
                            category: 'General Requirements',
                            items: [
                                {
                                    text: 'A laptop with necessary development tools',
                                },
                                {
                                    text: 'Basic programming knowledge',
                                },
                            ],
                        },
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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="794-vct">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="acb5nov" />
            {/* Hackathon Detail Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="s0yanki">
                <div className="max-w-6xl mx-auto" data-oid="3yx6keu">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="nypyr54">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="h44a1j5"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <div data-oid="uuv8yj_">
                            {/* Back button */}
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="-ge3ewo"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="3:bpuo-"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="25:omlj"
                                    />
                                </svg>
                                Back to Hackathons
                            </button>

                            {/* Hackathon header */}
                            <div
                                className="relative rounded-xl overflow-hidden mb-12"
                                data-oid="s94zgkn"
                            >
                                <div className="absolute inset-0" data-oid="hdto3jm">
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="w-full h-full object-cover"
                                        data-oid="71dz_jl"
                                    />

                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"
                                        data-oid="rfza7i_"
                                    ></div>
                                </div>
                                <div
                                    className="relative z-10 py-16 px-6 md:px-12"
                                    data-oid="0..1hv3"
                                >
                                    <div
                                        className="max-w-4xl mx-auto text-center"
                                        data-oid="5cmhozk"
                                    >
                                        <div
                                            className="inline-block px-4 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-purple-300 text-sm font-medium mb-4"
                                            data-oid="mdq719m"
                                        >
                                            {hackathon.organizer}
                                        </div>
                                        <h1
                                            className="text-4xl md:text-6xl font-bold mb-6"
                                            data-oid="93j8rd1"
                                        >
                                            {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                                            data-oid="zpp:t:4"
                                        >
                                            {hackathon.longDescription}
                                        </p>
                                        <div
                                            className="flex flex-wrap justify-center gap-6 mb-8"
                                            data-oid="chnjgvy"
                                        >
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="67:o15l"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="getpovv"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                        data-oid="o1j73ca"
                                                    />
                                                </svg>
                                                <span data-oid="6dcvn_o">
                                                    {formatDate(hackathon.startDate)} -{' '}
                                                    {formatDate(hackathon.endDate)}
                                                </span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="e:dw8qu"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="s0juvlr"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                        data-oid="s2996se"
                                                    />
                                                </svg>
                                                <span data-oid="1nluiim">{hackathon.location}</span>
                                            </div>
                                            <div
                                                className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center"
                                                data-oid="-e3r:cp"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-purple-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    data-oid="bdxhuje"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                        data-oid="fqq4rrr"
                                                    />
                                                </svg>
                                                <span data-oid="7c9uxu9">
                                                    Prizes: {hackathon.prizes}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Countdown timer */}
                                        {hackathon.isUpcoming && timeRemaining && (
                                            <div className="mb-8" data-oid="q:3ua5z">
                                                <h3
                                                    className="text-lg font-semibold mb-3"
                                                    data-oid="oy:14o9"
                                                >
                                                    Hackathon starts in:
                                                </h3>
                                                <div
                                                    className="flex justify-center gap-4"
                                                    data-oid="jl9fz7d"
                                                >
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="5e8jorc"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="vtvlmyc"
                                                        >
                                                            {timeRemaining.days}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="r:w9go3"
                                                        >
                                                            Days
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="knooiya"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid=".0lb-mj"
                                                        >
                                                            {timeRemaining.hours}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid=":a8-l-9"
                                                        >
                                                            Hours
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="d.iygwe"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="ake1l.d"
                                                        >
                                                            {timeRemaining.minutes}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid="bns3e:o"
                                                        >
                                                            Minutes
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-lg w-20"
                                                        data-oid="ua2vcf-"
                                                    >
                                                        <div
                                                            className="text-3xl font-bold text-purple-400"
                                                            data-oid="tooeeva"
                                                        >
                                                            {timeRemaining.seconds}
                                                        </div>
                                                        <div
                                                            className="text-xs text-gray-400"
                                                            data-oid=":wf1u27"
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
                                            data-oid="ex5.p22"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation tabs */}
                            <div className="border-b border-gray-800 mb-12" data-oid="m:5fkrx">
                                <div
                                    className="flex overflow-x-auto scrollbar-hide"
                                    data-oid="g:dkjvf"
                                >
                                    <button
                                        onClick={() => setActiveSection('overview')}
                                        className={cn(
                                            'px-6 py-3 font-medium whitespace-nowrap',
                                            activeSection === 'overview'
                                                ? 'text-purple-400 border-b-2 border-purple-400'
                                                : 'text-gray-400 hover:text-gray-300',
                                        )}
                                        data-oid="bbgj79:"
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
                                        data-oid="pclu::f"
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
                                        data-oid="v.ub.t8"
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
                                        data-oid="amrulpv"
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
                                            data-oid="snz5qi0"
                                        >
                                            FAQs
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="mb-16" data-oid="44gkdaz">
                                {/* Overview section */}
                                {activeSection === 'overview' && (
                                    <div data-oid="lahy4_r">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="8nq9jge">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="gt9o33m"
                                            >
                                                Program
                                            </span>{' '}
                                            Overview
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="7atu2ys"
                                        >
                                            {hackathon.longDescription}
                                        </p>

                                        {/* Judges section */}
                                        {hackathon.judges && (
                                            <div className="mt-12" data-oid="g_lri6e">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="s6inz5p"
                                                >
                                                    Meet Our Judges
                                                </h3>
                                                <div
                                                    className="grid md:grid-cols-3 gap-6"
                                                    data-oid="-4zm95e"
                                                >
                                                    {hackathon.judges.map((judge, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-800/30 rounded-xl p-6 text-center"
                                                            data-oid="bogh_:w"
                                                        >
                                                            <div
                                                                className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4"
                                                                data-oid="ajk:wwe"
                                                            >
                                                                <img
                                                                    src={judge.image}
                                                                    alt={judge.name}
                                                                    className="w-full h-full object-cover"
                                                                    data-oid="vhcp78t"
                                                                />
                                                            </div>
                                                            <h4
                                                                className="text-xl font-semibold mb-1"
                                                                data-oid="g9vdxvu"
                                                            >
                                                                {judge.name}
                                                            </h4>
                                                            <p
                                                                className="text-purple-400 mb-2"
                                                                data-oid="q8mif9u"
                                                            >
                                                                {judge.position}
                                                            </p>
                                                            <p
                                                                className="text-gray-400 text-sm"
                                                                data-oid="4_ym9-h"
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
                                            <div className="mt-12" data-oid="b2u6b9s">
                                                <h3
                                                    className="text-2xl font-bold mb-6"
                                                    data-oid="eabqtha"
                                                >
                                                    Our Sponsors
                                                </h3>
                                                <div className="space-y-8" data-oid="zq5c0ps">
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
                                                                <div key={tier} data-oid="nmqa.m_">
                                                                    <h4
                                                                        className="text-lg font-medium mb-4 capitalize"
                                                                        data-oid="j5tfmza"
                                                                    >
                                                                        {tier} Sponsors
                                                                    </h4>
                                                                    <div
                                                                        className="flex flex-wrap gap-6 items-center"
                                                                        data-oid="6of7-77"
                                                                    >
                                                                        {tierSponsors.map(
                                                                            (sponsor, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="bg-gray-800/30 p-4 rounded-lg"
                                                                                    data-oid="5i._j5d"
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            sponsor.logo
                                                                                        }
                                                                                        alt={
                                                                                            sponsor.name
                                                                                        }
                                                                                        className="h-12 object-contain"
                                                                                        data-oid="kpdz97k"
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
                                    <div data-oid="v7vj0q8">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="ffd9xr1">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="jellr.9"
                                            >
                                                Tracks
                                            </span>{' '}
                                            & Project Domains
                                        </h2>
                                        <div
                                            className="grid md:grid-cols-2 gap-8"
                                            data-oid="3u.qzys"
                                        >
                                            {hackathon.tracks.map((track, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="r0btyk4"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-4 text-purple-400"
                                                        data-oid="iywhtd0"
                                                    >
                                                        🔹 {track.name}
                                                    </h3>
                                                    <ul
                                                        className="space-y-2 text-gray-300"
                                                        data-oid="51l4oi7"
                                                    >
                                                        {track.description.map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start"
                                                                data-oid="jz1si0t"
                                                            >
                                                                <span
                                                                    className="text-purple-400 mr-2"
                                                                    data-oid="w7zzags"
                                                                >
                                                                    •
                                                                </span>
                                                                <span data-oid="_qrtcu.">
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
                                    <div data-oid="9fjp1yi">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="4e9tzay">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="jyem1pj"
                                            >
                                                Hackathon
                                            </span>{' '}
                                            Structure
                                        </h2>
                                        <div className="space-y-6" data-oid=".uhhlw3">
                                            {hackathon.structure.map((step, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6 flex"
                                                    data-oid="._l7-yd"
                                                >
                                                    <div
                                                        className="mr-4 flex-shrink-0"
                                                        data-oid="07a4po0"
                                                    >
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold"
                                                            data-oid="o5ca4ci"
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div data-oid="qfkb7u2">
                                                        <h3
                                                            className="text-xl font-semibold mb-2"
                                                            data-oid="t.uz:tm"
                                                        >
                                                            {step.step}
                                                        </h3>
                                                        <p
                                                            className="text-gray-300"
                                                            data-oid="796ozcm"
                                                        >
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12" data-oid="hueps8d">
                                            <h3
                                                className="text-2xl font-bold mb-4"
                                                data-oid="ko2i6_5"
                                            >
                                                Why Participate?
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-4"
                                                data-oid="3dzld79"
                                            >
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="a-uc4gq"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="or79_rn"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="973z-tk">
                                                        Hands-on experience with real-world tech
                                                        challenges
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="5hjiu:y"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="9tp8:pc"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="6pj897l">
                                                        Networking with industry experts & mentors
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="htf6qi2"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="yej2cka"
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="kste.yt">
                                                        Exciting prizes, internship opportunities &
                                                        recognition
                                                    </span>
                                                </div>
                                                <div
                                                    className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                    data-oid="8kwhydf"
                                                >
                                                    <span
                                                        className="text-green-400 mr-3"
                                                        data-oid="ph_ih2."
                                                    >
                                                        ✔
                                                    </span>
                                                    <span data-oid="txiu1xm">
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
                                    <div data-oid="62bn08j">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="ger9g_8">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="q:brpo1"
                                            >
                                                Prerequisites
                                            </span>
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-8 max-w-4xl"
                                            data-oid="xt7m_6x"
                                        >
                                            To ensure a smooth and productive hackathon experience,
                                            participants should meet the following prerequisites:
                                        </p>

                                        <div className="space-y-8" data-oid="zlx7qpt">
                                            {hackathon.prerequisites.map((category, index) => (
                                                <div key={index} data-oid="bjiti6p">
                                                    <h3
                                                        className="text-xl font-semibold mb-4 flex items-center"
                                                        data-oid="8_dd-81"
                                                    >
                                                        <span
                                                            className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold mr-2 text-sm"
                                                            data-oid="4rn_hoy"
                                                        >
                                                            {index + 1}
                                                        </span>
                                                        <span data-oid="_fav:44">
                                                            {category.category}
                                                        </span>
                                                    </h3>
                                                    <div
                                                        className="grid md:grid-cols-2 gap-4"
                                                        data-oid="7cl7rzv"
                                                    >
                                                        {category.items.map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="bg-gray-800/30 rounded-xl p-6 flex items-start"
                                                                data-oid="8u6iz-."
                                                            >
                                                                {item.icon ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="agafvv7"
                                                                    >
                                                                        {item.icon}
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Technical Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="6omlfut"
                                                                    >
                                                                        ✅
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Software & Tools' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="1xj-1ky"
                                                                    >
                                                                        🔹
                                                                    </span>
                                                                ) : category.category ===
                                                                  'Team & Collaboration Skills' ? (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid="s9okfn1"
                                                                    >
                                                                        💡
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="text-purple-400 mr-3"
                                                                        data-oid=":_tv122"
                                                                    >
                                                                        ✔
                                                                    </span>
                                                                )}
                                                                <span
                                                                    className="text-gray-300"
                                                                    data-oid="7tpnf0a"
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
                                    <div data-oid=".w8dnpw">
                                        <h2 className="text-3xl font-bold mb-6" data-oid="wy.laim">
                                            <span
                                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                                data-oid="a5vr0b6"
                                            >
                                                Frequently Asked
                                            </span>{' '}
                                            Questions
                                        </h2>
                                        <div className="space-y-6" data-oid="u_.loyr">
                                            {hackathon.faqs.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-800/30 rounded-xl p-6"
                                                    data-oid="-hz:xvw"
                                                >
                                                    <h3
                                                        className="text-xl font-semibold mb-2"
                                                        data-oid="i-4uf51"
                                                    >
                                                        {faq.question}
                                                    </h3>
                                                    <p className="text-gray-300" data-oid="shif_7r">
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
                                data-oid="wu:qgq0"
                            >
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-4"
                                    data-oid="ljlqwaa"
                                >
                                    Ready to join {hackathon.title}?
                                </h2>
                                <p
                                    className="text-gray-300 mb-6 max-w-2xl mx-auto"
                                    data-oid="s1iki10"
                                >
                                    Register now to secure your spot and start preparing for an
                                    amazing hackathon experience!
                                </p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium"
                                    data-oid=".rjyt30"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20" data-oid="528dq4p">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="decq2x2"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="san7v-j">
                                The hackathon you're looking for doesn't exist or has been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="ocodh9r"
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
                data-oid="n46p_-5"
            >
                <div className="max-w-6xl mx-auto" data-oid="a.ert3m">
                    <div className="text-center text-gray-500" data-oid="0y:nqkf">
                        <p data-oid="1by9r31">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
