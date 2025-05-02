'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

interface WorkshopParams {
    params: {
        id: string;
    };
}

export default function EditWorkshopPage({ params }: WorkshopParams) {
    const router = useRouter();
    const [workshop, setWorkshop] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        instructor: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                // Fetch the individual workshop using the public API
                const response = await fetch(`/api/workshops/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch workshop');
                }
                const data = await response.json();

                // Format the date for the input field (YYYY-MM-DD)
                const formattedDate = data.date
                    ? new Date(data.date).toISOString().split('T')[0]
                    : '';

                setWorkshop({
                    ...data,
                    date: formattedDate,
                });
            } catch (err: any) {
                setError(err.message || 'Failed to fetch workshop');
                console.error('Error fetching workshop:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshop();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWorkshop({
            ...workshop,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            await adminApi.workshops.update(params.id, workshop);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to update workshop');
            console.error('Error updating workshop:', err);
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="vps-yva">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="p-.11oa"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid="mbthp8u">
            <h1 className="text-3xl font-bold mb-8" data-oid="p_2:5d5">
                Edit Workshop
            </h1>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="p50r7e7"
                >
                    <p className="text-red-200" data-oid="gdjilsq">
                        {error}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="y:orzo1">
                <div data-oid="3.wk8zq">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium mb-1"
                        data-oid="-t8.huc"
                    >
                        Workshop Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={workshop.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="2-9dq6u"
                    />
                </div>

                <div data-oid="n7p27ho">
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium mb-1"
                        data-oid="rgnkyht"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={workshop.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="ifzs..r"
                    />
                </div>

                <div data-oid="1b.n959">
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium mb-1"
                        data-oid="2lqpp0r"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={workshop.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="tekb8ub"
                    />
                </div>

                <div data-oid="n_vze3e">
                    <label
                        htmlFor="instructor"
                        className="block text-sm font-medium mb-1"
                        data-oid="z4ow08d"
                    >
                        Speaker/Instructor
                    </label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        value={workshop.instructor || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid=".fhth1."
                    />
                </div>

                <div data-oid="3grqvh0">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium mb-1"
                        data-oid="moj6728"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={workshop.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="qn920o6"
                    />
                </div>

                <div className="flex justify-end space-x-4" data-oid="ylsxpi8">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="x9hec6z"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                        data-oid="nib6-3y"
                    >
                        {saving ? (
                            <>
                                <div
                                    className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"
                                    data-oid="0wsrng1"
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
