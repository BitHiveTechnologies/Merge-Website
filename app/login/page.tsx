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
        <div className="min-h-screen bg-black text-white font-sans" data-oid="8ue5xgp">
            <Navbar data-oid="o8.:4as" />

            <div className="pt-32 pb-20 px-6 md:px-12" data-oid="gz7d_vm">
                <div
                    className="max-w-md mx-auto bg-gray-800 rounded-xl border border-gray-700 overflow-hidden  mt-12"
                    data-oid="to3z8hz"
                >
                    {/* Background blur elements */}
                    <div className="relative" data-oid=".:s3:n5">
                        <div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="hzuplge"
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid=".sf842."
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6" data-oid="e525zli">
                        <div className="text-center mb-6" data-oid="3l5m7mc">
                            <h1 className="text-3xl font-bold mb-2" data-oid="wfo66qk">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400" data-oid="5m485uu">
                                Sign in to continue your Learning Journey
                            </p>
                        </div>

                        {error && (
                            <div
                                className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm"
                                data-oid="kzwq2zl"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} data-oid=".4de8_x">
                            <div className="mb-6" data-oid="vz4phbj">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                    data-oid="zr-342m"
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
                                    data-oid="4qitn_q"
                                />
                            </div>

                            <div className="mb-6" data-oid="13pl8ds">
                                <div
                                    className="flex justify-between items-center mb-2"
                                    data-oid="3pw8z:w"
                                >
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium"
                                        data-oid="x:do3t."
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                        data-oid="8s733:y"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative" data-oid=".7i7orc">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors pr-10"
                                        placeholder="••••••••"
                                        required
                                        data-oid="9r6zpkh"
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors focus:outline-none"
                                        aria-label={
                                            showPassword ? 'Hide password' : 'Show password'
                                        }
                                        data-oid="w6zf5d3"
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="_64sj63"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                    data-oid="3q3oii9"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="hd_gex."
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    data-oid="vfccw6-"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    data-oid="u8p54fn"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center mb-6" data-oid="7.f4o1i">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                                    data-oid="5rtrbou"
                                />

                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="eoyz-d6"
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
                                data-oid="3fqdkuh"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center" data-oid=":167.np">
                            <p className="text-gray-400" data-oid="eiymlg5">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                    data-oid="ssfm.3d"
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
