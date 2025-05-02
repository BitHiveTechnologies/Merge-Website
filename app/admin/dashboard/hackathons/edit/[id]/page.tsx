'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

interface HackathonParams {
    params: {
        id: string;
    };
}

export default function EditHackathonPage({ params }: HackathonParams) {
    const router = useRouter();
    const [hackathon, setHackathon] = useState({
        title: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        prizes: [''],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                // Fetch the individual hackathon using the public API
                const response = await fetch(`/api/hackathons/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hackathon');
                }
                const data = await response.json();

                // Format the dates for the input fields (YYYY-MM-DD)
                const formattedStartDate = data.startDate
                    ? new Date(data.startDate).toISOString().split('T')[0]
                    : '';
                const formattedEndDate = data.endDate
                    ? new Date(data.endDate).toISOString().split('T')[0]
                    : '';

                setHackathon({
                    ...data,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    prizes: data.prizes || [''],
                });
            } catch (err: any) {
                setError(err.message || 'Failed to fetch hackathon');
                console.error('Error fetching hackathon:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHackathon();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHackathon({
            ...hackathon,
            [name]: value,
        });
    };

    const handlePrizeChange = (index: number, value: string) => {
        const updatedPrizes = [...hackathon.prizes];
        updatedPrizes[index] = value;
        setHackathon({
            ...hackathon,
            prizes: updatedPrizes,
        });
    };

    const addPrize = () => {
        setHackathon({
            ...hackathon,
            prizes: [...hackathon.prizes, ''],
        });
    };

    const removePrize = (index: number) => {
        const updatedPrizes = [...hackathon.prizes];
        updatedPrizes.splice(index, 1);
        setHackathon({
            ...hackathon,
            prizes: updatedPrizes.length ? updatedPrizes : [''],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        // Filter out empty prizes
        const filteredPrizes = hackathon.prizes.filter((prize) => prize.trim() !== '');

        try {
            await adminApi.hackathons.update(params.id, {
                ...hackathon,
                prizes: filteredPrizes,
            });
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to update hackathon');
            console.error('Error updating hackathon:', err);
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="zb7om2e">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="pqjcf-0"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid="1s1:528">
            <h1 className="text-3xl font-bold mb-8" data-oid="-2bwclh">
                Edit Hackathon
            </h1>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="4ic83l:"
                >
                    <p className="text-red-200" data-oid="5v2ft1u">
                        {error}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="5rizu.a">
                <div data-oid="i6il9lm">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium mb-1"
                        data-oid="80:-usr"
                    >
                        Hackathon Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={hackathon.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="57-kll_"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="n.-5o7a">
                    <div data-oid="6yjxf4.">
                        <label
                            htmlFor="startDate"
                            className="block text-sm font-medium mb-1"
                            data-oid="eorviuj"
                        >
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={hackathon.startDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            data-oid="4iu6uri"
                        />
                    </div>
                    <div data-oid="dohswjx">
                        <label
                            htmlFor="endDate"
                            className="block text-sm font-medium mb-1"
                            data-oid="k-0aez7"
                        >
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={hackathon.endDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            data-oid="to83roh"
                        />
                    </div>
                </div>

                <div data-oid="wpcv4f_">
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium mb-1"
                        data-oid="7rjewnh"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={hackathon.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="53d6itu"
                    />
                </div>

                <div data-oid="mch._5o">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium mb-1"
                        data-oid="s3zz2zb"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={hackathon.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="q75bezr"
                    />
                </div>

                <div data-oid="xjc2kno">
                    <div className="flex justify-between items-center mb-2" data-oid="i:_86:7">
                        <label className="block text-sm font-medium" data-oid="51o9528">
                            Prizes
                        </label>
                        <button
                            type="button"
                            onClick={addPrize}
                            className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                            data-oid="5spul:2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="-tv0i:k"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="yrjs_nj"
                                />
                            </svg>
                            Add Prize
                        </button>
                    </div>
                    {hackathon.prizes.map((prize, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 mb-2"
                            data-oid=".q4vklo"
                        >
                            <input
                                type="text"
                                value={prize}
                                onChange={(e) => handlePrizeChange(index, e.target.value)}
                                placeholder={`Prize ${index + 1}`}
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="cd4tlaf"
                            />

                            {hackathon.prizes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removePrize(index)}
                                    className="text-red-400 hover:text-red-300"
                                    data-oid="gfjko9n"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="l1zu3jz"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                            data-oid="k-e366:"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-4" data-oid="ko95dm_">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="5e0wdhw"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                        data-oid="2:gh6uv"
                    >
                        {saving ? (
                            <>
                                <div
                                    className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"
                                    data-oid="m:::g0t"
                                ></div>
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
