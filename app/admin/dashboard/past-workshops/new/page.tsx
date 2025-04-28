'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

            const response = await fetch('/api/workshops/past', {
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
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Add New Past Workshop</h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                >
                    Back to Dashboard
                </Link>
            </div>

            {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6">
                    <p className="text-red-200">{error}</p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
            >
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="institution" className="block text-sm font-medium mb-2">
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
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-2">
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
                        />
                    </div>

                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium mb-2">
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
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Highlights</label>
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. Covered React.js"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeHighlight(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.highlights.length <= 1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Add Highlight
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Media Links</label>
                        {formData.mediaLinks.map((link, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="url"
                                    value={link}
                                    onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. https://example.com/images/workshop.jpg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeMediaLink(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.mediaLinks.length <= 1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMediaLink}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Add Media Link
                        </button>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Past Workshop'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
('use client');

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
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid="aw4qs8a">
            <div className="flex items-center justify-between mb-8" data-oid="y.w-8wl">
                <h1 className="text-3xl font-bold" data-oid="vb7-2gb">
                    Add New Past Workshop
                </h1>
                <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                    data-oid="82lj0h6"
                >
                    Back to Dashboard
                </Link>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="_7ze8do"
                >
                    <p className="text-red-200" data-oid="tt7zcaz">
                        {error}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                data-oid="h8:vz52"
            >
                <div className="grid grid-cols-1 gap-6" data-oid="nrzk_yb">
                    <div data-oid="461y811">
                        <label
                            htmlFor="institution"
                            className="block text-sm font-medium mb-2"
                            data-oid="sl8cv1x"
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
                            data-oid="u.2to0v"
                        />
                    </div>

                    <div data-oid=":l3tii_">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium mb-2"
                            data-oid="q8d6kr5"
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
                            data-oid="pgh0aon"
                        />
                    </div>

                    <div data-oid="zvws2bz">
                        <label
                            htmlFor="topic"
                            className="block text-sm font-medium mb-2"
                            data-oid="_.caqiv"
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
                            data-oid="1e3aume"
                        />
                    </div>

                    <div data-oid="e66hh.v">
                        <label className="block text-sm font-medium mb-2" data-oid="cv2._oh">
                            Highlights
                        </label>
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="e13l.2o">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. Covered React.js"
                                    data-oid="2j3ir47"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeHighlight(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.highlights.length <= 1}
                                    data-oid="p1i.:.s"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="_a0f6nj"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid=".7wix7-"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="vgwxi:i"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid=".ph8d-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="py3w6mz"
                                />
                            </svg>
                            Add Highlight
                        </button>
                    </div>

                    <div data-oid="m64d6xx">
                        <label className="block text-sm font-medium mb-2" data-oid="njlgm8y">
                            Media Links
                        </label>
                        {formData.mediaLinks.map((link, index) => (
                            <div key={index} className="flex items-center mb-2" data-oid="rkrwv_c">
                                <input
                                    type="url"
                                    value={link}
                                    onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. https://example.com/images/workshop.jpg"
                                    data-oid="28mn1nu"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeMediaLink(index)}
                                    className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-md"
                                    disabled={formData.mediaLinks.length <= 1}
                                    data-oid="9hee.ik"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid="i5xsrri"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            data-oid="zc4bh.b"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMediaLink}
                            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="w9zx7a5"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="u.t8-97"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="1md62q9"
                                />
                            </svg>
                            Add Media Link
                        </button>
                    </div>

                    <div className="flex justify-end mt-4" data-oid="qrv9ksk">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            data-oid=".a5s1um"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Past Workshop'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
