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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="yt1ef4k">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="cnuhsmg"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid="llru1x2">
            <div className="flex justify-between items-center mb-6" data-oid="in66zx8">
                <div data-oid="1otxqqk">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="p10pv.y"
                    >
                        <span className="mr-1" data-oid="ut14c53">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="vb1ha:1">
                        Edit Past Workshop
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="me.85dw"
                >
                    <p className="text-red-200" data-oid="nv_l4mq">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="kt.94hk"
                >
                    <p className="text-green-200" data-oid="md.2dvb">
                        {success}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                data-oid="_48jnd."
            >
                <div className="grid grid-cols-1 gap-6" data-oid="o.ap7_h">
                    <div data-oid="p7yzq-9">
                        <label
                            htmlFor="institution"
                            className="block text-sm font-medium mb-2"
                            data-oid="4y.84_4"
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
                            data-oid="_uhpqqe"
                        />
                    </div>

                    <div data-oid="p7h1edf">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium mb-2"
                            data-oid="ld_euax"
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
                            data-oid="s9fji_."
                        />
                    </div>

                    <div data-oid="q.m_ar.">
                        <label
                            htmlFor="topic"
                            className="block text-sm font-medium mb-2"
                            data-oid="84tn54o"
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
                            data-oid="g8gc2bq"
                        />
                    </div>

                    <div data-oid="gbz:qs:">
                        <label className="block text-sm font-medium mb-2" data-oid="wba3huf">
                            Highlights
                        </label>
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="ix36gka">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. Covered React.js"
                                    data-oid="e:ybolq"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeHighlight(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.highlights.length <= 1}
                                    data-oid="ps_7_9w"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="4..:zwc"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="4jsrfa:"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="lg7f3st"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="b7zwm_w"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="gfmbri5"
                                />
                            </svg>
                            Add Highlight
                        </button>
                    </div>

                    <div data-oid="cq8dljr">
                        <label className="block text-sm font-medium mb-2" data-oid="3xrqc82">
                            Media Links
                        </label>
                        {formData.mediaLinks.map((link, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="7:m51ym">
                                <input
                                    type="url"
                                    value={link}
                                    onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. https://example.com/images/workshop.jpg"
                                    data-oid="g:pspei"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeMediaLink(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.mediaLinks.length <= 1}
                                    data-oid="r5mzfzj"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="82wci9f"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="-9sdso-"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMediaLink}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="a.jfrmx"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="skids-f"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="bmfjl:n"
                                />
                            </svg>
                            Add Media Link
                        </button>
                    </div>

                    <div className="flex justify-end mt-4" data-oid="kvr6vjj">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            data-oid="tfqsm3z"
                        >
                            {isSubmitting ? 'Saving...' : 'Update Past Workshop'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
