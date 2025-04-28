'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/auth';
import { userApi } from '@/lib/api';

// Course type definition
interface Course {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    rating: number;
    price: number | 'Free';
    image: string;
    isFeatured?: boolean;
}

interface Enrollment {
    _id: string;
    userId: string;
    courseId: Course;
}

export default function EnrolledCourses() {
    const router = useRouter();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch enrolled courses from backend
    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            setIsLoading(true);
            try {
                const token = getAuthToken();
                if (!token) {
                    router.push('/login');
                    return;
                }

                const enrollmentsData = await userApi.getEnrollments();
                setEnrollments(enrollmentsData);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
                setError('Failed to load your enrolled courses. Please try again later.');
                setEnrollments([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [router]);

    // Navigate to course detail
    const handleCourseClick = (courseId: string) => {
        router.push(`/courses/${courseId}`);
    };

    return (
        <div className="py-8 px-6 md:px-12 bg-black" data-oid="8rknlu1">
            <div className="max-w-6xl mx-auto" data-oid="2.93jvs">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="yj6m3:n">
                    Your Enrolled Courses
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20" data-oid="cjmwlvn">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="ue_6848"
                        ></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12" data-oid="bbznzet">
                        <p className="text-red-400 mb-4" data-oid="fd2z5wg">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                            data-oid="n8:poa6"
                        >
                            Retry
                        </button>
                    </div>
                ) : enrollments.length === 0 ? (
                    <div
                        className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 p-8"
                        data-oid="36meal:"
                    >
                        <h3 className="text-xl font-semibold text-gray-300 mb-4" data-oid="xs3-eb5">
                            You haven't enrolled in any courses yet
                        </h3>
                        <p className="text-gray-400 mb-6" data-oid="b1b97n1">
                            Explore our courses and start your learning journey today!
                        </p>
                        <button
                            onClick={() => router.push('/courses')}
                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="jt-bzs5"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="egud5op">
                        {enrollments.map((enrollment) => (
                            <div
                                key={enrollment._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleCourseClick(enrollment.courseId._id)}
                                data-oid="tqmo55h"
                            >
                                <div className="relative h-48 overflow-hidden" data-oid="9.r:fpy">
                                    <img
                                        src={enrollment.courseId?.image}
                                        alt={enrollment.courseId?.title}
                                        className="w-full h-full object-cover"
                                        data-oid=":8ln7vs"
                                    />

                                    <div
                                        className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                        data-oid="lfs:f0s"
                                    >
                                        Enrolled
                                    </div>
                                </div>
                                <div className="p-6" data-oid="2tdk96s">
                                    <div
                                        className="flex justify-between items-start mb-2"
                                        data-oid="r9-cm.r"
                                    >
                                        <h3 className="text-xl font-semibold" data-oid="ur6molu">
                                            {enrollment.courseId?.title}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                enrollment.courseId.level === 'Beginner'
                                                    ? 'bg-green-500/20 text-green-300'
                                                    : enrollment.courseId.level === 'Intermediate'
                                                      ? 'bg-blue-500/20 text-blue-300'
                                                      : 'bg-purple-500/20 text-purple-300'
                                            }`}
                                            data-oid="-fh_h1w"
                                        >
                                            {enrollment.courseId.level}
                                        </span>
                                    </div>
                                    <p
                                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                                        data-oid="uktuysc"
                                    >
                                        {enrollment.courseId.description}
                                    </p>
                                    <div className="flex items-center mb-3" data-oid="n3ceyj2">
                                        <div
                                            className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                            data-oid="k5y54cz"
                                        ></div>
                                        <span className="text-gray-300 text-sm" data-oid="bg28khy">
                                            {enrollment.courseId.instructor}
                                        </span>
                                    </div>
                                    <button
                                        className="w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="j06pqfx"
                                    >
                                        Continue Learning
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
