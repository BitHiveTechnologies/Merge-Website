'use client';

import Navbar from '@/components/Navbar';
import SalesBanner from '@/components/SalesBanner';
import { BACKEND_URL, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Workshop type definition
interface Workshop {
    _id: string;
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
    _id: string;
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

    // Fetch workshops from backend API
    useEffect(() => {
        const fetchWorkshops = async () => {
            setIsLoading(true);
            try {
                // Fetch upcoming workshops
                const upcomingResponse = await fetch(`${BACKEND_URL}/api/workshops`);
                if (!upcomingResponse.ok) {
                    throw new Error('Failed to fetch upcoming workshops');
                }
                const upcomingData = await upcomingResponse.json();

                // Fetch past workshops
                const pastResponse = await fetch(`${BACKEND_URL}/api/workshops/past`);
                if (!pastResponse.ok) {
                    throw new Error('Failed to fetch past workshops');
                }
                const pastData = await pastResponse.json();

                setUpcomingWorkshops(upcomingData);
                setPastWorkshops(pastData);
            } catch (error) {
                console.error('Error fetching workshops:', error);
                // Set fallback data or empty arrays if API fails
                setUpcomingWorkshops([]);
                setPastWorkshops([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    // Navigate to workshop detail
    const handleWorkshopClick = (workshopId: string) => {
        router.push(`/workshops/${workshopId}`);
    };

    // Format price for display
    const formatPrice = (price: number | 'Free') => {
        if (!price) return 'Free';
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
        <div className="min-h-screen bg-black text-white font-sans pt-20">
            {/* Navbar - reusing from main page */}
            <Navbar />
            <SalesBanner />
            {/* Page Header */}
            <div className="bg-gradient-to-b from-black to-gray-900 pt-24 pb-28 px-6 md:px-12 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>

                <div className="max-w-6xl mx-auto relative z-10 py-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                        Our{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                            Workshops
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-6">
                        Join our Interactive Workshops and Webinars to Enhance your Skills in
                        Open-source, Git, GitHub and more.
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 mb-8"></div>
                    <div className="flex flex-wrap gap-4 mt-8">
                        <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                            <span className="text-purple-400 mr-2 group-hover:text-purple-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                    />
                                </svg>
                            </span>
                            <span className="group-hover:text-white transition-colors duration-300">
                                Expert Instructors
                            </span>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                            <span className="text-purple-400 mr-2 group-hover:text-purple-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                    />
                                </svg>
                            </span>
                            <span className="group-hover:text-white transition-colors duration-300">
                                Interactive Sessions
                            </span>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                            <span className="text-purple-400 mr-2 group-hover:text-purple-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                    />
                                </svg>
                            </span>
                            <span className="group-hover:text-white transition-colors duration-300">
                                Hands-on Learning
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-900 py-8 px-6 md:px-12 border-b border-black">
                <div className="max-w-6xl mx-auto">
                    <div className="flex space-x-4 border-b border-gray-800">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={cn(
                                'px-6 py-3 font-medium text-lg',
                                activeTab === 'upcoming'
                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                    : 'text-gray-400 hover:text-gray-300',
                            )}
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
                        >
                            Past Workshops
                        </button>
                    </div>
                </div>
            </div>

            {/* Workshop Listings */}
            <div className="py-12 px-6 md:px-12 bg-black">
                <div className="max-w-6xl mx-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    ) : activeTab === 'upcoming' ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingWorkshops.map((workshop) => (
                                <div
                                    key={workshop._id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleWorkshopClick(workshop._id)}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={workshop.image}
                                            alt={workshop.title}
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1">
                                            {formatDate(workshop.date)}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">
                                            {workshop.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {workshop.description}
                                        </p>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden mr-4">
                                                <img
                                                    src={
                                                        'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                                                    }
                                                    alt={workshop.instructor}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-gray-300 text-sm">
                                                {workshop.instructor}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-gray-400 text-sm mb-4">
                                            <span>{workshop.time}</span>
                                            <span>{workshop.location}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span
                                                className={cn(
                                                    'font-medium text-lg',
                                                    workshop.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white',
                                                )}
                                            >
                                                {formatPrice(workshop.price)}
                                            </span>
                                            <button className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold mb-6">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                        Successful Webinars
                                    </span>{' '}
                                    Conducted by Merge
                                </h2>
                                <p className="text-gray-300 mb-8 max-w-4xl">
                                    At Merge, we are committed to empowering students with hands-on
                                    knowledge and skills in open-source contributions, Git, GitHub,
                                    and software development. We have successfully organized free
                                    webinars at various prestigious institutions, helping students
                                    kickstart their journey into open-source and version control.
                                </p>
                            </div>

                            <div className="grid gap-8">
                                {pastWorkshops.map((workshop) => (
                                    <div
                                        key={workshop._id}
                                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 p-6"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="md:w-1/4">
                                                <h3 className="text-2xl font-bold text-purple-400 mb-2">
                                                    {workshop.institution}
                                                </h3>
                                                <div className="flex items-center mb-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-pink-500 mr-2"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-300">
                                                        {formatDate(workshop.date)}
                                                    </span>
                                                </div>
                                                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium px-3 py-2 rounded-md inline-block">
                                                    {workshop.topic}
                                                </div>
                                            </div>
                                            <div className="md:w-3/4">
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="md:w-3/4">
                                                        <h4 className="text-lg font-semibold mb-2">
                                                            Highlights:
                                                        </h4>
                                                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                                            {workshop.highlights.map(
                                                                (highlight, index) => (
                                                                    <li key={index}>{highlight}</li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="md:w-1/4">
                                                        <h4 className="text-lg font-semibold mb-2">
                                                            Media Links:
                                                        </h4>
                                                        <div className="flex flex-wrap gap-3">
                                                            {workshop.mediaLinks.map(
                                                                (link, index) => (
                                                                    <a
                                                                        key={index}
                                                                        href={link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-purple-400 hover:text-purple-300 flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full transition-transform hover:scale-110"
                                                                        title={
                                                                            index === 0
                                                                                ? 'Photos'
                                                                                : index === 1
                                                                                  ? 'Videos'
                                                                                  : `Media ${index + 1}`
                                                                        }
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                                                            />
                                                                        </svg>
                                                                    </a>
                                                                ),
                                                            )}
                                                        </div>
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
            <footer className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Merge. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
