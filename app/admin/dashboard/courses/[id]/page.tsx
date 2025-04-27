'use client';

import { adminApi } from '@/lib/adminApi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CourseRegistration {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    courseId: {
        _id: string;
        title: string;
    };
    enrolledAt: string;
}

interface Course {
    _id: string;
    title: string;
    level: string;
    description: string;
}

export default function CourseRegistrationsPage() {
    const params = useParams();
    const courseId = params.id as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [registrations, setRegistrations] = useState<CourseRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch course details and registrations in parallel
                const [coursesData, registrationsData] = await Promise.all([
                    adminApi.courses.getAll(),
                    adminApi.courses.getRegistrations(courseId),
                ]);

                // Find the specific course
                const courseDetails = coursesData.find((c: Course) => c._id === courseId);
                if (courseDetails) {
                    setCourse(courseDetails);
                }

                setRegistrations(registrationsData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
                console.error('Error fetching course data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="2x6oe4r">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="ccl4.vn"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="b2svj:t"
            >
                <p className="text-red-200" data-oid="zec63lz">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="cij_d9:"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="cn:9x34">
            <div className="flex justify-between items-center mb-6" data-oid="-exk:7t">
                <div data-oid="nnt3_z9">
                    <Link
                        href="/admin/dashboard/courses"
                        className="text-purple-400 hover:text-purple-300 transition-colors mb-2 inline-block"
                        data-oid="2yo8n1v"
                    >
                        ← Back to Courses
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="-gdnkyz">
                        {course ? course.title : 'Course'} Registrations
                    </h1>
                </div>
            </div>

            {registrations.length === 0 ? (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
                    data-oid="km6bgki"
                >
                    <p className="text-gray-400" data-oid="hhi1t5k">
                        No registrations found for this course.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="sj-_kin"
                >
                    <div className="overflow-x-auto" data-oid="py29r3u">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="4bfc1uk">
                            <thead className="bg-gray-900" data-oid=".s.wiem">
                                <tr data-oid="o0rq_hq">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="cbkdxwr"
                                    >
                                        Student Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="k-yx900"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="a:u1acr"
                                    >
                                        Enrolled At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="p06b9o7"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid="iof90nf"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="6visqq1"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="wn6ahpk"
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="aocpknm"
                                        >
                                            {new Date(registration.enrolledAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
