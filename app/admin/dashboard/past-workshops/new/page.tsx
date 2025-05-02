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
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid=":nx8013">
            <div className="flex items-center justify-between mb-8" data-oid="kpf5xa:">
                <h1 className="text-3xl font-bold" data-oid="yp2fqd5">
                    Add New Past Workshop
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="2j1epnd"
                >
                    Back to Dashboard
                </Link>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="ntwhcao"
                >
                    <p className="text-red-200" data-oid="2.yvv32">
                        {error}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                data-oid="_c:unn2"
            >
                <div className="grid grid-cols-1 gap-6" data-oid="04x4nx3">
                    <div data-oid="y5csm13">
                        <label
                            htmlFor="institution"
                            className="block text-sm font-medium mb-2"
                            data-oid="5hvmg3c"
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
                            data-oid="0jyfkf:"
                        />
                    </div>

                    <div data-oid="89::gw6">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium mb-2"
                            data-oid="2-o5g3_"
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
                            data-oid="-sqpohz"
                        />
                    </div>

                    <div data-oid="0:6u_.e">
                        <label
                            htmlFor="topic"
                            className="block text-sm font-medium mb-2"
                            data-oid="-:8:f.7"
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
                            data-oid="4.1g010"
                        />
                    </div>

                    <div data-oid="l4yawjp">
                        <label className="block text-sm font-medium mb-2" data-oid="v38cxie">
                            Highlights
                        </label>
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="j.8mng4">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. Covered React.js"
                                    data-oid="2.9br19"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeHighlight(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.highlights.length <= 1}
                                    data-oid="0k2-253"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="5of8vwi"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="qpxdh32"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="ae2gh9q"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="363r8h7"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="9os3f5d"
                                />
                            </svg>
                            Add Highlight
                        </button>
                    </div>

                    <div data-oid="h14eabb">
                        <label className="block text-sm font-medium mb-2" data-oid="43786x_">
                            Media Links
                        </label>
                        {formData.mediaLinks.map((link, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="n7amgv0">
                                <input
                                    type="url"
                                    value={link}
                                    onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. https://example.com/images/workshop.jpg"
                                    data-oid="3ydvl4i"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeMediaLink(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.mediaLinks.length <= 1}
                                    data-oid="u2.y4w7"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="o3p.gf1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="u.2.qel"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMediaLink}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="j7vbg-k"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="ko3lwf9"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="xzoz3tu"
                                />
                            </svg>
                            Add Media Link
                        </button>
                    </div>

                    <div className="flex justify-end mt-4" data-oid="p25gqb9">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            data-oid="73pbal7"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Past Workshop'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
