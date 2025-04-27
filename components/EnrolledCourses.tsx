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
        <div className="py-8 px-6 md:px-12 bg-black" data-oid="rgv.wbm">
            <div className="max-w-6xl mx-auto" data-oid="ljqo:ak">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="ks0-ca-">
                    Your Enrolled Courses
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20" data-oid="e6d7xww">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                            data-oid="z.3dhek"
                        ></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12" data-oid="-ucx2o7">
                        <p className="text-red-400 mb-4" data-oid=":bh6q3m">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                            data-oid="f9mjpyg"
                        >
                            Retry
                        </button>
                    </div>
                ) : enrollments.length === 0 ? (
                    <div
                        className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 p-8"
                        data-oid="v8nz_tt"
                    >
                        <h3 className="text-xl font-semibold text-gray-300 mb-4" data-oid="jpjyedv">
                            You haven't enrolled in any courses yet
                        </h3>
                        <p className="text-gray-400 mb-6" data-oid="a7on93c">
                            Explore our courses and start your learning journey today!
                        </p>
                        <button
                            onClick={() => router.push('/courses')}
                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="0sog31l"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="0iggvan">
                        {enrollments.map((enrollment) => (
                            <div
                                key={enrollment._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleCourseClick(enrollment.courseId._id)}
                                data-oid="dufm0et"
                            >
                                <div className="relative h-48 overflow-hidden" data-oid="fdcn4sc">
                                    <img
                                        src={enrollment.courseId?.image}
                                        alt={enrollment.courseId?.title}
                                        className="w-full h-full object-cover"
                                        data-oid="35s9fg5"
                                    />

                                    <div
                                        className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1"
                                        data-oid="1d0jrv_"
                                    >
                                        Enrolled
                                    </div>
                                </div>
                                <div className="p-6" data-oid="n:0_mzv">
                                    <div
                                        className="flex justify-between items-start mb-2"
                                        data-oid="1kg7meg"
                                    >
                                        <h3 className="text-xl font-semibold" data-oid="s3d:elq">
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
                                            data-oid="gmff9qy"
                                        >
                                            {enrollment.courseId.level}
                                        </span>
                                    </div>
                                    <p
                                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                                        data-oid="_ccm0eu"
                                    >
                                        {enrollment.courseId.description}
                                    </p>
                                    <div className="flex items-center mb-3" data-oid="l:loi05">
                                        <div
                                            className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                            data-oid="nc1t8th"
                                        ></div>
                                        <span className="text-gray-300 text-sm" data-oid="p:6kyzi">
                                            {enrollment.courseId.instructor}
                                        </span>
                                    </div>
                                    <button
                                        className="w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="n0:3yrb"
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
