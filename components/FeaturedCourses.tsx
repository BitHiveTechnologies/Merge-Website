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
        <section className="py-20 px-6 md:px-12 bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
                        <p className="text-xl text-gray-300">
                            Start your learning journey with our top courses
                        </p>
                    </div>
                    <a
                        href="/courses"
                        className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        View All Courses →
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {isLoading ? (
                        // Loading state
                        Array(3)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse"
                                >
                                    <div className="h-48 bg-gray-700"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-700 rounded mb-4 w-3/4"></div>
                                        <div className="h-4 bg-gray-700 rounded mb-4 w-1/2"></div>
                                        <div className="h-4 bg-gray-700 rounded mb-6 w-full"></div>
                                        <div className="h-10 bg-gray-700 rounded w-full"></div>
                                    </div>
                                </div>
                            ))
                    ) : error ? (
                        // Error state
                        <div className="col-span-3 text-center py-8">
                            <p className="text-red-400 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
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
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold">{course.title}</h3>
                                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 rounded-full overflow-hidden mr-4">
                                            <img
                                                src={
                                                    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                                                }
                                                alt={course.instructor}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-gray-300">{course.instructor}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 mb-6">
                                        <span>{course.duration}</span>
                                        <span className="text-white font-medium">
                                            {formatPrice(course.price)}
                                        </span>
                                    </div>
                                    <button className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a
                        href="/courses"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        View All Courses →
                    </a>
                </div>
            </div>
        </section>
    );
}
