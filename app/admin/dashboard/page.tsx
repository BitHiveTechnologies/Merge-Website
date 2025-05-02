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
        <div data-oid="exk3u72">
            <h1 className="text-3xl font-bold mb-8" data-oid="k8u7qk1">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div
                className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800"
                data-oid="mh7ioe6"
            >
                <div className="flex space-x-4 border-b border-gray-800" data-oid="_o9r6ew">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="93s7omm"
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
                        data-oid="jc175q5"
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
                        data-oid="k6p.--6"
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
                        data-oid="nqo64jl"
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700"
                data-oid="n7fae.-"
            >
                {loading ? (
                    <div
                        className="flex justify-center items-center min-h-[50vh]"
                        data-oid="d98rzbh"
                    >
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="ar31p90"
                        ></div>
                    </div>
                ) : error ? (
                    <div
                        className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                        data-oid="2tkb4zq"
                    >
                        <p className="text-red-200" data-oid="vusjm7o">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                            data-oid="loh0tle"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'courses' && (
                            <div data-oid="g619_9:">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="vosohuf"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="xpqd-_t"
                                    >
                                        Manage Courses
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/courses/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="afep8ca"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="olb9mve"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="f81i8rw"
                                            />
                                        </svg>
                                        Add New Course
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="ixan7pk"
                                >
                                    <div className="overflow-x-auto" data-oid="rdes1:8">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="2uqxtdj"
                                        >
                                            <thead className="bg-gray-900" data-oid="i4fxi:7">
                                                <tr data-oid="j7d_zaa">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="0c807hm"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="y8eyjoq"
                                                    >
                                                        Level
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="-c-xnvu"
                                                    >
                                                        Instructor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="kca3y:x"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=".2ekdts"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="ofnjgdc"
                                            >
                                                {courses.length === 0 ? (
                                                    <tr data-oid="l1c.ezh">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="0m3vlp0"
                                                        >
                                                            No courses found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    courses.map((course) => (
                                                        <tr
                                                            key={course._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="y_sawqw"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="pdxd10g"
                                                            >
                                                                {course.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="sqyqi_p"
                                                            >
                                                                {course.level}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="mj66m7d"
                                                            >
                                                                {course.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="rkqv8c9"
                                                            >
                                                                {course.price
                                                                    ? `${course.price}`
                                                                    : 'Free'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="epxp.a4"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/courses/${course._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="td:8:vp"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid=".nzo2b2"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="_10e6dh"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="3h..dvv"
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
                                                                    data-oid="9veqxw9"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="dgy1d1:"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="8z9pr8k"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="c2oe_4i"
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
                                                                    data-oid="hs:orp0"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="njohc5f"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="4kvuow."
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="k4-liag"
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
                            <div data-oid="8ryud8z">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="wf3h8e7"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="me-v:87"
                                    >
                                        Manage Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="beldy_a"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="b118ve6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="dr06pq0"
                                            />
                                        </svg>
                                        Add New Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="gy:9wbe"
                                >
                                    <div className="overflow-x-auto" data-oid="ryrt:ji">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="-sfd3.p"
                                        >
                                            <thead className="bg-gray-900" data-oid="ugiv6k4">
                                                <tr data-oid="jc06vyy">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="ducs85y"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=":u6nzl1"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="fxbi5rh"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=".b:5jyw"
                                                    >
                                                        Speaker
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="d2m04sl"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="4t97n4u"
                                            >
                                                {workshops.length === 0 ? (
                                                    <tr data-oid="gn9bdyq">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="7jya2t1"
                                                        >
                                                            No workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    workshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="ykewkdo"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid=":5_nnye"
                                                            >
                                                                {workshop.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="vp6ijvl"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="cjkfwpi"
                                                            >
                                                                {workshop.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="fz_t3bg"
                                                            >
                                                                {workshop.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="kd7:pct"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="03rodwh"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="m26hy7:"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="k_0xa1s"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="22ou5kl"
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
                                                                    data-oid="7na5_a0"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="de-u5wn"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="sw0f_13"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="emyalpj"
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
                                                                    data-oid="t4z463."
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="_dl-0xb"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="_ish9dd"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid=":0n2vkb"
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
                            <div data-oid="cp15w78">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="fsjcqg0"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="ppijphc"
                                    >
                                        Manage Past Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/past-workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="ea8z81-"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="knu1q:8"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="d1l2epe"
                                            />
                                        </svg>
                                        Add New Past Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="wiq.prj"
                                >
                                    <div className="overflow-x-auto" data-oid="_3c2:d-">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="xa3evgq"
                                        >
                                            <thead className="bg-gray-900" data-oid="p8:3e7w">
                                                <tr data-oid="g.2lsph">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="ov4qs78"
                                                    >
                                                        Institution
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="ha7p9l8"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="v7ccrr8"
                                                    >
                                                        Topic
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="1vp0u:j"
                                                    >
                                                        Highlights
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="8-i36qj"
                                                    >
                                                        Media
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="rthfjsj"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="-k94b:9"
                                            >
                                                {pastWorkshops.length === 0 ? (
                                                    <tr data-oid="bkuw:yr">
                                                        <td
                                                            colSpan={6}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="feflyy-"
                                                        >
                                                            No past workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    pastWorkshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="csu5zgu"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="xylhp3w"
                                                            >
                                                                {workshop.institution}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="yz_9438"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="4ivn2co"
                                                            >
                                                                {workshop.topic}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="7g-7pt5"
                                                            >
                                                                <ul
                                                                    className="list-disc pl-4"
                                                                    data-oid="263w:qt"
                                                                >
                                                                    {workshop.highlights.map(
                                                                        (highlight, index) => (
                                                                            <li
                                                                                key={index}
                                                                                data-oid="222.jfh"
                                                                            >
                                                                                {highlight}
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="gm_z0ft"
                                                            >
                                                                {workshop.mediaLinks.length > 0 ? (
                                                                    <span
                                                                        className="text-purple-400"
                                                                        data-oid="q99z5ca"
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
                                                                data-oid="uz70fr:"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/past-workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="Edit Past Workshop"
                                                                    data-oid="53p-x4r"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="l2ki:di"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="15-:vb8"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="ahws:pb"
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
                                                                    data-oid="j7bcv-r"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="bow2s9g"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="y28_fsa"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="yiozd.0"
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
                            <div data-oid="owrcoxw">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="q5wba8:"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="m0ykkg3"
                                    >
                                        Manage Hackathons
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/hackathons/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="rbmey1."
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="1gl5o9_"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="a9-1y3:"
                                            />
                                        </svg>
                                        Add New Hackathon
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="w80h1og"
                                >
                                    <div className="overflow-x-auto" data-oid="l6zfr8r">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="sscsfgk"
                                        >
                                            <thead className="bg-gray-900" data-oid="mzzaci3">
                                                <tr data-oid="ie0rxjz">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="bd.v0ok"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="uw9x01g"
                                                    >
                                                        Dates
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="8d1li8c"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="5bf8s7i"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="smp.tgu"
                                            >
                                                {hackathons.length === 0 ? (
                                                    <tr data-oid="9:r-zg4">
                                                        <td
                                                            colSpan={4}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="d_zqqqf"
                                                        >
                                                            No hackathons found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    hackathons.map((hackathon) => (
                                                        <tr
                                                            key={hackathon._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="hxn7fep"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="e8xf70n"
                                                            >
                                                                {hackathon.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="mmuwkf."
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
                                                                data-oid="da_5l4x"
                                                            >
                                                                {hackathon.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="w0swb8d"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="ro1azvp"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="b8vb9n."
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="wv6_bn6"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="ui4drdz"
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
                                                                    data-oid="dxy:e:3"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="xmz.1lg"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="wbv9oe5"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="dimm41."
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
                                                                    data-oid="95nxksk"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="ws-8wex"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="rlxj7ft"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid=".pw41::"
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
