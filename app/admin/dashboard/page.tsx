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
        <div data-oid="i6zuavq">
            <h1 className="text-3xl font-bold mb-8" data-oid="szap666">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div
                className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800"
                data-oid="rj3tj81"
            >
                <div className="flex space-x-4 border-b border-gray-800" data-oid="ff35-4s">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="ikdtfyr"
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
                        data-oid="s1nv0nv"
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
                        data-oid="qo_u3.p"
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
                        data-oid="mzxpfjd"
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700"
                data-oid="q2g8d6k"
            >
                {loading ? (
                    <div
                        className="flex justify-center items-center min-h-[50vh]"
                        data-oid="rzc57qr"
                    >
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="m_9ie.h"
                        ></div>
                    </div>
                ) : error ? (
                    <div
                        className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                        data-oid="6733:mb"
                    >
                        <p className="text-red-200" data-oid="0kaseok">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                            data-oid="k.w3t8k"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'courses' && (
                            <div data-oid="840v0x7">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="mu3rd3-"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="8m7j3mj"
                                    >
                                        Manage Courses
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/courses/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="zv-fjnx"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="25uz319"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="5kxnjve"
                                            />
                                        </svg>
                                        Add New Course
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid=":_n1eao"
                                >
                                    <div className="overflow-x-auto" data-oid="7ypepxx">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid=":kz5obv"
                                        >
                                            <thead className="bg-gray-900" data-oid=".5ud9rx">
                                                <tr data-oid="48:ufvm">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="yrxm0u8"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="n59nin-"
                                                    >
                                                        Level
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="a7ug6pc"
                                                    >
                                                        Instructor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="ggx.5ag"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="hc3:38i"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="0z3pua1"
                                            >
                                                {courses.length === 0 ? (
                                                    <tr data-oid="gur-sql">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="e32jfkl"
                                                        >
                                                            No courses found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    courses.map((course) => (
                                                        <tr
                                                            key={course._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="4j4-bdw"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="miefvc0"
                                                            >
                                                                {course.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="3dd3sh:"
                                                            >
                                                                {course.level}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="bj4j5il"
                                                            >
                                                                {course.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid=":u4r4q0"
                                                            >
                                                                {course.price
                                                                    ? `${course.price}`
                                                                    : 'Free'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="kflg0z3"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/courses/${course._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="x1cgeox"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="sy9:bys"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid=":elbr34"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="h2fx0_x"
                                                                        />
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
                                                                    data-oid="cfhkg9c"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="drj8pkl"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="h4albzj"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="hfh0t0v"
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
                                                                    data-oid="jhteepu"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="ft6.ly8"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="bhd38gt"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="vvqi_ww"
                                                                        />
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
                            <div data-oid="pmxrtsa">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="o2i145b"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="0v2pn93"
                                    >
                                        Manage Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="mko0n46"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="_:41ney"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid=":j_.kyk"
                                            />
                                        </svg>
                                        Add New Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="1n1qxcy"
                                >
                                    <div className="overflow-x-auto" data-oid="wsiwqj4">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="mx3ga-o"
                                        >
                                            <thead className="bg-gray-900" data-oid="7u6dbqo">
                                                <tr data-oid="8klfow7">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="zux01en"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="c4h3sl9"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=":tec7a."
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="fxw1qr:"
                                                    >
                                                        Speaker
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="7o_zjw0"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="3z656r:"
                                            >
                                                {workshops.length === 0 ? (
                                                    <tr data-oid="p_ac2j-">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="8c2fhwo"
                                                        >
                                                            No workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    workshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid=":mc2mef"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="tl.vnm2"
                                                            >
                                                                {workshop.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="7:58rui"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="nrbs6a2"
                                                            >
                                                                {workshop.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="ozqvv72"
                                                            >
                                                                {workshop.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="dm_0p5w"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="phjv3jc"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="h9y82v8"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="yqbl6yu"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="tez14ji"
                                                                        />
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
                                                                    data-oid="g01rmxk"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="wsawvi3"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="5x476yn"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="1_o4p4u"
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
                                                                    data-oid="c81ex7j"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="ww4p8r0"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="xr22h_t"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="tvpy2_s"
                                                                        />
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
                            <div data-oid="ysu_wwe">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="7kz_h1j"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="gl28cg2"
                                    >
                                        Manage Past Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/past-workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="1dloyn3"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="h4i27sq"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="aznast7"
                                            />
                                        </svg>
                                        Add New Past Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="l:20_ta"
                                >
                                    <div className="overflow-x-auto" data-oid="iexwvnh">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="s6uzyen"
                                        >
                                            <thead className="bg-gray-900" data-oid="1c.76vi">
                                                <tr data-oid="5te96by">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="spf8gmr"
                                                    >
                                                        Institution
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="e6f:yam"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="zgdjuex"
                                                    >
                                                        Topic
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="aepx-7e"
                                                    >
                                                        Highlights
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="tg4y7gh"
                                                    >
                                                        Media
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="mj.53ba"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="oz4j.4l"
                                            >
                                                {pastWorkshops.length === 0 ? (
                                                    <tr data-oid="-tu:-zj">
                                                        <td
                                                            colSpan={6}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="h02.n.2"
                                                        >
                                                            No past workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    pastWorkshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="ghiv4as"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="8qt:4b_"
                                                            >
                                                                {workshop.institution}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="30kdq5m"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="qlmh9nq"
                                                            >
                                                                {workshop.topic}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="taywaca"
                                                            >
                                                                <ul
                                                                    className="list-disc pl-4"
                                                                    data-oid="y9337:i"
                                                                >
                                                                    {workshop.highlights.map(
                                                                        (highlight, index) => (
                                                                            <li
                                                                                key={index}
                                                                                data-oid="z33wj_."
                                                                            >
                                                                                {highlight}
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="tzytb0v"
                                                            >
                                                                {workshop.mediaLinks.length > 0 ? (
                                                                    <span
                                                                        className="text-purple-400"
                                                                        data-oid="c4ipjel"
                                                                    >
                                                                        {workshop.mediaLinks.length}{' '}
                                                                        media items
                                                                    </span>
                                                                ) : (
                                                                    'No media'
                                                                )}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="pvd5.gg"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/past-workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="Edit Past Workshop"
                                                                    data-oid=":z-m.4p"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="7szg:ox"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="-yr87at"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="zovhabp"
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
                                                                    data-oid="iktjub-"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="5i.q3ic"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="ofkj5km"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="bc0tn0o"
                                                                        />
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
                            <div data-oid="9p2hhds">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="hzoig9l"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="sqb:x47"
                                    >
                                        Manage Hackathons
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/hackathons/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid=":1l-80p"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="56v6a82"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="ro09_d3"
                                            />
                                        </svg>
                                        Add New Hackathon
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="btx7q3p"
                                >
                                    <div className="overflow-x-auto" data-oid="_i3y_no">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="514u3b6"
                                        >
                                            <thead className="bg-gray-900" data-oid="v:.g9ox">
                                                <tr data-oid="9i5w:f9">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="1iqsbf3"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="m87mf6n"
                                                    >
                                                        Dates
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="49vznf."
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="tef0nx3"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="idrzuqo"
                                            >
                                                {hackathons.length === 0 ? (
                                                    <tr data-oid="oek2791">
                                                        <td
                                                            colSpan={4}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="2wv7sfx"
                                                        >
                                                            No hackathons found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    hackathons.map((hackathon) => (
                                                        <tr
                                                            key={hackathon._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid=":jvko7y"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="mmv7y1j"
                                                            >
                                                                {hackathon.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="p1flxf7"
                                                            >
                                                                {new Date(
                                                                    hackathon.startDate,
                                                                ).toLocaleDateString()}{' '}
                                                                -{' '}
                                                                {new Date(
                                                                    hackathon.endDate,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="kqmlgmp"
                                                            >
                                                                {hackathon.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="0d2yasp"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="b8yiil5"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="qijmuy-"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="mbe7z-q"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="2l0in22"
                                                                        />
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
                                                                    data-oid="oj0wz8."
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="_lls1d1"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="whl4ce6"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="i:2qhm6"
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
                                                                    data-oid="0g52fv6"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="kn3bodc"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="oxx4r8d"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="ftv-8qs"
                                                                        />
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
