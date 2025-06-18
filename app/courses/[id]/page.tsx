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
            <div className="flex items-center" data-oid="0h2_82:">
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
                        data-oid="odjpsun"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            data-oid="bjiw1uv"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300" data-oid="u.m40fr">
                    {rating?.toFixed(1)}
                </span>
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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="mwfwrd3">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="oes88n." />
            {/* Back Button */}
            <div className="bg-gray-900 py-4 px-6 md:px-12" data-oid="x9p1r-s">
                <div className="max-w-6xl mx-auto" data-oid="qsff8fh">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                        data-oid="s4j9mmk"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="vktqwkv"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                data-oid="difj4vn"
                            />
                        </svg>
                        Back to Courses
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32" data-oid="f6088a.">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                        data-oid="rmulbd1"
                    ></div>
                </div>
            ) : course ? (
                <>
                    {/* Course Hero Section */}
                    <div
                        className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 md:px-12"
                        data-oid="bpwt5m4"
                    >
                        <div
                            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
                            data-oid="6x2ch.0"
                        >
                            <div
                                className="rounded-xl overflow-hidden border border-gray-700"
                                data-oid="gtfm14c"
                            >
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    data-oid="ny1qax9"
                                />
                            </div>
                            <div data-oid="xx2lwhy">
                                <div className="flex items-center mb-4" data-oid="r0:zmlx">
                                    <span
                                        className={cn(
                                            'px-3 py-1 rounded-full text-sm font-medium mr-3',
                                            course.level === 'Beginner'
                                                ? 'bg-green-500/20 text-green-300'
                                                : course.level === 'Intermediate'
                                                  ? 'bg-blue-500/20 text-blue-300'
                                                  : 'bg-purple-500/20 text-purple-300',
                                        )}
                                        data-oid="7cj6k72"
                                    >
                                        {course.level}
                                    </span>
                                    <span className="text-gray-400" data-oid="p:7m83j">
                                        {course.duration}
                                    </span>
                                </div>
                                <h1
                                    className="text-3xl md:text-4xl font-bold mb-4"
                                    data-oid="3lca5x6"
                                >
                                    {course.title}
                                </h1>
                                <p className="text-gray-300 mb-6" data-oid="4q3ugkl">
                                    {course.description}
                                </p>
                                <div className="flex items-center mb-6" data-oid="1o0s:he">
                                    <div
                                        className="w-8 h-8 rounded-full overflow-hidden mr-4"
                                        data-oid=":-y1dj."
                                    >
                                        <img
                                            src={
                                                'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                                            }
                                            alt={course.instructor}
                                            className="w-full h-full object-cover"
                                            data-oid="l0g1hyv"
                                        />
                                    </div>
                                    <div data-oid="7phmf11">
                                        <h3 className="font-medium" data-oid="6st2tu6">
                                            Instructor
                                        </h3>
                                        <p className="text-gray-300" data-oid="45a5r-5">
                                            {course.instructor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-8" data-oid="bt1ju4k">
                                    {renderRating(course.rating)}
                                </div>
                                <div
                                    className="flex items-center justify-between mb-6"
                                    data-oid="ubx_xpl"
                                >
                                    <div className="text-3xl font-bold" data-oid="ck:qz53">
                                        <span
                                            className={
                                                course.price === 'Free'
                                                    ? 'text-green-400'
                                                    : 'text-white'
                                            }
                                            data-oid="zidnb6m"
                                        >
                                            {formatPrice(course.price)}
                                        </span>
                                    </div>
                                    <button
                                        // onClick={handleEnroll}
                                        disabled={isEnrolled}
                                        className={`px-8 py-3 rounded-md ${
                                            isEnrolled
                                                ? 'bg-green-600 cursor-default'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
                                        } transition-colors font-medium`}
                                        data-oid="ajbu4-o"
                                    >
                                        {isEnrolled ? (
                                            'Already Enrolled'
                                        ) : (
                                            <PaymentButton
                                                itemId={course._id}
                                                title={course.title}
                                                amount={Number(course.price)}
                                                onSuccessRedirect={`/courses/${course._id}`}
                                                data-oid="pgkxyk2"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Curriculum */}
                    <div className="py-16 px-6 md:px-12 bg-black" data-oid="a_567.v">
                        <div className="max-w-6xl mx-auto" data-oid=".s_fmse">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="fgluifs">
                                Course Curriculum
                            </h2>
                            <div className="space-y-6" data-oid="bm04ppc">
                                {course.curriculum?.map((module) => (
                                    <div
                                        key={module._id}
                                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                                        data-oid="4b9241v"
                                    >
                                        <div className="bg-gray-700 px-6 py-4" data-oid="34b49iw">
                                            <h3
                                                className="text-xl font-semibold"
                                                data-oid="3bjepn4"
                                            >
                                                {module.title}
                                            </h3>
                                        </div>
                                        <div className="p-6" data-oid="21cjlhe">
                                            <ul className="space-y-4" data-oid="7od:kdk">
                                                {module.lessons.map((lesson) => (
                                                    <li
                                                        key={lesson._id}
                                                        className="flex justify-between items-center"
                                                        data-oid="_tq-jdc"
                                                    >
                                                        <div
                                                            className="flex items-center"
                                                            data-oid="x63skx4"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mr-3 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                data-oid="dav4f:w"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                    data-oid="l29ncw:"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    data-oid="nsfmxwc"
                                                                />
                                                            </svg>
                                                            <div
                                                                className="flex flex-col"
                                                                data-oid="jekqi9-"
                                                            >
                                                                <span
                                                                    className="font-medium"
                                                                    data-oid="64d3m5c"
                                                                >
                                                                    {lesson.title}
                                                                </span>
                                                                <p
                                                                    className="text-sm text-gray-400 mt-1"
                                                                    data-oid="3gmd.5m"
                                                                >
                                                                    {lesson.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className="text-gray-400 text-sm ml-4"
                                                            data-oid="otgn5ke"
                                                        >
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
                        <div
                            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                            data-oid="tqws6b4"
                        >
                            <div
                                className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700"
                                data-oid="qqb:_oi"
                            >
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="s24k9gk"
                                >
                                    <h3 className="text-xl font-bold" data-oid="a4nllkn">
                                        Complete Your Purchase
                                    </h3>
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="text-gray-400 hover:text-white"
                                        data-oid="iydji3l"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="0-bfuo4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                                data-oid="xl2iszv"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mb-6" data-oid="-x_q7rj">
                                    <div className="flex justify-between mb-2" data-oid="1nnebj8">
                                        <span data-oid="4.o3txt">Course Price</span>
                                        <span data-oid="vp5axiw">{formatPrice(course.price)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2" data-oid="07xl5m1">
                                        <span data-oid="ot:7ko5">Tax</span>
                                        <span data-oid="x72ytlf">
                                            ₹
                                            {course.price !== 'Free'
                                                ? Math.floor(
                                                      Number(course.price) * 0.18,
                                                  ).toLocaleString('en-IN')
                                                : 0}
                                        </span>
                                    </div>
                                    <div
                                        className="border-t border-gray-700 my-4"
                                        data-oid="95jdb40"
                                    ></div>
                                    <div
                                        className="flex justify-between font-bold"
                                        data-oid="9xo-w86"
                                    >
                                        <span data-oid="nasdxxu">Total</span>
                                        <span data-oid="vx2qysf">
                                            {course.price !== 'Free'
                                                ? `₹${Math.floor(Number(course.price) * 1.18).toLocaleString('en-IN')}`
                                                : 'Free'}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4" data-oid="iji:bf_">
                                    <div className="space-y-2" data-oid="9q-twbf">
                                        <label className="block text-gray-300" data-oid="3.jmfeg">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="kby-535"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4" data-oid="zvtyg1b">
                                        <div className="space-y-2" data-oid="gzrld3.">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="gmx9y_i"
                                            >
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid="-njgx33"
                                            />
                                        </div>
                                        <div className="space-y-2" data-oid="xe8x0yd">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="2w37r9r"
                                            >
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid="xz6nzou"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2" data-oid="p39xtcm">
                                        <label className="block text-gray-300" data-oid="aic8a8w">
                                            Name on Card
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Smith"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="2r8glhi"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePaymentComplete}
                                        className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="z.cuj91"
                                    >
                                        Pay {formatPrice(course.price)}
                                    </button>
                                    <div
                                        className="text-center text-gray-400 text-sm"
                                        data-oid="jsuz.7l"
                                    >
                                        Your payment is secure and encrypted
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-32" data-oid="y1hpqwn">
                    <div className="text-center" data-oid="0.ubqdg">
                        <h2 className="text-2xl font-bold mb-4" data-oid="62r29z5">
                            Course not found
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="zhflqim">
                            The course you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="-el4hwg"
                        >
                            Back to Courses
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="eyryo1k"
            >
                <div className="max-w-6xl mx-auto" data-oid="fylusej">
                    <div className="text-center text-gray-500" data-oid="639jys:">
                        <p data-oid="f--hmr.">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
