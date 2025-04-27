'use client';

import Navbar from '@/components/Navbar';
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
            <div className="flex items-center" data-oid="gcyrdzs">
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
                        data-oid="3ean9iq"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            data-oid="48e3iio"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300" data-oid="xc8-7ri">
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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="wt:9yzq">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="29cxzxn" />
            {/* Back Button */}
            <div className="bg-gray-900 py-4 px-6 md:px-12" data-oid="5to3lvk">
                <div className="max-w-6xl mx-auto" data-oid="9vkud63">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                        data-oid="o6ezgr2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="anpqj0s"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                data-oid="vvqs4de"
                            />
                        </svg>
                        Back to Courses
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32" data-oid="8i9-hcz">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                        data-oid="zt27sb6"
                    ></div>
                </div>
            ) : course ? (
                <>
                    {/* Course Hero Section */}
                    <div
                        className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 md:px-12"
                        data-oid="omjou8x"
                    >
                        <div
                            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
                            data-oid="c7dmeuk"
                        >
                            <div
                                className="rounded-xl overflow-hidden border border-gray-700"
                                data-oid="k52zlti"
                            >
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    data-oid="uu4x5gr"
                                />
                            </div>
                            <div data-oid="y684rfd">
                                <div className="flex items-center mb-4" data-oid="2z2iqtl">
                                    <span
                                        className={cn(
                                            'px-3 py-1 rounded-full text-sm font-medium mr-3',
                                            course.level === 'Beginner'
                                                ? 'bg-green-500/20 text-green-300'
                                                : course.level === 'Intermediate'
                                                  ? 'bg-blue-500/20 text-blue-300'
                                                  : 'bg-purple-500/20 text-purple-300',
                                        )}
                                        data-oid="0_:1tus"
                                    >
                                        {course.level}
                                    </span>
                                    <span className="text-gray-400" data-oid="klu2:c3">
                                        {course.duration}
                                    </span>
                                </div>
                                <h1
                                    className="text-3xl md:text-4xl font-bold mb-4"
                                    data-oid="54brp47"
                                >
                                    {course.title}
                                </h1>
                                <p className="text-gray-300 mb-6" data-oid="y82vcht">
                                    {course.description}
                                </p>
                                <div className="flex items-center mb-6" data-oid=":2-oisb">
                                    <div
                                        className="w-8 h-8 rounded-full overflow-hidden mr-4"
                                        data-oid="1h2x0:5"
                                    >
                                        <img
                                            src={
                                                'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                            }
                                            alt={course.instructor}
                                            className="w-full h-full object-cover"
                                            data-oid="f6m0sp4"
                                        />
                                    </div>
                                    <div data-oid="a:_dw8:">
                                        <h3 className="font-medium" data-oid=":rdi2r4">
                                            Instructor
                                        </h3>
                                        <p className="text-gray-300" data-oid="cp6bga1">
                                            {course.instructor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-8" data-oid="0ry2:kn">
                                    {renderRating(course.rating)}
                                    <span className="ml-4 text-gray-400" data-oid="ot4wipe">
                                        ({Math.floor(Math.random() * 500) + 100} students)
                                    </span>
                                </div>
                                <div
                                    className="flex items-center justify-between mb-6"
                                    data-oid="uai4m_9"
                                >
                                    <div className="text-3xl font-bold" data-oid="zs7slp9">
                                        <span
                                            className={
                                                course.price === 'Free'
                                                    ? 'text-green-400'
                                                    : 'text-white'
                                            }
                                            data-oid="ljky:2-"
                                        >
                                            {formatPrice(course.price)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleEnroll}
                                        disabled={isEnrolled}
                                        className={`px-8 py-3 rounded-md ${
                                            isEnrolled
                                                ? 'bg-green-600 cursor-default'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
                                        } transition-colors font-medium`}
                                        data-oid="d_2ul9i"
                                    >
                                        {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Curriculum */}
                    <div className="py-16 px-6 md:px-12 bg-black" data-oid="j34te1k">
                        <div className="max-w-6xl mx-auto" data-oid="e_vpyuy">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="w1a-vik">
                                Course Curriculum
                            </h2>
                            <div className="space-y-6" data-oid="9a7leaq">
                                {course.curriculum?.map((module) => (
                                    <div
                                        key={module._id}
                                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                                        data-oid="2v_qzk8"
                                    >
                                        <div className="bg-gray-700 px-6 py-4" data-oid="1rxl8hz">
                                            <h3
                                                className="text-xl font-semibold"
                                                data-oid="qx68gfm"
                                            >
                                                {module.title}
                                            </h3>
                                        </div>
                                        <div className="p-6" data-oid="e1rsbu-">
                                            <ul className="space-y-4" data-oid="3gshek4">
                                                {module.lessons.map((lesson) => (
                                                    <li
                                                        key={lesson._id}
                                                        className="flex justify-between items-center"
                                                        data-oid="i-krc07"
                                                    >
                                                        <div
                                                            className="flex items-center"
                                                            data-oid="jv00ebt"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mr-3 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                data-oid="fdl:yn7"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                    data-oid="2qvxzmk"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    data-oid="_t15vu3"
                                                                />
                                                            </svg>
                                                            <div
                                                                className="flex flex-col"
                                                                data-oid="li8_r5_"
                                                            >
                                                                <span
                                                                    className="font-medium"
                                                                    data-oid="e:gerck"
                                                                >
                                                                    {lesson.title}
                                                                </span>
                                                                <p
                                                                    className="text-sm text-gray-400 mt-1"
                                                                    data-oid="fdt4voz"
                                                                >
                                                                    {lesson.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className="text-gray-400 text-sm ml-4"
                                                            data-oid="6xpmu:x"
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
                            data-oid="v-ory2k"
                        >
                            <div
                                className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700"
                                data-oid="y0gobs:"
                            >
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="b_gr-lq"
                                >
                                    <h3 className="text-xl font-bold" data-oid="kcfnb.i">
                                        Complete Your Purchase
                                    </h3>
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="text-gray-400 hover:text-white"
                                        data-oid="zg--s3w"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="k5i68kz"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                                data-oid="wa3sl3p"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mb-6" data-oid="np0fs--">
                                    <div className="flex justify-between mb-2" data-oid="dzop7xf">
                                        <span data-oid="6g8o-uj">Course Price</span>
                                        <span data-oid="3qd60e8">{formatPrice(course.price)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2" data-oid="ij1a1zy">
                                        <span data-oid="6pxa_4p">Tax</span>
                                        <span data-oid="tcda.9s">
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
                                        data-oid="f932xri"
                                    ></div>
                                    <div
                                        className="flex justify-between font-bold"
                                        data-oid="2r1hn0w"
                                    >
                                        <span data-oid="ozkux8q">Total</span>
                                        <span data-oid="uez.xwq">
                                            {course.price !== 'Free'
                                                ? `₹${Math.floor(Number(course.price) * 1.18).toLocaleString('en-IN')}`
                                                : 'Free'}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4" data-oid="1orslcb">
                                    <div className="space-y-2" data-oid=":74nx2z">
                                        <label className="block text-gray-300" data-oid="e2-j_uo">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="3sk:ctf"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4" data-oid="fu307bq">
                                        <div className="space-y-2" data-oid="0jma4sv">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="c49aa2e"
                                            >
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid="f8qv:uj"
                                            />
                                        </div>
                                        <div className="space-y-2" data-oid="qjdkwyq">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="h6ixbwn"
                                            >
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid="lfu0xc3"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2" data-oid="zqcnlc8">
                                        <label className="block text-gray-300" data-oid="_2rxwkv">
                                            Name on Card
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Smith"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="91r0wn."
                                        />
                                    </div>
                                    <button
                                        onClick={handlePaymentComplete}
                                        className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="97u-eph"
                                    >
                                        Pay {formatPrice(course.price)}
                                    </button>
                                    <div
                                        className="text-center text-gray-400 text-sm"
                                        data-oid="e2zuagb"
                                    >
                                        Your payment is secure and encrypted
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-32" data-oid="zxpvcmm">
                    <div className="text-center" data-oid="417ni.q">
                        <h2 className="text-2xl font-bold mb-4" data-oid="eh9ofie">
                            Course not found
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="0-yfjc9">
                            The course you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="-5qu.4:"
                        >
                            Back to Courses
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="m5x12ku"
            >
                <div className="max-w-6xl mx-auto" data-oid="whtrcnk">
                    <div className="text-center text-gray-500" data-oid="ymktgnf">
                        <p data-oid="5sd1oyw">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
