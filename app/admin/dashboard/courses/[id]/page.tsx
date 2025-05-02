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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="fzihl4c">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="-f0rxnp"
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                data-oid="fnr8mm2"
            >
                <p className="text-red-200" data-oid="2130mco">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                    data-oid="sf9:hsm"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div data-oid="iettntr">
            <div className="flex justify-between items-center mb-6" data-oid="tf8b:if">
                <div data-oid="k005h13">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="znvhp1n"
                    >
                        <span className="mr-1" data-oid="5ziorn7">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold" data-oid="x_7hu-2">
                        {course ? course.title : 'Course'} Registrations
                    </h1>
                </div>
            </div>

            {registrations.length === 0 ? (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center"
                    data-oid="ke-y7z_"
                >
                    <p className="text-gray-400" data-oid="gb8t:_6">
                        No registrations found for this course.
                    </p>
                </div>
            ) : (
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                    data-oid="7iabmfy"
                >
                    <div className="overflow-x-auto" data-oid="opby22z">
                        <table className="min-w-full divide-y divide-gray-700" data-oid="099sn3p">
                            <thead className="bg-gray-900" data-oid="bu_ci.l">
                                <tr data-oid="w57rlm-">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="n86:i52"
                                    >
                                        Student Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="x_go3c."
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        data-oid="uu_yu2a"
                                    >
                                        Enrolled At
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-gray-800 divide-y divide-gray-700"
                                data-oid="ojsf0kx"
                            >
                                {registrations.map((registration) => (
                                    <tr
                                        key={registration._id}
                                        className="hover:bg-gray-750"
                                        data-oid=":horr9m"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            data-oid="91os6o3"
                                        >
                                            {registration.userId.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="tzyw4m."
                                        >
                                            {registration.userId.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                            data-oid="ryc16f8"
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
