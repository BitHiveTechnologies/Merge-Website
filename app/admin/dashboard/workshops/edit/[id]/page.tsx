'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminApi } from '@/lib/adminApi';
import { BACKEND_URL } from '@/lib/utils';

interface WorkshopFormData {
    title: string;
    date: string;
    time: string;
    location: string;
    instructor: string;
    description: string;
    image: string;
    price?: number;
    isUpcoming: boolean;
    tags: string[];
}

interface WorkshopParams {
    params: {
        id: string;
    };
}

export default function EditWorkshopPage({ params }: WorkshopParams) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [tagInput, setTagInput] = useState('');

    const [formData, setFormData] = useState<WorkshopFormData>({
        title: '',
        date: '',
        time: '',
        location: '',
        instructor: '',
        description: '',
        image: '',
        price: undefined,
        isUpcoming: true,
        tags: [],
    });

    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                // Fetch the individual workshop using the public API
                const response = await fetch(`${BACKEND_URL}/api/workshops/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch workshop');
                }
                const data = await response.json();

                // Extract date and time from the ISO string
                let formattedDate = '';
                let formattedTime = '';

                if (data.date) {
                    const dateObj = new Date(data.date);
                    formattedDate = dateObj.toISOString().split('T')[0];

                    // Format time as HH:MM
                    const hours = dateObj.getHours().toString().padStart(2, '0');
                    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
                    formattedTime = `${hours}:${minutes}`;
                }

                // Initialize tags if they don't exist
                const tags = data.tags || [];

                setFormData({
                    ...data,
                    date: formattedDate,
                    time: formattedTime,
                    tags: tags,
                    isUpcoming: data.isUpcoming !== false, // Default to true if not specified
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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // If value is empty, set to undefined so it won't be sent to the backend
        const parsedValue = value === '' ? undefined : parseFloat(value);
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()],
            });
            setTagInput('');
        }
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            // Format the date and time for the API
            const dateTime = new Date(`${formData.date}T${formData.time}:00`);
            const isoDateTime = dateTime.toISOString();

            // Prepare the data for submission
            const workshopData = {
                ...formData,
                date: isoDateTime,
            };

            // Send PUT request to update workshop
            await fetch(`${BACKEND_URL}/api/workshops/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
                },
                body: JSON.stringify(workshopData),
            }).then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `API error: ${response.status}`);
                }
                return response.json();
            });

            setSuccess('Workshop updated successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to update workshop');
            console.error('Error updating workshop:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="z9k6r36">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="yerzb4r"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" data-oid="ucxmj:n">
            <div className="flex justify-between items-center mb-6" data-oid="oc1ao2c">
                <div data-oid="2ipi:6o">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="p3xd59f"
                    >
                        <span className="mr-1" data-oid="thqwbsz">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="5v0ytlp">
                        Edit Workshop
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="3xwj-zd"
                >
                    <p className="text-red-200" data-oid="3crj2v9">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="ezcncpp"
                >
                    <p className="text-green-200" data-oid="i_2w.8v">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="b:h9fky">
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="lbspiqz"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="em_i6ab">
                        Workshop Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="6k:8h4j">
                        <div data-oid="6cxsij7">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="26e0am5"
                            >
                                Workshop Title*
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="vgjgwi1"
                            />
                        </div>
                        <div data-oid="vs2u4on">
                            <label
                                htmlFor="instructor"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="ulu8lmp"
                            >
                                Instructor*
                            </label>
                            <input
                                type="text"
                                id="instructor"
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="mbf6gkl"
                            />
                        </div>
                        <div data-oid="2iewa-p">
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="-292iv:"
                            >
                                Date*
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="2pgcrvd"
                            />
                        </div>
                        <div data-oid="d4fyrin">
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="shv2hmk"
                            >
                                Time*
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="6pvruvb"
                            />
                        </div>
                        <div data-oid="ptw:rxd">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="e--9j8k"
                            >
                                Location*
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., Online, Conference Room A, etc."
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="2tw5qd5"
                            />
                        </div>
                        <div data-oid="vz-vyi9">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid=":6ataqe"
                            >
                                Price (leave empty for free)
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleNumberChange}
                                min="0"
                                step="0.01"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid=".fs-i:f"
                            />
                        </div>
                        <div data-oid="sqg.v4f">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="3e1a4ag"
                            >
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/images/workshop.png"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="ti8z62s"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="_f.e.mg">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="cxufua8"
                            >
                                Description*
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="tl9:fxe"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2" data-oid="dajoeu9">
                            <div className="flex items-center mb-4" data-oid="da67_9_">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="bwl_s71"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid=":mtgcg1"
                                >
                                    Mark as upcoming workshop
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid=".xr035x"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="a2vgmva">
                        Tags
                    </h2>
                    <div className="space-y-4" data-oid="7d7.1uq">
                        <div className="flex items-center" data-oid="2igl7vf">
                            <input
                                type="text"
                                id="tagInput"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="Add a tag and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="xi:n_0i"
                            />

                            <button
                                type="button"
                                onClick={addTag}
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="bl9j:4u"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid=":yldwqx">
                            {formData.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="p39b70s"
                                >
                                    <span data-oid=":rh6z9x">{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="1wi95ci"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="3wa57pw"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="i.ih277"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tags.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="vnus-hw">
                                    No tags added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="osi9jt0">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="ix6s9vi"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        data-oid="loaai-3"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Workshop'}
                    </button>
                </div>
            </form>
        </div>
    );
}
