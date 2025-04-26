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
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Here you would typically make an API call to authenticate the user
            console.log('Login attempt with:', { email, password, rememberMe });

            // Redirect to home page after successful login
            window.location.href = '/';
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="h7j6kir">
            <Navbar data-oid="q74waa-" />

            <div className="pt-32 pb-20 px-6 md:px-12" data-oid="lnt9xr9">
                <div
                    className="max-w-md mx-auto bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                    data-oid=".kg_o:h"
                >
                    {/* Background blur elements */}
                    <div className="relative" data-oid="uu_k6:2">
                        <div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="s4f4w06"
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid="_.abyt2"
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-8" data-oid="bpog0hx">
                        <div className="text-center mb-8" data-oid=":h5qyls">
                            <h1 className="text-3xl font-bold mb-2" data-oid="pcyrl9x">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400" data-oid="zh2ks:3">
                                Sign in to continue your learning journey
                            </p>
                        </div>

                        {error && (
                            <div
                                className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm"
                                data-oid="t8qvvt5"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} data-oid="u974.tm">
                            <div className="mb-6" data-oid="jkv.gh2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                    data-oid="zgs91aw"
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
                                    data-oid="hys.9u-"
                                />
                            </div>

                            <div className="mb-6" data-oid="ffpm59l">
                                <div
                                    className="flex justify-between items-center mb-2"
                                    data-oid="huwy03k"
                                >
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium"
                                        data-oid="iz9vtk1"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                        data-oid="6_73vm8"
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
                                    data-oid="6njf3or"
                                />
                            </div>

                            <div className="flex items-center mb-6" data-oid="tss-oz:">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                                    data-oid="whhvwz0"
                                />

                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="evoapyd"
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
                                data-oid="pzsc_94"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-8 text-center" data-oid="r2n.y4m">
                            <p className="text-gray-400" data-oid="ebq35yu">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                    data-oid="qhkmhye"
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
