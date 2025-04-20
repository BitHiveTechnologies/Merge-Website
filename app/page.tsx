'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
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

    const courses = [
        {
            title: 'Full Stack Web Development',
            instructor: 'John Smith',
            duration: '12 weeks',
            level: 'Intermediate',
            price: '₹12,999',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
        {
            title: 'UI/UX Design Fundamentals',
            instructor: 'Maya Patel',
            duration: '8 weeks',
            level: 'Beginner',
            price: '₹8,999',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
        {
            title: 'Data Structures & Algorithms',
            instructor: 'David Lee',
            duration: '10 weeks',
            level: 'Advanced',
            price: '₹10,999',
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        },
    ];

    const events = [
        {
            title: 'Web3 Development Workshop',
            date: 'June 15, 2023',
            time: '6:00 PM - 8:00 PM',
            type: 'Workshop',
            price: 'Free',
        },
        {
            title: 'AI & Machine Learning Hackathon',
            date: 'July 8-10, 2023',
            time: '48 Hours',
            type: 'Hackathon',
            price: '₹499',
        },
        {
            title: 'Career in Tech: Industry Panel',
            date: 'June 22, 2023',
            time: '5:00 PM - 6:30 PM',
            type: 'Webinar',
            price: 'Free',
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="hqtaawj">
            {/* Navbar */}
            <Navbar data-oid="mkijh2g" />
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 p-4" data-oid="4h.0e8k">
                    <div className="flex flex-col space-y-3" data-oid="1m3ubqw">
                        <a
                            href="/"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="68yqqn3"
                        >
                            Home
                        </a>
                        <a
                            href="/courses"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="u80g.b9"
                        >
                            Courses
                        </a>
                        <a
                            href="/workshops"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="g-m0xkj"
                        >
                            Workshops
                        </a>
                        <a
                            href="/hackathons"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="slyjjmz"
                        >
                            Hackathons
                        </a>
                        <div className="pt-4 flex space-x-4" data-oid="hn7pr-c">
                            <a
                                href="/login"
                                className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors text-center"
                                data-oid="v39rzqt"
                            >
                                Login
                            </a>
                            <a
                                href="/signup"
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center"
                                data-oid="e-1jam:"
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
                data-oid="-jd3ofx"
            >
                {/* Background blur elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="2bth2dk"
                ></div>
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="a.mn25f"
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="ojmr:ad"
                ></div>

                {/* Content container with relative positioning */}
                <div className="relative z-10" data-oid="0h3taoh">
                    <div
                        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                        data-oid="c6dnygb"
                    >
                        <div className="py-8" data-oid="l___qb9">
                            <h1
                                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                                data-oid="1tmq0py"
                            >
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                    data-oid="d_egxxj"
                                >
                                    Merge <br data-oid="-v5-9wn" /> Your Skills
                                </span>
                                <br data-oid="rtsw7w2" />
                                <span data-oid="nob8vy6">With Opportunity</span>
                            </h1>
                            <p
                                className="text-xl md:text-2xl text-gray-300 mb-10"
                                data-oid="rz7cmrz"
                            >
                                Join our community of learners and professionals to upskill,
                                participate in hackathons, and connect with industry experts.
                            </p>
                            <div
                                className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-10"
                                data-oid="1ig.2dt"
                            ></div>
                            <div className="flex flex-col sm:flex-row gap-4" data-oid="2xztbwq">
                                <a
                                    href="/courses"
                                    className="px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium text-lg"
                                    data-oid="_t1mpj7"
                                >
                                    Explore Courses
                                </a>
                                <a
                                    href="/signup"
                                    className="px-8 py-4 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors text-center font-medium text-lg"
                                    data-oid="5bmo-42"
                                >
                                    Join Now
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block relative" data-oid="_:bg1k3">
                            <div
                                className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300"
                                data-oid="mk.f242"
                            >
                                <div
                                    className="flex items-center mb-6 group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                                    data-oid="o43h58n"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                        data-oid="a-_9u75"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="27-87fp"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                className="group-hover:animate-pulse"
                                                data-oid="rnrphjf"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4" data-oid="1-9l0ai">
                                        <h3
                                            className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300"
                                            data-oid="7_33wdf"
                                        >
                                            Learn at Your Pace
                                        </h3>
                                        <p
                                            className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                                            data-oid=":j09w18"
                                        >
                                            Access courses anytime, anywhere
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center mb-6 group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                                    data-oid="o6tv73_"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                        data-oid="au1bna."
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="ek9d8.v"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                className="group-hover:animate-pulse"
                                                data-oid="4lz9iug"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4" data-oid="mdk_d83">
                                        <h3
                                            className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300"
                                            data-oid="l05xqfd"
                                        >
                                            Community Support
                                        </h3>
                                        <p
                                            className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                                            data-oid="cmz_m1:"
                                        >
                                            Join WhatsApp groups for each course
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                                    data-oid="r2960.e"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                        data-oid="v4g8o5d"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="89vxfnx"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                className="group-hover:animate-pulse"
                                                data-oid="1jqbl7m"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4" data-oid="jqx:k44">
                                        <h3
                                            className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300"
                                            data-oid="n1fa-4e"
                                        >
                                            Real-world Projects
                                        </h3>
                                        <p
                                            className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                                            data-oid="wztzn3h"
                                        >
                                            Build your portfolio with hackathons
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 md:py-16 px-6 md:px-12 bg-gray-900" data-oid="on254g3">
                <div className="max-w-6xl mx-auto" data-oid="sj8fn_s">
                    <div className="text-center mb-16" data-oid="j82k5_z">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="norfb55">
                            Why Choose{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="79of0fe"
                            >
                                Merge
                            </span>
                            ?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="piqq8a8">
                            We combine learning, practice, and networking to give you the complete
                            package for tech career growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="fh.mnv7">
                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                            data-oid="l3nfs.u"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                                data-oid="w2avadr"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="3k_9u4m"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        className="group-hover:animate-pulse"
                                        data-oid=":d--o90"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300"
                                data-oid="lboyu-r"
                            >
                                Industry-Relevant Curriculum
                            </h3>
                            <p
                                className="text-gray-300 group-hover:text-white transition-colors duration-300"
                                data-oid="6:n6::e"
                            >
                                Our courses are designed by industry experts to ensure you learn
                                skills that are in demand right now.
                            </p>
                        </div>

                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                            data-oid="hcgl9fk"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                                data-oid="xf2a7v:"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="6v3cvkc"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        className="group-hover:animate-pulse"
                                        data-oid="b.0tunp"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300"
                                data-oid="7fd-dx6"
                            >
                                Hands-on Hackathons
                            </h3>
                            <p
                                className="text-gray-300 group-hover:text-white transition-colors duration-300"
                                data-oid="m5jbbz8"
                            >
                                Apply your knowledge in competitive hackathons with real prizes and
                                recognition opportunities.
                            </p>
                        </div>

                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                            data-oid="x_rhoyh"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                                data-oid="7hstxao"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="2jhy_bi"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                        className="group-hover:animate-pulse"
                                        data-oid=":-e6-i6"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300"
                                data-oid="7a:p6oi"
                            >
                                Active Community
                            </h3>
                            <p
                                className="text-gray-300 group-hover:text-white transition-colors duration-300"
                                data-oid="-:bf9h:"
                            >
                                Join our WhatsApp groups for each course to get support, network,
                                and collaborate with peers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Preview Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="n23uecs">
                <div className="max-w-6xl mx-auto" data-oid="9abhjm1">
                    <div className="flex justify-between items-end mb-12" data-oid="wk.cpoh">
                        <div data-oid="9tt00.x">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="_dz0j13">
                                Featured Courses
                            </h2>
                            <p className="text-xl text-gray-300" data-oid="10u87og">
                                Start your learning journey with our top courses
                            </p>
                        </div>
                        <a
                            href="/courses"
                            className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="73sw_ed"
                        >
                            View All Courses →
                        </a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="j87se1_">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1"
                                data-oid="8rwdeti"
                            >
                                <div className="h-48 overflow-hidden" data-oid="jzv4hvg">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                        data-oid="3p3oqh1"
                                    />
                                </div>
                                <div className="p-6" data-oid="-zxclr_">
                                    <div
                                        className="flex justify-between items-start mb-4"
                                        data-oid="lc:dpzx"
                                    >
                                        <h3 className="text-xl font-semibold" data-oid="8mucwq_">
                                            {course.title}
                                        </h3>
                                        <span
                                            className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm"
                                            data-oid="a9d15--"
                                        >
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-4" data-oid="-7vw-yh">
                                        <div
                                            className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                            data-oid="sf4i8tp"
                                        ></div>
                                        <span className="text-gray-300" data-oid="rokr.zu">
                                            {course.instructor}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between text-gray-400 mb-6"
                                        data-oid=".9.:dqz"
                                    >
                                        <span data-oid="c2n:wac">{course.duration}</span>
                                        <span className="text-white font-medium" data-oid="9um9uak">
                                            {course.price}
                                        </span>
                                    </div>
                                    <a
                                        href={`/courses/${index}`}
                                        className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid="v..8f6a"
                                    >
                                        Enroll Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden" data-oid="zzuh8-i">
                        <a
                            href="/courses"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="aqc:s2w"
                        >
                            View All Courses →
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-900 to-black"
                data-oid="uh88x4s"
            >
                <div className="max-w-6xl mx-auto" data-oid="bzc6_uj">
                    <div className="text-center mb-16" data-oid="5y04.hk">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="93:ruuf">
                            What Our Students Say
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="got_ylw">
                            Join thousands of satisfied learners who have transformed their careers
                            with Merge.
                        </p>
                    </div>

                    <div className="relative" data-oid="tq3:x01">
                        <div className="overflow-hidden" data-oid="yrn5zz4">
                            <div
                                className="flex transition-transform duration-500"
                                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                                data-oid="e02jv01"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="min-w-full px-4" data-oid="5ea3v69">
                                        <div
                                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-3xl mx-auto"
                                            data-oid="_afxi_h"
                                        >
                                            <div
                                                className="flex items-center mb-6"
                                                data-oid="a1iv0.9"
                                            >
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                    data-oid="5nyxg6x"
                                                />

                                                <div className="ml-4" data-oid="0fvivf4">
                                                    <h3
                                                        className="text-xl font-semibold"
                                                        data-oid="kmfai.n"
                                                    >
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-gray-400" data-oid=".p3ept7">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                className="text-lg text-gray-300 italic"
                                                data-oid="p0byarl"
                                            >
                                                "{testimonial.content}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 space-x-2" data-oid="tex7prb">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-purple-500' : 'bg-gray-600'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    data-oid="xom8rj0"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="z25ks96">
                <div className="max-w-6xl mx-auto" data-oid="ygnl0w:">
                    <div className="flex justify-between items-end mb-12" data-oid="7dnv_v-">
                        <div data-oid="kyduq9d">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="3vlg_h2">
                                Upcoming Events
                            </h2>
                            <p className="text-xl text-gray-300" data-oid="3ok43tb">
                                Join our workshops, webinars, and hackathons
                            </p>
                        </div>
                        <a
                            href="/workshops"
                            className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="z7hqew6"
                        >
                            View All Events →
                        </a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="kpzcfb1">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1"
                                data-oid="diblpt4"
                            >
                                <div
                                    className="flex justify-between items-center mb-4"
                                    data-oid="692sqro"
                                >
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            event.type === 'Workshop'
                                                ? 'bg-blue-500/20 text-blue-300'
                                                : event.type === 'Hackathon'
                                                  ? 'bg-green-500/20 text-green-300'
                                                  : 'bg-yellow-500/20 text-yellow-300'
                                        }`}
                                        data-oid="ciyiaj1"
                                    >
                                        {event.type}
                                    </span>
                                    <span
                                        className={`text-sm font-medium ${
                                            event.price === 'Free' ? 'text-green-400' : 'text-white'
                                        }`}
                                        data-oid="9:plei_"
                                    >
                                        {event.price}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2" data-oid="mpzxom8">
                                    {event.title}
                                </h3>
                                <div className="text-gray-400 mb-6" data-oid="6:v-wnq">
                                    <div className="flex items-center mb-1" data-oid="mtl8v3n">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="drns4r8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="wanqbn_"
                                            />
                                        </svg>
                                        <span data-oid="h4gjiey">{event.date}</span>
                                    </div>
                                    <div className="flex items-center" data-oid="3kj-2of">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="fm8dz.z"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                data-oid="gla.p_r"
                                            />
                                        </svg>
                                        <span data-oid="-zj941g">{event.time}</span>
                                    </div>
                                </div>
                                <a
                                    href={`/${event.type.toLowerCase()}s/${index}`}
                                    className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                    data-oid="m:.myr7"
                                >
                                    Register Now
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden" data-oid="1ho4dsv">
                        <a
                            href="/workshops"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="1wg1qs7"
                        >
                            View All Events →
                        </a>
                    </div>
                </div>
            </section>

            {/* Newsletter & WhatsApp CTA */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="0c8ynja">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12" data-oid="-infkze">
                    <div
                        className="bg-gray-800 p-8 rounded-xl border border-gray-700"
                        data-oid="__fm7bk"
                    >
                        <h3 className="text-2xl font-bold mb-4" data-oid="zst3a-6">
                            Subscribe to Our Newsletter
                        </h3>
                        <p className="text-gray-300 mb-6" data-oid="qmne29r">
                            Get updates on new courses, events, and tech insights directly to your
                            inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3" data-oid="mdp0i_k">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                data-oid="29c0_tt"
                            />

                            <button
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium whitespace-nowrap"
                                data-oid="rj6ubcz"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-xl border border-purple-800"
                        data-oid="5usoqo8"
                    >
                        <div className="flex items-center mb-6" data-oid="aqz-rhj">
                            <div
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                                data-oid="sv8xk7h"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-oid="as5gefw"
                                >
                                    <path
                                        d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9 16.124 19.0521 17.6242 17.5518C19.1245 16.0516 19.9724 14.0273 19.9724 11.9176C19.9724 9.80781 19.1245 7.78361 17.6242 6.28333C17.6161 6.27519 17.6081 6.26709 17.6 6.25999V6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.512 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.635 11.92C18.635 13.6664 17.916 15.3418 16.66 16.57C15.4995 17.6812 13.9687 18.3141 12.37 18.37L12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6033 13.4958 10.768 14.5293 12.16 15.17C12.5631 15.3312 12.9836 15.4424 13.41 15.5C13.7798 15.5726 14.1601 15.5413 14.5122 15.4091C14.8643 15.2769 15.1761 15.0481 15.42 14.75C15.5325 14.5251 15.6111 14.2828 15.6528 14.0315C15.6945 13.7802 15.6986 13.5229 15.6648 13.27C15.6648 13.27 15.81 13.69 15.61 13.59Z"
                                        fill="#25D366"
                                        data-oid="jn::x6w"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold ml-4" data-oid="755.y:1">
                                Join Our WhatsApp Community
                            </h3>
                        </div>
                        <p className="text-gray-300 mb-6" data-oid="vyj3t3:">
                            Connect with fellow learners, get instant updates, and access exclusive
                            resources.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/YourGroupInviteLink"
                            className="block w-full py-3 text-center rounded-md bg-[#25D366] hover:bg-[#20BD5A] transition-colors font-medium text-black"
                            data-oid=":q8jbx9"
                        >
                            Join WhatsApp Group
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="k87zipy"
            >
                <div className="max-w-6xl mx-auto" data-oid="trr0ts.">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="b2_.cw7">
                        <div data-oid="elfcsbe">
                            <Link href="/" data-oid="o7nbxop">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="ejtczs2"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="69-00w.">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-4" data-oid="nvk339b">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="6urs7cp"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="-9vp6ka"
                                    >
                                        <path
                                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                                            data-oid=":n__25:"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="t2n58i."
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="6r13af."
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="j592h2x"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="dor-akj">
                            <h4 className="text-lg font-semibold mb-4" data-oid="02boap5">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="zydrxox">
                                <li data-oid="b.d-iiz">
                                    <a
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="nijyo5v"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li data-oid="cekvr83">
                                    <a
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="_7ny2jc"
                                    >
                                        Courses
                                    </a>
                                </li>
                                <li data-oid="rpoeehy">
                                    <a
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="e2tuvyp"
                                    >
                                        Workshops
                                    </a>
                                </li>
                                <li data-oid="8q-6lh.">
                                    <a
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="7lbt6wa"
                                    >
                                        Hackathons
                                    </a>
                                </li>
                                <li data-oid=".:84drl">
                                    <a
                                        href="/login"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="qmad4mf"
                                    >
                                        Login
                                    </a>
                                </li>
                                <li data-oid="q-f3l0n">
                                    <a
                                        href="/signup"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="m:l-3ej"
                                    >
                                        Sign Up
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="u1:cfq2">
                            <h4 className="text-lg font-semibold mb-4" data-oid="wjsnq95">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid=".5rv-01">
                                <li data-oid="9k0wtpy">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="41hh5_u"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="d59ro5_">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid=":ffckvo"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="qi-ky7x">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="_ec3x9m"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid="c9r6.4m">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="a1k5pvw"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="eauvl53">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="-lgdru4"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="wfa_m.1">
                            <h4 className="text-lg font-semibold mb-4" data-oid="znsrszi">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="9h_u-vt">
                                <li className="flex items-start" data-oid="v3-_zuh">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="0yc9a7:"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="l:3d04k"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:info@merge.com"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ry61u6e"
                                    >
                                        admin@merge.org.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="_fefbow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="hfely5l"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="xaj_qwv"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+1234567890"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="vjtsy65"
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="k_pm07y">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="y3pn9z_"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="3_5hc8s"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="jmac.v7"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="wgir2gc">
                                        Dehradun, Uttarakhand, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="dhp:5-7"
                    >
                        <p data-oid="n.-j-xm">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                        <p className="text" data-oid="4cwnlp-">
                            Built with ❤️ by BitHive Technologies
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
