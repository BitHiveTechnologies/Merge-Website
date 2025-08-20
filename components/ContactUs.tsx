'use client';

import { useState } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    mobile: string;
    university: string;
    message: string;
}

export default function ContactUs() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        mobile: '',
        university: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    university: '',
                    message: '',
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            } else {
                alert('Failed to submit query. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (showSuccess) {
        return (
            <section
                className="py-20 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900"
                data-oid="yjfdh4g"
            >
                <div className="max-w-4xl mx-auto" data-oid="3:9r4tt">
                    <div className="text-center" data-oid="utdkkgi">
                        <h2 className="text-3xl md:text-4xl font-bold mb-16" data-oid="l2428n8">
                            Contact{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="jotjw8j"
                            >
                                Us
                            </span>
                        </h2>

                        {/* Success Animation */}
                        <div
                            className="flex flex-col items-center justify-center min-h-[400px]"
                            data-oid="qq4l30i"
                        >
                            <div className="relative" data-oid="e1z0dbw">
                                {/* Animated checkmark circle */}
                                <div
                                    className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center"
                                    data-oid="us6h:2a"
                                >
                                    <svg
                                        className="w-16 h-16 text-white animate-pulse"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="ctwkp03"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                            className="animate-draw-check"
                                            data-oid="292.581"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h3
                                className="text-2xl font-bold text-green-400 mt-8 mb-4"
                                data-oid="zgc_m7y"
                            >
                                Query Submitted Successfully!
                            </h3>
                            <p
                                className="text-lg text-gray-300 max-w-md text-center"
                                data-oid="76bj0gm"
                            >
                                Our Team will contact you soon. Thank you for reaching out to us!
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx data-oid="an:8msv">{`
                    @keyframes draw-check {
                        0% {
                            stroke-dasharray: 0 100;
                        }
                        100% {
                            stroke-dasharray: 100 0;
                        }
                    }

                    .animate-draw-check {
                        animation: draw-check 1s ease-in-out;
                    }

                    .animation-delay-200 {
                        animation-delay: 200ms;
                    }
                `}</style>
            </section>
        );
    }

    return (
        <section
            className="py-20 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900"
            data-oid="2te64t5"
        >
            <div className="max-w-4xl mx-auto" data-oid=".myfybl">
                <div className="text-center mb-16" data-oid="a3shs77">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="n6o8rpq">
                        Contact{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="3r-66-7"
                        >
                            Us
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="fwchq:7">
                        Have questions or need assistance? We're here to help! Fill out the form
                        below and our team will get back to you soon.
                    </p>
                </div>

                <div
                    className="bg-gray-800 p-8 md:p-12 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                    data-oid=".81_k_1"
                >
                    <form onSubmit={handleSubmit} className="space-y-6" data-oid="vgnkp9p">
                        <div className="grid md:grid-cols-2 gap-6" data-oid="pbmyszy">
                            {/* Name Field */}
                            <div data-oid="2enkflw">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="qa--122"
                                >
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                                    placeholder="Enter your full name"
                                    data-oid="nxvb682"
                                />
                            </div>

                            {/* Email Field */}
                            <div data-oid="2kt:t:q">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="dj.bgq9"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                                    placeholder="Enter your email address"
                                    data-oid="zecpw3c"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6" data-oid="s6rk.h2">
                            {/* Mobile Number Field */}
                            <div data-oid="nt6hqrb">
                                <label
                                    htmlFor="mobile"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="h:7ieba"
                                >
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                                    placeholder="Enter your mobile number"
                                    data-oid="bczbkrb"
                                />
                            </div>

                            {/* University/College Field */}
                            <div data-oid="wkfzvny">
                                <label
                                    htmlFor="university"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="pmsqi._"
                                >
                                    University/College Name *
                                </label>
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                                    placeholder="Enter your university/college name"
                                    data-oid="njl5p1t"
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div data-oid="98bxh.i">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-300 mb-2"
                                data-oid="l-xrexx"
                            >
                                Concern/Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400 resize-vertical"
                                placeholder="Please describe your concern or message..."
                                data-oid="spbb5d:"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center" data-oid="6-_4jql">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium text-lg transform hover:scale-105 disabled:hover:scale-100"
                                data-oid="335kmp7"
                            >
                                {isSubmitting ? (
                                    <div
                                        className="flex items-center justify-center"
                                        data-oid="ciy0rjr"
                                    >
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            data-oid="mlk:ia3"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                data-oid="68vvyer"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                data-oid="5bc50u:"
                                            ></path>
                                        </svg>
                                        Submitting...
                                    </div>
                                ) : (
                                    'Submit Query'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
