'use client';

import Navbar from '@/components/Navbar';
import PaymentButton from '@/components/PaymentButton';
import { BACKEND_URL, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    curriculum?: {
        title: string;
        lessons: {
            title: string;
            content: string;
            duration: string;
            _id: string;
        }[];
        _id: string;
    }[];
}

interface Enrollment {
    _id: string;
    userId: string;
    courseId: Course;
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Check if user is enrolled in this course
    useEffect(() => {
        const checkEnrollment = async () => {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) return;

            try {
                const response = await fetch(`${BACKEND_URL}/api/courses/enrolled`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) return;

                const enrollments = await response.json();
                const enrolled = enrollments.some(
                    (enrollment: Enrollment) => enrollment.courseId._id === params.id,
                );

                setIsEnrolled(enrolled);
            } catch (error) {
                console.error('Error checking enrollment:', error);
            }
        };

        checkEnrollment();
    }, [params.id]);

    // Fetch course details from backend
    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BACKEND_URL}/api/courses/${params.id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch course details');
                }

                const courseData = await response.json();
                setCourse(courseData);
            } catch (error) {
                console.error('Error fetching course details:', error);
                setCourse(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [params.id]);

    // Format price for display
    const formatPrice = (price: number | 'Free') => {
        if (price === 'Free') return 'Free';
        return `₹${price.toLocaleString('en-IN')}`;
    };

    // Render star rating
    const renderRating = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn(
                            'h-5 w-5',
                            i < fullStars
                                ? 'text-yellow-400'
                                : i === fullStars && hasHalfStar
                                    ? 'text-yellow-400'
                                    : 'text-gray-400',
                        )}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300">{rating?.toFixed(1)}</span>
            </div>
        );
    };

    // Handle enrollment
    const handleEnroll = async () => {
        // Check if user is logged in by looking for auth token
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            // Redirect to login if not authenticated
            alert('Please log in to enroll in this course');
            router.push('/login');
            return;
        }

        if (course?.price === 'Free') {
            // For free courses, directly enroll
            try {
                const response = await fetch(`${BACKEND_URL}/api/courses/${params.id}/enroll`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to enroll');
                }

                const data = await response.json();
                alert(data.message || 'You have successfully enrolled in this course!');
            } catch (error) {
                console.error('Enrollment error:', error);
                alert('Failed to enroll. Please try again.');
            }
        } else {
            // For paid courses, show payment modal
            setShowPaymentModal(true);
        }
    };

    // Handle payment completion
    const handlePaymentComplete = async () => {
        // Check if user is logged in
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            alert('Please log in to complete your purchase');
            setShowPaymentModal(false);
            router.push('/login');
            return;
        }

        try {
            // Use the enroll endpoint after payment
            const response = await fetch(`${BACKEND_URL}/api/courses/${params.id}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.msg === 'Already enrolled') {
                    setIsEnrolled(true);
                    setShowPaymentModal(false);
                    alert('You are already enrolled in this course.');
                    return;
                }
                throw new Error('Enrollment failed');
            }

            const data = await response.json();
            setIsEnrolled(true);
            setShowPaymentModal(false);
            alert('Payment successful! You have enrolled in this course.');
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        }
    };

    // Handle back navigation
    const handleBack = () => {
        router.push('/courses');
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20">
            {/* Navbar - reusing from main page */}
            <Navbar />
            {/* Back Button */}
            <div className="bg-gray-900 py-4 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Courses
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : course ? (
                <>
                    {/* Course Hero Section */}
                    <div className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 md:px-12">
                        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                            <div className="rounded-xl overflow-hidden border border-gray-700">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex items-center mb-4">
                                    <span
                                        className={cn(
                                            'px-3 py-1 rounded-full text-sm font-medium mr-3',
                                            course.level === 'Beginner'
                                                ? 'bg-green-500/20 text-green-300'
                                                : course.level === 'Intermediate'
                                                    ? 'bg-blue-500/20 text-blue-300'
                                                    : 'bg-purple-500/20 text-purple-300',
                                        )}
                                    >
                                        {course.level}
                                    </span>
                                    <span className="text-gray-400">{course.duration}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    {course.title}
                                </h1>
                                <p className="text-gray-300 mb-6">{course.description}</p>
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-4">
                                        <img
                                            src={
                                                'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                            }
                                            alt={course.instructor}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Instructor</h3>
                                        <p className="text-gray-300">{course.instructor}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-8">
                                    {renderRating(course.rating)}
                                    <span className="ml-4 text-gray-400">
                                        ({Math.floor(Math.random() * 500) + 100} students)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="text-3xl font-bold">
                                        <span
                                            className={
                                                course.price === 'Free'
                                                    ? 'text-green-400'
                                                    : 'text-white'
                                            }
                                        >
                                            {formatPrice(course.price)}
                                        </span>
                                    </div>
                                    <button
                                        // onClick={handleEnroll}
                                        disabled={isEnrolled}
                                        className={`px-8 py-3 rounded-md ${isEnrolled
                                                ? 'bg-green-600 cursor-default'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
                                            } transition-colors font-medium`}
                                    >
                                        {isEnrolled ? 'Already Enrolled' : <PaymentButton
                                            itemId={course._id}
                                            title={course.title}
                                            amount={Number(course.price)}
                                            onSuccessRedirect="/courses"
                                        />
}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Curriculum */}
                    <div className="py-16 px-6 md:px-12 bg-black">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8">
                                Course Curriculum
                            </h2>
                            <div className="space-y-6">
                                {course.curriculum?.map((module) => (
                                    <div
                                        key={module._id}
                                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                                    >
                                        <div className="bg-gray-700 px-6 py-4">
                                            <h3 className="text-xl font-semibold">
                                                {module.title}
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <ul className="space-y-4">
                                                {module.lessons.map((lesson) => (
                                                    <li
                                                        key={lesson._id}
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex items-center">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mr-3 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">
                                                                    {lesson.title}
                                                                </span>
                                                                <p className="text-sm text-gray-400 mt-1">
                                                                    {lesson.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="text-gray-400 text-sm ml-4">
                                                            {lesson.duration}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Modal */}
                    {showPaymentModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                            <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">Complete Your Purchase</h3>
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span>Course Price</span>
                                        <span>{formatPrice(course.price)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Tax</span>
                                        <span>
                                            ₹
                                            {course.price !== 'Free'
                                                ? Math.floor(
                                                    Number(course.price) * 0.18,
                                                ).toLocaleString('en-IN')
                                                : 0}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-700 my-4"></div>
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>
                                            {course.price !== 'Free'
                                                ? `₹${Math.floor(Number(course.price) * 1.18).toLocaleString('en-IN')}`
                                                : 'Free'}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-gray-300">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="block text-gray-300">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-gray-300">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-gray-300">Name on Card</label>
                                        <input
                                            type="text"
                                            placeholder="John Smith"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePaymentComplete}
                                        className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                    >
                                        Pay {formatPrice(course.price)}
                                    </button>
                                    <div className="text-center text-gray-400 text-sm">
                                        Your payment is secure and encrypted
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-32">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
                        <p className="text-gray-400 mb-6">
                            The course you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                        >
                            Back to Courses
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Merge. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
