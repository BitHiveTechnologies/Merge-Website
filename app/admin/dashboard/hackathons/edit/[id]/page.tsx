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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="fy.m9:6">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="1nkxj69"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" data-oid="cs5yzc.">
            <div className="flex justify-between items-center mb-6" data-oid="h_rn.by">
                <div data-oid="n0.qe2x">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="z-gj-dg"
                    >
                        <span className="mr-1" data-oid="sqmz::2">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="0-.gj64">
                        Edit Hackathon
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="8doq9z7"
                >
                    <p className="text-red-200" data-oid="omdo8i5">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="3ekdbnr"
                >
                    <p className="text-green-200" data-oid="ibzfgiq">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="qg7:hya">
                {/* Basic Information */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="fufas7p"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="hxk_:_s">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid=".0.86rm">
                        <div data-oid="ru4_365">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="fcq_.o2"
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
                                data-oid="0bpq20v"
                            />
                        </div>
                        <div data-oid="0f.4pek">
                            <label
                                htmlFor="organizer"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="zfw90kk"
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
                                data-oid="lm.1fpx"
                            />
                        </div>
                        <div data-oid="-q3109d">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="vgew49c"
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
                                data-oid="u-g:twv"
                            />
                        </div>
                        <div data-oid="--wfh7.">
                            <label
                                htmlFor="startTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="hc7s8h6"
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
                                data-oid="76ysh6g"
                            />
                        </div>
                        <div data-oid="mwkuspd">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="c-t9vtn"
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
                                data-oid="ef70dkz"
                            />
                        </div>
                        <div data-oid="ymmqxny">
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="ho_od98"
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
                                data-oid="wlr5q1m"
                            />
                        </div>
                        <div data-oid="mheqbe.">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="c0sp3aa"
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
                                data-oid="di:zmr_"
                            />
                        </div>
                        <div data-oid="diti81x">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="vpuhdyk"
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
                                data-oid="wb332e8"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="nx53gk5">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="unnceb1"
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
                                data-oid="7iewhc3"
                            ></textarea>
                        </div>
                        <div data-oid="tkdsd7u">
                            <div className="flex items-center mb-4" data-oid="67u7mic">
                                <input
                                    type="checkbox"
                                    id="isLive"
                                    name="isLive"
                                    checked={formData.isLive}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid=":mrz_uu"
                                />

                                <label
                                    htmlFor="isLive"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="513g3t5"
                                >
                                    Currently Live
                                </label>
                            </div>
                        </div>
                        <div data-oid="o23:w0u">
                            <div className="flex items-center mb-4" data-oid="1ckhv-j">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="96:g61h"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="tacqqog"
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
                    data-oid="pr-qicl"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="_x70-5y">
                        Tracks
                    </h2>
                    <div className="space-y-4" data-oid="iut.ste">
                        <div className="flex items-center" data-oid="703rod_">
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
                                data-oid="1x:xbyo"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(trackInput, setTrackInput, 'tracks')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="kfdusb4"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="fjd:xa3">
                            {formData.tracks.map((track, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid=".s:ux77"
                                >
                                    <span data-oid="rywb67:">{track}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('tracks', track)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="iif7guw"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="dq530yv"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="5sjjn5i"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tracks.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="m3q7j-p">
                                    No tracks added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Structure */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="r-_oq._"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="4lmhvhk">
                        Structure
                    </h2>
                    <div className="space-y-4" data-oid="z2a_ufh">
                        <div className="flex items-center" data-oid="wmt.tld">
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
                                data-oid="5r0.kvq"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(structureInput, setStructureInput, 'structure')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="vuvxsm9"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="a3n5ig_">
                            {formData.structure.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="95z2pb0"
                                >
                                    <span data-oid="3cr5_5i">{item}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('structure', item)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid=".esxebj"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="e49b5ex"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="y0g1qg5"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.structure.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="y.cg45p">
                                    No structure details added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prizes */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="hjb25kk"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="wdv.je_">
                        Prizes
                    </h2>
                    <div className="space-y-4" data-oid="u-fzf6i">
                        <div className="flex items-center" data-oid="7z:543e">
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
                                data-oid="a89rxzy"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(prizeInput, setPrizeInput, 'prizes')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="_fues:f"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="a-ayct8">
                            {formData.prizes.map((prize, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="er.:vi8"
                                >
                                    <span data-oid="s.xgim4">{prize}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('prizes', prize)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="l0s8br4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="i35gsay"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="baccnig"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prizes.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="8dupxgq">
                                    No prizes added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prerequisites */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid=":65blq:"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="8gnxis_">
                        Prerequisites
                    </h2>
                    <div className="space-y-4" data-oid="8sank.g">
                        <div className="flex items-center" data-oid="uyx08we">
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
                                data-oid="xtb59hb"
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
                                data-oid="2v7sg1v"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="u-38.oz">
                            {formData.prerequisites.map((prerequisite, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid=":l9gjox"
                                >
                                    <span data-oid="c9kd45l">{prerequisite}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem('prerequisites', prerequisite)
                                        }
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="ozur7nb"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="i8kob19"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="9cq_xh1"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prerequisites.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="whskaj:">
                                    No prerequisites added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="osd2co1"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="8z4ypnb">
                        FAQs
                    </h2>
                    <div className="space-y-4" data-oid="fh9q35m">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="b:-9.:1">
                            <div data-oid="bkbgj6y">
                                <label
                                    htmlFor="faqQuestion"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="jxza26i"
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
                                    data-oid="dikl027"
                                />
                            </div>
                            <div data-oid="ol0jhhz">
                                <label
                                    htmlFor="faqAnswer"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="z4il72y"
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
                                    data-oid="-84vlwk"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end" data-oid="56_1596">
                            <button
                                type="button"
                                onClick={addFaq}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="-m1xp9n"
                            >
                                Add FAQ
                            </button>
                        </div>
                        <div className="space-y-3 mt-4" data-oid="v0nfmzy">
                            {formData.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 rounded-md p-3"
                                    data-oid="mu1lbn9"
                                >
                                    <div
                                        className="flex justify-between items-start"
                                        data-oid="2r5hve1"
                                    >
                                        <div data-oid=".2ku76:">
                                            <h3
                                                className="font-medium text-white"
                                                data-oid="d0vzfxk"
                                            >
                                                {faq.question}
                                            </h3>
                                            <p
                                                className="text-gray-300 text-sm mt-1"
                                                data-oid="i.k9qoq"
                                            >
                                                {faq.answer}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="text-gray-400 hover:text-gray-200"
                                            data-oid="88xz8nn"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="sv.lgm3"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                    data-oid="w2h2c.p"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {formData.faqs.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="d:ceiw:">
                                    No FAQs added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sponsors */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="fnms_gv"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="d44ymfh">
                        Sponsors
                    </h2>
                    <div className="space-y-4" data-oid="05ia8ue">
                        <div className="flex items-center" data-oid="6txfl1k">
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
                                data-oid="lqewh4l"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(sponsorInput, setSponsorInput, 'sponsors')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="5b4.i-5"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="r6w40r0">
                            {formData.sponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="g8b3fk1"
                                >
                                    <span data-oid="7qhm9yk">{sponsor}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('sponsors', sponsor)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="pwkfx9v"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="5l0yo4c"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="ln:4k.a"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.sponsors.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="::lmuug">
                                    No sponsors added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Judges */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="cozzst:"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="cx:25p1">
                        Judges
                    </h2>
                    <div className="space-y-4" data-oid="va_2fkg">
                        <div className="flex items-center" data-oid="_th4pvt">
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
                                data-oid="7-_8mv0"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(judgeInput, setJudgeInput, 'judges')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="eku6v_0"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="1t-work">
                            {formData.judges.map((judge, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="_0y7jyp"
                                >
                                    <span data-oid="ipkxnkh">{judge}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('judges', judge)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="ym3nwnv"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="t976ml1"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="_dix_0_"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.judges.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="t:ujy8o">
                                    No judges added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="hz-jt2w">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="9h5c4be"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        data-oid="a97bd3h"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Hackathon'}
                    </button>
                </div>
            </form>
        </div>
    );
}
