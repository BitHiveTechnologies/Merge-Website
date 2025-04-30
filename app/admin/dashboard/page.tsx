'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { adminApi } from '@/lib/adminApi';

interface Course {
    _id: string;
    title: string;
    level: string;
    description: string;
    price?: number;
    instructor?: string;
}

interface Workshop {
    _id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    instructor?: string;
}

interface PastWorkshop {
    _id: string;
    institution: string;
    date: string;
    topic: string;
    highlights: string[];
    mediaLinks: string[];
}

interface Hackathon {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    prizes?: string[];
}

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<
        'courses' | 'workshops' | 'pastWorkshops' | 'hackathons'
    >('courses');
    const [courses, setCourses] = useState<Course[]>([]);
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [pastWorkshops, setPastWorkshops] = useState<PastWorkshop[]>([]);
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (activeTab === 'courses') {
                    const data = await adminApi.courses.getAll();
                    setCourses(data);
                } else if (activeTab === 'workshops') {
                    const data = await adminApi.workshops.getAll();
                    setWorkshops(data);
                } else if (activeTab === 'pastWorkshops') {
                    // Fetch past workshops from the API
                    const response = await fetch('/api/workshops/past');
                    if (!response.ok) {
                        throw new Error('Failed to fetch past workshops');
                    }
                    const data = await response.json();
                    setPastWorkshops(data);
                } else if (activeTab === 'hackathons') {
                    const data = await adminApi.hackathons.getAll();
                    setHackathons(data);
                }
            } catch (err: any) {
                setError(err.message || `Failed to fetch ${activeTab}`);
                console.error(`Error fetching ${activeTab}:`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Navigation Tabs */}
            <div className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800">
                <div className="flex space-x-4 border-b border-gray-800">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                    >
                        Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('workshops')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'workshops'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                    >
                        Workshops
                    </button>
                    <button
                        onClick={() => setActiveTab('pastWorkshops')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'pastWorkshops'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                    >
                        Past Workshops
                    </button>
                    <button
                        onClick={() => setActiveTab('hackathons')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'hackathons'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6">
                        <p className="text-red-200">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'courses' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                        Manage Courses
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/courses/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Add New Course
                                    </Link>
                                </div>

                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-900">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Level
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Instructor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                                {courses.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                        >
                                                            No courses found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    courses.map((course) => (
                                                        <tr
                                                            key={course._id}
                                                            className="hover:bg-gray-750"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                {course.title}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {course.level}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {course.instructor || 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {course.price
                                                                    ? `${course.price}`
                                                                    : 'Free'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                <Link
                                                                    href={`/admin/dashboard/courses/${course._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                >
                                                                    View Registrations
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'workshops' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                        Manage Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Add New Workshop
                                    </Link>
                                </div>

                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-900">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Speaker
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                                {workshops.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                        >
                                                            No workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    workshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                {workshop.title}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {workshop.location}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {workshop.instructor || 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                <Link
                                                                    href={`/admin/dashboard/workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                >
                                                                    View Registrations
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'pastWorkshops' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                        Manage Past Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/past-workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Add New Past Workshop
                                    </Link>
                                </div>

                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-900">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Institution
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Topic
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Highlights
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Media
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                                {pastWorkshops.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={6}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                        >
                                                            No past workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    pastWorkshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                {workshop.institution}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {workshop.topic}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                                <ul className="list-disc pl-4">
                                                                    {workshop.highlights.map(
                                                                        (highlight, index) => (
                                                                            <li key={index}>
                                                                                {highlight}
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                                {workshop.mediaLinks.length > 0 ? (
                                                                    <span className="text-purple-400">
                                                                        {workshop.mediaLinks.length}{' '}
                                                                        media items
                                                                    </span>
                                                                ) : (
                                                                    'No media'
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                <Link
                                                                    href={`/admin/dashboard/past-workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                >
                                                                    Edit
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hackathons' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                        Manage Hackathons
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/hackathons/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Add New Hackathon
                                    </Link>
                                </div>

                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-900">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Dates
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                                {hackathons.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={4}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                        >
                                                            No hackathons found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    hackathons.map((hackathon) => (
                                                        <tr
                                                            key={hackathon._id}
                                                            className="hover:bg-gray-750"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                {hackathon.title}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {new Date(
                                                                    hackathon.startDate,
                                                                ).toLocaleDateString()}{' '}
                                                                -{' '}
                                                                {new Date(
                                                                    hackathon.endDate,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {hackathon.location}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                <Link
                                                                    href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                >
                                                                    View Registrations
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
