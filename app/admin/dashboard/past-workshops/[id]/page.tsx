'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminApi } from '@/lib/adminApi';
import { BACKEND_URL } from '@/lib/utils';

interface PastWorkshopParams {
    params: {
        id: string;
    };
}

export default function EditPastWorkshopPage({ params }: PastWorkshopParams) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        institution: '',
        date: '',
        topic: '',
        highlights: [''],
        mediaLinks: [''],
    });

    useEffect(() => {
        const fetchPastWorkshop = async () => {
            try {
                // Fetch the individual past workshop using adminApi
                const data = await adminApi.pastWorkshops
                    .getAll()
                    .then((workshops) =>
                        workshops.find((workshop: any) => workshop._id === params.id),
                    );

                if (!data) {
                    throw new Error('Past workshop not found');
                }

                // Format the date for the input field (YYYY-MM-DDTHH:MM)
                let formattedDate = '';
                if (data.date) {
                    const dateObj = new Date(data.date);
                    formattedDate = dateObj.toISOString().slice(0, 16);
                }

                // Initialize arrays if they don't exist
                const highlights = data.highlights || [''];
                const mediaLinks = data.mediaLinks || [''];

                setFormData({
                    ...data,
                    date: formattedDate,
                    highlights: highlights.length > 0 ? highlights : [''],
                    mediaLinks: mediaLinks.length > 0 ? mediaLinks : [''],
                });
            } catch (err: any) {
                setError(err.message || 'Failed to fetch past workshop');
                console.error('Error fetching past workshop:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPastWorkshop();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleHighlightChange = (index: number, value: string) => {
        const newHighlights = [...formData.highlights];
        newHighlights[index] = value;
        setFormData((prev) => ({
            ...prev,
            highlights: newHighlights,
        }));
    };

    const addHighlight = () => {
        setFormData((prev) => ({
            ...prev,
            highlights: [...prev.highlights, ''],
        }));
    };

    const removeHighlight = (index: number) => {
        if (formData.highlights.length > 1) {
            const newHighlights = [...formData.highlights];
            newHighlights.splice(index, 1);
            setFormData((prev) => ({
                ...prev,
                highlights: newHighlights,
            }));
        }
    };

    const handleMediaLinkChange = (index: number, value: string) => {
        const newMediaLinks = [...formData.mediaLinks];
        newMediaLinks[index] = value;
        setFormData((prev) => ({
            ...prev,
            mediaLinks: newMediaLinks,
        }));
    };

    const addMediaLink = () => {
        setFormData((prev) => ({
            ...prev,
            mediaLinks: [...prev.mediaLinks, ''],
        }));
    };

    const removeMediaLink = (index: number) => {
        if (formData.mediaLinks.length > 1) {
            const newMediaLinks = [...formData.mediaLinks];
            newMediaLinks.splice(index, 1);
            setFormData((prev) => ({
                ...prev,
                mediaLinks: newMediaLinks,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            // Filter out empty highlights and media links
            const filteredHighlights = formData.highlights.filter((h) => h.trim() !== '');
            const filteredMediaLinks = formData.mediaLinks.filter((m) => m.trim() !== '');

            // Use adminApi to update the past workshop
            await adminApi.pastWorkshops.update(params.id, {
                ...formData,
                highlights: filteredHighlights,
                mediaLinks: filteredMediaLinks,
            });

            setSuccess('Past workshop updated successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/dashboard?tab=pastWorkshops');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'An error occurred while updating the past workshop');
            console.error('Error updating past workshop:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="dl2-379">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="hj7kj0q"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid="lm54ae-">
            <div className="flex justify-between items-center mb-6" data-oid="br9zjg6">
                <div data-oid="1p3m1md">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid=":66k4h5"
                    >
                        <span className="mr-1" data-oid="fczz_aj">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="wu77trs">
                        Edit Past Workshop
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="chlsi.4"
                >
                    <p className="text-red-200" data-oid="fd6kik8">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="llr_hny"
                >
                    <p className="text-green-200" data-oid="lilnu86">
                        {success}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                data-oid=".y8tx20"
            >
                <div className="grid grid-cols-1 gap-6" data-oid="bu:0kvk">
                    <div data-oid="djk._-z">
                        <label
                            htmlFor="institution"
                            className="block text-sm font-medium mb-2"
                            data-oid="f4zgp4."
                        >
                            Institution
                        </label>
                        <input
                            type="text"
                            id="institution"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g. Indian Institute of Technology Delhi"
                            data-oid="bbc7q0o"
                        />
                    </div>

                    <div data-oid="orv5zm8">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium mb-2"
                            data-oid="yn9:ycz"
                        >
                            Date
                        </label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            data-oid="vjazcji"
                        />
                    </div>

                    <div data-oid="6hvkkk8">
                        <label
                            htmlFor="topic"
                            className="block text-sm font-medium mb-2"
                            data-oid="hkvjq46"
                        >
                            Topic
                        </label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g. Advanced Web Development Workshop"
                            data-oid="wny5t2d"
                        />
                    </div>

                    <div data-oid=":zf41fx">
                        <label className="block text-sm font-medium mb-2" data-oid="4n_zilj">
                            Highlights
                        </label>
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="paghmrs">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. Covered React.js"
                                    data-oid="6256:lo"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeHighlight(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.highlights.length <= 1}
                                    data-oid="_jmc0a0"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid=":uephrc"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="v0f9b09"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="-p0a3cs"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="fz49aom"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="59xy8yt"
                                />
                            </svg>
                            Add Highlight
                        </button>
                    </div>

                    <div data-oid="o5a7hr-">
                        <label className="block text-sm font-medium mb-2" data-oid="kx:pt0m">
                            Media Links
                        </label>
                        {formData.mediaLinks.map((link, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="m6t5bwm">
                                <input
                                    type="url"
                                    value={link}
                                    onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. https://example.com/images/workshop.jpg"
                                    data-oid="v2:etsl"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeMediaLink(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.mediaLinks.length <= 1}
                                    data-oid="ih5urjo"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="f::o68s"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="gh86bwq"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMediaLink}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="ohbb.9c"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="4mnoue4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="ruwibnv"
                                />
                            </svg>
                            Add Media Link
                        </button>
                    </div>

                    <div className="flex justify-end mt-4" data-oid="86ous1j">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            data-oid="f.66x05"
                        >
                            {isSubmitting ? 'Saving...' : 'Update Past Workshop'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
