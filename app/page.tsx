'use client';

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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="lf8p04_">
            {/* Navbar */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="hy48g2v"
            >
                <div className="flex items-center" data-oid="o01--bl">
                    <div className="relative h-10 w-32" data-oid="b_x--ox">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid="ggtilap"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid="-6yw5sl"
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid="s_c0jyu">
                    <a
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="2d6e.u1"
                    >
                        Home
                    </a>
                    <a
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="i6t42cw"
                    >
                        Courses
                    </a>
                    <a
                        href="/workshops"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="o27tkiu"
                    >
                        Workshops
                    </a>
                    <a
                        href="/hackathons"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="oraxdh1"
                    >
                        Hackathons
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="aq55rko">
                    <a
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid="ttyd:qr"
                    >
                        Login
                    </a>
                    <a
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="1e2et8q"
                    >
                        Sign Up
                    </a>
                </div>

                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    data-oid="ljl4x5-"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="1k.g9co"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="oul7e2v"
                        />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 p-4" data-oid="5hppd3n">
                    <div className="flex flex-col space-y-3" data-oid="b:j0i5d">
                        <a
                            href="/"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="rr1mw__"
                        >
                            Home
                        </a>
                        <a
                            href="/courses"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="l8wmrsq"
                        >
                            Courses
                        </a>
                        <a
                            href="/workshops"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="kx0pjwn"
                        >
                            Workshops
                        </a>
                        <a
                            href="/hackathons"
                            className="hover:text-purple-400 transition-colors py-2"
                            data-oid="tr.6ljb"
                        >
                            Hackathons
                        </a>
                        <div className="pt-4 flex space-x-4" data-oid="q50ubo5">
                            <a
                                href="/login"
                                className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors text-center"
                                data-oid="vtzvsxa"
                            >
                                Login
                            </a>
                            <a
                                href="/signup"
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center"
                                data-oid="fhzwuo_"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section
                className="pt-10 pb-20 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 h-[700px]"
                data-oid="zn2v:g7"
            >
                <div
                    className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                    data-oid="b-stegf"
                >
                    <div className="py-8" data-oid="fyt2goq">
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                            data-oid="5kiltty"
                        >
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="3ne1zkt"
                            >
                                Merge Your Skills
                            </span>
                            <br data-oid="xlg56d1" />
                            <span data-oid="x.:33ow">With Opportunity</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-10" data-oid="rmmv3zp">
                            Join our community of learners and professionals to upskill, participate
                            in hackathons, and connect with industry experts.
                        </p>
                        <div
                            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-10"
                            data-oid="9:v-d7c"
                        ></div>
                        <div className="flex flex-col sm:flex-row gap-4" data-oid="x82u.on">
                            <a
                                href="/courses"
                                className="px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium text-lg"
                                data-oid="y931jx7"
                            >
                                Explore Courses
                            </a>
                            <a
                                href="/signup"
                                className="px-8 py-4 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors text-center font-medium text-lg"
                                data-oid="-0o5ol7"
                            >
                                Join Now
                            </a>
                        </div>
                    </div>
                    <div className="hidden md:block relative" data-oid="l7zwjwm">
                        <div
                            className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="0z8ar8:"
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid="d0etzvh"
                        ></div>
                        <div
                            className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                            data-oid="5z4emav"
                        ></div>
                        <div
                            className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300"
                            data-oid="q5bt0ph"
                        >
                            <div className="flex items-center mb-6" data-oid=":ddeq09">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                                    data-oid="q11alpl"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="afx6x4a"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="8qmgkwa"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4" data-oid="cri4ea4">
                                    <h3 className="text-xl font-semibold" data-oid="zbb7qp-">
                                        Learn at Your Pace
                                    </h3>
                                    <p className="text-gray-400" data-oid="_uyah2p">
                                        Access courses anytime, anywhere
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center mb-6" data-oid="0zdv7:v">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                                    data-oid="kk:5..w"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="29f0uqb"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            data-oid="jz7g9pq"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4" data-oid="yvjew-y">
                                    <h3 className="text-xl font-semibold" data-oid="ljg7bb7">
                                        Community Support
                                    </h3>
                                    <p className="text-gray-400" data-oid="8ug5wx:">
                                        Join WhatsApp groups for each course
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center" data-oid="l2ti17k">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                                    data-oid="fwbnfdw"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="_s0bmdi"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="co91zdy"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4" data-oid="3cddtbk">
                                    <h3 className="text-xl font-semibold" data-oid="sh9_w4t">
                                        Real-world Projects
                                    </h3>
                                    <p className="text-gray-400" data-oid="v9t2t0x">
                                        Build your portfolio with hackathons
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="whn-zgh">
                <div className="max-w-6xl mx-auto" data-oid="a7daol3">
                    <div className="text-center mb-16" data-oid="sxsy-2i">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="7qjgij1">
                            Why Choose{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="l5ip.47"
                            >
                                Merge
                            </span>
                            ?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="w6lvcnh">
                            We combine learning, practice, and networking to give you the complete
                            package for tech career growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="h99nb_w">
                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                            data-oid="l35gi2b"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6"
                                data-oid="g:ivin7"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="plpuc6i"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        data-oid="tq.8tv0"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3" data-oid="1s:z6yq">
                                Industry-Relevant Curriculum
                            </h3>
                            <p className="text-gray-300" data-oid="idio5qu">
                                Our courses are designed by industry experts to ensure you learn
                                skills that are in demand right now.
                            </p>
                        </div>

                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                            data-oid="6cl1h4e"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6"
                                data-oid="oxayo:a"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="i4ft6hc"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        data-oid="0abwpcm"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3" data-oid="lm8lx3a">
                                Hands-on Hackathons
                            </h3>
                            <p className="text-gray-300" data-oid="g6474g3">
                                Apply your knowledge in competitive hackathons with real prizes and
                                recognition opportunities.
                            </p>
                        </div>

                        <div
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                            data-oid="vwfaf2x"
                        >
                            <div
                                className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6"
                                data-oid="10zxgbj"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    data-oid="qp30kjf"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                        data-oid="sum:bef"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3" data-oid="5n8-w7w">
                                Active Community
                            </h3>
                            <p className="text-gray-300" data-oid="6:-h5i5">
                                Join our WhatsApp groups for each course to get support, network,
                                and collaborate with peers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Preview Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="r53qynn">
                <div className="max-w-6xl mx-auto" data-oid="9xcl8b0">
                    <div className="flex justify-between items-end mb-12" data-oid="1ce0vny">
                        <div data-oid="lcrj-2j">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="_so13eo">
                                Featured Courses
                            </h2>
                            <p className="text-xl text-gray-300" data-oid="53h9n:l">
                                Start your learning journey with our top courses
                            </p>
                        </div>
                        <a
                            href="/courses"
                            className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="b5x6cmb"
                        >
                            View All Courses →
                        </a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="k1a55b7">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1"
                                data-oid="6ur_odj"
                            >
                                <div className="h-48 overflow-hidden" data-oid="1v555sx">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                        data-oid="g9a507b"
                                    />
                                </div>
                                <div className="p-6" data-oid="f_92nkn">
                                    <div
                                        className="flex justify-between items-start mb-4"
                                        data-oid="-wi83cj"
                                    >
                                        <h3 className="text-xl font-semibold" data-oid="kric4qc">
                                            {course.title}
                                        </h3>
                                        <span
                                            className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm"
                                            data-oid="ts.i-em"
                                        >
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-4" data-oid="qzzq__g">
                                        <div
                                            className="w-8 h-8 rounded-full bg-gray-600 mr-3"
                                            data-oid=".405rlo"
                                        ></div>
                                        <span className="text-gray-300" data-oid="-8a75pf">
                                            {course.instructor}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between text-gray-400 mb-6"
                                        data-oid="9pmxbmz"
                                    >
                                        <span data-oid="_ee9qoo">{course.duration}</span>
                                        <span className="text-white font-medium" data-oid="f4:du3y">
                                            {course.price}
                                        </span>
                                    </div>
                                    <a
                                        href={`/courses/${index}`}
                                        className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                        data-oid=".6zh9b4"
                                    >
                                        Enroll Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden" data-oid="ees4ifi">
                        <a
                            href="/courses"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="j3g0vk3"
                        >
                            View All Courses →
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-900 to-black"
                data-oid="a9xbe.t"
            >
                <div className="max-w-6xl mx-auto" data-oid=".-do:vs">
                    <div className="text-center mb-16" data-oid="wp.mkru">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="jizkyp7">
                            What Our Students Say
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="-0r9vth">
                            Join thousands of satisfied learners who have transformed their careers
                            with Merge.
                        </p>
                    </div>

                    <div className="relative" data-oid="5eoib_q">
                        <div className="overflow-hidden" data-oid="_9gs00a">
                            <div
                                className="flex transition-transform duration-500"
                                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                                data-oid="mcgoa4x"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="min-w-full px-4" data-oid="_zzai:t">
                                        <div
                                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-3xl mx-auto"
                                            data-oid="qf43w.y"
                                        >
                                            <div
                                                className="flex items-center mb-6"
                                                data-oid="p7pmizu"
                                            >
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                    data-oid=".13ss0y"
                                                />

                                                <div className="ml-4" data-oid="v1n_3wo">
                                                    <h3
                                                        className="text-xl font-semibold"
                                                        data-oid="3tw2-wf"
                                                    >
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-gray-400" data-oid="g9es:j_">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                className="text-lg text-gray-300 italic"
                                                data-oid="xl-lvh-"
                                            >
                                                "{testimonial.content}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 space-x-2" data-oid="ji2_qwp">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-purple-500' : 'bg-gray-600'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    data-oid="nbgjyuc"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="3-g8669">
                <div className="max-w-6xl mx-auto" data-oid="j_jz1y9">
                    <div className="flex justify-between items-end mb-12" data-oid="3_1_k85">
                        <div data-oid="u8a07h9">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="bfwl-z4">
                                Upcoming Events
                            </h2>
                            <p className="text-xl text-gray-300" data-oid="-axnl.:">
                                Join our workshops, webinars, and hackathons
                            </p>
                        </div>
                        <a
                            href="/workshops"
                            className="hidden md:block text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="6_vewho"
                        >
                            View All Events →
                        </a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="_tqiss:">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1"
                                data-oid="w8zj.81"
                            >
                                <div
                                    className="flex justify-between items-center mb-4"
                                    data-oid="pnjssgf"
                                >
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            event.type === 'Workshop'
                                                ? 'bg-blue-500/20 text-blue-300'
                                                : event.type === 'Hackathon'
                                                  ? 'bg-green-500/20 text-green-300'
                                                  : 'bg-yellow-500/20 text-yellow-300'
                                        }`}
                                        data-oid="py6612."
                                    >
                                        {event.type}
                                    </span>
                                    <span
                                        className={`text-sm font-medium ${
                                            event.price === 'Free' ? 'text-green-400' : 'text-white'
                                        }`}
                                        data-oid="6xt2gfw"
                                    >
                                        {event.price}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2" data-oid="u8nzopz">
                                    {event.title}
                                </h3>
                                <div className="text-gray-400 mb-6" data-oid="5.itwe2">
                                    <div className="flex items-center mb-1" data-oid="y-le84p">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="eth.fp:"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                data-oid="8fx5il8"
                                            />
                                        </svg>
                                        <span data-oid="8xoskek">{event.date}</span>
                                    </div>
                                    <div className="flex items-center" data-oid="3gvm8ww">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            data-oid="fmdxq-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                data-oid="ll:igm3"
                                            />
                                        </svg>
                                        <span data-oid="dr2m34i">{event.time}</span>
                                    </div>
                                </div>
                                <a
                                    href={`/${event.type.toLowerCase()}s/${index}`}
                                    className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                    data-oid="xsai61l"
                                >
                                    Register Now
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden" data-oid="vevk6mx">
                        <a
                            href="/workshops"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            data-oid="1or1a_g"
                        >
                            View All Events →
                        </a>
                    </div>
                </div>
            </section>

            {/* Newsletter & WhatsApp CTA */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="0_lzarg">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12" data-oid="nh5sewg">
                    <div
                        className="bg-gray-800 p-8 rounded-xl border border-gray-700"
                        data-oid="iiwd1gx"
                    >
                        <h3 className="text-2xl font-bold mb-4" data-oid="mfydqci">
                            Subscribe to Our Newsletter
                        </h3>
                        <p className="text-gray-300 mb-6" data-oid="3b_b:--">
                            Get updates on new courses, events, and tech insights directly to your
                            inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3" data-oid="lvdg7tr">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                                data-oid="-z9p5mx"
                            />

                            <button
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium whitespace-nowrap"
                                data-oid="c2iw8oq"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-xl border border-purple-800"
                        data-oid="_e50myg"
                    >
                        <div className="flex items-center mb-6" data-oid="jcv36.p">
                            <div
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                                data-oid="vwjc.y5"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-oid="hlpilwf"
                                >
                                    <path
                                        d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9 16.124 19.0521 17.6242 17.5518C19.1245 16.0516 19.9724 14.0273 19.9724 11.9176C19.9724 9.80781 19.1245 7.78361 17.6242 6.28333C17.6161 6.27519 17.6081 6.26709 17.6 6.25999V6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.512 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.635 11.92C18.635 13.6664 17.916 15.3418 16.66 16.57C15.4995 17.6812 13.9687 18.3141 12.37 18.37L12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6033 13.4958 10.768 14.5293 12.16 15.17C12.5631 15.3312 12.9836 15.4424 13.41 15.5C13.7798 15.5726 14.1601 15.5413 14.5122 15.4091C14.8643 15.2769 15.1761 15.0481 15.42 14.75C15.5325 14.5251 15.6111 14.2828 15.6528 14.0315C15.6945 13.7802 15.6986 13.5229 15.6648 13.27C15.6648 13.27 15.81 13.69 15.61 13.59Z"
                                        fill="#25D366"
                                        data-oid="jyhb4t-"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold ml-4" data-oid="36n3o5t">
                                Join Our WhatsApp Community
                            </h3>
                        </div>
                        <p className="text-gray-300 mb-6" data-oid="u6cfjcv">
                            Connect with fellow learners, get instant updates, and access exclusive
                            resources.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/YourGroupInviteLink"
                            className="block w-full py-3 text-center rounded-md bg-[#25D366] hover:bg-[#20BD5A] transition-colors font-medium text-black"
                            data-oid="04seie_"
                        >
                            Join WhatsApp Group
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="t26vrr7"
            >
                <div className="max-w-6xl mx-auto" data-oid="xltepwd">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="f4ca2ji">
                        <div data-oid="6iuycj0">
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4"
                                data-oid="-pu9add"
                            >
                                MERGE
                            </div>
                            <p className="text-gray-400 mb-6" data-oid="5ufyskj">
                                Empowering tech enthusiasts to learn, build, and grow together.
                            </p>
                            <div className="flex space-x-4" data-oid="963k7_s">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="myuokz4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="w9zsc0-"
                                    >
                                        <path
                                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                                            data-oid="gyv3lpa"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="9-0f39p"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="tuhn.mf"
                                    >
                                        <path
                                            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                                            data-oid="ax2r8vz"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="gzaocr1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="w64dzkz"
                                    >
                                        <path
                                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                                            data-oid="kz:8pek"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="r1qyoq0"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="jy1bjiq"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="6wg-zab"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="2xb-djg">
                            <h4 className="text-lg font-semibold mb-4" data-oid="vidp_8p">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="o-ag0kk">
                                <li data-oid="sqyx.19">
                                    <a
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="5r5dqul"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li data-oid="kd8j.55">
                                    <a
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="b8us4m2"
                                    >
                                        Courses
                                    </a>
                                </li>
                                <li data-oid="7tdn:e9">
                                    <a
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="pkr_we."
                                    >
                                        Workshops
                                    </a>
                                </li>
                                <li data-oid="ibn4fe0">
                                    <a
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid=":k:6l8u"
                                    >
                                        Hackathons
                                    </a>
                                </li>
                                <li data-oid="bpy16p:">
                                    <a
                                        href="/login"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="7ez8qle"
                                    >
                                        Login
                                    </a>
                                </li>
                                <li data-oid="v3_7ncm">
                                    <a
                                        href="/signup"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="1n1m5po"
                                    >
                                        Sign Up
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="du3seg5">
                            <h4 className="text-lg font-semibold mb-4" data-oid="mgym-kn">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="w0a3t-_">
                                <li data-oid="xynhro1">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="s376ya:"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="m_pr4qo">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="upvb91r"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="xvvfo7r">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="9w3gw7:"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid=".hf513d">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="s9xb-f4"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="3metny1">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="n6so1v4"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="5wzocr0">
                            <h4 className="text-lg font-semibold mb-4" data-oid="ucg8ca4">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="hmno8r7">
                                <li className="flex items-start" data-oid="z:g4e:x">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="m.67jbs"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="w3d7id5"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:info@merge.com"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="4kg1el_"
                                    >
                                        info@merge.com
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="1ys-dk-">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="l.qt5h8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="6nakv:-"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+1234567890"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid=":7qunvl"
                                    >
                                        +1 (234) 567-890
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="sm6._58">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="y9qkjlf"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="u-9m153"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="8k1n9fj"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="22a:r9-">
                                        123 Tech Street, Innovation City, 10001
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-center text-gray-500"
                        data-oid="7ha.p1."
                    >
                        <p data-oid="5.7q4kt">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
