'use client';

import { adminApi } from '@/lib/adminApi';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<
        'courses' | 'workshops' | 'pastWorkshops' | 'hackathons'
    >('courses');
    const [courses, setCourses] = useState<Course[]>([]);
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [pastWorkshops, setPastWorkshops] = useState<PastWorkshop[]>([]);
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to handle course deletion
    const handleDeleteCourse = async (courseId: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this course? This action cannot be undone.',
            )
        ) {
            try {
                await adminApi.courses.delete(courseId);
                // Refresh the courses list after deletion
                const updatedCourses = await adminApi.courses.getAll();
                setCourses(updatedCourses);
            } catch (err: any) {
                setError(err.message || 'Failed to delete course');
                console.error('Error deleting course:', err);
            }
        }
    };

    // Function to handle workshop deletion
    const handleDeleteWorkshop = async (workshopId: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this workshop? This action cannot be undone.',
            )
        ) {
            try {
                await adminApi.workshops.delete(workshopId);
                // Refresh the workshops list after deletion
                const updatedWorkshops = await adminApi.workshops.getAll();
                setWorkshops(updatedWorkshops);
            } catch (err: any) {
                setError(err.message || 'Failed to delete workshop');
                console.error('Error deleting workshop:', err);
            }
        }
    };

    // Function to handle hackathon deletion
    const handleDeleteHackathon = async (hackathonId: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this hackathon? This action cannot be undone.',
            )
        ) {
            try {
                await adminApi.hackathons.delete(hackathonId);
                // Refresh the hackathons list after deletion
                const updatedHackathons = await adminApi.hackathons.getAll();
                setHackathons(updatedHackathons);
            } catch (err: any) {
                setError(err.message || 'Failed to delete hackathon');
                console.error('Error deleting hackathon:', err);
            }
        }
    };

    // Function to handle past workshop deletion
    const handleDeletePastWorkshop = async (workshopId: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this past workshop? This action cannot be undone.',
            )
        ) {
            try {
                await adminApi.pastWorkshops.delete(workshopId);
                // Refresh the past workshops list after deletion
                const updatedPastWorkshops = await adminApi.pastWorkshops.getAll();
                setPastWorkshops(updatedPastWorkshops);
            } catch (err: any) {
                setError(err.message || 'Failed to delete past workshop');
                console.error('Error deleting past workshop:', err);
            }
        }
    };

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
                    // Fetch past workshops using the adminApi
                    const data = await adminApi.pastWorkshops.getAll();
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
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4">
                                                                <Link
                                                                    href={`/admin/dashboard/courses/${course._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />

                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        router.push(
                                                                            `/admin/dashboard/courses/edit/${course._id}`,
                                                                        )
                                                                    }
                                                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                    title="Edit Course"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteCourse(
                                                                            course._id,
                                                                        )
                                                                    }
                                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                                    title="Delete Course"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />

                                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                                    </svg>
                                                                </button>
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
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4">
                                                                <Link
                                                                    href={`/admin/dashboard/workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />

                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        router.push(
                                                                            `/admin/dashboard/workshops/edit/${workshop._id}`,
                                                                        )
                                                                    }
                                                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                    title="Edit Workshop"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteWorkshop(
                                                                            workshop._id,
                                                                        )
                                                                    }
                                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                                    title="Delete Workshop"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />

                                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                                    </svg>
                                                                </button>
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
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4">
                                                                <Link
                                                                    href={`/admin/dashboard/past-workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="Edit Past Workshop"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeletePastWorkshop(
                                                                            workshop._id,
                                                                        )
                                                                    }
                                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                                    title="Delete Past Workshop"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />

                                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                                    </svg>
                                                                </button>
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
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4">
                                                                <Link
                                                                    href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />

                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        router.push(
                                                                            `/admin/dashboard/hackathons/edit/${hackathon._id}`,
                                                                        )
                                                                    }
                                                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                    title="Edit Hackathon"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteHackathon(
                                                                            hackathon._id,
                                                                        )
                                                                    }
                                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                                    title="Delete Hackathon"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />

                                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                                    </svg>
                                                                </button>
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
