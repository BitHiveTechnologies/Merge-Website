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
        <div data-oid="46t7.eb">
            <h1 className="text-3xl font-bold mb-8" data-oid="k1bchro">
                Admin Dashboard
            </h1>

            {/* Navigation Tabs */}
            <div
                className="bg-gray-900 py-6 px-6 rounded-t-lg border border-gray-800"
                data-oid="t48w51v"
            >
                <div className="flex space-x-4 border-b border-gray-800" data-oid=".mcm2-3">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={cn(
                            'px-6 py-3 font-medium text-lg',
                            activeTab === 'courses'
                                ? 'text-purple-400 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300',
                        )}
                        data-oid="5dr3mcu"
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
                        data-oid="o5:lj1_"
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
                        data-oid="m_w.0y4"
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
                        data-oid="d6qvgaw"
                    >
                        Hackathons
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-gray-800 rounded-b-lg p-6 border-x border-b border-gray-700"
                data-oid="9ve2ik8"
            >
                {loading ? (
                    <div
                        className="flex justify-center items-center min-h-[50vh]"
                        data-oid="nwnyn7q"
                    >
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="nvk4aeq"
                        ></div>
                    </div>
                ) : error ? (
                    <div
                        className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                        data-oid="xa_m0mt"
                    >
                        <p className="text-red-200" data-oid="r9ooljh">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                            data-oid="fymefx6"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'courses' && (
                            <div data-oid="iktwq1t">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="0zit..b"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="k_wdb6q"
                                    >
                                        Manage Courses
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/courses/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid=":ost5bs"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="qymgp2b"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="h:vwlb9"
                                            />
                                        </svg>
                                        Add New Course
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="6:gy14z"
                                >
                                    <div className="overflow-x-auto" data-oid="e7m_3pk">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="8p1j-.k"
                                        >
                                            <thead className="bg-gray-900" data-oid="c_v7e_w">
                                                <tr data-oid="67i_sfr">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="o3x5:51"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="clxg2x-"
                                                    >
                                                        Level
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="sj8nqu4"
                                                    >
                                                        Instructor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="9l7ay1-"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="zyvy2f5"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="amfwp5m"
                                            >
                                                {courses.length === 0 ? (
                                                    <tr data-oid="h2l.1d6">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="bl5-ypi"
                                                        >
                                                            No courses found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    courses.map((course) => (
                                                        <tr
                                                            key={course._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="68m-qaw"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="1upiwfd"
                                                            >
                                                                {course.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="blkc2mi"
                                                            >
                                                                {course.level}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="ewkblbj"
                                                            >
                                                                {course.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="_p_u3l4"
                                                            >
                                                                {course.price
                                                                    ? `${course.price}`
                                                                    : 'Free'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm"
                                                                data-oid="kh9ms9y"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/courses/${course._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="qfl5l1:"
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
                            <div data-oid="89ubmrg">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="conl3zh"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="_mskks6"
                                    >
                                        Manage Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="osi0uhz"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="pj_iel:"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="zjn-eje"
                                            />
                                        </svg>
                                        Add New Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="ff8nipc"
                                >
                                    <div className="overflow-x-auto" data-oid="d_gxvew">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="llbb_r6"
                                        >
                                            <thead className="bg-gray-900" data-oid="9qjbtys">
                                                <tr data-oid="vop:scx">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="bbv9bq."
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="-p7ukum"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="teq3ayk"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="8ljsm::"
                                                    >
                                                        Speaker
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="3pwdswu"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="y:axkb5"
                                            >
                                                {workshops.length === 0 ? (
                                                    <tr data-oid="u38yzyi">
                                                        <td
                                                            colSpan={5}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="4j2-zb:"
                                                        >
                                                            No workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    workshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="_0y50-s"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="yek8trd"
                                                            >
                                                                {workshop.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="hlgvlhu"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="dd9iwpf"
                                                            >
                                                                {workshop.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="fprr7j7"
                                                            >
                                                                {workshop.instructor || 'N/A'}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm"
                                                                data-oid="lc-m98x"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="s-m.:ke"
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
                            <div data-oid="91q66_1">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="xveh-8a"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="nrz-hu5"
                                    >
                                        Manage Past Workshops
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/past-workshops/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="ck8bdo7"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="v.708qe"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="t7mj13z"
                                            />
                                        </svg>
                                        Add New Past Workshop
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="x468-gs"
                                >
                                    <div className="overflow-x-auto" data-oid="3a7.vi2">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="dt7xov1"
                                        >
                                            <thead className="bg-gray-900" data-oid="8kol:zu">
                                                <tr data-oid="1uyl6-f">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="z:2bnh7"
                                                    >
                                                        Institution
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="nvc5op8"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="1cvn7do"
                                                    >
                                                        Topic
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="633a5u3"
                                                    >
                                                        Highlights
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="9vraiiv"
                                                    >
                                                        Media
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="4zutx:o"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="2.z2uq6"
                                            >
                                                {pastWorkshops.length === 0 ? (
                                                    <tr data-oid="qa4c3wq">
                                                        <td
                                                            colSpan={6}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="sbejl:8"
                                                        >
                                                            No past workshops found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    pastWorkshops.map((workshop) => (
                                                        <tr
                                                            key={workshop._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="cp3l0mh"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="-343:eu"
                                                            >
                                                                {workshop.institution}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="946qo:w"
                                                            >
                                                                {new Date(
                                                                    workshop.date,
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="px8hsfs"
                                                            >
                                                                {workshop.topic}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="75r1mlf"
                                                            >
                                                                <ul
                                                                    className="list-disc pl-4"
                                                                    data-oid="hs0hu9r"
                                                                >
                                                                    {workshop.highlights.map(
                                                                        (highlight, index) => (
                                                                            <li
                                                                                key={index}
                                                                                data-oid="3yy0y.3"
                                                                            >
                                                                                {highlight}
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 text-sm text-gray-300"
                                                                data-oid="4075ns1"
                                                            >
                                                                {workshop.mediaLinks.length > 0 ? (
                                                                    <span
                                                                        className="text-purple-400"
                                                                        data-oid="qntts6y"
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
                                                                data-oid="n9-3-3n"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/past-workshops/${workshop._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="nlmmys8"
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
                            <div data-oid="gmwhwi6">
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="plme52r"
                                >
                                    <h2
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                        data-oid="6c_3d17"
                                    >
                                        Manage Hackathons
                                    </h2>
                                    <Link
                                        href="/admin/dashboard/hackathons/new"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                                        data-oid="r1_al.a"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="gaog7gh"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                data-oid="sv3m78."
                                            />
                                        </svg>
                                        Add New Hackathon
                                    </Link>
                                </div>

                                <div
                                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                                    data-oid="cni1a5n"
                                >
                                    <div className="overflow-x-auto" data-oid="rnlc4c6">
                                        <table
                                            className="min-w-full divide-y divide-gray-700"
                                            data-oid="rbof46e"
                                        >
                                            <thead className="bg-gray-900" data-oid="f6cthnj">
                                                <tr data-oid="_kp5lya">
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="rg4vr_q"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="fs7j2oo"
                                                    >
                                                        Dates
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="mriuxd2"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                                        data-oid="nv_ks8q"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="bg-gray-800 divide-y divide-gray-700"
                                                data-oid="mpf4rj-"
                                            >
                                                {hackathons.length === 0 ? (
                                                    <tr data-oid="avcoshx">
                                                        <td
                                                            colSpan={4}
                                                            className="px-6 py-4 text-center text-gray-400"
                                                            data-oid="ugs_u3k"
                                                        >
                                                            No hackathons found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    hackathons.map((hackathon) => (
                                                        <tr
                                                            key={hackathon._id}
                                                            className="hover:bg-gray-750"
                                                            data-oid="ks7prkd"
                                                        >
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                                data-oid="wlhiwrg"
                                                            >
                                                                {hackathon.title}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                                                data-oid="nfzgomy"
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
                                                                data-oid="obn9m0k"
                                                            >
                                                                {hackathon.location}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap text-sm"
                                                                data-oid="5kg00f7"
                                                            >
                                                                <Link
                                                                    href={`/admin/dashboard/hackathons/${hackathon._id}`}
                                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                                    data-oid="3c87mj-"
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
