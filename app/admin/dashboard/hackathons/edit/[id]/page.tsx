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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid=":fq:eyq">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid=".-vaxfc"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" data-oid="17s8a7:">
            <div className="flex justify-between items-center mb-6" data-oid="f2-p_n9">
                <div data-oid="_qx3wjj">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="49mc1e9"
                    >
                        <span className="mr-1" data-oid="kfjpbs3">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="9l49se8">
                        Edit Hackathon
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="koj79vi"
                >
                    <p className="text-red-200" data-oid="tx2zls8">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="7-8.ive"
                >
                    <p className="text-green-200" data-oid="k8_4l6m">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="yw145w.">
                {/* Basic Information */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="k19yhug"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="r_5ylg_">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="mu_ocmo">
                        <div data-oid="nk7exev">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="4jez3s."
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
                                data-oid="4v7zyn7"
                            />
                        </div>
                        <div data-oid="vp3pka:">
                            <label
                                htmlFor="organizer"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid=".2arrvz"
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
                                data-oid="rbeyddy"
                            />
                        </div>
                        <div data-oid="9spyk2q">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="pujea7s"
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
                                data-oid="95o1tyi"
                            />
                        </div>
                        <div data-oid="-2prjow">
                            <label
                                htmlFor="startTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="fs9ts57"
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
                                data-oid="qe9kmc4"
                            />
                        </div>
                        <div data-oid="3uyffoa">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="a_aebqa"
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
                                data-oid="l5v-5u8"
                            />
                        </div>
                        <div data-oid="phkqpm0">
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="ush-p8h"
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
                                data-oid="_uajwtu"
                            />
                        </div>
                        <div data-oid="yoj.xm0">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="hlbh0kj"
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
                                data-oid="wpjio6a"
                            />
                        </div>
                        <div data-oid="j87k99.">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="3t1ne._"
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
                                data-oid="kl0zxs_"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="w8g_lyp">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="vu1xzd-"
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
                                data-oid="b8mvmhm"
                            ></textarea>
                        </div>
                        <div data-oid="o9zr5a7">
                            <div className="flex items-center mb-4" data-oid=":ut6:3e">
                                <input
                                    type="checkbox"
                                    id="isLive"
                                    name="isLive"
                                    checked={formData.isLive}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid=":rrprk4"
                                />

                                <label
                                    htmlFor="isLive"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="xsiw047"
                                >
                                    Currently Live
                                </label>
                            </div>
                        </div>
                        <div data-oid="ipku_hr">
                            <div className="flex items-center mb-4" data-oid="q_9.6hx">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="nh5iskb"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="5ub--a1"
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
                    data-oid="80f8_9s"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="clh.ocy">
                        Tracks
                    </h2>
                    <div className="space-y-4" data-oid="0ycg4yu">
                        <div className="flex items-center" data-oid="7xyhtta">
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
                                data-oid="_maa4eh"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(trackInput, setTrackInput, 'tracks')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="acj-j0:"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="z_50guz">
                            {formData.tracks.map((track, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="yfvmy94"
                                >
                                    <span data-oid="a:mo71c">{track}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('tracks', track)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="tuj39tl"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="yec4s8v"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="k39-0l."
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tracks.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="elr0_b7">
                                    No tracks added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Structure */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="2i.jh.1"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="-me7c-.">
                        Structure
                    </h2>
                    <div className="space-y-4" data-oid="-v38d6d">
                        <div className="flex items-center" data-oid="f5cqmsb">
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
                                data-oid="gccl2jm"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(structureInput, setStructureInput, 'structure')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="kztujax"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="y88s.-a">
                            {formData.structure.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="r2gj:c8"
                                >
                                    <span data-oid="6:7n_jj">{item}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('structure', item)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="z4oer82"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="t5r5ph0"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="zk8fuz-"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.structure.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="o0b1ort">
                                    No structure details added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prizes */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="9_u6mi4"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="sv5vdoq">
                        Prizes
                    </h2>
                    <div className="space-y-4" data-oid="i2w_3:l">
                        <div className="flex items-center" data-oid="n98gavo">
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
                                data-oid="pg_2mg6"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(prizeInput, setPrizeInput, 'prizes')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="r9fvh_8"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="hc3bf6s">
                            {formData.prizes.map((prize, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="zzpg9dx"
                                >
                                    <span data-oid="kr:spdr">{prize}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('prizes', prize)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="q10h7ca"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="wc4yt4i"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="c9hsf40"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prizes.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="f9ez2l1">
                                    No prizes added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prerequisites */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid=".rr8nea"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="npxjaqi">
                        Prerequisites
                    </h2>
                    <div className="space-y-4" data-oid="5v5lw92">
                        <div className="flex items-center" data-oid="cf.vgfi">
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
                                data-oid="x2tojy1"
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
                                data-oid="o81g2x9"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="cmvtzz2">
                            {formData.prerequisites.map((prerequisite, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="sfh2--t"
                                >
                                    <span data-oid="p3m5zfn">{prerequisite}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem('prerequisites', prerequisite)
                                        }
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="5c3vjxc"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="z-eh8h9"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="_ypb8r:"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prerequisites.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="0cr3pc8">
                                    No prerequisites added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="p-.8.kt"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="t9ilu-t">
                        FAQs
                    </h2>
                    <div className="space-y-4" data-oid="gcuhjny">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="aldjp5m">
                            <div data-oid="2:s-3ua">
                                <label
                                    htmlFor="faqQuestion"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="39wxmmk"
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
                                    data-oid="y0l2am5"
                                />
                            </div>
                            <div data-oid="ou.6.gm">
                                <label
                                    htmlFor="faqAnswer"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="7wwo850"
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
                                    data-oid="d.o:iyy"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end" data-oid=":sr22:e">
                            <button
                                type="button"
                                onClick={addFaq}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="mok936t"
                            >
                                Add FAQ
                            </button>
                        </div>
                        <div className="space-y-3 mt-4" data-oid="e:8xeya">
                            {formData.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 rounded-md p-3"
                                    data-oid="q_9400a"
                                >
                                    <div
                                        className="flex justify-between items-start"
                                        data-oid="nhn2wwz"
                                    >
                                        <div data-oid=".-uuxwj">
                                            <h3
                                                className="font-medium text-white"
                                                data-oid="3cpeobg"
                                            >
                                                {faq.question}
                                            </h3>
                                            <p
                                                className="text-gray-300 text-sm mt-1"
                                                data-oid="wm7.4zs"
                                            >
                                                {faq.answer}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="text-gray-400 hover:text-gray-200"
                                            data-oid="czt4aab"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="x1bw..5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                    data-oid="_vxsxy9"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {formData.faqs.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="c_bp8t:">
                                    No FAQs added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sponsors */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="369b3ek"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="0ymhzdx">
                        Sponsors
                    </h2>
                    <div className="space-y-4" data-oid="bmt2z1n">
                        <div className="flex items-center" data-oid="uqaa.tz">
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
                                data-oid="voet:iz"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(sponsorInput, setSponsorInput, 'sponsors')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="0y_yh8x"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="0bi9sr4">
                            {formData.sponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="ytqqd.h"
                                >
                                    <span data-oid="fz46.q5">{sponsor}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('sponsors', sponsor)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="1284kgb"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="koc_9gh"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="c-:thc."
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.sponsors.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="rs8qfzm">
                                    No sponsors added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Judges */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="1mszmsu"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="dcsgard">
                        Judges
                    </h2>
                    <div className="space-y-4" data-oid="560v8h.">
                        <div className="flex items-center" data-oid="yhm02kn">
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
                                data-oid="g_-02a6"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(judgeInput, setJudgeInput, 'judges')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="-g_vs.-"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="uwwj-dq">
                            {formData.judges.map((judge, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="23:qurb"
                                >
                                    <span data-oid="47u3qkr">{judge}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('judges', judge)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid=".rr88xh"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="di9tiv0"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="uvkbrin"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.judges.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="pwielv3">
                                    No judges added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="7d.tqtt">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="9t-vp1n"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        data-oid="3w39wm0"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Hackathon'}
                    </button>
                </div>
            </form>
        </div>
    );
}
