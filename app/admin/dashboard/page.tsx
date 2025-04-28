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
        <div data-oid="vhv50sn">
            <h1 className="text-3xl font-bold mb-8" data-oid="qpzlhuk">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div
                className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800"
                data-oid="k1o:bi9"
            >
                <div className="flex space-x-4 border-b border-gray-800" data-oid="7:wq:ih">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="c354:wd"
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
                        data-oid="n5t5d.6"
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
                        data-oid="o1s35wz"
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
                        data-oid="lw8phr_"
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700"
                data-oid="s-q4-nl"
            >
                {loading ? (
                    <div
                        className="flex justify-center items-center min-h-[50vh]"
                        data-oid="7_sj-70"
                    >
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="-s69t58"
                        ></div>
                    </div>
                ) : error ? (
                    <div
                        className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                        data-oid="hevckj9"
                    >
                        <p className="text-red-200" data-oid="tum4t5_">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                            data-oid="_8wbb1a"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'courses' && (
                            <div data-oid="vln3onk">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="gk09qk1"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="f3y-6ml"
                                    >
                                        Manage Courses
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/courses/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="brstydk"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="j0rngz1"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="tw5f0ax"
                                            />
                                        </svg>
                                        Add New Course
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="sk05eeq"
                                >
                                    <div className="overflow-x-auto" data-oid="4fqb.zh">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="zu22bzv"
                                        >
                                            <thead className="bg-gray-900" data-oid="1u:a50a">
                                                <tr data-oid="mibz8:v">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="z4:v7df"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="x-pd7i0"
                                                    >
                                                        Level
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="e96plsi"
                                                    >
                                                        Instructor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="ux6a8.e"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=".l79duy"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="ch8unkl"
                                            >
                                                {courses.length === 0 ? (
                                                    <tr data-oid="odcvm:a">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="r6xmx3h"
                                                        >
                                                            No courses found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    courses.map((course) => (
                                                        <tr
                                                            key={course._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="lwdpmpf"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="wc97lx7"
                                                            >
                                                                {course.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="q5o8c5d"
                                                            >
                                                                {course.level}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="v.370b6"
                                                            >
                                                                {course.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="bs-:t51"
                                                            >
                                                                {course.price
                                                                    ? `${course.price}`
                                                                    : 'Free'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm"
                                                                data-oid="bo3v40s"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/courses/${course._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="xkii02i"
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
                            <div data-oid="6l37ehi">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="-5rd:_r"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="8:ychm_"
                                    >
                                        Manage Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="nm_l6tj"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="f9avxvd"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="tqa341t"
                                            />
                                        </svg>
                                        Add New Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="r:0ri0s"
                                >
                                    <div className="overflow-x-auto" data-oid="vt39plw">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="4j75n6e"
                                        >
                                            <thead className="bg-gray-900" data-oid="u30v992">
                                                <tr data-oid="_3jzrzp">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="2lsuuaz"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="9-p7.-_"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="ac3b2yb"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="6lwnz_x"
                                                    >
                                                        Speaker
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="r1vyvp."
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="9ha4qz4"
                                            >
                                                {workshops.length === 0 ? (
                                                    <tr data-oid="r7k-iht">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="0k93cwi"
                                                        >
                                                            No workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    workshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid=".:fyg0w"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="15uajmb"
                                                            >
                                                                {workshop.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="o9sck5f"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="y62921z"
                                                            >
                                                                {workshop.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="7whp7qp"
                                                            >
                                                                {workshop.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm"
                                                                data-oid="_kdoo-w"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="chci9km"
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
                            <div data-oid="6rpqe56">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="sbs:opw"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="d33.u-x"
                                    >
                                        Manage Past Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/past-workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="k9-k064"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="0pm_et9"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="c9bp:qw"
                                            />
                                        </svg>
                                        Add New Past Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="ilsi55:"
                                >
                                    <div className="overflow-x-auto" data-oid="a8k69ce">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="_yjx:f6"
                                        >
                                            <thead className="bg-gray-900" data-oid="n:x0eyw">
                                                <tr data-oid="vwdjiy-">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="32z1w:u"
                                                    >
                                                        Institution
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="fko.zi:"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="qv8w1ex"
                                                    >
                                                        Topic
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="9_ns24-"
                                                    >
                                                        Highlights
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid=":ojrc-f"
                                                    >
                                                        Media
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="-_e8kqd"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="hhqbeom"
                                            >
                                                {pastWorkshops.length === 0 ? (
                                                    <tr data-oid="u3lotmi">
                                                        <td
                                                            colSpan={6}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="e.qlk7n"
                                                        >
                                                            No past workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    pastWorkshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="cm0df8u"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="t2x6sxm"
                                                            >
                                                                {workshop.institution}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="s0-j.os"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="k6r44f4"
                                                            >
                                                                {workshop.topic}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="1gxqf8m"
                                                            >
                                                                <ul
                                                                    className="list-disc pl-4"
                                                                    data-oid="v0anbch"
                                                                >
                                                                    {workshop.highlights.map(
                                                                        (highlight, index) => (
                                                                            <li
                                                                                key={index}
                                                                                data-oid="sm74xx."
                                                                            >
                                                                                {highlight}
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="rmc4xk6"
                                                            >
                                                                {workshop.mediaLinks.length > 0 ? (
                                                                    <span
                                                                        className="text-purple-400"
                                                                        data-oid="x2o8.co"
                                                                    >
                                                                        {workshop.mediaLinks.length}{' '}
                                                                        media items
                                                                    </span>
                                                                ) : (
                                                                    'No media'
                                                                )}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm"
                                                                data-oid="so.h2v7"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/past-workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="380_24u"
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
                            <div data-oid="mcv5omr">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="60l3uyb"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="2ph_-kg"
                                    >
                                        Manage Hackathons
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/hackathons/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="mx:tdki"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="bdn0mwq"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="1fxpy7g"
                                            />
                                        </svg>
                                        Add New Hackathon
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="52yv8ri"
                                >
                                    <div className="overflow-x-auto" data-oid="y41k8ya">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="a_3n_6a"
                                        >
                                            <thead className="bg-gray-900" data-oid=".xzr5jb">
                                                <tr data-oid="jwf.wcs">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="8_7e72d"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="us2bmk3"
                                                    >
                                                        Dates
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="35yp-l7"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="ymvmy0:"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="n73ix_-"
                                            >
                                                {hackathons.length === 0 ? (
                                                    <tr data-oid="9cxzw8p">
                                                        <td
                                                            colSpan={4}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="8n:uhw:"
                                                        >
                                                            No hackathons found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    hackathons.map((hackathon) => (
                                                        <tr
                                                            key={hackathon._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="3hx3n72"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="zc5adj1"
                                                            >
                                                                {hackathon.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="_3vcegl"
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
                                                                data-oid="n81xk59"
                                                            >
                                                                {hackathon.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm"
                                                                data-oid="2w_cv-f"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="5t.ko80"
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
