'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="xnvt04.">
            {/* Navbar - reusing from main page */}
            <nav
                className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800"
                data-oid="kt1d1kt"
            >
                <div className="flex items-center" data-oid="t_hfgg_">
                    <div className="relative h-10 w-32" data-oid="hfvfo9f">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            data-oid=".ev3n12"
                        >
                            <div
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-pink-500"
                                data-oid="c15z3v."
                            >
                                MERGE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8" data-oid=".msfiii">
                    <Link
                        href="/"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="0axewv5"
                    >
                        Home
                    </Link>
                    <Link
                        href="/courses"
                        className="hover:text-purple-400 transition-colors"
                        data-oid="-qg8hl-"
                    >
                        Courses
                    </Link>
                    <Link
                        href="/workshops"
                        className="hover:text-purple-400 transition-colors"
                        data-oid=":wh__pm"
                    >
                        Workshops
                    </Link>
                    <Link
                        href="/hackathons"
                        className="text-purple-400 transition-colors"
                        data-oid="6nsfyan"
                    >
                        Hackathons
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4" data-oid="0:r7e-c">
                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-md border border-purple-500 hover:bg-purple-500/10 transition-colors"
                        data-oid="n3ufzbw"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                        data-oid="okilwg1"
                    >
                        Sign Up
                    </Link>
                </div>

                <button className="md:hidden text-white" data-oid="53cyfv9">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="xadd-ev"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                            data-oid="nfhze4u"
                        />
                    </svg>
                </button>
            </nav>

            {/* Registration Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="u44hkpn">
                <div className="max-w-4xl mx-auto" data-oid="nf-0dp2">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="75m4hub">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="al07las"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <>
                            {/* Back button */}
                            <button
                                onClick={() => router.push(`/hackathons/${hackathon.id}`)}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid="x4anqag"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid=".gni6b9"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="bynj_zg"
                                    />
                                </svg>
                                Back to Hackathon Details
                            </button>

                            {isSubmitted ? (
                                <div
                                    className="bg-gray-800/30 rounded-xl p-8 text-center"
                                    data-oid="tcvl:9i"
                                >
                                    <div
                                        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                        data-oid="xbgvsli"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-green-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="3uskqvn"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                                data-oid="3-100no"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4" data-oid="yi5k7-a">
                                        Registration Successful!
                                    </h2>
                                    <p className="text-gray-300 mb-6" data-oid=".ku:y_9">
                                        Thank you for registering for {hackathon.title}. We've sent
                                        a confirmation email to {formData.email} with all the
                                        details.
                                    </p>
                                    <div
                                        className="bg-gray-700/30 p-6 rounded-lg mb-6 max-w-md mx-auto"
                                        data-oid="klmh::v"
                                    >
                                        <div className="text-left mb-4" data-oid="e0-0t5s">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid="iv752_1"
                                            >
                                                Registration ID
                                            </div>
                                            <div className="font-medium" data-oid="50.jfo4">
                                                HACKBIT2025-
                                                {Math.floor(Math.random() * 10000)
                                                    .toString()
                                                    .padStart(4, '0')}
                                            </div>
                                        </div>
                                        <div className="text-left mb-4" data-oid="._l_48_">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid=":exuexf"
                                            >
                                                Team Name
                                            </div>
                                            <div className="font-medium" data-oid="8m6gszk">
                                                {formData.teamName}
                                            </div>
                                        </div>
                                        <div className="text-left" data-oid="ayvf7r7">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid=":7tg89."
                                            >
                                                Track
                                            </div>
                                            <div className="font-medium" data-oid=".jm4u.5">
                                                {formData.track}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col sm:flex-row gap-4 justify-center"
                                        data-oid=":bw1-zq"
                                    >
                                        <button
                                            onClick={() => router.push('/hackathons')}
                                            className="px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                            data-oid="pm8coyv"
                                        >
                                            Back to Hackathons
                                        </button>
                                        <button
                                            onClick={() => window.print()}
                                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                                            data-oid=":vle.d8"
                                        >
                                            Print Confirmation
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-12" data-oid="b.j28rd">
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="lphf701"
                                        >
                                            Register for {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-gray-300 max-w-2xl mx-auto"
                                            data-oid="y4y:x-x"
                                        >
                                            Fill out the form below to register for the hackathon.
                                            Make sure to provide accurate information as this will
                                            be used for communication and team formation.
                                        </p>
                                    </div>

                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6 mb-8"
                                        data-oid="hjfdwck"
                                    >
                                        <div
                                            className="flex flex-col md:flex-row gap-6 items-center"
                                            data-oid="dz8i.dg"
                                        >
                                            <div className="w-full md:w-1/4" data-oid="gzguq4a">
                                                <div
                                                    className="relative w-full h-32 rounded-lg overflow-hidden"
                                                    data-oid="t55i21x"
                                                >
                                                    <Image
                                                        src={hackathon.image}
                                                        alt={hackathon.title}
                                                        fill
                                                        className="object-cover"
                                                        data-oid="3_1ukst"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-3/4" data-oid="2g_m_:r">
                                                <h2
                                                    className="text-xl font-semibold mb-2"
                                                    data-oid="-8xusz9"
                                                >
                                                    {hackathon.title}
                                                </h2>
                                                <p
                                                    className="text-gray-400 text-sm mb-4"
                                                    data-oid="-:.:3pi"
                                                >
                                                    {hackathon.description}
                                                </p>
                                                <div
                                                    className="flex flex-wrap gap-4 text-sm"
                                                    data-oid="o4.5a2j"
                                                >
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="z.cehpp"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="vr3bzl9"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                                clipRule="evenodd"
                                                                data-oid="7i7lh-1"
                                                            />
                                                        </svg>
                                                        <span data-oid="rd-qy09">
                                                            {formatDate(hackathon.startDate)} -{' '}
                                                            {formatDate(hackathon.endDate)}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="q5ut_j:"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="9smexma"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                clipRule="evenodd"
                                                                data-oid="55dxkpl"
                                                            />
                                                        </svg>
                                                        <span data-oid="lulhnax">
                                                            {hackathon.location}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="8a9mxaa"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="k4-r8au"
                                                        >
                                                            <path
                                                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                                                data-oid="rck4ium"
                                                            />
                                                        </svg>
                                                        <span data-oid="xe8bwj5">
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
                                        data-oid=".-_7an-"
                                    >
                                        {/* Personal Information */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="k0g67-c"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="q7tv.0z"
                                            >
                                                Personal Information
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="d52ze89"
                                            >
                                                <div data-oid="pvly1yb">
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="0xdm45c"
                                                    >
                                                        Full Name{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="s7_a:ti"
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
                                                        data-oid="0te._ip"
                                                    />

                                                    {errors.name && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="b7_b9py"
                                                        >
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="_jga6u7">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="d990kj."
                                                    >
                                                        Email Address{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="yr9p0ac"
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
                                                        data-oid="tmutumx"
                                                    />

                                                    {errors.email && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="a4zlb4i"
                                                        >
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="y8170f5">
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="p6v6o:1"
                                                    >
                                                        Phone Number{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="bvx0:1e"
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
                                                        data-oid="uy8tp.0"
                                                    />

                                                    {errors.phone && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="po:qx8q"
                                                        >
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="ck31cg2">
                                                    <label
                                                        htmlFor="institution"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="1ulr82c"
                                                    >
                                                        Institution/Organization{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="ocdfpqd"
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
                                                        data-oid=":621s9o"
                                                    />

                                                    {errors.institution && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="3jm81uc"
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
                                            data-oid="nixdtma"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid=".-9v.3u"
                                            >
                                                Team Information
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="6stpa:l"
                                            >
                                                <div data-oid="wt-cqxq">
                                                    <label
                                                        htmlFor="teamName"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="pwszcb5"
                                                    >
                                                        Team Name{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="4hh6x7v"
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
                                                        data-oid="_2fa23:"
                                                    />

                                                    {errors.teamName && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="9j-l288"
                                                        >
                                                            {errors.teamName}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid=".hhw8_3">
                                                    <label
                                                        htmlFor="teamSize"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="x_7z-37"
                                                    >
                                                        Team Size
                                                    </label>
                                                    <select
                                                        id="teamSize"
                                                        name="teamSize"
                                                        value={formData.teamSize}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                        data-oid="cc829-p"
                                                    >
                                                        <option value="1" data-oid="k2d2v7-">
                                                            1 (Individual)
                                                        </option>
                                                        <option value="2" data-oid="6zjd.61">
                                                            2 Members
                                                        </option>
                                                        <option value="3" data-oid="h6i4l2b">
                                                            3 Members
                                                        </option>
                                                        <option value="4" data-oid="ldva-hv">
                                                            4 Members
                                                        </option>
                                                        <option value="5" data-oid="96tuum.">
                                                            5 Members
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div
                                                className="mt-4 text-gray-400 text-sm"
                                                data-oid="7:zg_w9"
                                            >
                                                <p data-oid="kyvq.nz">
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
                                            data-oid="bqhoyq9"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="ce3h7ow"
                                            >
                                                Hackathon Preferences
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="plq2isa"
                                            >
                                                <div data-oid="3l.:1fh">
                                                    <label
                                                        htmlFor="track"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid=":6qh3q4"
                                                    >
                                                        Preferred Track{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="u1ai5ew"
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
                                                        data-oid="8oz_b1i"
                                                    >
                                                        <option value="" data-oid="b7:gnll">
                                                            Select a track
                                                        </option>
                                                        <option
                                                            value="Web Development"
                                                            data-oid="4pjafm2"
                                                        >
                                                            Web Development
                                                        </option>
                                                        <option
                                                            value="AI/ML & Data Science"
                                                            data-oid="a9.0_bc"
                                                        >
                                                            AI/ML & Data Science
                                                        </option>
                                                    </select>
                                                    {errors.track && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="x58xmmn"
                                                        >
                                                            {errors.track}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="w-dopv7">
                                                    <label
                                                        htmlFor="experience"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="--zxi7x"
                                                    >
                                                        Experience Level
                                                    </label>
                                                    <select
                                                        id="experience"
                                                        name="experience"
                                                        value={formData.experience}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                        data-oid="eskfybj"
                                                    >
                                                        <option value="" data-oid="lc64fie">
                                                            Select your experience level
                                                        </option>
                                                        <option value="Beginner" data-oid="44oeh:r">
                                                            Beginner (0-1 years)
                                                        </option>
                                                        <option
                                                            value="Intermediate"
                                                            data-oid="l9jg2et"
                                                        >
                                                            Intermediate (1-3 years)
                                                        </option>
                                                        <option value="Advanced" data-oid="kh8txwu">
                                                            Advanced (3+ years)
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mt-6" data-oid="72iu_o0">
                                                <label
                                                    htmlFor="expectations"
                                                    className="block text-gray-300 mb-2"
                                                    data-oid="ta0rs.j"
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
                                                    data-oid=":eq2ht3"
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Terms and Conditions */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="v9hukmr"
                                        >
                                            <div className="flex items-start" data-oid="_o:w0qb">
                                                <div
                                                    className="flex items-center h-5"
                                                    data-oid="k0o7wk1"
                                                >
                                                    <input
                                                        id="agreeToTerms"
                                                        name="agreeToTerms"
                                                        type="checkbox"
                                                        checked={formData.agreeToTerms}
                                                        onChange={handleCheckboxChange}
                                                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                                                        data-oid="l7sy.37"
                                                    />
                                                </div>
                                                <label
                                                    htmlFor="agreeToTerms"
                                                    className="ml-3 text-gray-300"
                                                    data-oid="-qf:spt"
                                                >
                                                    I agree to the{' '}
                                                    <Link
                                                        href="#"
                                                        className="text-purple-400 hover:underline"
                                                        data-oid="ynlj_x."
                                                    >
                                                        terms and conditions
                                                    </Link>{' '}
                                                    and{' '}
                                                    <Link
                                                        href="#"
                                                        className="text-purple-400 hover:underline"
                                                        data-oid="ocwcv-r"
                                                    >
                                                        code of conduct
                                                    </Link>
                                                    <span
                                                        className="text-red-500"
                                                        data-oid="xbs7w-e"
                                                    >
                                                        *
                                                    </span>
                                                </label>
                                            </div>
                                            {errors.agreeToTerms && (
                                                <p
                                                    className="text-red-500 text-sm mt-1"
                                                    data-oid="h017_vt"
                                                >
                                                    {errors.agreeToTerms}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-center" data-oid="6.krywn">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    'px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium w-full md:w-auto',
                                                    isSubmitting && 'opacity-70 cursor-not-allowed',
                                                )}
                                                data-oid="xz8bnqj"
                                            >
                                                {isSubmitting ? (
                                                    <div
                                                        className="flex items-center justify-center"
                                                        data-oid="u_mfc5i"
                                                    >
                                                        <div
                                                            className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"
                                                            data-oid="qdc8.hq"
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
                        <div className="text-center py-20" data-oid="68h01eb">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="-snyunq"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="ps7w1op">
                                The hackathon you're trying to register for doesn't exist or has
                                been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid=":o:qk7v"
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
                data-oid="lg8:s-y"
            >
                <div className="max-w-6xl mx-auto" data-oid="wzncfip">
                    <div className="text-center text-gray-500" data-oid="n8c_tm_">
                        <p data-oid="5wsigke">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
