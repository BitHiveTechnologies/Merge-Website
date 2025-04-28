'use client';

import Navbar from '@/components/Navbar';
import { BACKEND_URL } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
            // Make API call to your backend
            const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle error response from your backend
                setError(data.message || 'Registration failed. Please try again.');
                return;
            }

            // Registration successful
            console.log('Registration successful:', data);

            // If the API returns a token, store it to automatically log in the user
            if (data.token) {
                localStorage.setItem('authToken', data.token);

                // Store username for display in navbar
                localStorage.setItem('username', formData.name || formData.email.split('@')[0]);

                // Redirect to home page after successful registration and auto-login
                window.location.href = '/';
            } else {
                // If no token is provided, redirect to login page
                window.location.href = '/login';
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="gc9k9fr">
            <Navbar data-oid="gshu5hy" />

            <div className="pt-32 pb-20 px-6 md:px-12" data-oid="9--rpw2">
                <div
                    className="max-w-md mx-auto bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                    data-oid="nps7tst"
                >
                    {/* Background blur elements */}
                    <div className="relative" data-oid="r1:w2ks">
                        <div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="ghyi_el"
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid="7k.3hyb"
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6" data-oid="vnock_0">
                        <div className="text-center mb-6" data-oid="7hock69">
                            <h1 className="text-3xl font-bold mb-2" data-oid="btvlntm">
                                Create an Account
                            </h1>
                            <p className="text-gray-400" data-oid="ngdgu06">
                                Join our Community of Learners
                            </p>
                        </div>

                        {error && (
                            <div
                                className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm"
                                data-oid="2.3mww2"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} data-oid="q_x7:ue">
                            <div className="mb-6" data-oid="tx5q:r9">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                    data-oid=":d.asgv"
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
                                    data-oid="n.4-6c-"
                                />
                            </div>

                            <div className="mb-6" data-oid="_m-msr6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                    data-oid="il6sfce"
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
                                    data-oid="4_vli6_"
                                />
                            </div>

                            <div className="mb-6" data-oid="xmu7t0-">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mb-2"
                                    data-oid="d38x0k8"
                                >
                                    Password
                                </label>
                                <div className="relative" data-oid="6oy90f2">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors pr-10"
                                        placeholder="••••••••"
                                        required
                                        data-oid="5.tiwqu"
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors focus:outline-none"
                                        aria-label={
                                            showPassword ? 'Hide password' : 'Show password'
                                        }
                                        data-oid="qcstd97"
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="1b7c.g6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                    data-oid="fat_ene"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="7f4ne:9"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    data-oid="3-c0g0d"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    data-oid="rg66sqd"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-400" data-oid="-djh1mi">
                                    Password must be at least 8 characters long
                                </p>
                            </div>

                            <div className="flex items-start mb-6" data-oid="okdyhd:">
                                <div className="flex items-center h-5" data-oid="u-h08b6">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                                        required
                                        data-oid="g4_wwy9"
                                    />
                                </div>
                                <div className="ml-3 text-sm" data-oid="8a3cfmp">
                                    <label
                                        htmlFor="agreeToTerms"
                                        className="text-gray-300"
                                        data-oid="-p_8eqq"
                                    >
                                        I agree to the{' '}
                                        <Link
                                            href="#"
                                            className="text-purple-400 hover:text-purple-300 transition-colors"
                                            data-oid="mb:y8xy"
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="#"
                                            className="text-purple-400 hover:text-purple-300 transition-colors"
                                            data-oid="a3jmvll"
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
                                data-oid="a.u-8j0"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center" data-oid="hzv1c6o">
                            <p className="text-gray-400" data-oid="92jv7kt">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                    data-oid="nm84shp"
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
