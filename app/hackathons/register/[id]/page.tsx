'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Hackathon type definition
interface Hackathon {
    id: string;
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
    const [errors, setErrors] = useState<Record<string, string>>({
        form: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Fetch hackathon details from API
    useEffect(() => {
        const fetchHackathonDetails = async () => {
            setIsLoading(true);
            try {
                // Import the API service
                const { hackathonApi } = await import('@/lib/api');

                // Fetch hackathon by ID
                const hackathonData = await hackathonApi.getById(params.id);

                // Transform API data to match our interface
                const transformedHackathon: Hackathon = {
                    id: hackathonData._id,
                    title: hackathonData.title || 'Untitled Hackathon',
                    organizer: hackathonData.organizer || 'Unknown Organizer',
                    startDate: hackathonData.startDate || new Date().toISOString(),
                    endDate: hackathonData.endDate || new Date().toISOString(),
                    location: hackathonData.location || 'Online',
                    description: hackathonData.description || 'No description available',
                    image:
                        hackathonData.image ||
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                };

                setHackathon(transformedHackathon);
            } catch (error) {
                console.error('Failed to fetch hackathon details:', error);
                // If API fails, we'll show the "Hackathon not found" message
                setHackathon(null);
            } finally {
                setIsLoading(false);
            }
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            try {
                // Import the API service
                const { hackathonApi } = await import('@/lib/api');
                const { isAuthenticated } = await import('@/lib/auth');

                // Check if user is authenticated
                if (!isAuthenticated()) {
                    // Redirect to login page if not authenticated
                    router.push(`/login?redirect=/hackathons/register/${params.id}`);
                    return;
                }

                // Register for the hackathon
                await hackathonApi.register(params.id, {
                    teamName: formData.teamName,
                    teamSize: parseInt(formData.teamSize),
                    track: formData.track,
                });

                // Show success message
                setIsSubmitted(true);
            } catch (error: any) {
                // Handle errors
                console.error('Registration failed:', error);

                // Show error message
                if (error.message.includes('Already registered')) {
                    setErrors({
                        ...errors,
                        form: 'You have already registered for this hackathon.',
                    });
                } else {
                    setErrors({
                        ...errors,
                        form: 'Registration failed. Please try again later.',
                    });
                }
            } finally {
                setIsSubmitting(false);
            }
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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="o2314sq">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="zy_csr1" />

            {/* Registration Content */}
            <div className="py-12 px-6 md:px-12 bg-black" data-oid="u4x8xj2">
                <div className="max-w-4xl mx-auto" data-oid=".sqelb.">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20" data-oid="4vudr4j">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                                data-oid="g-1.l75"
                            ></div>
                        </div>
                    ) : hackathon ? (
                        <>
                            {/* Back button */}
                            <button
                                onClick={() => router.push(`/hackathons/${hackathon.id}`)}
                                className="flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors"
                                data-oid=".j5wu43"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-oid="jgj2e6_"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                        data-oid="ax53e:s"
                                    />
                                </svg>
                                Back to Hackathon Details
                            </button>

                            {isSubmitted ? (
                                <div
                                    className="bg-gray-800/30 rounded-xl p-8 text-center"
                                    data-oid="d-v6n-f"
                                >
                                    <div
                                        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                        data-oid="85xh.ct"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-green-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="fgiwy7r"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                                data-oid="szs2:d:"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4" data-oid="qd8ydr5">
                                        Registration Successful!
                                    </h2>
                                    <p className="text-gray-300 mb-6" data-oid="wjfpzxp">
                                        Thank you for registering for {hackathon.title}. We've sent
                                        a confirmation email to {formData.email} with all the
                                        details.
                                    </p>
                                    <div
                                        className="bg-gray-700/30 p-6 rounded-lg mb-6 max-w-md mx-auto"
                                        data-oid="vagw4ez"
                                    >
                                        <div className="text-left mb-4" data-oid="j19jhkq">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid="821i2-w"
                                            >
                                                Registration ID
                                            </div>
                                            <div className="font-medium" data-oid="19tk074">
                                                HACKBIT2025-
                                                {Math.floor(Math.random() * 10000)
                                                    .toString()
                                                    .padStart(4, '0')}
                                            </div>
                                        </div>
                                        <div className="text-left mb-4" data-oid="j15mctv">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid="t_g3g31"
                                            >
                                                Team Name
                                            </div>
                                            <div className="font-medium" data-oid="goi_abf">
                                                {formData.teamName}
                                            </div>
                                        </div>
                                        <div className="text-left" data-oid="pv6k:r8">
                                            <div
                                                className="text-gray-400 text-sm"
                                                data-oid="503tl_l"
                                            >
                                                Track
                                            </div>
                                            <div className="font-medium" data-oid="nw1pzb_">
                                                {formData.track}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col sm:flex-row gap-4 justify-center"
                                        data-oid="jnxxue."
                                    >
                                        <button
                                            onClick={() => router.push('/hackathons')}
                                            className="px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                                            data-oid="1bgumj2"
                                        >
                                            Back to Hackathons
                                        </button>
                                        <button
                                            onClick={() => window.print()}
                                            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                                            data-oid="pswqu9u"
                                        >
                                            Print Confirmation
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-12" data-oid="k85v4va">
                                        <h1
                                            className="text-3xl md:text-4xl font-bold mb-4"
                                            data-oid="zohcxbw"
                                        >
                                            Register for {hackathon.title}
                                        </h1>
                                        <p
                                            className="text-gray-300 max-w-2xl mx-auto"
                                            data-oid="p8jld.o"
                                        >
                                            Fill out the form below to register for the hackathon.
                                            Make sure to provide accurate information as this will
                                            be used for communication and team formation.
                                        </p>
                                    </div>

                                    <div
                                        className="bg-gray-800/30 rounded-xl p-6 mb-8"
                                        data-oid="izzoh1h"
                                    >
                                        <div
                                            className="flex flex-col md:flex-row gap-6 items-center"
                                            data-oid="j9hmh3s"
                                        >
                                            <div className="w-full md:w-1/4" data-oid="iq58ixp">
                                                <img
                                                    src={hackathon.image}
                                                    alt={hackathon.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                    data-oid="5i20g9a"
                                                />
                                            </div>
                                            <div className="w-full md:w-3/4" data-oid="uw:pk.9">
                                                <h2
                                                    className="text-xl font-semibold mb-2"
                                                    data-oid="zlop.nh"
                                                >
                                                    {hackathon.title}
                                                </h2>
                                                <p
                                                    className="text-gray-400 text-sm mb-4"
                                                    data-oid="9dkywyg"
                                                >
                                                    {hackathon.description}
                                                </p>
                                                <div
                                                    className="flex flex-wrap gap-4 text-sm"
                                                    data-oid="060u.lx"
                                                >
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="fkqow9e"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="fz1pcyj"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                                clipRule="evenodd"
                                                                data-oid="h9bv_:d"
                                                            />
                                                        </svg>
                                                        <span data-oid="jykj27v">
                                                            {formatDate(hackathon.startDate)} -{' '}
                                                            {formatDate(hackathon.endDate)}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="4e3f.ss"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="h4a7h-a"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                clipRule="evenodd"
                                                                data-oid="pzav8wu"
                                                            />
                                                        </svg>
                                                        <span data-oid="nptv6u-">
                                                            {hackathon.location}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center"
                                                        data-oid="73b-p6w"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1 text-purple-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            data-oid="1_p78zk"
                                                        >
                                                            <path
                                                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                                                data-oid="oad6tfm"
                                                            />
                                                        </svg>
                                                        <span data-oid="jpjrdz7">
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
                                        data-oid="k:tjlu4"
                                    >
                                        {/* Personal Information */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="kvb_hdg"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="wb-6:li"
                                            >
                                                Personal Information
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="ajngkbw"
                                            >
                                                <div data-oid="4o_-3ik">
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="uin:-ht"
                                                    >
                                                        Full Name{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="6bkdqyu"
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
                                                        data-oid="zk.4mwp"
                                                    />

                                                    {errors.name && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="xnbuhgm"
                                                        >
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="gu7o:6:">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="rw:.u8x"
                                                    >
                                                        Email Address{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="2prwpx6"
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
                                                        data-oid="gbih08w"
                                                    />

                                                    {errors.email && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="fj:ppc4"
                                                        >
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="1t45six">
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="9bh8s_c"
                                                    >
                                                        Phone Number{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="yut3i.j"
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
                                                        data-oid="67jfp2c"
                                                    />

                                                    {errors.phone && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="nrrub14"
                                                        >
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="8.qgpo_">
                                                    <label
                                                        htmlFor="institution"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="2w8kn97"
                                                    >
                                                        Institution/Organization{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="-.669ii"
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
                                                        data-oid="qyx-:y4"
                                                    />

                                                    {errors.institution && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="k5opzml"
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
                                            data-oid="-2e.duf"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="5-9b2p7"
                                            >
                                                Team Information
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="c-q8o6y"
                                            >
                                                <div data-oid="j021moh">
                                                    <label
                                                        htmlFor="teamName"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="a-:59._"
                                                    >
                                                        Team Name{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="9gzvkf9"
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
                                                        data-oid="nzbp:.b"
                                                    />

                                                    {errors.teamName && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="s9:ra4x"
                                                        >
                                                            {errors.teamName}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="wzimi8j">
                                                    <label
                                                        htmlFor="teamSize"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="a-splk2"
                                                    >
                                                        Team Size
                                                    </label>
                                                    <select
                                                        id="teamSize"
                                                        name="teamSize"
                                                        value={formData.teamSize}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                        data-oid="xx_tk0."
                                                    >
                                                        <option value="1" data-oid="d86_n7l">
                                                            1 (Individual)
                                                        </option>
                                                        <option value="2" data-oid="nmpk1tb">
                                                            2 Members
                                                        </option>
                                                        <option value="3" data-oid="m3-fodq">
                                                            3 Members
                                                        </option>
                                                        <option value="4" data-oid="ajxv2ch">
                                                            4 Members
                                                        </option>
                                                        <option value="5" data-oid="4u3tci.">
                                                            5 Members
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div
                                                className="mt-4 text-gray-400 text-sm"
                                                data-oid="0skf903"
                                            >
                                                <p data-oid="04fhmt3">
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
                                            data-oid="p66.msa"
                                        >
                                            <h3
                                                className="text-xl font-semibold mb-6"
                                                data-oid="_r0i.eu"
                                            >
                                                Hackathon Preferences
                                            </h3>
                                            <div
                                                className="grid md:grid-cols-2 gap-6"
                                                data-oid="a1oz188"
                                            >
                                                <div data-oid="s21b_9n">
                                                    <label
                                                        htmlFor="track"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="vw6ry0u"
                                                    >
                                                        Preferred Track{' '}
                                                        <span
                                                            className="text-red-500"
                                                            data-oid="pl.8w6x"
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
                                                        data-oid=".8d4i:b"
                                                    >
                                                        <option value="" data-oid="77gl:6l">
                                                            Select a track
                                                        </option>
                                                        <option
                                                            value="Web Development"
                                                            data-oid="0lrln5b"
                                                        >
                                                            Web Development
                                                        </option>
                                                        <option
                                                            value="AI/ML & Data Science"
                                                            data-oid="52onvau"
                                                        >
                                                            AI/ML & Data Science
                                                        </option>
                                                    </select>
                                                    {errors.track && (
                                                        <p
                                                            className="text-red-500 text-sm mt-1"
                                                            data-oid="06nvzh9"
                                                        >
                                                            {errors.track}
                                                        </p>
                                                    )}
                                                </div>
                                                <div data-oid="tja:hie">
                                                    <label
                                                        htmlFor="experience"
                                                        className="block text-gray-300 mb-2"
                                                        data-oid="nztuk13"
                                                    >
                                                        Experience Level
                                                    </label>
                                                    <select
                                                        id="experience"
                                                        name="experience"
                                                        value={formData.experience}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                        data-oid="0kc8o64"
                                                    >
                                                        <option value="" data-oid="6muf1.o">
                                                            Select your experience level
                                                        </option>
                                                        <option value="Beginner" data-oid="24j4rnh">
                                                            Beginner (0-1 years)
                                                        </option>
                                                        <option
                                                            value="Intermediate"
                                                            data-oid=".a1lpk9"
                                                        >
                                                            Intermediate (1-3 years)
                                                        </option>
                                                        <option value="Advanced" data-oid="7:y82-f">
                                                            Advanced (3+ years)
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mt-6" data-oid="icowbmt">
                                                <label
                                                    htmlFor="expectations"
                                                    className="block text-gray-300 mb-2"
                                                    data-oid="1qamcxb"
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
                                                    data-oid="8vydubz"
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Terms and Conditions */}
                                        <div
                                            className="bg-gray-800/30 rounded-xl p-6"
                                            data-oid="tux95xk"
                                        >
                                            <div className="flex items-start" data-oid="mg5f2w0">
                                                <div
                                                    className="flex items-center h-5"
                                                    data-oid="lq24ao7"
                                                >
                                                    <input
                                                        id="agreeToTerms"
                                                        name="agreeToTerms"
                                                        type="checkbox"
                                                        checked={formData.agreeToTerms}
                                                        onChange={handleCheckboxChange}
                                                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                                                        data-oid="8uypuoq"
                                                    />
                                                </div>
                                                <label
                                                    htmlFor="agreeToTerms"
                                                    className="ml-3 text-gray-300"
                                                    data-oid="htps-9w"
                                                >
                                                    I agree to the{' '}
                                                    <a
                                                        href="#"
                                                        className="text-purple-400 hover:underline"
                                                        data-oid="nd95pnc"
                                                    >
                                                        terms and conditions
                                                    </a>{' '}
                                                    and{' '}
                                                    <a
                                                        href="#"
                                                        className="text-purple-400 hover:underline"
                                                        data-oid="5ltbarn"
                                                    >
                                                        code of conduct
                                                    </a>
                                                    <span
                                                        className="text-red-500"
                                                        data-oid="nespgew"
                                                    >
                                                        *
                                                    </span>
                                                </label>
                                            </div>
                                            {errors.agreeToTerms && (
                                                <p
                                                    className="text-red-500 text-sm mt-1"
                                                    data-oid="2lf9k:c"
                                                >
                                                    {errors.agreeToTerms}
                                                </p>
                                            )}
                                        </div>

                                        {/* Form Error Message */}
                                        {errors.form && (
                                            <div
                                                className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6"
                                                data-oid="hhvfwpj"
                                            >
                                                <p
                                                    className="text-red-400 text-center"
                                                    data-oid=".xctp4p"
                                                >
                                                    {errors.form}
                                                </p>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <div className="flex justify-center" data-oid="t2qj1by">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    'px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-lg font-medium w-full md:w-auto',
                                                    isSubmitting && 'opacity-70 cursor-not-allowed',
                                                )}
                                                data-oid="s9_ffj8"
                                            >
                                                {isSubmitting ? (
                                                    <div
                                                        className="flex items-center justify-center"
                                                        data-oid="bqijc_a"
                                                    >
                                                        <div
                                                            className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"
                                                            data-oid="u3g5f37"
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
                        <div className="text-center py-20" data-oid="pcthvoj">
                            <h3
                                className="text-2xl font-semibold text-gray-300 mb-4"
                                data-oid="qc4.b_6"
                            >
                                Hackathon not found
                            </h3>
                            <p className="text-gray-400 mb-8" data-oid="z9_6evk">
                                The hackathon you're trying to register for doesn't exist or has
                                been removed.
                            </p>
                            <button
                                onClick={() => router.push('/hackathons')}
                                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                                data-oid="soo9d39"
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
                data-oid="ibh585m"
            >
                <div className="max-w-6xl mx-auto" data-oid="8lr.gtb">
                    <div className="text-center text-gray-500" data-oid="fr8452h">
                        <p data-oid="xkxnt5e">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
