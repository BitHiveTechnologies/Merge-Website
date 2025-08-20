'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL, cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import SalesBanner from '@/components/SalesBanner';

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

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
    const [levelFilter, setLevelFilter] = useState<
        'all' | 'Beginner' | 'Intermediate' | 'Advanced'
    >('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch courses from backend
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                // Build query parameters based on filters
                let url = `${BACKEND_URL}/api/courses`;
                const queryParams = [];

                if (levelFilter !== 'all') {
                    queryParams.push(`level=${levelFilter}`);
                }

                if (priceFilter === 'free') {
                    queryParams.push('price=0');
                }

                if (queryParams.length > 0) {
                    url += `?${queryParams.join('&')}`;
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }

                const coursesData = await response.json();

                setCourses(coursesData);
                setFilteredCourses(coursesData);
            } catch (error) {
                console.error('Error fetching courses:', error);
                // If API fails, you could set some fallback data or show an error message
                setCourses([]);
                setFilteredCourses([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [levelFilter, priceFilter]);

    // Apply search filter locally (since backend doesn't support search)
    useEffect(() => {
        let result = [...courses];

        // Apply search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (course) =>
                    course.title.toLowerCase().includes(query) ||
                    course.instructor.toLowerCase().includes(query) ||
                    course.description.toLowerCase().includes(query),
            );
        }

        setFilteredCourses(result);
    }, [courses, searchQuery]);

    // Navigate to course detail
    const handleCourseClick = (courseId: string) => {
        router.push(`/courses/${courseId}`);
    };

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
            <div className="flex items-center" data-oid="8jea_hw">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn(
                            'h-4 w-4',
                            i < fullStars
                                ? 'text-yellow-400'
                                : i === fullStars && hasHalfStar
                                  ? 'text-yellow-400'
                                  : 'text-gray-400',
                        )}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-oid="teg7a8s"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            data-oid="ll5ewfh"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300" data-oid="-gjho0b">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="jx5kc:a">
            <Navbar data-oid="g_2u-po" />
            <SalesBanner data-oid="kvk7g64" />
            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-32 md:pt-24 pb-16 md:pb-28 px-4 md:px-12 relative overflow-hidden"
                data-oid="wjxczpf"
            >
                {/* Background elements similar to main page */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="5bfnlbd"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="twi1gag"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="805ma0x"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10 py-4 md:py-8" data-oid="cuqg60g">
                    <h1
                        className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8"
                        data-oid="es6qgle"
                    >
                        Explore Our{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="_rsm2.g"
                        >
                            ourses
                        </span>
                    </h1>
                    <p
                        className="text-lg md:text-2xl text-gray-300 max-w-3xl mb-4 md:mb-6"
                        data-oid="o6_ipks"
                    >
                        Discover a Wide Range of Courses designed to help you master new skills and
                        advance your Career in Technology.
                    </p>
                    <div
                        className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4 md:mt-6 mb-6 md:mb-8"
                        data-oid=".do3ew4"
                    ></div>
                    <div className="flex flex-wrap gap-4 mt-8" data-oid="u.gujdy">
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="z69-jis"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="mgnu.8x"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="zfw.pao"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="6v.o5bo"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="9nn-33v"
                            >
                                Expert Instructors
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="0tjbxb8"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="i05f_j7"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="9ax54lj"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="intqcq1"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="vckyj8c"
                            >
                                Letter Of Recommendation
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="twr80uo"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="v2y-a7."
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="od7.23r"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="vwbumwc"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="ndbpe.f"
                            >
                                Certificate on Completion
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div
                className="bg-gray-900 py-4 md:py-8 px-4 md:px-12 border-b border-gray-800"
                data-oid="0m98:8m"
            >
                <div className="max-w-6xl mx-auto" data-oid="5dcfo6:">
                    <div
                        className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                        data-oid="x.6bmph"
                    >
                        <div
                            className="flex flex-col sm:flex-row gap-3 md:gap-4"
                            data-oid="fml1foi"
                        >
                            <div
                                className="flex items-center space-x-2 md:space-x-4"
                                data-oid="rqd8j0f"
                            >
                                <label
                                    className="text-gray-300 whitespace-nowrap text-sm md:text-base"
                                    data-oid="szo5dl3"
                                >
                                    Price:
                                </label>
                                <div className="flex space-x-1 md:space-x-2" data-oid="sk8arvj">
                                    <button
                                        onClick={() => setPriceFilter('all')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            priceFilter === 'all'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="2t_co_0"
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setPriceFilter('free')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            priceFilter === 'free'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="goi:fby"
                                    >
                                        Free
                                    </button>
                                    <button
                                        onClick={() => setPriceFilter('paid')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            priceFilter === 'paid'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="a:_e02u"
                                    >
                                        Paid
                                    </button>
                                </div>
                            </div>

                            <div
                                className="flex items-center space-x-2 md:space-x-4"
                                data-oid="gx2pdux"
                            >
                                <label
                                    className="text-gray-300 whitespace-nowrap text-sm md:text-base"
                                    data-oid="2pij30e"
                                >
                                    Level:
                                </label>
                                <div
                                    className="flex flex-wrap gap-1 md:space-x-2"
                                    data-oid="0o1-879"
                                >
                                    <button
                                        onClick={() => setLevelFilter('all')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            levelFilter === 'all'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="ix3ea8n"
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setLevelFilter('Beginner')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            levelFilter === 'Beginner'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="a4tflv0"
                                    >
                                        Beginner
                                    </button>
                                    <button
                                        onClick={() => setLevelFilter('Intermediate')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            levelFilter === 'Intermediate'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="27w7wo2"
                                    >
                                        Intermediate
                                    </button>
                                    <button
                                        onClick={() => setLevelFilter('Advanced')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            levelFilter === 'Advanced'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="c77krnu"
                                    >
                                        Advanced
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto" data-oid="uksxnzk">
                            <div className="relative" data-oid="-.sw-5a">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-64 px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-white text-sm md:text-base"
                                    data-oid="qax47yv"
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="fyvig:t"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid="z5:tphh"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Listings */}
            <div className="py-8 md:py-12 px-4 md:px-12 bg-black" data-oid="b91u9d6">
                <div className="max-w-6xl mx-auto" data-oid="kpsrwlk">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="--gvj_h">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="42-_s--"
                            ></div>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-20" data-oid="aq92fng">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="1xd.rgx"
                            >
                                No courses found
                            </h3>
                            <p className="text-gray-400" data-oid="p65rgdy">
                                Try adjusting your filters or search query
                            </p>
                        </div>
                    ) : (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            data-oid="8fewz:j"
                        >
                            {filteredCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleCourseClick(course._id)}
                                    data-oid="_gbtxhk"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden"
                                        data-oid="wlex-zh"
                                    >
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                            data-oid="xsi-o:l"
                                        />

                                        {course.isFeatured && (
                                            <div
                                                className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1"
                                                data-oid="elpysnr"
                                            >
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6" data-oid="1v1r3oz">
                                        <div
                                            className="flex justify-between items-start mb-2"
                                            data-oid="kbahkx7"
                                        >
                                            <h3
                                                className="text-xl font-semibold"
                                                data-oid="mf0cs94"
                                            >
                                                {course.title}
                                            </h3>
                                            <span
                                                className={cn(
                                                    'px-2 py-1 rounded text-xs font-medium',
                                                    course.level === 'Beginner'
                                                        ? 'bg-green-500/20 text-green-300'
                                                        : course.level === 'Intermediate'
                                                          ? 'bg-blue-500/20 text-blue-300'
                                                          : 'bg-purple-500/20 text-purple-300',
                                                )}
                                                data-oid="lth.ts:"
                                            >
                                                {course.level}
                                            </span>
                                        </div>
                                        <p
                                            className="text-gray-400 text-sm mb-4 line-clamp-2"
                                            data-oid="y9cg__d"
                                        >
                                            {course.description}
                                        </p>
                                        <div className="flex items-center mb-3" data-oid="69y7:0g">
                                            <div
                                                className="w-8 h-8 rounded-full overflow-hidden mr-4"
                                                data-oid="ksgqn.0"
                                            >
                                                <img
                                                    src={
                                                        'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                                                    }
                                                    alt={course.instructor}
                                                    className="w-full h-full object-cover"
                                                    data-oid="a6l5w_i"
                                                />
                                            </div>
                                            <span
                                                className="text-gray-300 text-sm"
                                                data-oid="va9_h28"
                                            >
                                                {course.instructor}
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between text-gray-400 text-sm mb-4"
                                            data-oid="-gtz0lc"
                                        >
                                            <span data-oid="wm8mahn">{course.duration}</span>
                                            {renderRating(course.rating)}
                                        </div>
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="dyn6an-"
                                        >
                                            <span
                                                className={cn(
                                                    'font-medium text-lg',
                                                    course.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white',
                                                )}
                                                data-oid="om4n:xm"
                                            >
                                                {formatPrice(course.price)}
                                            </span>
                                            <button
                                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium"
                                                data-oid="_5hfk6n"
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="3rasw45"
            >
                <div className="max-w-6xl mx-auto" data-oid="-ok6_69">
                    <div className="text-center text-gray-500" data-oid="0g8edj1">
                        <p data-oid="ly_-6.l">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
