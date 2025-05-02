'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/utils';

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

export default function FeaturedCourses() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch featured courses from backend
    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BACKEND_URL}/api/courses/featured`);

                if (!response.ok) {
                    throw new Error('Failed to fetch featured courses');
                }

                const coursesData = await response.json();
                setCourses(coursesData);
            } catch (error) {
                console.error('Error fetching featured courses:', error);
                setError('Failed to load featured courses. Please try again later.');
                setCourses([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedCourses();
    }, []);

    // Navigate to course detail
    const handleCourseClick = (courseId: string) => {
        router.push(`/courses/${courseId}`);
    };

    // Format price for display
    const formatPrice = (price: number | 'Free') => {
        if (price === 'Free') return 'Free';
        return `₹${price.toLocaleString('en-IN')}`;
    };

    // Fallback data in case API fails
    const fallbackCourses = [
        {
            _id: '1',
            title: 'Full Stack Web Development',
            instructor: 'John Smith',
            duration: '12 weeks',
            level: 'Intermediate',
            price: 12999,
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
        {
            _id: '2',
            title: 'UI/UX Design Fundamentals',
            instructor: 'Maya Patel',
            duration: '8 weeks',
            level: 'Beginner',
            price: 8999,
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
        {
            _id: '3',
            title: 'Data Structures & Algorithms',
            instructor: 'David Lee',
            duration: '10 weeks',
            level: 'Advanced',
            price: 10999,
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
    ];

    return (
        <section className="py-20 px-6 md:px-12 bg-black" data-oid="lohbk.n">
            <div className="max-w-6xl mx-auto" data-oid="_4s6xd-">
                <div className="flex justify-between items-end mb-12" data-oid="xi.ko6d">
                    <div data-oid=":xjq146">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="l51r9l-">
                            Featured Courses
                        </h2>
                        <p className="text-xl text-gray-300" data-oid="6zm8l_e">
                            Start your learning journey with our top courses
                        </p>
                    </div>
                    <a
                        href="/courses"
                        className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                        data-oid="q70m0el"
                    >
                        View All Courses →
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8" data-oid="j8rixj.">
                    {isLoading ? (
                        // Loading state
                        Array(3)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse"
                                    data-oid="4.m19s7"
                                >
                                    <div className="h-48 bg-gray-700" data-oid="rwj192h"></div>
                                    <div className="p-6" data-oid="gf5f89u">
                                        <div
                                            className="h-6 bg-gray-700 rounded mb-4 w-3/4"
                                            data-oid="h:e7ye4"
                                        ></div>
                                        <div
                                            className="h-4 bg-gray-700 rounded mb-4 w-1/2"
                                            data-oid="kyp070l"
                                        ></div>
                                        <div
                                            className="h-4 bg-gray-700 rounded mb-6 w-full"
                                            data-oid="b:skjw9"
                                        ></div>
                                        <div
                                            className="h-10 bg-gray-700 rounded w-full"
                                            data-oid="hv2z4j3"
                                        ></div>
                                    </div>
                                </div>
                            ))
                    ) : error ? (
                        // Error state
                        <div className="col-span-3 text-center py-8" data-oid="rb:7z0x">
                            <p className="text-red-400 mb-4" data-oid="vtf1jey">
                                {error}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                                data-oid="0h7p6tz"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        // Data loaded successfully
                        (courses.length > 0 ? courses : fallbackCourses).map((course) => (
                            <div
                                key={course._id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleCourseClick(course._id)}
                                data-oid="yb:_2op"
                            >
                                <div className="h-48 overflow-hidden" data-oid="ed0movv">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                        data-oid="qsnlij-"
                                    />
                                </div>
                                <div className="p-6" data-oid="fo_oo9d">
                                    <div
                                        className="flex justify-between items-start mb-4"
                                        data-oid=".52_qao"
                                    >
                                        <h3 className="text-xl font-semibold" data-oid="4ni7gr0">
                                            {course.title}
                                        </h3>
                                        <span
                                            className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm"
                                            data-oid="a21lj.1"
                                        >
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-4" data-oid="ajzuiv5">
                                        <div
                                            className="w-8 h-8 rounded-full overflow-hidden mr-4"
                                            data-oid="1zj1w13"
                                        >
                                            <img
                                                src={
                                                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                }
                                                alt={course.instructor}
                                                className="w-full h-full object-cover"
                                                data-oid="-bv:f.5"
                                            />
                                        </div>
                                        <span className="text-gray-300" data-oid="lwi-5.a">
                                            {course.instructor}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between text-gray-400 mb-6"
                                        data-oid=":-wnhp7"
                                    >
                                        <span data-oid="qxs-aht">{course.duration}</span>
                                        <span className="text-white font-medium" data-oid="e7-2177">
                                            {formatPrice(course.price)}
                                        </span>
                                    </div>
                                    <button
                                        className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="lrgq3as"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8 text-center md:hidden" data-oid="r7hgvyj">
                    <a
                        href="/courses"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        data-oid="npsf6_j"
                    >
                        View All Courses →
                    </a>
                </div>
            </div>
        </section>
    );
}
