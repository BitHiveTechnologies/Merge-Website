'use client';

import { useState } from 'react';
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

export default function NewHackathonPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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

            // Send POST request to create hackathon
            await fetch(`${BACKEND_URL}/api/hackathons`, {
                method: 'POST',
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

            setSuccess('Hackathon created successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to create hackathon');
            console.error('Error creating hackathon:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto" data-oid="9zl_gca">
            <div className="flex justify-between items-center mb-6" data-oid="85pm:yq">
                <div data-oid="t.__t3l">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="seqn5mh"
                    >
                        <span className="mr-1" data-oid="vy.ixsm">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="cu6msu9">
                        Add New Hackathon
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="sczzrgh"
                >
                    <p className="text-red-200" data-oid="2ly4jf0">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="zj6u-0u"
                >
                    <p className="text-green-200" data-oid=":y:a:3j">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="-peazvf">
                {/* Basic Information */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="i:j256t"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="jo0fqy9">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="ww5d2gl">
                        <div data-oid=":2dxjqz">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="kxxpnvk"
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
                                data-oid="r2csk1x"
                            />
                        </div>
                        <div data-oid="y2.ppxp">
                            <label
                                htmlFor="organizer"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="aij4qlc"
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
                                data-oid="vu63d9."
                            />
                        </div>
                        <div data-oid=":wim9j.">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="5wjh0_n"
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
                                data-oid="_f-o7_4"
                            />
                        </div>
                        <div data-oid="c5l54i4">
                            <label
                                htmlFor="startTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="1a:-tx."
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
                                data-oid="p24gq1r"
                            />
                        </div>
                        <div data-oid="rttyi-i">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="e88.yj9"
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
                                data-oid="p9.m7l7"
                            />
                        </div>
                        <div data-oid="t-3kw0d">
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="oy2xvdv"
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
                                data-oid="g_c.yb3"
                            />
                        </div>
                        <div data-oid="cf6zexi">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="7r187dq"
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
                                data-oid="xir:v28"
                            />
                        </div>
                        <div data-oid="-14584o">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="1km829u"
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
                                data-oid="3i7qark"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="x8q4fkt">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid=":f_hd_u"
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
                                data-oid=".x1xx37"
                            ></textarea>
                        </div>
                        <div data-oid="ka1sroc">
                            <div className="flex items-center mb-4" data-oid="3ia:js1">
                                <input
                                    type="checkbox"
                                    id="isLive"
                                    name="isLive"
                                    checked={formData.isLive}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="j4l-96f"
                                />

                                <label
                                    htmlFor="isLive"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="gkut17a"
                                >
                                    Currently Live
                                </label>
                            </div>
                        </div>
                        <div data-oid="d5r._h9">
                            <div className="flex items-center mb-4" data-oid="ep76ow0">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="g8xdndo"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="llb0b7:"
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
                    data-oid="1o2q12y"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="4jmtn:a">
                        Tracks
                    </h2>
                    <div className="space-y-4" data-oid="db.u78f">
                        <div className="flex items-center" data-oid="6vc.4ne">
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
                                data-oid="m30pce3"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(trackInput, setTrackInput, 'tracks')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="r7-lzi0"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid=":04mnns">
                            {formData.tracks.map((track, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="d0hqlp_"
                                >
                                    <span data-oid="41_dj_z">{track}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('tracks', track)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="ft8q_l2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="b37xch7"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid=".0i_p1h"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tracks.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="g_jbor:">
                                    No tracks added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Structure */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="z5mgmla"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="-mo.lnm">
                        Structure
                    </h2>
                    <div className="space-y-4" data-oid="nqp:cmb">
                        <div className="flex items-center" data-oid="yyr.kgb">
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
                                data-oid="_kxi:7m"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(structureInput, setStructureInput, 'structure')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="s.cdhj4"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="dwgv4ln">
                            {formData.structure.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="--o:wdb"
                                >
                                    <span data-oid="7cz0.1v">{item}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('structure', item)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="m303.rn"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="0rtgg.k"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid=".aau4um"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.structure.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="vf1f_tc">
                                    No structure details added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prizes */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="bs.obg4"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="5ihx333">
                        Prizes
                    </h2>
                    <div className="space-y-4" data-oid=":e3eu:_">
                        <div className="flex items-center" data-oid="3._a824">
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
                                data-oid="so7xfs6"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(prizeInput, setPrizeInput, 'prizes')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="t3sakpb"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="q46nn82">
                            {formData.prizes.map((prize, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid=".qb6q9_"
                                >
                                    <span data-oid=":hfdrls">{prize}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('prizes', prize)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="d8:4klj"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="e9jvp_."
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="h1oy0qo"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prizes.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="s0kdazy">
                                    No prizes added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prerequisites */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="btkxlbq"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="op6tkxh">
                        Prerequisites
                    </h2>
                    <div className="space-y-4" data-oid="30.0il.">
                        <div className="flex items-center" data-oid="4x-9tma">
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
                                data-oid="z48ydbe"
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
                                data-oid="b86yj7u"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="_dzvz9s">
                            {formData.prerequisites.map((prerequisite, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="v6n18ob"
                                >
                                    <span data-oid="-2okaz2">{prerequisite}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem('prerequisites', prerequisite)
                                        }
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid=".cmw:7:"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid=".6j9wt4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="n412y0n"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prerequisites.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="f17oe6m">
                                    No prerequisites added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="x00h_pu"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="akmcfo:">
                        FAQs
                    </h2>
                    <div className="space-y-4" data-oid="cw..7:-">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="9z3a4on">
                            <div data-oid="h14c5yp">
                                <label
                                    htmlFor="faqQuestion"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="0139c0z"
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
                                    data-oid="nwtwrys"
                                />
                            </div>
                            <div data-oid="k1j_f3_">
                                <label
                                    htmlFor="faqAnswer"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="qtf1d-n"
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
                                    data-oid="rqmxetu"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end" data-oid="qksdmxj">
                            <button
                                type="button"
                                onClick={addFaq}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="bkpkovn"
                            >
                                Add FAQ
                            </button>
                        </div>
                        <div className="space-y-3 mt-4" data-oid="s4_2310">
                            {formData.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 rounded-md p-3"
                                    data-oid="oo0yt-a"
                                >
                                    <div
                                        className="flex justify-between items-start"
                                        data-oid="xoylv_v"
                                    >
                                        <div data-oid="n0c8169">
                                            <h3
                                                className="font-medium text-white"
                                                data-oid="e7jc1p:"
                                            >
                                                {faq.question}
                                            </h3>
                                            <p
                                                className="text-gray-300 text-sm mt-1"
                                                data-oid="p:j78ph"
                                            >
                                                {faq.answer}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="text-gray-400 hover:text-gray-200"
                                            data-oid="jr_hgk1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid=".ru3s1i"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                    data-oid="on9-p0p"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {formData.faqs.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="xb3ct7p">
                                    No FAQs added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sponsors */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="wqnmjjc"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="ct8j:tr">
                        Sponsors
                    </h2>
                    <div className="space-y-4" data-oid="to9hh4_">
                        <div className="flex items-center" data-oid="nbd:bae">
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
                                data-oid="g7k.z8l"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(sponsorInput, setSponsorInput, 'sponsors')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="2_uotgn"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="q5n045m">
                            {formData.sponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="2c8j_f-"
                                >
                                    <span data-oid="hpt57_4">{sponsor}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('sponsors', sponsor)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="bx2lccc"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="v_d_r3v"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="y8o:dlx"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.sponsors.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="p_z1ujx">
                                    No sponsors added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Judges */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="i1ettnt"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="qbf7d:p">
                        Judges
                    </h2>
                    <div className="space-y-4" data-oid="yhqbvd5">
                        <div className="flex items-center" data-oid="0um2i7a">
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
                                data-oid="rur_:zy"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(judgeInput, setJudgeInput, 'judges')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="2-_vhk8"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="3h.vw78">
                            {formData.judges.map((judge, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="u59pj95"
                                >
                                    <span data-oid="qlha7-c">{judge}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('judges', judge)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="vam8wkp"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="skqqqkp"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid=":2li-vv"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.judges.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="tsu4_3x">
                                    No judges added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="e8i5irv">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="0fl-225"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        data-oid="rjxzrnw"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Hackathon'}
                    </button>
                </div>
            </form>
        </div>
    );
}
