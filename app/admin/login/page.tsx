'use client';

import Navbar from '@/components/Navbar';
import { BACKEND_URL } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Make API call to admin login endpoint
            const response = await fetch(`${BACKEND_URL}/api/auth/admin-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Invalid admin credentials');
                return;
            }

            // Login successful
            console.log('Admin login successful:', data);

            // Store authentication token
            if (data.token) {
                localStorage.setItem('adminAuthToken', data.token);
            }

            // Redirect to admin dashboard
            router.push('/admin/dashboard');
        } catch (err) {
            console.error('Admin login error:', err);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans" data-oid="zkh65-e">
            <Navbar data-oid="ya0uyx9" />

            <div className="pt-32 pb-20 px-6 md:px-12" data-oid="9ebkr52">
                <div
                    className="max-w-md mx-auto bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mt-12"
                    data-oid="g4sd929"
                >
                    {/* Background blur elements */}
                    <div className="relative" data-oid="b05zvlp">
                        <div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
                            data-oid="oyx5fxz"
                        ></div>
                        <div
                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"
                            data-oid="w.3uqef"
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6" data-oid="jydiilw">
                        <div className="text-center mb-6" data-oid="ta8r4u7">
                            <h1 className="text-3xl font-bold mb-2" data-oid="g91m9hp">
                                Admin Login
                            </h1>
                            <p className="text-gray-400" data-oid="4366a06">
                                Sign in to access the admin dashboard
                            </p>
                        </div>

                        {error && (
                            <div
                                className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm"
                                data-oid="m5j:4:l"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} data-oid="vhcxi2w">
                            <div className="mb-6" data-oid="erv4kd_">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                    data-oid="hbxsg_c"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="admin@example.com"
                                    required
                                    data-oid="nqg0:o4"
                                />
                            </div>

                            <div className="mb-6" data-oid="hi-3qi1">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mb-2"
                                    data-oid="8wh6c9h"
                                >
                                    Password
                                </label>
                                <div className="relative" data-oid="f2h6per">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors pr-10"
                                        placeholder="••••••••"
                                        required
                                        data-oid=":wah814"
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors focus:outline-none"
                                        aria-label={
                                            showPassword ? 'Hide password' : 'Show password'
                                        }
                                        data-oid="xzesil."
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="k5vjwg7"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                    data-oid="2ddm5dc"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                data-oid="rdh57:4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    data-oid="5n1d_iu"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    data-oid="2sncsdm"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                data-oid="x5:qxjb"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
