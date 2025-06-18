'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BACKEND_URL } from '@/lib/utils';

interface FAQ {
    question: string;
    answer: string;
}

interface HackathonFormData {
    title: string;
    organizer: string;
    startDate: string;
    startTime?: string;
    endDate: string;
    endTime?: string;
    location: string;
    description: string;
    image: string;
    isLive: boolean;
    isUpcoming: boolean;
    tracks: string[];
    structure: string[];
    prizes: string[];
    prerequisites: string[];
    faqs: FAQ[];
    sponsors: string[];
    judges: string[];
}

interface HackathonParams {
    params: {
        id: string;
    };
}

export default function EditHackathonPage({ params }: HackathonParams) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // State for various input fields
    const [trackInput, setTrackInput] = useState('');
    const [structureInput, setStructureInput] = useState('');
    const [prizeInput, setPrizeInput] = useState('');
    const [prerequisiteInput, setPrerequisiteInput] = useState('');
    const [sponsorInput, setSponsorInput] = useState('');
    const [judgeInput, setJudgeInput] = useState('');

    // State for FAQ inputs
    const [faqQuestion, setFaqQuestion] = useState('');
    const [faqAnswer, setFaqAnswer] = useState('');

    const [formData, setFormData] = useState<HackathonFormData>({
        title: '',
        organizer: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        description: '',
        image: '',
        isLive: false,
        isUpcoming: true,
        tracks: [],
        structure: [],
        prizes: [],
        prerequisites: [],
        faqs: [],
        sponsors: [],
        judges: [],
    });

    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                // Fetch the individual hackathon using the public API
                const response = await fetch(`${BACKEND_URL}/api/hackathons/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hackathon');
                }
                const data = await response.json();

                // Extract date and time from the ISO strings
                let formattedStartDate = '';
                let formattedStartTime = '';
                let formattedEndDate = '';
                let formattedEndTime = '';

                if (data.startDate) {
                    const startDateObj = new Date(data.startDate);
                    formattedStartDate = startDateObj.toISOString().split('T')[0];

                    // Format time as HH:MM
                    const startHours = startDateObj.getHours().toString().padStart(2, '0');
                    const startMinutes = startDateObj.getMinutes().toString().padStart(2, '0');
                    formattedStartTime = `${startHours}:${startMinutes}`;
                }

                if (data.endDate) {
                    const endDateObj = new Date(data.endDate);
                    formattedEndDate = endDateObj.toISOString().split('T')[0];

                    // Format time as HH:MM
                    const endHours = endDateObj.getHours().toString().padStart(2, '0');
                    const endMinutes = endDateObj.getMinutes().toString().padStart(2, '0');
                    formattedEndTime = `${endHours}:${endMinutes}`;
                }

                // Initialize arrays if they don't exist
                const tracks = data.tracks || [];
                const structure = data.structure || [];
                const prizes = data.prizes || [];
                const prerequisites = data.prerequisites || [];
                const faqs = data.faqs || [];
                const sponsors = data.sponsors || [];
                const judges = data.judges || [];

                setFormData({
                    ...data,
                    startDate: formattedStartDate,
                    startTime: formattedStartTime,
                    endDate: formattedEndDate,
                    endTime: formattedEndTime,
                    tracks,
                    structure,
                    prizes,
                    prerequisites,
                    faqs,
                    sponsors,
                    judges,
                    isLive: data.isLive !== false,
                    isUpcoming: data.isUpcoming !== false,
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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    // 1) First declare exactly which keys are arrays:
    type ArrayFieldKeys =
        | 'tracks'
        | 'structure'
        | 'prizes'
        | 'prerequisites'
        | 'sponsors'
        | 'judges'
        | 'faqs';

    // 2) Update your handler signature:
    const handleArrayInput = (
        inputValue: string,
        setInputValue: (value: string) => void,
        arrayName: ArrayFieldKeys,
    ) => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        // grab the field out of formData
        const field = formData[arrayName];

        // guard: must be an array
        if (!Array.isArray(field)) return;

        // special case for FAQs (array of objects)
        if (arrayName === 'faqs') {
            // you probably want to push a FAQ object, not a string
            const newFaq: FAQ = { question: trimmed, answer: '' };
            // avoid duplicate questions
            if ((field as FAQ[]).some((f) => f.question === newFaq.question)) {
                return;
            }
            setFormData({
                ...formData,
                faqs: [...(formData.faqs as FAQ[]), newFaq],
            });
            setInputValue('');
            return;
        }

        // now TS knows field is one of the string[] arrays
        const arr = field as string[];
        if (!arr.includes(trimmed)) {
            setFormData({
                ...formData,
                [arrayName]: [...arr, trimmed],
            });
            setInputValue('');
        }
    };

    // Generic function to remove items from arrays
    function removeArrayItem(
        arrayName: ArrayFieldKeys,
        itemToRemove // for FAQs this is the FAQ.question
        : string,
    ) {
        if (arrayName === 'faqs') {
            // filter out the FAQ whose question matches
            setFormData({
                ...formData,
                faqs: (formData.faqs as FAQ[]).filter((f) => f.question !== itemToRemove),
            });
        } else {
            // string[] case
            const arr = formData[arrayName] as string[];
            setFormData({
                ...formData,
                [arrayName]: arr.filter((item) => item !== itemToRemove),
            });
        }
    }

    // Handle FAQ addition
    const addFaq = () => {
        if (faqQuestion.trim() && faqAnswer.trim()) {
            setFormData({
                ...formData,
                faqs: [
                    ...formData.faqs,
                    { question: faqQuestion.trim(), answer: faqAnswer.trim() },
                ],
            });
            setFaqQuestion('');
            setFaqAnswer('');
        }
    };

    // Handle FAQ removal
    const removeFaq = (index: number) => {
        setFormData({
            ...formData,
            faqs: formData.faqs.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            // Format the start date and time
            const startDateTime = new Date(`${formData.startDate}T${formData.startTime}:00`);
            const startIsoDateTime = startDateTime.toISOString();

            // Format the end date and time
            const endDateTime = new Date(`${formData.endDate}T${formData.endTime}:00`);
            const endIsoDateTime = endDateTime.toISOString();

            // Prepare the data for submission
            const hackathonData = {
                ...formData,
                startDate: startIsoDateTime,
                endDate: endIsoDateTime,
            };

            // Remove temporary fields used for form handling
            delete hackathonData.startTime;
            delete hackathonData.endTime;

            // Send PUT request to update hackathon
            await fetch(`${BACKEND_URL}/api/hackathons/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
                },
                body: JSON.stringify(hackathonData),
            }).then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `API error: ${response.status}`);
                }
                return response.json();
            });

            setSuccess('Hackathon updated successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to update hackathon');
            console.error('Error updating hackathon:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="w2ol.od">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="a:y-p_f"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" data-oid="i51oxc_">
            <div className="flex justify-between items-center mb-6" data-oid="zgivfmg">
                <div data-oid="4cv7iq-">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="vp-4xp3"
                    >
                        <span className="mr-1" data-oid="24l:e4i">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="zzwl-gj">
                        Edit Hackathon
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="9.66kbh"
                >
                    <p className="text-red-200" data-oid="otaa:m6">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="ohvwjjj"
                >
                    <p className="text-green-200" data-oid="o7wx7pm">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="tkt5v45">
                {/* Basic Information */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="fyjs-fo"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="xohg_im">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="5l.uunn">
                        <div data-oid="mfaj0v1">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="zj:wm6h"
                            >
                                Hackathon Title*
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="pkw0.h-"
                            />
                        </div>
                        <div data-oid="685as9x">
                            <label
                                htmlFor="organizer"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="e:l2meb"
                            >
                                Organizer*
                            </label>
                            <input
                                type="text"
                                id="organizer"
                                name="organizer"
                                value={formData.organizer}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="uzpo:mu"
                            />
                        </div>
                        <div data-oid="-p6477c">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="wj38-p-"
                            >
                                Start Date*
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="q17-q5e"
                            />
                        </div>
                        <div data-oid="fnki42i">
                            <label
                                htmlFor="startTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="yoh-:57"
                            >
                                Start Time*
                            </label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="mc2ezng"
                            />
                        </div>
                        <div data-oid="cln286l">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="29v6.uf"
                            >
                                End Date*
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="kbtk:50"
                            />
                        </div>
                        <div data-oid="o1b_b-4">
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="xi3uedk"
                            >
                                End Time*
                            </label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="-1-g6sr"
                            />
                        </div>
                        <div data-oid="ddudoop">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="yrpaw.z"
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
                                placeholder="e.g., Online, Convention Center, etc."
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="rm6ydm3"
                            />
                        </div>
                        <div data-oid="z698rpc">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="3f:bt7."
                            >
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/images/hackathon.png"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="vouawun"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="lp2nb3r">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="cojhs9g"
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
                                data-oid="gqfhqbi"
                            ></textarea>
                        </div>
                        <div data-oid="iqiv_9o">
                            <div className="flex items-center mb-4" data-oid="om1w3ou">
                                <input
                                    type="checkbox"
                                    id="isLive"
                                    name="isLive"
                                    checked={formData.isLive}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="4:bt8mh"
                                />

                                <label
                                    htmlFor="isLive"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="z.t:363"
                                >
                                    Currently Live
                                </label>
                            </div>
                        </div>
                        <div data-oid="u7l7_qo">
                            <div className="flex items-center mb-4" data-oid="h2cbb_h">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="3h_cxk3"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="cu9fbg8"
                                >
                                    Mark as Upcoming
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracks */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="o4z8ogn"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="xnm5lk4">
                        Tracks
                    </h2>
                    <div className="space-y-4" data-oid="gsd:1jx">
                        <div className="flex items-center" data-oid="-2.2txw">
                            <input
                                type="text"
                                id="trackInput"
                                value={trackInput}
                                onChange={(e) => setTrackInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleArrayInput(trackInput, setTrackInput, 'tracks');
                                    }
                                }}
                                placeholder="Add a track and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="t.fhmfr"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(trackInput, setTrackInput, 'tracks')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="wv85xe9"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="kpgqdik">
                            {formData.tracks.map((track, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="1d5wrtx"
                                >
                                    <span data-oid="g636gma">{track}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('tracks', track)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="m..yq48"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="o-xnkme"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="_fzq5gl"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tracks.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="b_7h.cq">
                                    No tracks added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Structure */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="ub9j_.w"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="om5o:96">
                        Structure
                    </h2>
                    <div className="space-y-4" data-oid="1:huip9">
                        <div className="flex items-center" data-oid="hi.tz.b">
                            <input
                                type="text"
                                id="structureInput"
                                value={structureInput}
                                onChange={(e) => setStructureInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleArrayInput(
                                            structureInput,
                                            setStructureInput,
                                            'structure',
                                        );
                                    }
                                }}
                                placeholder="Add structure details and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="gle-wfo"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(structureInput, setStructureInput, 'structure')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="t-9r3m3"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="yopmg98">
                            {formData.structure.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="bt.y3p2"
                                >
                                    <span data-oid="mjqkl.m">{item}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('structure', item)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="h1-y0hm"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="sqot26z"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="0xwz2kv"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.structure.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="2-8hh.e">
                                    No structure details added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prizes */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="v85sgcz"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid=":gbbyaf">
                        Prizes
                    </h2>
                    <div className="space-y-4" data-oid="lsnfhw2">
                        <div className="flex items-center" data-oid=".sqo2wb">
                            <input
                                type="text"
                                id="prizeInput"
                                value={prizeInput}
                                onChange={(e) => setPrizeInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleArrayInput(prizeInput, setPrizeInput, 'prizes');
                                    }
                                }}
                                placeholder="Add a prize and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="ix7h9el"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(prizeInput, setPrizeInput, 'prizes')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid=".zwujeu"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="k.xqeak">
                            {formData.prizes.map((prize, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="t5g...a"
                                >
                                    <span data-oid="i52rxra">{prize}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('prizes', prize)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="8cwfdlv"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid=".oh9q44"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="n_7qc5o"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prizes.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="aa_njfz">
                                    No prizes added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prerequisites */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="_w3qwcw"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="u6z9i09">
                        Prerequisites
                    </h2>
                    <div className="space-y-4" data-oid="2gg:x.b">
                        <div className="flex items-center" data-oid="ik-3_f.">
                            <input
                                type="text"
                                id="prerequisiteInput"
                                value={prerequisiteInput}
                                onChange={(e) => setPrerequisiteInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleArrayInput(
                                            prerequisiteInput,
                                            setPrerequisiteInput,
                                            'prerequisites',
                                        );
                                    }
                                }}
                                placeholder="Add a prerequisite and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="6yezu2t"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(
                                        prerequisiteInput,
                                        setPrerequisiteInput,
                                        'prerequisites',
                                    )
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="x5.2cqa"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="mmlrsj4">
                            {formData.prerequisites.map((prerequisite, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="-gs2_dq"
                                >
                                    <span data-oid="6p88bg1">{prerequisite}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem('prerequisites', prerequisite)
                                        }
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="okcmlq9"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="hgfyfqz"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="z::80pp"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prerequisites.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="i1j:v67">
                                    No prerequisites added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="d4t-eqm"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="mr:ly0:">
                        FAQs
                    </h2>
                    <div className="space-y-4" data-oid="2qox1_b">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="j4z_gh3">
                            <div data-oid=".8p4_f3">
                                <label
                                    htmlFor="faqQuestion"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="gmg88:_"
                                >
                                    Question
                                </label>
                                <input
                                    type="text"
                                    id="faqQuestion"
                                    value={faqQuestion}
                                    onChange={(e) => setFaqQuestion(e.target.value)}
                                    placeholder="Enter a question"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    data-oid="l3.hxes"
                                />
                            </div>
                            <div data-oid="y-1s._a">
                                <label
                                    htmlFor="faqAnswer"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="fxaja5q"
                                >
                                    Answer
                                </label>
                                <input
                                    type="text"
                                    id="faqAnswer"
                                    value={faqAnswer}
                                    onChange={(e) => setFaqAnswer(e.target.value)}
                                    placeholder="Enter the answer"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    data-oid="4-p-v6p"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end" data-oid="onqsu77">
                            <button
                                type="button"
                                onClick={addFaq}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="vzx8anp"
                            >
                                Add FAQ
                            </button>
                        </div>
                        <div className="space-y-3 mt-4" data-oid="az-l:jo">
                            {formData.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 rounded-md p-3"
                                    data-oid="hj2v8jo"
                                >
                                    <div
                                        className="flex justify-between items-start"
                                        data-oid="ipketc0"
                                    >
                                        <div data-oid="0d.twy4">
                                            <h3
                                                className="font-medium text-white"
                                                data-oid="1vv:4z_"
                                            >
                                                {faq.question}
                                            </h3>
                                            <p
                                                className="text-gray-300 text-sm mt-1"
                                                data-oid="iz5o69b"
                                            >
                                                {faq.answer}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="text-gray-400 hover:text-gray-200"
                                            data-oid="gf-j70o"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="_zysvn:"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                    data-oid="khtagqb"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {formData.faqs.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="ou6vol2">
                                    No FAQs added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sponsors */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="xqkqf-w"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="mrtn5cx">
                        Sponsors
                    </h2>
                    <div className="space-y-4" data-oid="3jp6pxc">
                        <div className="flex items-center" data-oid="wnsaxlh">
                            <input
                                type="text"
                                id="sponsorInput"
                                value={sponsorInput}
                                onChange={(e) => setSponsorInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleArrayInput(sponsorInput, setSponsorInput, 'sponsors');
                                    }
                                }}
                                placeholder="Add a sponsor and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="fy4nc88"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(sponsorInput, setSponsorInput, 'sponsors')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="_f0bax-"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="ko_5xig">
                            {formData.sponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="w3v3692"
                                >
                                    <span data-oid="zx8vl7l">{sponsor}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('sponsors', sponsor)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="1y048qd"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="kjna_np"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="n3hvv1w"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.sponsors.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="mocoein">
                                    No sponsors added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Judges */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="5j2qujq"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="41za0qf">
                        Judges
                    </h2>
                    <div className="space-y-4" data-oid="o5e:bwk">
                        <div className="flex items-center" data-oid="irhgtov">
                            <input
                                type="text"
                                id="judgeInput"
                                value={judgeInput}
                                onChange={(e) => setJudgeInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleArrayInput(judgeInput, setJudgeInput, 'judges');
                                    }
                                }}
                                placeholder="Add a judge and press Enter"
                                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="dinx6s3"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(judgeInput, setJudgeInput, 'judges')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="70r7u0x"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="01_p4ny">
                            {formData.judges.map((judge, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="a4h15lw"
                                >
                                    <span data-oid=".hx8flv">{judge}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('judges', judge)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="d1ma3h5"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="yhipazs"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="v0_hr80"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.judges.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="55ae::b">
                                    No judges added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="p0xk5vv">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="l58:.u-"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        data-oid="y2_e50w"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Hackathon'}
                    </button>
                </div>
            </form>
        </div>
    );
}
