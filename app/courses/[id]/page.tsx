'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';

// Course type definition
interface Course {
    id: number;
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
        section: string;
        lessons: {
            title: string;
            duration: string;
        }[];
    }[];
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Fetch course details (simulated)
    useEffect(() => {
        const fetchCourse = () => {
            setIsLoading(true);
            // In a real app, this would be an API call
            setTimeout(() => {
                // Simulated API response
                const courseData: Course = {
                    id: parseInt(params.id),
                    title: 'Full Stack Web Development',
                    description:
                        'Learn to build complete web applications from front to back end using modern technologies like React, Node.js, and MongoDB. This comprehensive course covers everything you need to know to become a proficient full stack developer, from basic HTML/CSS to advanced React patterns and server-side rendering.',
                    instructor: 'John Smith',
                    duration: '12 weeks',
                    level: 'Intermediate',
                    rating: 4.8,
                    price: params.id === '4' || params.id === '7' ? 'Free' : 12999,
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    curriculum: [
                        {
                            section: 'Getting Started',
                            lessons: [
                                { title: 'Course Introduction', duration: '10 min' },
                                {
                                    title: 'Setting Up Your Development Environment',
                                    duration: '25 min',
                                },
                                { title: 'Web Development Overview', duration: '15 min' },
                            ],
                        },
                        {
                            section: 'Frontend Fundamentals',
                            lessons: [
                                { title: 'HTML5 Essentials', duration: '45 min' },
                                { title: 'CSS3 and Responsive Design', duration: '60 min' },
                                { title: 'JavaScript Basics', duration: '90 min' },
                                { title: 'DOM Manipulation', duration: '60 min' },
                            ],
                        },
                        {
                            section: 'React Framework',
                            lessons: [
                                { title: 'React Fundamentals', duration: '75 min' },
                                { title: 'Components and Props', duration: '60 min' },
                                { title: 'State Management', duration: '90 min' },
                                { title: 'Hooks in Depth', duration: '120 min' },
                                { title: 'Routing with React Router', duration: '45 min' },
                            ],
                        },
                        {
                            section: 'Backend Development',
                            lessons: [
                                { title: 'Node.js Fundamentals', duration: '60 min' },
                                { title: 'Express.js Framework', duration: '75 min' },
                                { title: 'RESTful API Design', duration: '90 min' },
                                { title: 'MongoDB and Mongoose', duration: '120 min' },
                                { title: 'Authentication and Authorization', duration: '90 min' },
                            ],
                        },
                        {
                            section: 'Full Stack Integration',
                            lessons: [
                                { title: 'Connecting Frontend to Backend', duration: '60 min' },
                                {
                                    title: 'State Management with Context API and Redux',
                                    duration: '120 min',
                                },
                                { title: 'Deployment Strategies', duration: '45 min' },
                                { title: 'Testing and Debugging', duration: '90 min' },
                                { title: 'Final Project', duration: '180 min' },
                            ],
                        },
                    ],
                };

                setCourse(courseData);
                setIsLoading(false);
            }, 800);
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
            <div className="flex items-center" data-oid="4w8t:dp">
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
                        data-oid=":pbkbld"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            data-oid="c_dbque"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300" data-oid="q:xtnu-">
                    {rating?.toFixed(1)}
                </span>
            </div>
        );
    };

    // Handle enrollment
    const handleEnroll = () => {
        if (course?.price === 'Free') {
            // For free courses, directly enroll
            alert('You have successfully enrolled in this course!');
        } else {
            // For paid courses, show payment modal
            setShowPaymentModal(true);
        }
    };

    // Handle payment completion
    const handlePaymentComplete = () => {
        setShowPaymentModal(false);
        alert('Payment successful! You have enrolled in this course.');
    };

    // Handle back navigation
    const handleBack = () => {
        router.push('/courses');
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="q1a1:s1">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="o2.e:ae" />
            {/* Back Button */}
            <div className="bg-gray-900 py-4 px-6 md:px-12" data-oid="4sh79a4">
                <div className="max-w-6xl mx-auto" data-oid="cl:wmcx">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                        data-oid="tejxvsn"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="knd5bys"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                data-oid="guyqa-v"
                            />
                        </svg>
                        Back to Courses
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32" data-oid="r-aergm">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                        data-oid="irg1:z-"
                    ></div>
                </div>
            ) : course ? (
                <>
                    {/* Course Hero Section */}
                    <div
                        className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 md:px-12"
                        data-oid="oboehb9"
                    >
                        <div
                            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
                            data-oid="0xm7pdz"
                        >
                            <div
                                className="rounded-xl overflow-hidden border border-gray-700"
                                data-oid="z62c7vw"
                            >
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    data-oid="84bftw4"
                                />
                            </div>
                            <div data-oid="_4nm14k">
                                <div className="flex items-center mb-4" data-oid=":6wpa2v">
                                    <span
                                        className={cn(
                                            'px-3 py-1 rounded-full text-sm font-medium mr-3',
                                            course.level === 'Beginner'
                                                ? 'bg-green-500/20 text-green-300'
                                                : course.level === 'Intermediate'
                                                  ? 'bg-blue-500/20 text-blue-300'
                                                  : 'bg-purple-500/20 text-purple-300',
                                        )}
                                        data-oid="8v-a8h:"
                                    >
                                        {course.level}
                                    </span>
                                    <span className="text-gray-400" data-oid=".n63boh">
                                        {course.duration}
                                    </span>
                                </div>
                                <h1
                                    className="text-3xl md:text-4xl font-bold mb-4"
                                    data-oid="n-2.zzi"
                                >
                                    {course.title}
                                </h1>
                                <p className="text-gray-300 mb-6" data-oid=":5j_6v1">
                                    {course.description}
                                </p>
                                <div className="flex items-center mb-6" data-oid="t_nhfoe">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gray-700 mr-4"
                                        data-oid="l2:x0oa"
                                    ></div>
                                    <div data-oid="0q0:_km">
                                        <h3 className="font-medium" data-oid="80_j:6y">
                                            Instructor
                                        </h3>
                                        <p className="text-gray-300" data-oid="tha6lbo">
                                            {course.instructor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-8" data-oid="x-w8z5-">
                                    {renderRating(course.rating)}
                                    <span className="ml-4 text-gray-400" data-oid="801l90o">
                                        ({Math.floor(Math.random() * 500) + 100} students)
                                    </span>
                                </div>
                                <div
                                    className="flex items-center justify-between mb-6"
                                    data-oid="ps3n731"
                                >
                                    <div className="text-3xl font-bold" data-oid="bibwod1">
                                        <span
                                            className={
                                                course.price === 'Free'
                                                    ? 'text-green-400'
                                                    : 'text-white'
                                            }
                                            data-oid="mwq:p2w"
                                        >
                                            {formatPrice(course.price)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleEnroll}
                                        className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="2xoqxs1"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Curriculum */}
                    <div className="py-16 px-6 md:px-12 bg-black" data-oid="8-nqurz">
                        <div className="max-w-6xl mx-auto" data-oid="17f2qaw">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="lhbef89">
                                Course Curriculum
                            </h2>
                            <div className="space-y-6" data-oid="1:q-k-3">
                                {course.curriculum?.map((section, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                                        data-oid="yl9wi8a"
                                    >
                                        <div className="bg-gray-700 px-6 py-4" data-oid="i6tg.0w">
                                            <h3
                                                className="text-xl font-semibold"
                                                data-oid="p7j29zw"
                                            >
                                                {section.section}
                                            </h3>
                                        </div>
                                        <div className="p-6" data-oid="yr7nbr2">
                                            <ul className="space-y-4" data-oid="h309bkc">
                                                {section.lessons.map((lesson, lessonIndex) => (
                                                    <li
                                                        key={lessonIndex}
                                                        className="flex justify-between items-center"
                                                        data-oid="0q-553e"
                                                    >
                                                        <div
                                                            className="flex items-center"
                                                            data-oid="uspxxpe"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mr-3 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                data-oid="chnbifl"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                    data-oid="hicf5tb"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    data-oid="jyuynlq"
                                                                />
                                                            </svg>
                                                            <span data-oid=":urfhvs">
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        <span
                                                            className="text-gray-400 text-sm"
                                                            data-oid="f365n2q"
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
                            data-oid="qz5pmqc"
                        >
                            <div
                                className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700"
                                data-oid="k:zbwi1"
                            >
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="ja4sfyc"
                                >
                                    <h3 className="text-xl font-bold" data-oid="ilqbmaf">
                                        Complete Your Purchase
                                    </h3>
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="text-gray-400 hover:text-white"
                                        data-oid="g9a_xw1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="piibl24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                                data-oid="x1wqbem"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mb-6" data-oid="v1wt2ta">
                                    <div className="flex justify-between mb-2" data-oid="w6yd0rg">
                                        <span data-oid="yrhz_27">Course Price</span>
                                        <span data-oid=".nfxo0b">{formatPrice(course.price)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2" data-oid=":293u37">
                                        <span data-oid="hobtte9">Tax</span>
                                        <span data-oid="jhnhicc">
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
                                        data-oid="qnubb57"
                                    ></div>
                                    <div
                                        className="flex justify-between font-bold"
                                        data-oid="obz6-bc"
                                    >
                                        <span data-oid="od5k4-q">Total</span>
                                        <span data-oid="l0c6le1">
                                            {course.price !== 'Free'
                                                ? `₹${Math.floor(Number(course.price) * 1.18).toLocaleString('en-IN')}`
                                                : 'Free'}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4" data-oid="qivbick">
                                    <div className="space-y-2" data-oid="8atskmq">
                                        <label className="block text-gray-300" data-oid="1czre.p">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="u6psny1"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4" data-oid="eia6h81">
                                        <div className="space-y-2" data-oid="ai4:7g8">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="b646glk"
                                            >
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid="wkvbwt."
                                            />
                                        </div>
                                        <div className="space-y-2" data-oid="sk52psp">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="9efht1t"
                                            >
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid=":u97if2"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2" data-oid="ypzok0u">
                                        <label className="block text-gray-300" data-oid="_qhxray">
                                            Name on Card
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Smith"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="jb_-prw"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePaymentComplete}
                                        className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="e0stzta"
                                    >
                                        Pay {formatPrice(course.price)}
                                    </button>
                                    <div
                                        className="text-center text-gray-400 text-sm"
                                        data-oid="izpefg1"
                                    >
                                        Your payment is secure and encrypted
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-32" data-oid="_y3f5ty">
                    <div className="text-center" data-oid="9e1fo.d">
                        <h2 className="text-2xl font-bold mb-4" data-oid="y165y77">
                            Course not found
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="98qadup">
                            The course you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="qigkq6y"
                        >
                            Back to Courses
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="l5n4cx8"
            >
                <div className="max-w-6xl mx-auto" data-oid="5t62wdd">
                    <div className="text-center text-gray-500" data-oid="r8gmfat">
                        <p data-oid="z6w5ywq">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
