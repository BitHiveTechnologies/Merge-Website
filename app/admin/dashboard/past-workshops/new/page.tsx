'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BACKEND_URL } from '@/lib/utils';

export default function NewPastWorkshopPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        institution: '',
        date: '',
        topic: '',
        highlights: [''],
        mediaLinks: [''],
    });

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

        try {
            // Filter out empty highlights and media links
            const filteredHighlights = formData.highlights.filter((h) => h.trim() !== '');
            const filteredMediaLinks = formData.mediaLinks.filter((m) => m.trim() !== '');

            const response = await fetch(`${BACKEND_URL}/api/workshops/past`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    highlights: filteredHighlights,
                    mediaLinks: filteredMediaLinks,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create past workshop');
            }

            // Redirect to dashboard on success
            router.push('/admin/dashboard?tab=pastWorkshops');
        } catch (err: any) {
            setError(err.message || 'An error occurred while creating the past workshop');
            console.error('Error creating past workshop:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid="pd3qybi">
            <div className="flex items-center justify-between mb-8" data-oid="v_e.w_5">
                <h1 className="text-3xl font-bold" data-oid="mn_y-um">
                    Add New Past Workshop
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="0o7d-n-"
                >
                    Back to Dashboard
                </Link>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="6ace9nc"
                >
                    <p className="text-red-200" data-oid="_lbd8ng">
                        {error}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                data-oid="2uv7314"
            >
                <div className="grid grid-cols-1 gap-6" data-oid="fvw2y_-">
                    <div data-oid="87._8m:">
                        <label
                            htmlFor="institution"
                            className="block text-sm font-medium mb-2"
                            data-oid="omiw6jv"
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
                            data-oid="devteqc"
                        />
                    </div>

                    <div data-oid="i5:wf41">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium mb-2"
                            data-oid="dp3plfb"
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
                            data-oid="ke7opdf"
                        />
                    </div>

                    <div data-oid="5jxqqmb">
                        <label
                            htmlFor="topic"
                            className="block text-sm font-medium mb-2"
                            data-oid="tykw8h-"
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
                            data-oid="93kpx.9"
                        />
                    </div>

                    <div data-oid="bnbb9mp">
                        <label className="block text-sm font-medium mb-2" data-oid=".n3h.sy">
                            Highlights
                        </label>
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="h.ikm_a">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. Covered React.js"
                                    data-oid="ipfhij7"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeHighlight(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.highlights.length <= 1}
                                    data-oid="m9_5tcl"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="1zm-1hd"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="sofvsaj"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="8xvwhdc"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="430nvot"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="tmo-2vl"
                                />
                            </svg>
                            Add Highlight
                        </button>
                    </div>

                    <div data-oid="c06ljwm">
                        <label className="block text-sm font-medium mb-2" data-oid="l6yh86w">
                            Media Links
                        </label>
                        {formData.mediaLinks.map((link, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="908npjd">
                                <input
                                    type="url"
                                    value={link}
                                    onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. https://example.com/images/workshop.jpg"
                                    data-oid="mx457m7"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeMediaLink(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.mediaLinks.length <= 1}
                                    data-oid="26ai2v5"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="jl03h6o"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="-.7anar"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMediaLink}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="uk.-ea9"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="ke4geil"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="9:5679a"
                                />
                            </svg>
                            Add Media Link
                        </button>
                    </div>

                    <div className="flex justify-end mt-4" data-oid="me1_vz0">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            data-oid="9ygae.d"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Past Workshop'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
