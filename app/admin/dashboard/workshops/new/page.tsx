'use client';

import { useState } from 'react';
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

export default function NewWorkshopPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
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

            // Remove undefined values before sending to API
            Object.keys(workshopData).forEach((key) => {
                // if (workshopData[key] === undefined) {
                //     delete workshopData[key];
                // }
            }); // Send POST request to create workshop
            await fetch(`${BACKEND_URL}/api/workshops`, {
                method: 'POST',
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

            setSuccess('Workshop created successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to create workshop');
            console.error('Error creating workshop:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto" data-oid="3d14khp">
            <div className="flex justify-between items-center mb-6" data-oid="2:zj5yh">
                <div data-oid=":qmivy0">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="aw5zpn-"
                    >
                        <span className="mr-1" data-oid="0zx-_x_">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="2jaso0l">
                        Add New Workshop
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="ymxre-9"
                >
                    <p className="text-red-200" data-oid="qkhtx9c">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="h8fbq7q"
                >
                    <p className="text-green-200" data-oid="61btr_y">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="4_4s:yt">
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="ax_b7ic"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="ao4ttmd">
                        Workshop Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="-_kdsoh">
                        <div data-oid="a2ek93w">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="fv2sg3x"
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
                                data-oid="owng-gs"
                            />
                        </div>
                        <div data-oid="0-eg4.y">
                            <label
                                htmlFor="instructor"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="2lm9iws"
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
                                data-oid="iotvg_6"
                            />
                        </div>
                        <div data-oid="8cqvtbf">
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="h7-kuap"
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
                                data-oid="z5rtxh3"
                            />
                        </div>
                        <div data-oid="krzn5cx">
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="2nirpwl"
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
                                data-oid="7rrq362"
                            />
                        </div>
                        <div data-oid="c.iqzxe">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="82wu9ph"
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
                                data-oid="l_e-a1t"
                            />
                        </div>
                        <div data-oid="trycy_c">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="1zpdo06"
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
                                data-oid="aoyx2ug"
                            />
                        </div>
                        <div data-oid="u9:omly">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid=".guluon"
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
                                data-oid="5frnoz3"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid=":-rtjqu">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="8ya1puy"
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
                                data-oid="7dvuv05"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2" data-oid="t1kyw5g">
                            <div className="flex items-center mb-4" data-oid="bnl20wi">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="oqndu4k"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="ai0-qcg"
                                >
                                    Mark as upcoming workshop
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="_iuvdzr"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="ox8v:33">
                        Tags
                    </h2>
                    <div className="space-y-4" data-oid="7jlw9xi">
                        <div className="flex items-center" data-oid="hp_bsrc">
                            <input
                                type="text"
                                id="tagInput"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="Add a tag and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="pf_eash"
                            />

                            <button
                                type="button"
                                onClick={addTag}
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="2pzbobe"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="c108th1">
                            {formData.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="y:hr00h"
                                >
                                    <span data-oid="g8smlvr">{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="ky3zwt8"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="2p:o.jb"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="o7i3osi"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tags.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="et:zr51">
                                    No tags added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="--uwesd">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="9w9b1o:"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        data-oid="m6jh0_0"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Workshop'}
                    </button>
                </div>
            </form>
        </div>
    );
}
