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
                data-oid="my.nsrj"
            >
                <div className="max-w-4xl mx-auto" data-oid="h0x0pw-">
                    <div className="text-center" data-oid="_4sdy--">
                        <h2 className="text-3xl md:text-4xl font-bold mb-16" data-oid="1xgmw8x">
                            Contact{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="wqwq.kv"
                            >
                                Us
                            </span>
                        </h2>

                        {/* Success Animation */}
                        <div
                            className="flex flex-col items-center justify-center min-h-[400px]"
                            data-oid="upzf_os"
                        >
                            <div className="relative" data-oid="kaixa5c">
                                {/* Animated checkmark circle */}
                                <div
                                    className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center"
                                    data-oid="d5aduek"
                                >
                                    <svg
                                        className="w-16 h-16 text-white animate-pulse"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="m3ddx-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                            className="animate-draw-check"
                                            data-oid="el:-8ww"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h3
                                className="text-2xl font-bold text-green-400 mt-8 mb-4"
                                data-oid="7l11q1d"
                            >
                                Query Submitted Successfully!
                            </h3>
                            <p
                                className="text-lg text-gray-300 max-w-md text-center"
                                data-oid=".z-lnjw"
                            >
                                Our Team will contact you soon. Thank you for reaching out to us!
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx data-oid="aqnt.ln">{`
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
            data-oid="jv12p.p"
        >
            <div className="max-w-4xl mx-auto" data-oid="jz0zy_i">
                <div className="text-center mb-16" data-oid="e.c_w45">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="06u9dzm">
                        Contact{' '}
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                            data-oid="dyvxzgf"
                        >
                            Us
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="g0r_8v4">
                        Have questions or need assistance? We're here to help! Fill out the form
                        below and our team will get back to you soon.
                    </p>
                </div>

                <div
                    className="bg-gray-800 p-8 md:p-12 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                    data-oid=".03_4l1"
                >
                    <form onSubmit={handleSubmit} className="space-y-6" data-oid="x_:haek">
                        <div className="grid md:grid-cols-2 gap-6" data-oid=":m6zjek">
                            {/* Name Field */}
                            <div data-oid="9od0het">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="qz:o9jb"
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
                                    data-oid="mkeiz3j"
                                />
                            </div>

                            {/* Email Field */}
                            <div data-oid="nodsp_d">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="s4z9uuy"
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
                                    data-oid="vk8b6az"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6" data-oid="qiq4.gd">
                            {/* Mobile Number Field */}
                            <div data-oid="ta5rbo5">
                                <label
                                    htmlFor="mobile"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="rg4zcyp"
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
                                    data-oid="s:-1oav"
                                />
                            </div>

                            {/* University/College Field */}
                            <div data-oid="fdy.6i1">
                                <label
                                    htmlFor="university"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                    data-oid="63uqhzd"
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
                                    data-oid="3w_a8zx"
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div data-oid="c0c4i.2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-300 mb-2"
                                data-oid="wv3iak5"
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
                                data-oid="_yf_vag"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center" data-oid="w:szu7z">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium text-lg transform hover:scale-105 disabled:hover:scale-100"
                                data-oid="wmf2icp"
                            >
                                {isSubmitting ? (
                                    <div
                                        className="flex items-center justify-center"
                                        data-oid="n-3r-38"
                                    >
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            data-oid="8ua.29_"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                data-oid="hvsdxot"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                data-oid="3l0774s"
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
