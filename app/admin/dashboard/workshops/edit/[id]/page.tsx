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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="ka0sayo">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="6temrmn"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" data-oid="ds4_mh6">
            <div className="flex justify-between items-center mb-6" data-oid="bpjo_ax">
                <div data-oid="vu_p5-f">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="3el-zb7"
                    >
                        <span className="mr-1" data-oid="ysbitns">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="bj5b4ch">
                        Edit Workshop
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="06sih-1"
                >
                    <p className="text-red-200" data-oid="hc080d8">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="-ccwdcq"
                >
                    <p className="text-green-200" data-oid="-ki-7vs">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="lnfwxkz">
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="rb3lzv0"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="4uyl.a2">
                        Workshop Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="33-v35x">
                        <div data-oid="9ylzpw5">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="08j_or3"
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
                                data-oid="4s.npp_"
                            />
                        </div>
                        <div data-oid="na9k0a0">
                            <label
                                htmlFor="instructor"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="85xu5wm"
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
                                data-oid="bz5z69z"
                            />
                        </div>
                        <div data-oid="3qmbbvj">
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="0sgue.1"
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
                                data-oid="17nxro5"
                            />
                        </div>
                        <div data-oid="doch8c0">
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="c:k-8at"
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
                                data-oid="sjd9kcs"
                            />
                        </div>
                        <div data-oid="4t8f.e5">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="amo-l9p"
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
                                data-oid="6une_vt"
                            />
                        </div>
                        <div data-oid="jhr5b93">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid=".f-dzdh"
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
                                data-oid="k03kau:"
                            />
                        </div>
                        <div data-oid="i9khtve">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="3v5y5ob"
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
                                data-oid="hdc4v-y"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid=".l5_t2r">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid=":dy6xhq"
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
                                data-oid="0zva_y0"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2" data-oid="i15btu_">
                            <div className="flex items-center mb-4" data-oid="toeii1s">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="sz9wj0d"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="uu631y9"
                                >
                                    Mark as upcoming workshop
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="ut35wgz"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="u-vd1lo">
                        Tags
                    </h2>
                    <div className="space-y-4" data-oid="csgr1-v">
                        <div className="flex items-center" data-oid="g9w1g.j">
                            <input
                                type="text"
                                id="tagInput"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="Add a tag and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="360bq2p"
                            />

                            <button
                                type="button"
                                onClick={addTag}
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="2:fowj9"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="uwy5yyw">
                            {formData.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="0m.raow"
                                >
                                    <span data-oid="l2::fia">{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid=".edxmt-"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="tira2::"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="1eb0fsj"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tags.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="x8f-0_k">
                                    No tags added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="93f1qte">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="8btxb8x"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        data-oid="f5.sh4:"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Workshop'}
                    </button>
                </div>
            </form>
        </div>
    );
}
