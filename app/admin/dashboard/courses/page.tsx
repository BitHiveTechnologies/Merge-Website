'use client';

import { adminApi } from '@/lib/adminApi';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Course {
    _id: string;
    title: string;
    level: string;
    description: string;
    price?: number;
    duration?: string;
    instructor?: string;
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await adminApi.courses.getAll();
                setCourses(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch courses');
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="5p6mkyd">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="isr6b86"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="lq-tl8u"
            >
                <p className="text-red-200" data-oid="vx47:12">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="s-6wk7x"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="0pvf0ci">
            <div className="flex justify-between items-center mb-6" data-oid="az5anwu">
                <h1 className="text-3xl font-bold" data-oid="0fxwql8">
                    Courses Management
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="6yhh6ae"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                data-oid="0d10rur"
            >
                <div className="overflow-x-auto" data-oid="lf9zd1c">
                    <table className="min-w-full divide-y divide-gray-700" data-oid="5-sm2w_">
                        <thead className="bg-gray-900" data-oid="_nzlii3">
                            <tr data-oid="edzpm9-">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="f:p81w6"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="je21lw."
                                >
                                    Level
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="jfoy6ax"
                                >
                                    Instructor
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="oglccqv"
                                >
                                    Price
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="pxvv19_"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700" data-oid="8q3uuxs">
                            {courses.length === 0 ? (
                                <tr data-oid="vef7zco">
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 text-center text-gray-400"
                                        data-oid="hcpv5uq"
                                    >
                                        No courses found
                                    </td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr
                                        key={course._id}
                                        className="hover:bg-gray-750"
                                        data-oid="6ye6ao."
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="fbhauqk"
                                        >
                                            {course.title}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="l9j0b:9"
                                        >
                                            {course.level}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="7m4v5i5"
                                        >
                                            {course.instructor || 'N/A'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="gz2z-bz"
                                        >
                                            {course.price ? `${course.price}` : 'Free'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="u3jftp."
                                        >
                                            <Link
                                                href={`/admin/dashboard/courses/${course._id}`}
                                                className="text-purple-400 hover:text-purple-300 transition-colors"
                                                data-oid="4q-emvz"
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
    );
}
