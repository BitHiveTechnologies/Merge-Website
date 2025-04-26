'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Make API call to your backend
            const response = await fetch('http://localhost:8001/api/auth/login', {
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
        <div className="min-h-screen bg-black text-white font-sans mt-12" data-oid="wu1_g_z">
            <Navbar data-oid=":.b2pqm" />

            <div className="pt-32 pb-20 px-6 md:px-12" data-oid="y4lj.pf">
                <div
                    className="max-w-md mx-auto bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                    data-oid="2nwyvbt"
                >
                    {/* Background blur elements */}
                    <div className="relative" data-oid="1hm2:ow">
                        <div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="sbamfuk"
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid="yfz-pr4"
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6" data-oid="g9j6nwf">
                        <div className="text-center mb-6" data-oid="7r:ir4k">
                            <h1 className="text-3xl font-bold mb-2" data-oid="undp.m_">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400" data-oid="6b3nm_:">
                                Sign in to continue your learning journey
                            </p>
                        </div>

                        {error && (
                            <div
                                className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm"
                                data-oid="f034hoq"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} data-oid="ghhb5v.">
                            <div className="mb-6" data-oid="lp3kpql">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                    data-oid=":vlg2p."
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
                                    data-oid="s.5d5it"
                                />
                            </div>

                            <div className="mb-6" data-oid=":oqf7ug">
                                <div
                                    className="flex justify-between items-center mb-2"
                                    data-oid="13..kqp"
                                >
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium"
                                        data-oid="9y-xmr5"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                        data-oid="21b7jz3"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                    data-oid="vjvcb1i"
                                />
                            </div>

                            <div className="flex items-center mb-6" data-oid=":1he2oh">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                                    data-oid="ges8v_c"
                                />

                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="jndo4oy"
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
                                data-oid="zwr.r_7"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center" data-oid="h:fylke">
                            <p className="text-gray-400" data-oid="2ma5t_o">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                    data-oid="wbcu7bz"
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
