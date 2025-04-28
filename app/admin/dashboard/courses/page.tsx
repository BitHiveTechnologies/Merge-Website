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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="evh6ca5">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="mw2v3ym"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="su0qsc9"
            >
                <p className="text-red-200" data-oid="i6_29qk">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="v9tl-6i"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="lq491cn">
            <div className="flex justify-between items-center mb-6" data-oid="f604hvg">
                <h1 className="text-3xl font-bold" data-oid="1gwty0m">
                    Courses Management
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="597f0mz"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                data-oid="ojmtpbz"
            >
                <div className="overflow-x-auto" data-oid="kpsf7nr">
                    <table className="min-w-full divide-y divide-gray-700" data-oid="7xk4to2">
                        <thead className="bg-gray-900" data-oid="y28f6-.">
                            <tr data-oid="4eu436m">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="s6n:mfj"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="bfpkrzy"
                                >
                                    Level
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="tec1yrg"
                                >
                                    Instructor
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="qs6d19f"
                                >
                                    Price
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    data-oid="6c6vx7r"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700" data-oid=":z_lhs6">
                            {courses.length === 0 ? (
                                <tr data-oid="vrbvvvp">
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 text-center text-gray-400"
                                        data-oid="fpr02tn"
                                    >
                                        No courses found
                                    </td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr
                                        key={course._id}
                                        className="hover:bg-gray-750"
                                        data-oid="2aycyk8"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="eprjprc"
                                        >
                                            {course.title}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="d.595o5"
                                        >
                                            {course.level}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="wei3zwz"
                                        >
                                            {course.instructor || 'N/A'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="r2-t-30"
                                        >
                                            {course.price ? `${course.price}` : 'Free'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="wasntvy"
                                        >
                                            <Link
                                                href={`/admin/dashboard/courses/${course._id}`}
                                                className="text-purple-400 hover:text-purple-300 transition-colors"
                                                data-oid="wjm8qii"
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
