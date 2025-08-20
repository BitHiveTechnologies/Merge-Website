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
    instructorImg?: string;
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
        <div data-oid="7e07c4t">
            <h1 className="text-3xl font-bold mb-8" data-oid="4umljba">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div
                className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800"
                data-oid="rx_kb8e"
            >
                <div className="flex space-x-4 border-b border-gray-800" data-oid="9hb4wa6">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="8ar0:fl"
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
                        data-oid="hs1j1t0"
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
                        data-oid="n:b9mdv"
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
                        data-oid="xgiha:u"
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700"
                data-oid="03m8fu9"
            >
                {loading ? (
                    <div
                        className="flex justify-center items-center min-h-[50vh]"
                        data-oid="e.88kdc"
                    >
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="6ccz3vf"
                        ></div>
                    </div>
                ) : error ? (
                    <div
                        className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                        data-oid="1x2lose"
                    >
                        <p className="text-red-200" data-oid="tyv52fa">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                            data-oid="4y1dhxv"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'courses' && (
                            <div data-oid="q2mwjef">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="_uuekb_"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="asitx2h"
                                    >
                                        Manage Courses
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/courses/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="0zcsto3"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="mj4y7w5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="jbrksci"
                                            />
                                        </svg>
                                        Add New Course
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="-wwm6c6"
                                >
                                    <div className="overflow-x-auto" data-oid="x_a366d">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="u4rveen"
                                        >
                                            <thead className="bg-gray-900" data-oid="scdo4-w">
                                                <tr data-oid="2jhmg6h">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="b2eipg3"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=":._8kew"
                                                    >
                                                        Level
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="6c42:ra"
                                                    >
                                                        Instructor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="9be1d:d"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=".s3fks5"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="d9vqza2"
                                            >
                                                {courses.length === 0 ? (
                                                    <tr data-oid="nialc4c">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="u2u-ov6"
                                                        >
                                                            No courses found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    courses.map((course) => (
                                                        <tr
                                                            key={course._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="96oe4e-"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="gw2aizq"
                                                            >
                                                                {course.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="u2n21xb"
                                                            >
                                                                {course.level}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="nfw-22q"
                                                            >
                                                                {course.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="9nv1ms:"
                                                            >
                                                                {course.price
                                                                    ? `${course.price}`
                                                                    : 'Free'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="uk7-ovz"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/courses/${course._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="i:btbp7"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="440ahbj"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="ti1q7ta"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="58fagkr"
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
                                                                    data-oid=":7lff5j"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="64-lrt8"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="jvbjdnt"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="eu0rtnh"
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
                                                                    data-oid="uxibzt2"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="jctb00t"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="9e.lmxh"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="k4e2glb"
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
                            <div data-oid="zbf.vh9">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="jf5s1:w"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="0ywd6f:"
                                    >
                                        Manage Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="6z.17:d"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="e30fda2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="i3pra.o"
                                            />
                                        </svg>
                                        Add New Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="qge60x7"
                                >
                                    <div className="overflow-x-auto" data-oid="-t03tgj">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="wybg210"
                                        >
                                            <thead className="bg-gray-900" data-oid="rahzonp">
                                                <tr data-oid="u2-c2cb">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=":bv33rm"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="rez:twu"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="6zgevnm"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="u6iunef"
                                                    >
                                                        Speaker
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="9rovjuk"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="1kgoq0g"
                                            >
                                                {workshops.length === 0 ? (
                                                    <tr data-oid="1-pzu87">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="eah-wr_"
                                                        >
                                                            No workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    workshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="4-vdmy1"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="8w27p03"
                                                            >
                                                                {workshop.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="ac.0h88"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="lugp14x"
                                                            >
                                                                {workshop.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="se0v7hp"
                                                            >
                                                                {workshop.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="yuehzis"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="okzl43e"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="iw.k2n:"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="4e50qxj"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="x3jfnw4"
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
                                                                    data-oid="16tu2jq"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="tt4x7oc"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="qkb:y02"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="bp96367"
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
                                                                    data-oid="7u:.95a"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="gy1e.0f"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="6b_2y7a"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="n1-w3uo"
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
                            <div data-oid="hhir_ez">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid=".:f.zye"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="mi8l8wq"
                                    >
                                        Manage Past Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/past-workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="ssveoa-"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="zymb5sp"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="bwqld7j"
                                            />
                                        </svg>
                                        Add New Past Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid=".u23_.:"
                                >
                                    <div className="overflow-x-auto" data-oid="h0ryp-h">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="2u9r5e3"
                                        >
                                            <thead className="bg-gray-900" data-oid="vvc5jr:">
                                                <tr data-oid="jde3i9_">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="jn73v4j"
                                                    >
                                                        Institution
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="onj4qux"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="_r:fzx7"
                                                    >
                                                        Topic
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="pbuwe1w"
                                                    >
                                                        Highlights
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="i7mp6em"
                                                    >
                                                        Media
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="77my.bk"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="o4kskjr"
                                            >
                                                {pastWorkshops.length === 0 ? (
                                                    <tr data-oid="36_qk41">
                                                        <td
                                                            colSpan={6}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="vehqjgj"
                                                        >
                                                            No past workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    pastWorkshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="h6l357e"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="6esf91b"
                                                            >
                                                                {workshop.institution}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="-:rzqdb"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="2:gpwrm"
                                                            >
                                                                {workshop.topic}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="45ssrv4"
                                                            >
                                                                <ul
                                                                    className="list-disc pl-4"
                                                                    data-oid="82_ockg"
                                                                >
                                                                    {workshop.highlights.map(
                                                                        (highlight, index) => (
                                                                            <li
                                                                                key={index}
                                                                                data-oid="0kmf:6t"
                                                                            >
                                                                                {highlight}
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="klql8re"
                                                            >
                                                                {workshop.mediaLinks.length > 0 ? (
                                                                    <span
                                                                        className="text-purple-400"
                                                                        data-oid="1676m:m"
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
                                                                data-oid="hhi3krj"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/past-workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="Edit Past Workshop"
                                                                    data-oid="ztg5bzm"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="y:pu5tz"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="lk_uhnr"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="mxk2nmw"
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
                                                                    data-oid="1gqhzld"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="_0g.w4i"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="4r8uiwu"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="5lhaz_8"
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
                            <div data-oid="nz62won">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="i.awx.m"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid=":_pur12"
                                    >
                                        Manage Hackathons
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/hackathons/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="wqm8wy2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="sionpcc"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="y6rd6_x"
                                            />
                                        </svg>
                                        Add New Hackathon
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="i:m06x4"
                                >
                                    <div className="overflow-x-auto" data-oid="6zvjedu">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="a:54n0u"
                                        >
                                            <thead className="bg-gray-900" data-oid="696ofzo">
                                                <tr data-oid="k78f82_">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="d7..06v"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="bgxffs2"
                                                    >
                                                        Dates
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="cb8vrpu"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="m917ws."
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="alnyl5_"
                                            >
                                                {hackathons.length === 0 ? (
                                                    <tr data-oid="3y-ys.b">
                                                        <td
                                                            colSpan={4}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="fjd722k"
                                                        >
                                                            No hackathons found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    hackathons.map((hackathon) => (
                                                        <tr
                                                            key={hackathon._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="i6b.8_7"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="-a2u58g"
                                                            >
                                                                {hackathon.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="wndajsi"
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
                                                                data-oid="3zzol3-"
                                                            >
                                                                {hackathon.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-4"
                                                                data-oid="qjmxyqv"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    title="View Registrations"
                                                                    data-oid="4g:xz1l"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-eye"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="iyjghht"
                                                                    >
                                                                        <path
                                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                                                                            data-oid="5o1-x3v"
                                                                        />

                                                                        <path
                                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                                                                            data-oid="ybbfqze"
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
                                                                    data-oid="78:ud-m"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-pencil-square"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="2:q5fa_"
                                                                    >
                                                                        <path
                                                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                                                            data-oid="tc-58tn"
                                                                        />

                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                            data-oid="f:891lp"
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
                                                                    data-oid="_2h8m_1"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16"
                                                                        data-oid="4-8uvtp"
                                                                    >
                                                                        <path
                                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                                            data-oid="q::xgou"
                                                                        />

                                                                        <path
                                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                                            data-oid="o3chwe0"
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
