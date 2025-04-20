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
            <div className="flex items-center" data-oid="-pyvn58">
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
                        data-oid="_ymvhzq"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            data-oid="3p_vj-w"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300" data-oid="3i8p23u">
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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="q5foxwy">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="gt5:.91" />
            {/* Back Button */}
            <div className="bg-gray-900 py-4 px-6 md:px-12" data-oid="-1g1_14">
                <div className="max-w-6xl mx-auto" data-oid="c6x78-5">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                        data-oid="ji5xd-8"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="a0:46dq"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                data-oid="m6_f71b"
                            />
                        </svg>
                        Back to Courses
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32" data-oid="z-cx.-n">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                        data-oid="r:46zj6"
                    ></div>
                </div>
            ) : course ? (
                <>
                    {/* Course Hero Section */}
                    <div
                        className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 md:px-12"
                        data-oid="::1l8nh"
                    >
                        <div
                            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
                            data-oid="9ogce9s"
                        >
                            <div
                                className="rounded-xl overflow-hidden border border-gray-700"
                                data-oid="z8z0ufx"
                            >
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    data-oid="q7o:q:_"
                                />
                            </div>
                            <div data-oid="tex35rv">
                                <div className="flex items-center mb-4" data-oid=".03-cpz">
                                    <span
                                        className={cn(
                                            'px-3 py-1 rounded-full text-sm font-medium mr-3',
                                            course.level === 'Beginner'
                                                ? 'bg-green-500/20 text-green-300'
                                                : course.level === 'Intermediate'
                                                  ? 'bg-blue-500/20 text-blue-300'
                                                  : 'bg-purple-500/20 text-purple-300',
                                        )}
                                        data-oid="s9:c9.y"
                                    >
                                        {course.level}
                                    </span>
                                    <span className="text-gray-400" data-oid="g:z_t01">
                                        {course.duration}
                                    </span>
                                </div>
                                <h1
                                    className="text-3xl md:text-4xl font-bold mb-4"
                                    data-oid="zuzj_sz"
                                >
                                    {course.title}
                                </h1>
                                <p className="text-gray-300 mb-6" data-oid="xdl12gv">
                                    {course.description}
                                </p>
                                <div className="flex items-center mb-6" data-oid="r-78:8_">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gray-700 mr-4"
                                        data-oid="onr04ap"
                                    ></div>
                                    <div data-oid="r_-wgm7">
                                        <h3 className="font-medium" data-oid="timgm79">
                                            Instructor
                                        </h3>
                                        <p className="text-gray-300" data-oid="zae7vgt">
                                            {course.instructor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-8" data-oid="hjvt-r1">
                                    {renderRating(course.rating)}
                                    <span className="ml-4 text-gray-400" data-oid="pl3k760">
                                        ({Math.floor(Math.random() * 500) + 100} students)
                                    </span>
                                </div>
                                <div
                                    className="flex items-center justify-between mb-6"
                                    data-oid="cv4wjjj"
                                >
                                    <div className="text-3xl font-bold" data-oid="j8yyp30">
                                        <span
                                            className={
                                                course.price === 'Free'
                                                    ? 'text-green-400'
                                                    : 'text-white'
                                            }
                                            data-oid="1bv84im"
                                        >
                                            {formatPrice(course.price)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleEnroll}
                                        className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="4dwf4zr"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Curriculum */}
                    <div className="py-16 px-6 md:px-12 bg-black" data-oid="0cmbiqz">
                        <div className="max-w-6xl mx-auto" data-oid="s00.raf">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8" data-oid="oe77mwv">
                                Course Curriculum
                            </h2>
                            <div className="space-y-6" data-oid="8qld_1p">
                                {course.curriculum?.map((section, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                                        data-oid=".-3m2x7"
                                    >
                                        <div className="bg-gray-700 px-6 py-4" data-oid="04c2uq8">
                                            <h3
                                                className="text-xl font-semibold"
                                                data-oid="4pw3yue"
                                            >
                                                {section.section}
                                            </h3>
                                        </div>
                                        <div className="p-6" data-oid="coepj.5">
                                            <ul className="space-y-4" data-oid="xgqte45">
                                                {section.lessons.map((lesson, lessonIndex) => (
                                                    <li
                                                        key={lessonIndex}
                                                        className="flex justify-between items-center"
                                                        data-oid="l0cs10z"
                                                    >
                                                        <div
                                                            className="flex items-center"
                                                            data-oid="gwb3bvl"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mr-3 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                data-oid="ufus3kv"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                    data-oid="0ik5.ph"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    data-oid="4am24sr"
                                                                />
                                                            </svg>
                                                            <span data-oid=":i_:sc6">
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        <span
                                                            className="text-gray-400 text-sm"
                                                            data-oid="2u0snzg"
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
                            data-oid="q54wrm9"
                        >
                            <div
                                className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700"
                                data-oid="-fuc7b7"
                            >
                                <div
                                    className="flex justify-between items-center mb-6"
                                    data-oid="d8l4tws"
                                >
                                    <h3 className="text-xl font-bold" data-oid="2cs.toi">
                                        Complete Your Purchase
                                    </h3>
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="text-gray-400 hover:text-white"
                                        data-oid="7q91h.4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="-1:ikeo"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                                data-oid="-x5-1.y"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mb-6" data-oid="l:5iksz">
                                    <div className="flex justify-between mb-2" data-oid="qdrj32u">
                                        <span data-oid="f_idlhg">Course Price</span>
                                        <span data-oid=".yrl:no">{formatPrice(course.price)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2" data-oid="_119u75">
                                        <span data-oid="ojiqti1">Tax</span>
                                        <span data-oid="-189r6f">
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
                                        data-oid="44zl:ds"
                                    ></div>
                                    <div
                                        className="flex justify-between font-bold"
                                        data-oid="y4adme5"
                                    >
                                        <span data-oid="l5z9v3_">Total</span>
                                        <span data-oid="sd-.76:">
                                            {course.price !== 'Free'
                                                ? `₹${Math.floor(Number(course.price) * 1.18).toLocaleString('en-IN')}`
                                                : 'Free'}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4" data-oid="omznucq">
                                    <div className="space-y-2" data-oid="o_ewkc9">
                                        <label className="block text-gray-300" data-oid="6igwq9i">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="61bm2cz"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4" data-oid="tdoj0ix">
                                        <div className="space-y-2" data-oid="mw0sb90">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="kwcra0g"
                                            >
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid="se6b5.5"
                                            />
                                        </div>
                                        <div className="space-y-2" data-oid="z9k-2gm">
                                            <label
                                                className="block text-gray-300"
                                                data-oid="9mnmn.3"
                                            >
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                                data-oid="yh5c7uk"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2" data-oid="13kys1a">
                                        <label className="block text-gray-300" data-oid="sb0bx_r">
                                            Name on Card
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Smith"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                                            data-oid="4rmko7u"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePaymentComplete}
                                        className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="-z.ar6p"
                                    >
                                        Pay {formatPrice(course.price)}
                                    </button>
                                    <div
                                        className="text-center text-gray-400 text-sm"
                                        data-oid="0bwf_bt"
                                    >
                                        Your payment is secure and encrypted
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-32" data-oid="jvysnp8">
                    <div className="text-center" data-oid="eat9_mn">
                        <h2 className="text-2xl font-bold mb-4" data-oid="j52ghnr">
                            Course not found
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="k3cym26">
                            The course you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="qi80mtz"
                        >
                            Back to Courses
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="1.__sfg"
            >
                <div className="max-w-6xl mx-auto" data-oid="nv8ob9.">
                    <div className="text-center text-gray-500" data-oid="n-woa33">
                        <p data-oid="ex:y8b2">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
