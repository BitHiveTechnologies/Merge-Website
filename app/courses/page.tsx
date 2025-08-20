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
    instructorImg?: string;
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
            <div className="flex items-center" data-oid="9aw:jke">
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
                        data-oid="4_2z8:v"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            data-oid="_j45cju"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300" data-oid="-s7r4-i">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid=":vmcv2g">
            <Navbar data-oid="b74ihj." />
            <SalesBanner data-oid="61rcr5a" />
            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-32 md:pt-24 pb-16 md:pb-28 px-4 md:px-12 relative overflow-hidden"
                data-oid="xq102n_"
            >
                {/* Background elements similar to main page */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="sr5oa8:"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="b9fp9as"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="htb979v"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10 py-4 md:py-8" data-oid="e75:7ws">
                    <h1
                        className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8"
                        data-oid="f6042yc"
                    >
                        Explore Our{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="uk-brq."
                        >
                            ourses
                        </span>
                    </h1>
                    <p
                        className="text-lg md:text-2xl text-gray-300 max-w-3xl mb-4 md:mb-6"
                        data-oid="h987p7r"
                    >
                        Discover a Wide Range of Courses designed to help you master new skills and
                        advance your Career in Technology.
                    </p>
                    <div
                        className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4 md:mt-6 mb-6 md:mb-8"
                        data-oid="kt6faqp"
                    ></div>
                    <div className="flex flex-wrap gap-4 mt-8" data-oid="mxb4fsi">
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="a1q:hxp"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="0q24i57"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="pr52oe4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="azzv_no"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="m:b-3p4"
                            >
                                Expert Instructors
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid=".x0c.km"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="p6nxk7a"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="shhy2qh"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid=".apdv5l"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="8cepm2o"
                            >
                                Letter Of Recommendation
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="y56cdu3"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="3cpdupu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="i8-6f-l"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="tokczdm"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="6:.77ho"
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
                data-oid="6wsqu.h"
            >
                <div className="max-w-6xl mx-auto" data-oid="2xkip8t">
                    <div
                        className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                        data-oid="jrhb2pu"
                    >
                        <div
                            className="flex flex-col sm:flex-row gap-3 md:gap-4"
                            data-oid="nnc-z-_"
                        >
                            <div
                                className="flex items-center space-x-2 md:space-x-4"
                                data-oid="jhb2t5j"
                            >
                                <label
                                    className="text-gray-300 whitespace-nowrap text-sm md:text-base"
                                    data-oid="ghlyg2o"
                                >
                                    Price:
                                </label>
                                <div className="flex space-x-1 md:space-x-2" data-oid=".v8f791">
                                    <button
                                        onClick={() => setPriceFilter('all')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            priceFilter === 'all'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="glrz3kl"
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
                                        data-oid="_viu1qb"
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
                                        data-oid="2g:i7cf"
                                    >
                                        Paid
                                    </button>
                                </div>
                            </div>

                            <div
                                className="flex items-center space-x-2 md:space-x-4"
                                data-oid="1vrgn0:"
                            >
                                <label
                                    className="text-gray-300 whitespace-nowrap text-sm md:text-base"
                                    data-oid="vv1v643"
                                >
                                    Level:
                                </label>
                                <div
                                    className="flex flex-wrap gap-1 md:space-x-2"
                                    data-oid="nw31y7v"
                                >
                                    <button
                                        onClick={() => setLevelFilter('all')}
                                        className={cn(
                                            'px-2 md:px-3 py-1 rounded-md text-xs md:text-sm',
                                            levelFilter === 'all'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="c4ea83."
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
                                        data-oid="4:ghdmi"
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
                                        data-oid="3bvkzg6"
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
                                        data-oid="dz:i8xw"
                                    >
                                        Advanced
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto" data-oid="_06y9n.">
                            <div className="relative" data-oid="5a8exmz">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-64 px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-white text-sm md:text-base"
                                    data-oid="_ntovb9"
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="prcp5j0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid="ezzh5x8"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Listings */}
            <div className="py-8 md:py-12 px-4 md:px-12 bg-black" data-oid="azzsqph">
                <div className="max-w-6xl mx-auto" data-oid="rkx8gk5">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="uoqblhq">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="hsmqqex"
                            ></div>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-20" data-oid="1kuyctf">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="pedwubk"
                            >
                                No courses found
                            </h3>
                            <p className="text-gray-400" data-oid="56h5i_r">
                                Try adjusting your filters or search query
                            </p>
                        </div>
                    ) : (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            data-oid="b_xf0y4"
                        >
                            {filteredCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleCourseClick(course._id)}
                                    data-oid="vzzah2t"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden"
                                        data-oid="69r26z2"
                                    >
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                            data-oid=":nix9xl"
                                        />

                                        {course.isFeatured && (
                                            <div
                                                className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1"
                                                data-oid="rsu0mxs"
                                            >
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6" data-oid="eplkiqd">
                                        <div
                                            className="flex justify-between items-start mb-2"
                                            data-oid="5oopo0l"
                                        >
                                            <h3
                                                className="text-xl font-semibold"
                                                data-oid="r9s32kh"
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
                                                data-oid="q8thsqz"
                                            >
                                                {course.level}
                                            </span>
                                        </div>
                                        <p
                                            className="text-gray-400 text-sm mb-4 line-clamp-2"
                                            data-oid="f9rst8m"
                                        >
                                            {course.description}
                                        </p>
                                        <div className="flex items-center mb-3" data-oid="hfzxodz">
                                            <div
                                                className="w-8 h-8 rounded-full overflow-hidden mr-4"
                                                data-oid="pyqdtrr"
                                            >
                                                <img
                                                    src={
                                                        course.instructorImg ||
                                                        'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                                                    }
                                                    alt={course.instructor}
                                                    className="w-full h-full object-cover"
                                                    data-oid="x27d_m0"
                                                />
                                            </div>
                                            <span
                                                className="text-gray-300 text-sm"
                                                data-oid="2l.spzl"
                                            >
                                                {course.instructor}
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between text-gray-400 text-sm mb-4"
                                            data-oid="tj71.ck"
                                        >
                                            <span data-oid="getrfyr">{course.duration}</span>
                                            {renderRating(course.rating)}
                                        </div>
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="6h4nvsv"
                                        >
                                            <span
                                                className={cn(
                                                    'font-medium text-lg',
                                                    course.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white',
                                                )}
                                                data-oid="unr4ucm"
                                            >
                                                {formatPrice(course.price)}
                                            </span>
                                            <button
                                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium"
                                                data-oid="-ew882_"
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
                data-oid="iq1k2zj"
            >
                <div className="max-w-6xl mx-auto" data-oid="imkkoce">
                    <div className="text-center text-gray-500" data-oid="9jw31le">
                        <p data-oid="i8ql68s">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
