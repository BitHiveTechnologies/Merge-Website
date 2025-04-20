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

    // Fetch courses (simulated)
    useEffect(() => {
        // In a real app, this would be an API call
        const fetchCourses = () => {
            setIsLoading(true);
            // Simulated API response
            const coursesData: Course[] = [
                {
                    id: 1,
                    title: 'Full Stack Web Development',
                    description:
                        'Learn to build complete web applications from front to back end using modern technologies like React, Node.js, and MongoDB.',
                    instructor: 'John Smith',
                    duration: '12 weeks',
                    level: 'Intermediate',
                    rating: 4.8,
                    price: 12999,
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    isFeatured: true,
                },
                {
                    id: 2,
                    title: 'UI/UX Design Fundamentals',
                    description:
                        'Master the principles of user interface and user experience design to create intuitive and beautiful digital products.',
                    instructor: 'Maya Patel',
                    duration: '8 weeks',
                    level: 'Beginner',
                    rating: 4.6,
                    price: 8999,
                    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    isFeatured: true,
                },
                {
                    id: 3,
                    title: 'Data Structures & Algorithms',
                    description:
                        'Develop strong problem-solving skills by mastering essential data structures and algorithms concepts.',
                    instructor: 'David Lee',
                    duration: '10 weeks',
                    level: 'Advanced',
                    rating: 4.9,
                    price: 10999,
                    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    isFeatured: true,
                },
                {
                    id: 4,
                    title: 'Introduction to Python Programming',
                    description:
                        'Learn the basics of Python programming language and its applications in various domains.',
                    instructor: 'Sarah Johnson',
                    duration: '6 weeks',
                    level: 'Beginner',
                    rating: 4.5,
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                },
                {
                    id: 5,
                    title: 'Mobile App Development with React Native',
                    description:
                        'Build cross-platform mobile applications using React Native framework.',
                    instructor: 'Alex Chen',
                    duration: '10 weeks',
                    level: 'Intermediate',
                    rating: 4.7,
                    price: 9999,
                    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                },
                {
                    id: 6,
                    title: 'Machine Learning Fundamentals',
                    description:
                        'Understand the core concepts of machine learning and implement basic algorithms.',
                    instructor: 'Priya Sharma',
                    duration: '12 weeks',
                    level: 'Advanced',
                    rating: 4.9,
                    price: 14999,
                    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                },
                {
                    id: 7,
                    title: 'Web Accessibility Workshop',
                    description:
                        'Learn how to make your websites accessible to everyone, including people with disabilities.',
                    instructor: 'Carlos Rodriguez',
                    duration: '4 weeks',
                    level: 'Beginner',
                    rating: 4.4,
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                },
                {
                    id: 8,
                    title: 'Advanced JavaScript Patterns',
                    description:
                        'Master advanced JavaScript concepts, design patterns, and best practices.',
                    instructor: 'Michael Brown',
                    duration: '8 weeks',
                    level: 'Advanced',
                    rating: 4.8,
                    price: 11999,
                    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                },
            ];

            setCourses(coursesData);
            setFilteredCourses(coursesData);
            setIsLoading(false);
        };

        fetchCourses();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...courses];

        // Apply price filter
        if (priceFilter === 'free') {
            result = result.filter((course) => course.price === 'Free');
        } else if (priceFilter === 'paid') {
            result = result.filter((course) => course.price !== 'Free');
        }

        // Apply level filter
        if (levelFilter !== 'all') {
            result = result.filter((course) => course.level === levelFilter);
        }

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
    }, [courses, priceFilter, levelFilter, searchQuery]);

    // Navigate to course detail
    const handleCourseClick = (courseId: number) => {
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
            <div className="flex items-center" data-oid="0ean_31">
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
                        data-oid="hor305z"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            data-oid="1dy0u4f"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-gray-300" data-oid="arj6eyt">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="eq782m-">
            <Navbar data-oid="thki2i_" />
            {/* Page Header */}
            <div
                className="bg-gradient-to-b from-black to-gray-900 pt-24 pb-28 px-6 md:px-12 relative overflow-hidden"
                data-oid="c30wm4s"
            >
                {/* Background elements similar to main page */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="rrvcvqs"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="tgnajqq"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="a:c2wy_"
                ></div>

                <div className="max-w-6xl mx-auto relative z-10 py-8" data-oid="6qnzwsa">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                        data-oid="63z1mdg"
                    >
                        Explore Our{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="8orula6"
                        >
                            Courses
                        </span>
                    </h1>
                    <p
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-6"
                        data-oid="xcx3p3r"
                    >
                        Discover a Wide Range of Courses designed to help you Master New Skills and
                        Advance your Career in Technology.
                    </p>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 mb-8"
                        data-oid="3lvel13"
                    ></div>
                    <div className="flex flex-wrap gap-4 mt-8" data-oid="kkcrsm4">
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="6cfyzik"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="o4p533-"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="d11iwe2"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="j675lhx"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="jqwpgef"
                            >
                                Expert Instructors
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="a70ysmw"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="6m8q7fb"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="8iup:9l"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="ibv1ial"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="2nb29zg"
                            >
                                Flexible Learning
                            </span>
                        </div>
                        <div
                            className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-700 inline-flex items-center hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                            data-oid="spactdj"
                        >
                            <span
                                className="text-purple-400 mr-2 group-hover:text-purple-300"
                                data-oid="64y.2t2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="g9-9yb7"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                        className="group-hover:animate-pulse"
                                        data-oid="j8pq24z"
                                    />
                                </svg>
                            </span>
                            <span
                                className="group-hover:text-white transition-colors duration-300"
                                data-oid="vqkyd.f"
                            >
                                Certificate on Completion
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div
                className="bg-gray-900 py-8 px-6 md:px-12 border-b border-gray-800"
                data-oid="v294kbw"
            >
                <div className="max-w-6xl mx-auto" data-oid="81ac6y7">
                    <div
                        className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                        data-oid="8.:fsw."
                    >
                        <div className="flex flex-col sm:flex-row gap-4" data-oid="g5bcrmf">
                            <div className="flex items-center space-x-4" data-oid="7j_5y4i">
                                <label
                                    className="text-gray-300 whitespace-nowrap"
                                    data-oid="on7vjsl"
                                >
                                    Price:
                                </label>
                                <div className="flex space-x-2" data-oid="qunhofc">
                                    <button
                                        onClick={() => setPriceFilter('all')}
                                        className={cn(
                                            'px-3 py-1 rounded-md text-sm',
                                            priceFilter === 'all'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="yo9f_lj"
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setPriceFilter('free')}
                                        className={cn(
                                            'px-3 py-1 rounded-md text-sm',
                                            priceFilter === 'free'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="89wy5ne"
                                    >
                                        Free
                                    </button>
                                    <button
                                        onClick={() => setPriceFilter('paid')}
                                        className={cn(
                                            'px-3 py-1 rounded-md text-sm',
                                            priceFilter === 'paid'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="lhbmulr"
                                    >
                                        Paid
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4" data-oid="9:hf6t5">
                                <label
                                    className="text-gray-300 whitespace-nowrap"
                                    data-oid="1338pmy"
                                >
                                    Level:
                                </label>
                                <div className="flex space-x-2" data-oid="2ocr6oc">
                                    <button
                                        onClick={() => setLevelFilter('all')}
                                        className={cn(
                                            'px-3 py-1 rounded-md text-sm',
                                            levelFilter === 'all'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="_9hvboy"
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setLevelFilter('Beginner')}
                                        className={cn(
                                            'px-3 py-1 rounded-md text-sm',
                                            levelFilter === 'Beginner'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid=":dwblwq"
                                    >
                                        Beginner
                                    </button>
                                    <button
                                        onClick={() => setLevelFilter('Intermediate')}
                                        className={cn(
                                            'px-3 py-1 rounded-md text-sm',
                                            levelFilter === 'Intermediate'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="_dc02uc"
                                    >
                                        Intermediate
                                    </button>
                                    <button
                                        onClick={() => setLevelFilter('Advanced')}
                                        className={cn(
                                            'px-3 py-1 rounded-md text-sm',
                                            levelFilter === 'Advanced'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                                        )}
                                        data-oid="m3m2pdm"
                                    >
                                        Advanced
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto" data-oid="75:n8qj">
                            <div className="relative" data-oid="-98zkyl">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-64 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                                    data-oid="lhhv3ae"
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="m8je-k7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid="h8p1tg0"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Listings */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="v3a1ba6">
                <div className="max-w-6xl mx-auto" data-oid="jw2al4i">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="fjqm-2e">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="y9_dvts"
                            ></div>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-20" data-oid="6-6k5c:">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="hy-_ml6"
                            >
                                No courses found
                            </h3>
                            <p className="text-gray-400" data-oid="9x_v88p">
                                Try adjusting your filters or search query
                            </p>
                        </div>
                    ) : (
                        <div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            data-oid="yx57tpj"
                        >
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleCourseClick(course.id)}
                                    data-oid="43hl--4"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden"
                                        data-oid="-xen0n5"
                                    >
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                            data-oid="htn2iou"
                                        />

                                        {course.isFeatured && (
                                            <div
                                                className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1"
                                                data-oid="4onrzfa"
                                            >
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6" data-oid="3_m-vwu">
                                        <div
                                            className="flex justify-between items-start mb-2"
                                            data-oid="cgnbtyy"
                                        >
                                            <h3
                                                className="text-xl font-semibold"
                                                data-oid="pq5m4le"
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
                                                data-oid="ch48:uy"
                                            >
                                                {course.level}
                                            </span>
                                        </div>
                                        <p
                                            className="text-gray-400 text-sm mb-4 line-clamp-2"
                                            data-oid="y1yn0ma"
                                        >
                                            {course.description}
                                        </p>
                                        <div className="flex items-center mb-3" data-oid=":e_0qlr">
                                            <div
                                                className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                                data-oid="pjgq6c8"
                                            ></div>
                                            <span
                                                className="text-gray-300 text-sm"
                                                data-oid="q9j8zut"
                                            >
                                                {course.instructor}
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between text-gray-400 text-sm mb-4"
                                            data-oid="wgf3u5q"
                                        >
                                            <span data-oid="d32yo-z">{course.duration}</span>
                                            {renderRating(course.rating)}
                                        </div>
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="9:5lie0"
                                        >
                                            <span
                                                className={cn(
                                                    'font-medium text-lg',
                                                    course.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white',
                                                )}
                                                data-oid=":e0u4qr"
                                            >
                                                {formatPrice(course.price)}
                                            </span>
                                            <button
                                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-sm font-medium"
                                                data-oid="7-q.1s8"
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
                data-oid="9n..7n-"
            >
                <div className="max-w-6xl mx-auto" data-oid="nhfa7go">
                    <div className="text-center text-gray-500" data-oid="_joz418">
                        <p data-oid="-u2qq3l">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
