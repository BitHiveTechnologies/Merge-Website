'use client';

import Navbar from '@/components/Navbar';
import { BACKEND_URL } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Make API call to your backend
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle error response from your backend
                setError(data.message || 'Invalid email or password');
                return;
            }

            // Login successful
            console.log('Login successful:', data);

            // Store authentication token if your backend provides one
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

            // Store username for display in navbar
            if (data.user && data.user.name) {
                localStorage.setItem('username', data.user.name);
            } else {
                // If no name is provided, use email as fallback (without domain)
                const username = email.split('@')[0];
                localStorage.setItem('username', username);
            }

            // Redirect to home page after successful login
            window.location.href = '/';
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="5vutvag">
            <Navbar data-oid="7cpu1xt" />

            <div className="pt-32 pb-20 px-6 md:px-12" data-oid="0fn5-f9">
                <div
                    className="max-w-md mx-auto bg-gray-800 rounded-xl border border-gray-700 overflow-hidden  mt-12"
                    data-oid="e0jttv:"
                >
                    {/* Background blur elements */}
                    <div className="relative" data-oid="_ikydv2">
                        <div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="i8pdwm."
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid="rjm26bq"
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6" data-oid="wt6k9ma">
                        <div className="text-center mb-6" data-oid="fx.6.61">
                            <h1 className="text-3xl font-bold mb-2" data-oid="3fxgdot">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400" data-oid="59kacpy">
                                Sign in to continue your Learning Journey
                            </p>
                        </div>

                        {error && (
                            <div
                                className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm"
                                data-oid="ijo5tkd"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} data-oid="-i0m3mh">
                            <div className="mb-6" data-oid="4s0ftjk">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                    data-oid="4v.zrc1"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="your@email.com"
                                    required
                                    data-oid="iu0oh-3"
                                />
                            </div>

                            <div className="mb-6" data-oid="6j477q6">
                                <div
                                    className="flex justify-between items-center mb-2"
                                    data-oid="yttq-u:"
                                >
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium"
                                        data-oid="d3qe6if"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                        data-oid="zu3m-cp"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative" data-oid="ah9ilnp">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors pr-10"
                                        placeholder="••••••••"
                                        required
                                        data-oid="j94_erx"
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors focus:outline-none"
                                        aria-label={
                                            showPassword ? 'Hide password' : 'Show password'
                                        }
                                        data-oid="lijxf1f"
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="h1f9uop"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                    data-oid="f-c82-4"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="83pigs2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    data-oid="ibnzjr1"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    data-oid="y93jwkm"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center mb-6" data-oid="5r4yp47">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                                    data-oid="p3yrci4"
                                />

                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="lp9.4gl"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                data-oid="nzcl:j1"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center" data-oid="vngsma_">
                            <p className="text-gray-400" data-oid="sdhh1_-">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                    data-oid="hscsb66"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
