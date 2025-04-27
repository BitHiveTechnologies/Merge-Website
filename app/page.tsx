'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch featured courses and upcoming events
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch courses
                const coursesResponse = await fetch('http://localhost:8001/api/courses/featured');
                if (!coursesResponse.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const coursesData = await coursesResponse.json();

                // Fetch events
                const eventsResponse = await fetch('http://localhost:8001/api/events/upcoming');
                if (!eventsResponse.ok) {
                    throw new Error('Failed to fetch events');
                }
                const eventsData = await eventsResponse.json();

                setCourses(coursesData);
                setEvents(eventsData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        // Testimonial rotation
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const testimonials = [
        {
            name: 'Alex Johnson',
            role: 'Web Developer',
            content:
                'The courses at Merge helped me transition from a beginner to a professional developer in just 3 months. The community support is incredible!',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            name: 'Sarah Chen',
            role: 'UI/UX Designer',
            content:
                "Participating in Merge's hackathons gave me real-world experience and helped me build my portfolio. I landed my dream job shortly after!",
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
            name: 'Raj Patel',
            role: 'Full Stack Developer',
            content:
                'The instructors are industry professionals who provide practical insights. The WhatsApp community continues to be a valuable resource.',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
    ];

    // Fallback data in case API fails
    const fallbackCourses = [
        {
            id: 1,
            title: 'Full Stack Web Development',
            instructor: 'John Smith',
            duration: '12 weeks',
            level: 'Intermediate',
            price: '₹12,999',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
        {
            id: 2,
            title: 'UI/UX Design Fundamentals',
            instructor: 'Maya Patel',
            duration: '8 weeks',
            level: 'Beginner',
            price: '₹8,999',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
        {
            id: 3,
            title: 'Data Structures & Algorithms',
            instructor: 'David Lee',
            duration: '10 weeks',
            level: 'Advanced',
            price: '₹10,999',
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
    ];

    const fallbackEvents = [
        {
            id: 1,
            title: 'Web3 Development Workshop',
            date: 'June 15, 2023',
            time: '6:00 PM - 8:00 PM',
            type: 'Workshop',
            price: 'Free',
        },
        {
            id: 2,
            title: 'AI & Machine Learning Hackathon',
            date: 'July 8-10, 2023',
            time: '48 Hours',
            type: 'Hackathon',
            price: '₹499',
        },
        {
            id: 3,
            title: 'Career in Tech: Industry Panel',
            date: 'June 22, 2023',
            time: '5:00 PM - 6:30 PM',
            type: 'Webinar',
            price: 'Free',
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="y.l.k_-">
            {/* Navbar */}
            <Navbar data-oid="cm.z.0_" />
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 p-4" data-oid="kg0pwsv">
                    <div className="flex flex-col space-y-3" data-oid="s3jay_7">
                        <a
                            href="/"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="4at4b9y"
                        >
                            Home
                        </a>
                        <a
                            href="/courses"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="pd.ml59"
                        >
                            Courses
                        </a>
                        <a
                            href="/workshops"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="qt6ontu"
                        >
                            Workshops
                        </a>
                        <a
                            href="/hackathons"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="7i_:6.3"
                        >
                            Hackathons
                        </a>
                        <div className="pt-4 flex space-x-4" data-oid="5xuybyz">
                            <a
                                href="/login"
                                className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors text-center"
                                data-oid="wcpn4cv"
                            >
                                Login
                            </a>
                            <a
                                href="/signup"
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center"
                                data-oid="s481qsr"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section
                className="pt-10 pb-10 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 md:h-[700px] relative overflow-hidden"
                data-oid="qpjr40_"
            >
                {/* Background blur elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="32e:krs"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="wo95i_e"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="p1_ivy3"
                ></div>

                {/* Content container with relative positioning */}
                <div className="relative z-10" data-oid="81i4d5k">
                    <div
                        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                        data-oid="_9enzhz"
                    >
                        <div className="py-8" data-oid="wso3qfn">
                            <h1
                                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                                data-oid="ax:b.v4"
                            >
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                    data-oid="w2lorle"
                                >
                                    Merge <br data-oid="mni96pa" /> Your Skills
                                </span>
                                <br data-oid="tpr72kn" />
                                <span data-oid="d8zyrvc">With Opportunity</span>
                            </h1>
                            <p
                                className="text-xl md:text-2xl text-gray-300 mb-10"
                                data-oid="s.oozt0"
                            >
                                Join our Community of Learners and Professionals to Upskill,
                                Participate in Hackathons, and Connect with Industry Experts.
                            </p>
                            <div
                                className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-10"
                                data-oid="sdhzqhk"
                            ></div>
                            <div className="flex flex-col sm:flex-row gap-4" data-oid="4cu9fqb">
                                <a
                                    href="/courses"
                                    className="px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium text-lg"
                                    data-oid="14g6fj8"
                                >
                                    Explore Courses
                                </a>
                                <a
                                    href="/signup"
                                    className="px-8 py-4 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors text-center font-medium text-lg"
                                    data-oid="a_r:.b0"
                                >
                                    Join Now
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block relative" data-oid="kx.dz1g">
                            <div
                                className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300"
                                data-oid="3sy7kv7"
                            >
                                <div
                                    className="flex items-center mb-6 group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                                    data-oid="n1s-gig"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                        data-oid="w1isqst"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="zctbmre"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                className="group-hover:animate-pulse"
                                                data-oid="sklpot-"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4" data-oid="q7eh3vc">
                                        <h3
                                            className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300"
                                            data-oid="kz-smdd"
                                        >
                                            Learn at Your Pace
                                        </h3>
                                        <p
                                            className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                                            data-oid="jt:2mwo"
                                        >
                                            Access Courses Anytime, Anywhere
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center mb-6 group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                                    data-oid=".w-fp77"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                        data-oid="yndyp.8"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="dtpqt16"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                className="group-hover:animate-pulse"
                                                data-oid=":o-3w-7"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4" data-oid="9.54dlc">
                                        <h3
                                            className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300"
                                            data-oid="fbj-e8z"
                                        >
                                            Community Support
                                        </h3>
                                        <p
                                            className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                                            data-oid="fgjn9cs"
                                        >
                                            Join WhatsApp Group for Each Course
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                                    data-oid="mzeki-_"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                        data-oid="fa1_a14"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="l-bkz61"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                className="group-hover:animate-pulse"
                                                data-oid="_jfcph-"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4" data-oid="qpsg315">
                                        <h3
                                            className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300"
                                            data-oid="jmnxsn:"
                                        >
                                            Real-world Projects
                                        </h3>
                                        <p
                                            className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                                            data-oid="mg_tpng"
                                        >
                                            Build your Portfolio with Hackathons
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 md:py-16 px-6 md:px-12 bg-gray-900" data-oid="7-.le:w">
                <div className="max-w-6xl mx-auto" data-oid="ndtd.o5">
                    <div className="text-center mb-16" data-oid="uyfe:g3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="9lhf4p5">
                            Why Choose{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="sf_ioxk"
                            >
                                Merge
                            </span>
                            ?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="pbm_11o">
                            We combine learning, practice, and networking to give you the complete
                            package for tech career growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="gwzereg">
                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                            data-oid="y162fot"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                                data-oid="dnd67il"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="p5j4uc3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        className="group-hover:animate-pulse"
                                        data-oid="628g6-e"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300"
                                data-oid="uhl44vy"
                            >
                                Industry-Relevant Curriculum
                            </h3>
                            <p
                                className="text-gray-300 group-hover:text-white transition-colors duration-300"
                                data-oid="sxz22av"
                            >
                                Our courses are designed by industry experts to ensure you learn
                                skills that are in demand right now.
                            </p>
                        </div>

                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                            data-oid=".r775yx"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                                data-oid="f67q1cq"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="7hgv5w3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        className="group-hover:animate-pulse"
                                        data-oid="f3-1xti"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300"
                                data-oid="w5hih55"
                            >
                                Hands-on Hackathons
                            </h3>
                            <p
                                className="text-gray-300 group-hover:text-white transition-colors duration-300"
                                data-oid="ult6nvm"
                            >
                                Apply your knowledge in competitive hackathons with real prizes and
                                recognition opportunities.
                            </p>
                        </div>

                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                            data-oid="_3twugd"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                                data-oid="7_og2bh"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="wzk9qhm"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                        className="group-hover:animate-pulse"
                                        data-oid="jotb_6-"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300"
                                data-oid="cgdzzh7"
                            >
                                Active Community
                            </h3>
                            <p
                                className="text-gray-300 group-hover:text-white transition-colors duration-300"
                                data-oid="i_j2k1y"
                            >
                                Join our WhatsApp groups for each course to get support, network,
                                and collaborate with peers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Preview Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="-8krb8.">
                <div className="max-w-6xl mx-auto" data-oid="gw59bm.">
                    <div className="flex justify-between items-end mb-12" data-oid="lxla2i.">
                        <div data-oid="hcmdqof">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="0cxb6ph">
                                Featured Courses
                            </h2>
                            <p className="text-xl text-gray-300" data-oid="2oo87jx">
                                Start your learning journey with our top courses
                            </p>
                        </div>
                        <a
                            href="/courses"
                            className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="xwmc7yx"
                        >
                            View All Courses →
                        </a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="yqrlhii">
                        {isLoading ? (
                            // Loading state
                            Array(3)
                                .fill(0)
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse"
                                        data-oid="e5u_2qa"
                                    >
                                        <div className="h-48 bg-gray-700" data-oid="27z2fif"></div>
                                        <div className="p-6" data-oid="-z5:b.s">
                                            <div
                                                className="h-6 bg-gray-700 rounded mb-4 w-3/4"
                                                data-oid="ceubhah"
                                            ></div>
                                            <div
                                                className="h-4 bg-gray-700 rounded mb-4 w-1/2"
                                                data-oid="4vh.5mt"
                                            ></div>
                                            <div
                                                className="h-4 bg-gray-700 rounded mb-6 w-full"
                                                data-oid="fo429ko"
                                            ></div>
                                            <div
                                                className="h-10 bg-gray-700 rounded w-full"
                                                data-oid="3jytng2"
                                            ></div>
                                        </div>
                                    </div>
                                ))
                        ) : error ? (
                            // Error state
                            <div className="col-span-3 text-center py-8" data-oid="10-p8b1">
                                <p className="text-red-400 mb-4" data-oid="c652-x6">
                                    {error}
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                                    data-oid="_l3q3hy"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            // Data loaded successfully
                            (courses.length > 0 ? courses : fallbackCourses).map(
                                (course, index) => (
                                    <div
                                        key={course.id || index}
                                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1"
                                        data-oid="cci3hf4"
                                    >
                                        <div className="h-48 overflow-hidden" data-oid="8t3_bh4">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-full object-cover"
                                                data-oid="ng6.t46"
                                            />
                                        </div>
                                        <div className="p-6" data-oid="g:p2h7p">
                                            <div
                                                className="flex justify-between items-start mb-4"
                                                data-oid="2054.5j"
                                            >
                                                <h3
                                                    className="text-xl font-semibold"
                                                    data-oid="_0dst0j"
                                                >
                                                    {course.title}
                                                </h3>
                                                <span
                                                    className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm"
                                                    data-oid="gzy2h:i"
                                                >
                                                    {course.level}
                                                </span>
                                            </div>
                                            <div
                                                className="flex items-center mb-4"
                                                data-oid="5v52wl_"
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                                    data-oid="-82av6y"
                                                ></div>
                                                <span className="text-gray-300" data-oid="jrejs0w">
                                                    {course.instructor}
                                                </span>
                                            </div>
                                            <div
                                                className="flex justify-between text-gray-400 mb-6"
                                                data-oid="3kh18zq"
                                            >
                                                <span data-oid="tgsxe7.">{course.duration}</span>
                                                <span
                                                    className="text-white font-medium"
                                                    data-oid="ks9tr8l"
                                                >
                                                    {course.price}
                                                </span>
                                            </div>
                                            <a
                                                href={`/courses/${course.id || index}`}
                                                className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                                data-oid="yxyqc4g"
                                            >
                                                Enroll Now
                                            </a>
                                        </div>
                                    </div>
                                ),
                            )
                        )}
                    </div>

                    <div className="mt-8 text-center md:hidden" data-oid="dvym2kz">
                        <a
                            href="/courses"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="eqdiu5."
                        >
                            View All Courses →
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-900 to-black"
                data-oid="qbziav6"
            >
                <div className="max-w-6xl mx-auto" data-oid="w8xfj77">
                    <div className="text-center mb-16" data-oid="in1t1yn">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="p:a0pyn">
                            What Our Students Say
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid=".za2-4u">
                            Join thousands of satisfied learners who have transformed their careers
                            with Merge.
                        </p>
                    </div>

                    <div className="relative" data-oid="0:rdq9f">
                        <div className="overflow-hidden" data-oid="e5ezmv4">
                            <div
                                className="flex transition-transform duration-500"
                                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                                data-oid="if7-09v"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="min-w-full px-4" data-oid="ocy:fva">
                                        <div
                                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-3xl mx-auto"
                                            data-oid="lly4x08"
                                        >
                                            <div
                                                className="flex items-center mb-6"
                                                data-oid="hkheqoz"
                                            >
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                    data-oid="3ly56hu"
                                                />

                                                <div className="ml-4" data-oid="0b3w__3">
                                                    <h3
                                                        className="text-xl font-semibold"
                                                        data-oid="67ctsx9"
                                                    >
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-gray-400" data-oid="3urh51n">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                className="text-lg text-gray-300 italic"
                                                data-oid="jyrtn6j"
                                            >
                                                "{testimonial.content}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 space-x-2" data-oid="p9d3ll6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-purple-500' : 'bg-gray-600'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    data-oid="6.b-un8"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid=":0x2cz.">
                <div className="max-w-6xl mx-auto" data-oid="2jmh7t5">
                    <div className="flex justify-between items-end mb-12" data-oid="i9msfen">
                        <div data-oid="lhwlql3">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="s0s3qk2">
                                Upcoming Events
                            </h2>
                            <p className="text-xl text-gray-300" data-oid="dysp374">
                                Join our workshops, webinars, and hackathons
                            </p>
                        </div>
                        <a
                            href="/workshops"
                            className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="z_8d3kp"
                        >
                            View All Events →
                        </a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="i:quq__">
                        {isLoading ? (
                            // Loading state
                            Array(3)
                                .fill(0)
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800 p-6 rounded-xl border border-gray-700 animate-pulse"
                                        data-oid="8egz:ni"
                                    >
                                        <div
                                            className="flex justify-between items-center mb-4"
                                            data-oid="tw7w5dv"
                                        >
                                            <div
                                                className="h-6 bg-gray-700 rounded w-1/3"
                                                data-oid="v1a3wcw"
                                            ></div>
                                            <div
                                                className="h-6 bg-gray-700 rounded w-1/4"
                                                data-oid="qlzt4p9"
                                            ></div>
                                        </div>
                                        <div
                                            className="h-6 bg-gray-700 rounded mb-4 w-3/4"
                                            data-oid=":kfew6s"
                                        ></div>
                                        <div
                                            className="h-4 bg-gray-700 rounded mb-2 w-1/2"
                                            data-oid="s55b084"
                                        ></div>
                                        <div
                                            className="h-4 bg-gray-700 rounded mb-6 w-2/3"
                                            data-oid="-c3korj"
                                        ></div>
                                        <div
                                            className="h-10 bg-gray-700 rounded w-full"
                                            data-oid="jqh-ge5"
                                        ></div>
                                    </div>
                                ))
                        ) : error ? (
                            // Already handled in the courses section
                            <></>
                        ) : (
                            // Data loaded successfully
                            (events.length > 0 ? events : fallbackEvents).map((event, index) => (
                                <div
                                    key={event.id || index}
                                    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1"
                                    data-oid=".i4rm_w"
                                >
                                    <div
                                        className="flex justify-between items-center mb-4"
                                        data-oid="0-y83t9"
                                    >
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                event.type === 'Workshop'
                                                    ? 'bg-blue-500/20 text-blue-300'
                                                    : event.type === 'Hackathon'
                                                      ? 'bg-green-500/20 text-green-300'
                                                      : 'bg-yellow-500/20 text-yellow-300'
                                            }`}
                                            data-oid="if1hwhn"
                                        >
                                            {event.type}
                                        </span>
                                        <span
                                            className={`text-sm font-medium ${
                                                event.price === 'Free'
                                                    ? 'text-green-400'
                                                    : 'text-white'
                                            }`}
                                            data-oid="bhb5jl."
                                        >
                                            {event.price}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2" data-oid="mkhqiwv">
                                        {event.title}
                                    </h3>
                                    <div className="text-gray-400 mb-6" data-oid="z81qmep">
                                        <div className="flex items-center mb-1" data-oid="0c:26sr">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="9lt3.6w"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    data-oid="wbeck41"
                                                />
                                            </svg>
                                            <span data-oid="0i7dr4w">{event.date}</span>
                                        </div>
                                        <div className="flex items-center" data-oid="s2i4_zz">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="j0-4.np"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    data-oid="fh5h95f"
                                                />
                                            </svg>
                                            <span data-oid=".hal1-0">{event.time}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`/${event.type.toLowerCase()}s/${event.id || index}`}
                                        className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="gdthnx9"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-8 text-center md:hidden" data-oid=".tnyfk4">
                        <a
                            href="/workshops"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="-p-7l-4"
                        >
                            View All Events →
                        </a>
                    </div>
                </div>
            </section>

            {/* Newsletter & WhatsApp CTA */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="bidrpk3">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12" data-oid="a5n_8l.">
                    <div
                        className="bg-gray-800 p-8 rounded-xl border border-gray-700"
                        data-oid="8vl8v:d"
                    >
                        <h3 className="text-2xl font-bold mb-4" data-oid="-46ir8d">
                            Subscribe to Our Newsletter
                        </h3>
                        <p className="text-gray-300 mb-6" data-oid="l4q4.ii">
                            Get updates on new courses, events, and tech insights directly to your
                            inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3" data-oid="z9z6f9d">
                            <input
                                type="email"
                                id="newsletter-email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                data-oid="2s_9t6z"
                            />

                            <button
                                onClick={async () => {
                                    const email = (
                                        document.getElementById(
                                            'newsletter-email',
                                        ) as HTMLInputElement
                                    ).value;
                                    if (!email) return;

                                    try {
                                        const response = await fetch(
                                            'http://localhost:8001/api/newsletter/subscribe',
                                            {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({ email }),
                                            },
                                        );

                                        if (response.ok) {
                                            alert('Successfully subscribed to the newsletter!');
                                            (
                                                document.getElementById(
                                                    'newsletter-email',
                                                ) as HTMLInputElement
                                            ).value = '';
                                        } else {
                                            const data = await response.json();
                                            alert(
                                                data.message ||
                                                    'Failed to subscribe. Please try again.',
                                            );
                                        }
                                    } catch (err) {
                                        console.error('Newsletter subscription error:', err);
                                        alert('An error occurred. Please try again later.');
                                    }
                                }}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium whitespace-nowrap"
                                data-oid="_70oxl9"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-xl border border-purple-800"
                        data-oid="c3hpeac"
                    >
                        <div className="flex items-center mb-6" data-oid="wz239el">
                            <div
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                                data-oid="55x.xsw"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-oid="tp73o4a"
                                >
                                    <path
                                        d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9 16.124 19.0521 17.6242 17.5518C19.1245 16.0516 19.9724 14.0273 19.9724 11.9176C19.9724 9.80781 19.1245 7.78361 17.6242 6.28333C17.6161 6.27519 17.6081 6.26709 17.6 6.25999V6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.512 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.635 11.92C18.635 13.6664 17.916 15.3418 16.66 16.57C15.4995 17.6812 13.9687 18.3141 12.37 18.37L12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6033 13.4958 10.768 14.5293 12.16 15.17C12.5631 15.3312 12.9836 15.4424 13.41 15.5C13.7798 15.5726 14.1601 15.5413 14.5122 15.4091C14.8643 15.2769 15.1761 15.0481 15.42 14.75C15.5325 14.5251 15.6111 14.2828 15.6528 14.0315C15.6945 13.7802 15.6986 13.5229 15.6648 13.27C15.6648 13.27 15.81 13.69 15.61 13.59Z"
                                        fill="#25D366"
                                        data-oid="visax3v"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold ml-4" data-oid="ru5k5je">
                                Join Our WhatsApp Community
                            </h3>
                        </div>
                        <p className="text-gray-300 mb-6" data-oid="22egydg">
                            Connect with fellow learners, get instant updates, and access exclusive
                            resources.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/LYEHjjzyiplD9pT3r22iNo"
                            className="block w-full py-3 text-center rounded-md bg-[#25D366] hover:bg-[#20BD5A] transition-colors font-medium text-black"
                            data-oid="w2ggkei"
                        >
                            Join WhatsApp Group
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="av:xhne"
            >
                <div className="max-w-6xl mx-auto" data-oid="yauetxw">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="1bfaxdc">
                        <div data-oid="0_15iqk">
                            <Link href="/" data-oid="f:pm8av">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="utegjmf"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="nn3gefa">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-2" data-oid="_3.w87h">
                                <a
                                    href="https://www.instagram.com/coding_.merge"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="vlk75cm"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="x741rm9"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                            data-oid="t6_6psy"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="thpnfm:"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="34cg037"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="vtum9qq"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="x8c0t6s">
                            <h4 className="text-lg font-semibold mb-4" data-oid="7qlm_s3">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="-xk215n">
                                <li data-oid="m9.p.3a">
                                    <a
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ok5rh2j"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li data-oid="_5_1:xe">
                                    <a
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="07dj4pf"
                                    >
                                        Courses
                                    </a>
                                </li>
                                <li data-oid="opky7fp">
                                    <a
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="l5pk20-"
                                    >
                                        Workshops
                                    </a>
                                </li>
                                <li data-oid="_xez58j">
                                    <a
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="2i4jx41"
                                    >
                                        Hackathons
                                    </a>
                                </li>
                                <li data-oid="y7_o1bt">
                                    <a
                                        href="/login"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="hb2dag5"
                                    >
                                        Login
                                    </a>
                                </li>
                                <li data-oid="nz8elw2">
                                    <a
                                        href="/signup"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="a3s-.s1"
                                    >
                                        Sign Up
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="olrk6jy">
                            <h4 className="text-lg font-semibold mb-4" data-oid="j.jtznn">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="hvss6rt">
                                <li data-oid="03yfk.h">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ir52f8d"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="kzzdlfx">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="z_q_yf:"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="g.oud-d">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="t1aulk8"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid="-tuyewu">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="vndpo1u"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="q-w03:8">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="cpgg354"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="famaytu">
                            <h4 className="text-lg font-semibold mb-4" data-oid="tuyeono">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="9-1py1a">
                                <li className="flex items-start" data-oid="wpp2myi">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid=":3evmy5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="ypj8cer"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:info@merge.com"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="6j6o7d9"
                                    >
                                        admin@merge.org.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="ra7mb3e">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="2j4c2ei"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="hixeo-r"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+1234567890"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ro7qoh9"
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="tp24ie8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="igyy1--"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="ve-jw7s"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="05q33my"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="c5--jqk">
                                        Dehradun, Uttarakhand, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="p6scxa5"
                    >
                        <p data-oid="vemdxad">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                        <p className="text" data-oid="myi4x7k">
                            Built with ❤️ by BitHive Technologies
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
