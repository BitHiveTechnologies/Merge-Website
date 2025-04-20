'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Hackathon type definition
interface Hackathon {
    id: number;
    title: string;
    organizer: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    image: string;
}

export default function HackathonRegistrationPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [hackathon, setHackathon] = useState<Hackathon | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        institution: '',
        teamName: '',
        teamSize: '1',
        track: '',
        experience: '',
        expectations: '',
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Fetch hackathon details (simulated)
    useEffect(() => {
        const fetchHackathonDetails = () => {
            setIsLoading(true);

            // In a real app, this would be an API call with the ID
            setTimeout(() => {
                // Simulated API response
                const hackathonData: Hackathon = {
                    id: parseInt(params.id),
                    title: 'HackBIT 2025',
                    organizer: 'BIT MESRA, PATNA',
                    startDate: '2025-03-15',
                    endDate: '2025-03-16',
                    location: 'BIT Mesra, Patna Campus',
                    description:
                        'HackBIT 2025 is a high-energy, innovation-driven hackathon where participants tackle real-world challenges using cutting-edge technologies.',
                    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                };

                setHackathon(hackathonData);
                setIsLoading(false);
            }, 1000);
        };

        fetchHackathonDetails();
    }, [params.id]);

    // Handle form input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone number should be 10 digits';
        }

        if (!formData.institution.trim()) {
            newErrors.institution = 'Institution/Organization is required';
        }

        if (!formData.teamName.trim()) {
            newErrors.teamName = 'Team name is required';
        }

        if (!formData.track) {
            newErrors.track = 'Please select a track';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);

                // In a real app, you would send the form data to your backend here
                console.log('Form submitted:', formData);
            }, 1500);
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="fxafagu">
            {/* Navbar - reusing from main page */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="kr38jur"
            >
                <div className="flex items-center" data-oid="ikzf.e4">
                    <div className="relative h-10 w-32" data-oid="w.ctyd3">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid="i-l.bsm"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid=".t92ybh"
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid=".ywx1m_">
                    <a
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="n:fi:hg"
                    >
                        Home
                    </a>
                    <a
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="6b-15s0"
                    >
                        Courses
                    </a>
                    <a
                        href="/workshops"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="2fsiavx"
                    >
                        Workshops
                    </a>
                    <a
                        href="/hackathons"
                        className="text-purple-400 transition-colors"
                        data-oid="4ju04ld"
                    >
                        Hackathons
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="40wxw1n">
                    <a
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid="apzg2l7"
                    >
                        Login
                    </a>
                    <a
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="0gys82m"
                    >
                        Sign Up
                    </a>
                </div>

                <button className="md:hidden text-white" data-oid="6vsdd06">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid=":dztc5v"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="3ps3myy"
                        />
                    </svg>
                </button>
            </nav>

            {/* Registration Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="lpy11f2">
                <div className="max-w-4xl mx-auto" data-oid="vn4myxp">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="0kpz8be">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="ru.cjol"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <>
                            {/* Back button */}
                            <button
                                onClick={() => router.push(`/hackathons/${hackathon.id}`)}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="7myhe6o"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid=".joh39u"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="bvv.eos"
                                    />
                                </svg>
                                Back to Hackathon Details
                            </button>

                            {isSubmitted ? (
                                <div
                                    className="bg-gray-800/30 rounded-xl p-8 text-center"
                                    data-oid="87na.wd"
                                >
                                    <div
                                        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                        data-oid="orp-x9d"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-green-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="6vzxz.:"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                                data-oid="jla.716"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4" data-oid="tv.sf:e">
                                        Registration Successful!
                                    </h2>
                                    <p className="text-gray-300 mb-6" data-oid="tc6p1u3">
                                        Thank you for registering for {hackathon.title}. We've sent
                                        a confirmation email to {formData.email} with all the
                                        details.
                                    </p>
                                    <div
                                        className="bg-gray-700/30 p-6 rounded-lg mb-6 max-w-md mx-auto"
                                        data-oid="wdq0.60"
                                    >
                                        <div className="text-left mb-4" data-oid="ez_7943">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid="pd9-376"
                                            >
                                                Registration ID
                                            </div>
                                            <div className="font-medium" data-oid="f3:g2g:">
                                                HACKBIT2025-
                                                {Math.floor(Math.random() * 10000)
                                                    .toString()
                                                    .padStart(4, '0')}
                                            </div>
                                        </div>
                                        <div className="text-left mb-4" data-oid=":d6o:f_">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid="m:wnpvy"
                                            >
                                                Team Name
                                            </div>
                                            <div className="font-medium" data-oid="5a2pb7f">
                                                {formData.teamName}
                                            </div>
                                        </div>
                                        <div className="text-left" data-oid="jb505qg">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid=":emwpae"
                                            >
                                                Track
                                            </div>
                                            <div className="font-medium" data-oid="a5ek46v">
                                                {formData.track}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col sm:flex-row gap-4 justify-center"
                                        data-oid="b02f8td"
                                    >
                                        <button
                                            onClick={() => router.push('/hackathons')}
                                            className="px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                            data-oid="zcszunc"
                                        >
                                            Back to Hackathons
                                        </button>
                                        <button
                                            onClick={() => window.print()}
                                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                                            data-oid="-522ccy"
                                        >
                                            Print Confirmation
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-12" data-oid="xunpv3c">
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="5zi-byj"
                                        >
                                            Register for {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-gray-300 max-w-2xl mx-auto"
                                            data-oid="ti4t-iy"
                                        >
                                            Fill out the form below to register for the hackathon.
                                            Make sure to provide accurate information as this will
                                            be used for communication and team formation.
                                        </p>
                                    </div>

                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6 mb-8"
                                        data-oid="8.81zrw"
                                    >
                                        <div
                                            className="flex flex-col md:flex-row gap-6 items-center"
                                            data-oid="6l6r7y9"
                                        >
                                            <div className="w-full md:w-1/4" data-oid="elauzbj">
                                                <img
                                                    src={hackathon.image}
                                                    alt={hackathon.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                    data-oid="j-y:oga"
                                                />
                                            </div>
                                            <div className="w-full md:w-3/4" data-oid="vut_o1h">
                                                <h2
                                                    className="text-xl font-semibold mb-2"
                                                    data-oid="3uvyoza"
                                                >
                                                    {hackathon.title}
                                                </h2>
                                                <p
                                                    className="text-gray-400 text-sm mb-4"
                                                    data-oid="-stk4tm"
                                                >
                                                    {hackathon.description}
                                                </p>
                                                <div
                                                    className="flex flex-wrap gap-4 text-sm"
                                                    data-oid="8u5x_0s"
                                                >
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="n:z32s3"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="uepsyr3"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                                clipRule="evenodd"
                                                                data-oid="s99ia3:"
                                                            />
                                                        </svg>
                                                        <span data-oid="1mls6sb">
                                                            {formatDate(hackathon.startDate)} -{' '}
                                                            {formatDate(hackathon.endDate)}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="6zj.yig"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="gqvq71z"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                clipRule="evenodd"
                                                                data-oid="vp8gx-v"
                                                            />
                                                        </svg>
                                                        <span data-oid="9p5-jjl">
                                                            {hackathon.location}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="au5bos5"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="gmj.:cz"
                                                        >
                                                            <path
                                                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                                                data-oid=":8wwla3"
                                                            />
                                                        </svg>
                                                        <span data-oid="f9t5_rk">
                                                            Organized by {hackathon.organizer}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-8"
                                        data-oid="ds7xqhd"
                                    >
                                        {/* Personal Information */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="k8tkilq"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="5ipsdyv"
                                            >
                                                Personal Information
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="ra0r3z4"
                                            >
                                                <div data-oid="i9jbntr">
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="j502j:l"
                                                    >
                                                        Full Name{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="dfghkd2"
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className={cn(
                                                            'w-full px-4 py-2 rounded-md bg-gray-700 border focus:outline-none focus:ring-2',
                                                            errors.name
                                                                ? 'border-red-500 focus:ring-red-500'
                                                                : 'border-gray-600 focus:ring-purple-500',
                                                        )}
                                                        placeholder="Enter your full name"
                                                        data-oid="joynhv4"
                                                    />

                                                    {errors.name && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="139byab"
                                                        >
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="7c4qky8">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="kevqgt6"
                                                    >
                                                        Email Address{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="3vx6ud9"
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className={cn(
                                                            'w-full px-4 py-2 rounded-md bg-gray-700 border focus:outline-none focus:ring-2',
                                                            errors.email
                                                                ? 'border-red-500 focus:ring-red-500'
                                                                : 'border-gray-600 focus:ring-purple-500',
                                                        )}
                                                        placeholder="Enter your email address"
                                                        data-oid="y_c6sgq"
                                                    />

                                                    {errors.email && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="n.-:4pk"
                                                        >
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="myty0ix">
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="xur16r_"
                                                    >
                                                        Phone Number{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="a.y84uy"
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className={cn(
                                                            'w-full px-4 py-2 rounded-md bg-gray-700 border focus:outline-none focus:ring-2',
                                                            errors.phone
                                                                ? 'border-red-500 focus:ring-red-500'
                                                                : 'border-gray-600 focus:ring-purple-500',
                                                        )}
                                                        placeholder="Enter your phone number"
                                                        data-oid=":wszcjr"
                                                    />

                                                    {errors.phone && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="qougfgm"
                                                        >
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="tnw8.bl">
                                                    <label
                                                        htmlFor="institution"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="7iknkd_"
                                                    >
                                                        Institution/Organization{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="qx-w1m:"
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="institution"
                                                        name="institution"
                                                        value={formData.institution}
                                                        onChange={handleInputChange}
                                                        className={cn(
                                                            'w-full px-4 py-2 rounded-md bg-gray-700 border focus:outline-none focus:ring-2',
                                                            errors.institution
                                                                ? 'border-red-500 focus:ring-red-500'
                                                                : 'border-gray-600 focus:ring-purple-500',
                                                        )}
                                                        placeholder="Enter your institution or organization"
                                                        data-oid="u3l5w0s"
                                                    />

                                                    {errors.institution && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="l.cvj.0"
                                                        >
                                                            {errors.institution}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Team Information */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="m33u7d_"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="8t2tkad"
                                            >
                                                Team Information
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="9oolcsl"
                                            >
                                                <div data-oid="jp9dcoc">
                                                    <label
                                                        htmlFor="teamName"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="evhn9p-"
                                                    >
                                                        Team Name{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="df9pkc."
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="teamName"
                                                        name="teamName"
                                                        value={formData.teamName}
                                                        onChange={handleInputChange}
                                                        className={cn(
                                                            'w-full px-4 py-2 rounded-md bg-gray-700 border focus:outline-none focus:ring-2',
                                                            errors.teamName
                                                                ? 'border-red-500 focus:ring-red-500'
                                                                : 'border-gray-600 focus:ring-purple-500',
                                                        )}
                                                        placeholder="Enter your team name"
                                                        data-oid="tkrcdks"
                                                    />

                                                    {errors.teamName && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="-cvvy9j"
                                                        >
                                                            {errors.teamName}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="-s02ccx">
                                                    <label
                                                        htmlFor="teamSize"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="witd1w2"
                                                    >
                                                        Team Size
                                                    </label>
                                                    <select
                                                        id="teamSize"
                                                        name="teamSize"
                                                        value={formData.teamSize}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                        data-oid="yrkj9p8"
                                                    >
                                                        <option value="1" data-oid="2-8qohc">
                                                            1 (Individual)
                                                        </option>
                                                        <option value="2" data-oid="b9zd97i">
                                                            2 Members
                                                        </option>
                                                        <option value="3" data-oid="k97eaup">
                                                            3 Members
                                                        </option>
                                                        <option value="4" data-oid="laof5v_">
                                                            4 Members
                                                        </option>
                                                        <option value="5" data-oid="n1xy5tj">
                                                            5 Members
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div
                                                className="mt-4 text-gray-400 text-sm"
                                                data-oid="vaxz23z"
                                            >
                                                <p data-oid="98vtc-p">
                                                    Note: You can register as an individual or with
                                                    a team. If you're registering as a team, you'll
                                                    be able to add team members' details after
                                                    registration.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hackathon Preferences */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="n:l19mh"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="07kd22t"
                                            >
                                                Hackathon Preferences
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="cridv-r"
                                            >
                                                <div data-oid="a8gwbbj">
                                                    <label
                                                        htmlFor="track"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="9yurkmt"
                                                    >
                                                        Preferred Track{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="vxsz6hq"
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        id="track"
                                                        name="track"
                                                        value={formData.track}
                                                        onChange={handleInputChange}
                                                        className={cn(
                                                            'w-full px-4 py-2 rounded-md bg-gray-700 border focus:outline-none focus:ring-2',
                                                            errors.track
                                                                ? 'border-red-500 focus:ring-red-500'
                                                                : 'border-gray-600 focus:ring-purple-500',
                                                        )}
                                                        data-oid="s4wt1gb"
                                                    >
                                                        <option value="" data-oid="ew89mcn">
                                                            Select a track
                                                        </option>
                                                        <option
                                                            value="Web Development"
                                                            data-oid="4ijodk5"
                                                        >
                                                            Web Development
                                                        </option>
                                                        <option
                                                            value="AI/ML & Data Science"
                                                            data-oid="4aaaldh"
                                                        >
                                                            AI/ML & Data Science
                                                        </option>
                                                    </select>
                                                    {errors.track && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="u-_:tgq"
                                                        >
                                                            {errors.track}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid=".h6s77y">
                                                    <label
                                                        htmlFor="experience"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="dj.4.:o"
                                                    >
                                                        Experience Level
                                                    </label>
                                                    <select
                                                        id="experience"
                                                        name="experience"
                                                        value={formData.experience}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                        data-oid="4_wc-l0"
                                                    >
                                                        <option value="" data-oid="rllsm-9">
                                                            Select your experience level
                                                        </option>
                                                        <option value="Beginner" data-oid="ou7_1gf">
                                                            Beginner (0-1 years)
                                                        </option>
                                                        <option
                                                            value="Intermediate"
                                                            data-oid="wv6k_t1"
                                                        >
                                                            Intermediate (1-3 years)
                                                        </option>
                                                        <option value="Advanced" data-oid="0-qj0rq">
                                                            Advanced (3+ years)
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mt-6" data-oid="1mo5i2b">
                                                <label
                                                    htmlFor="expectations"
                                                    className="block text-gray-300 mb-2"
                                                    data-oid="n3rf6k."
                                                >
                                                    What do you hope to achieve from this hackathon?
                                                </label>
                                                <textarea
                                                    id="expectations"
                                                    name="expectations"
                                                    value={formData.expectations}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Share your expectations and goals for participating in this hackathon..."
                                                    data-oid="skmuh-o"
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Terms and Conditions */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="g5pl5m4"
                                        >
                                            <div className="flex items-start" data-oid="ju:3ny.">
                                                <div
                                                    className="flex items-center h-5"
                                                    data-oid="66h6wd-"
                                                >
                                                    <input
                                                        id="agreeToTerms"
                                                        name="agreeToTerms"
                                                        type="checkbox"
                                                        checked={formData.agreeToTerms}
                                                        onChange={handleCheckboxChange}
                                                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                                                        data-oid="e8m8983"
                                                    />
                                                </div>
                                                <label
                                                    htmlFor="agreeToTerms"
                                                    className="ml-3 text-gray-300"
                                                    data-oid="l4lc299"
                                                >
                                                    I agree to the{' '}
                                                    <a
                                                        href="#"
                                                        className="text-purple-400 hover:underline"
                                                        data-oid="h2nc8y2"
                                                    >
                                                        terms and conditions
                                                    </a>{' '}
                                                    and{' '}
                                                    <a
                                                        href="#"
                                                        className="text-purple-400 hover:underline"
                                                        data-oid="na9na9k"
                                                    >
                                                        code of conduct
                                                    </a>
                                                    <span
                                                        className="text-red-500"
                                                        data-oid="jhuwvbq"
                                                    >
                                                        *
                                                    </span>
                                                </label>
                                            </div>
                                            {errors.agreeToTerms && (
                                                <p
                                                    className="text-red-500 text-sm mt-1"
                                                    data-oid="4ksygkp"
                                                >
                                                    {errors.agreeToTerms}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-center" data-oid="r4qaw0z">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    'px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium w-full md:w-auto',
                                                    isSubmitting && 'opacity-70 cursor-not-allowed',
                                                )}
                                                data-oid="a8_ytn2"
                                            >
                                                {isSubmitting ? (
                                                    <div
                                                        className="flex items-center justify-center"
                                                        data-oid="7iq9:z-"
                                                    >
                                                        <div
                                                            className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"
                                                            data-oid="u:7w3ps"
                                                        ></div>
                                                        Processing...
                                                    </div>
                                                ) : (
                                                    'Complete Registration'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20" data-oid="e_oojr_">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid=":em0x0a"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="0z.oj-l">
                                The hackathon you're trying to register for doesn't exist or has
                                been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="8pp6o2v"
                            >
                                Back to Hackathons
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="697ocz9"
            >
                <div className="max-w-6xl mx-auto" data-oid="5ad3:0m">
                    <div className="text-center text-gray-500" data-oid="50wmod6">
                        <p data-oid="h-yj9ho">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
