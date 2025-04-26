'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (!formData.agreeToTerms) {
            setError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Here you would typically make an API call to register the user
            console.log('Registration attempt with:', formData);

            // Redirect to home page after successful registration
            window.location.href = '/';
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="ogvfnh:">
            <Navbar data-oid="-z7ja0f" />

            <div className="pt-32 pb-20 px-6 md:px-12" data-oid="1a_7fe-">
                <div
                    className="max-w-2xl mx-auto bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                    data-oid="b5b4txr"
                >
                    {/* Background blur elements */}
                    <div className="relative" data-oid="vy0c3uj">
                        <div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="nj_rmo3"
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid=".7mjms0"
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6" data-oid="btt-652">
                        <div className="text-center mb-6" data-oid="3eaj:3x">
                            <h1 className="text-3xl font-bold mb-2" data-oid="hok_h1:">
                                Create an Account
                            </h1>
                            <p className="text-gray-400" data-oid="6_0_pwj">
                                Join our community of learners
                            </p>
                        </div>

                        {error && (
                            <div
                                className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm"
                                data-oid="d:ir4ed"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} data-oid="nxxd_en">
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                                data-oid="d73iyz1"
                            >
                                <div data-oid="_h2q1oq">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium mb-2"
                                        data-oid="uas0m0_"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="John Doe"
                                        required
                                        data-oid="zcv.ifm"
                                    />
                                </div>

                                <div data-oid="bo1-0bk">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium mb-2"
                                        data-oid="91h.2w-"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="your@email.com"
                                        required
                                        data-oid="ax.jgp1"
                                    />
                                </div>
                            </div>

                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                                data-oid="bafgcxc"
                            >
                                <div data-oid="yffiav.">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium mb-2"
                                        data-oid="o_-p:jz"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="••••••••"
                                        required
                                        data-oid="y_nf:3_"
                                    />
                                </div>

                                <div data-oid="xa9nbh0">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium mb-2"
                                        data-oid="10:izl2"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="••••••••"
                                        required
                                        data-oid="ma8jw3o"
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mb-4" data-oid="mq9:muj">
                                Password must be at least 8 characters long
                            </p>

                            <div className="flex items-start mb-6" data-oid="p88.gbw">
                                <div className="flex items-center h-5" data-oid="cwf35.6">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                                        required
                                        data-oid="9.g_.4g"
                                    />
                                </div>
                                <div className="ml-3 text-sm" data-oid="irji1lo">
                                    <label
                                        htmlFor="agreeToTerms"
                                        className="text-gray-300"
                                        data-oid="dxre1af"
                                    >
                                        I agree to the{' '}
                                        <Link
                                            href="#"
                                            className="text-purple-400 hover:text-purple-300 transition-colors"
                                            data-oid="uxgt3.k"
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="#"
                                            className="text-purple-400 hover:text-purple-300 transition-colors"
                                            data-oid="h2htw_y"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                data-oid="unc6_.3"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-8 text-center" data-oid="z1dt26n">
                            <p className="text-gray-400" data-oid="-an0cjf">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                    data-oid="ut:h4wq"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
