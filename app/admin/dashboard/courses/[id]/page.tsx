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
    enrollmentDate: string;
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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="2b_h5:m">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="oblz3bj"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="-.-317c"
            >
                <p className="text-red-200" data-oid="226-hjw">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="soud02:"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="1acjqt_">
            <div className="flex justify-between items-center mb-6" data-oid="v_4::y3">
                <div data-oid="exatmaf">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="jwcu2yg"
                    >
                        <span className="mr-1" data-oid="i3.xen8">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="-g24a_y">
                        {course ? course.title : 'Course'} Registrations
                    </h1>
                </div>
            </div>

            {registrations.length === 0 ? (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
                    data-oid="ahvxx2d"
                >
                    <p className="text-gray-400" data-oid="yhkxquc">
                        No registrations found for this course.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="7x:f:bd"
                >
                    <div className="overflow-x-auto" data-oid="vpq5ic4">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="rd:my9g">
                            <thead className="bg-gray-900" data-oid="omfwpfz">
                                <tr data-oid="_zk7q49">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="s7k6:h6"
                                    >
                                        Student Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="lqus_rd"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="qi3q6jq"
                                    >
                                        Enrolled At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="v00flt:"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid="0q5to-f"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="7i9fgf4"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="791kq4:"
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="2cvjvw9"
                                        >
                                            {new Date(
                                                registration.enrollmentDate,
                                            ).toLocaleDateString()}
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
