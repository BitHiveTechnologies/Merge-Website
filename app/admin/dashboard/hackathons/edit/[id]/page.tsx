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
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="_sg2lju">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="pd2_rb1"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" data-oid="acyf8gp">
            <div className="flex justify-between items-center mb-6" data-oid="leg_5s4">
                <div data-oid="ax:axke">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="xghdesz"
                    >
                        <span className="mr-1" data-oid="rpr9yfg">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="ga3x47t">
                        Edit Hackathon
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="bxfs3-e"
                >
                    <p className="text-red-200" data-oid="e7wgecl">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="twduzav"
                >
                    <p className="text-green-200" data-oid="e.l::1p">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="y_:gvbp">
                {/* Basic Information */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="kbafju8"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="_7hkah_">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="ra8m0:3">
                        <div data-oid=":eqqvy1">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="n5wg5k1"
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
                                data-oid="u.0ido0"
                            />
                        </div>
                        <div data-oid="2up5k-o">
                            <label
                                htmlFor="organizer"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="0.uzwuv"
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
                                data-oid="gx0k3et"
                            />
                        </div>
                        <div data-oid="6jch.vw">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="2r49z7u"
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
                                data-oid="85wwpro"
                            />
                        </div>
                        <div data-oid="cfyvj5n">
                            <label
                                htmlFor="startTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="x_ok45r"
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
                                data-oid=":u52h_9"
                            />
                        </div>
                        <div data-oid="c1r_x9x">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="ceo-2qk"
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
                                data-oid="4rq9cy1"
                            />
                        </div>
                        <div data-oid="1must2o">
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="wu.ujio"
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
                                data-oid="8w2-sej"
                            />
                        </div>
                        <div data-oid="3i1qleu">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="0e6hbrs"
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
                                data-oid="weqtd.-"
                            />
                        </div>
                        <div data-oid="rg:zirv">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="nhrl5h8"
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
                                data-oid="r7plpmh"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="rywfl.a">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="u..usvx"
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
                                data-oid="x9hfc98"
                            ></textarea>
                        </div>
                        <div data-oid="hs.q51c">
                            <div className="flex items-center mb-4" data-oid="7cxezt9">
                                <input
                                    type="checkbox"
                                    id="isLive"
                                    name="isLive"
                                    checked={formData.isLive}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="ojfl_l."
                                />

                                <label
                                    htmlFor="isLive"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="o0dpkjv"
                                >
                                    Currently Live
                                </label>
                            </div>
                        </div>
                        <div data-oid="d5py4zz">
                            <div className="flex items-center mb-4" data-oid="w8.20vq">
                                <input
                                    type="checkbox"
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    checked={formData.isUpcoming}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="z4_ktri"
                                />

                                <label
                                    htmlFor="isUpcoming"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="byv:cpu"
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
                    data-oid="b9rain8"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid=".yxbs0i">
                        Tracks
                    </h2>
                    <div className="space-y-4" data-oid="0mokybh">
                        <div className="flex items-center" data-oid="h8-y395">
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
                                data-oid=".zze.be"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(trackInput, setTrackInput, 'tracks')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="_vm--r4"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="y5pqtkg">
                            {formData.tracks.map((track, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="_ysp3t3"
                                >
                                    <span data-oid="cw5xg2b">{track}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('tracks', track)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="gfjeqqx"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="og9wpwt"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="vxfdows"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.tracks.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="bf:vyf.">
                                    No tracks added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Structure */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="7rwjhz1"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="9fsgigz">
                        Structure
                    </h2>
                    <div className="space-y-4" data-oid="1:ptxbd">
                        <div className="flex items-center" data-oid="g1pi.3h">
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
                                data-oid="r1u5cc6"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(structureInput, setStructureInput, 'structure')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="i3xwtfc"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid=".o_5c_x">
                            {formData.structure.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="3sx8ag_"
                                >
                                    <span data-oid="yy3pzjt">{item}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('structure', item)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="l67ckrz"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid=":qagn:2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="07gayet"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.structure.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="3r.5hwz">
                                    No structure details added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prizes */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="syhou.y"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid=":9ay5u_">
                        Prizes
                    </h2>
                    <div className="space-y-4" data-oid="-u9dm0m">
                        <div className="flex items-center" data-oid="f0te8-o">
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
                                data-oid="1wnutnx"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(prizeInput, setPrizeInput, 'prizes')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="jntnr4k"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="k.us-1a">
                            {formData.prizes.map((prize, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="b6esrv-"
                                >
                                    <span data-oid="duhczmq">{prize}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('prizes', prize)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="hgceiss"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="st-8cdt"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="rffsf4v"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prizes.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="zw4xv5g">
                                    No prizes added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prerequisites */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="ve-46g8"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="o0n.wkh">
                        Prerequisites
                    </h2>
                    <div className="space-y-4" data-oid="mykhdeb">
                        <div className="flex items-center" data-oid="v7i71n.">
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
                                data-oid="ll9d3hg"
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
                                data-oid="o-uwqw9"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid=":e4a4t6">
                            {formData.prerequisites.map((prerequisite, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="pvf9zvj"
                                >
                                    <span data-oid="ajh.2x7">{prerequisite}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem('prerequisites', prerequisite)
                                        }
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="uw19xc5"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="45q876b"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="hwlgow_"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.prerequisites.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="rve1vo4">
                                    No prerequisites added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="1kse5gf"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="v3bmiym">
                        FAQs
                    </h2>
                    <div className="space-y-4" data-oid="tkh-5fy">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="g7b6vyk">
                            <div data-oid="d.gsj4m">
                                <label
                                    htmlFor="faqQuestion"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="2thmwpr"
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
                                    data-oid="xc.ct-_"
                                />
                            </div>
                            <div data-oid="oyo4wut">
                                <label
                                    htmlFor="faqAnswer"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                    data-oid="wstz0w:"
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
                                    data-oid="vat6_01"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end" data-oid="9gydu25">
                            <button
                                type="button"
                                onClick={addFaq}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="t64:_uw"
                            >
                                Add FAQ
                            </button>
                        </div>
                        <div className="space-y-3 mt-4" data-oid=":4imtbx">
                            {formData.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 rounded-md p-3"
                                    data-oid="l6d76_v"
                                >
                                    <div
                                        className="flex justify-between items-start"
                                        data-oid="1o5hn9_"
                                    >
                                        <div data-oid="68svj5d">
                                            <h3
                                                className="font-medium text-white"
                                                data-oid="9y_brwm"
                                            >
                                                {faq.question}
                                            </h3>
                                            <p
                                                className="text-gray-300 text-sm mt-1"
                                                data-oid="b9si1k2"
                                            >
                                                {faq.answer}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="text-gray-400 hover:text-gray-200"
                                            data-oid="346aa9c"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="csii2or"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                    data-oid="h.zv7tf"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {formData.faqs.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="0m0602z">
                                    No FAQs added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sponsors */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="fklmg-2"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="0eas_5w">
                        Sponsors
                    </h2>
                    <div className="space-y-4" data-oid="mowjhu3">
                        <div className="flex items-center" data-oid="ggxb:be">
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
                                data-oid="kquzkez"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(sponsorInput, setSponsorInput, 'sponsors')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid=".m0so-1"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="i2sey4a">
                            {formData.sponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="amnkugd"
                                >
                                    <span data-oid="wn7k8h2">{sponsor}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('sponsors', sponsor)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid="ba-08qj"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="mcp7:zw"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="q_h1gqj"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.sponsors.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="9ttu.g7">
                                    No sponsors added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Judges */}
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="-shax.v"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="m.lob1d">
                        Judges
                    </h2>
                    <div className="space-y-4" data-oid="2voh2_m">
                        <div className="flex items-center" data-oid="pt2tb1z">
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
                                data-oid="db_mqed"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    handleArrayInput(judgeInput, setJudgeInput, 'judges')
                                }
                                className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                                data-oid="-np.flz"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" data-oid="dh-tro-">
                            {formData.judges.map((judge, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full flex items-center"
                                    data-oid="0plc:_u"
                                >
                                    <span data-oid="2tm0caf">{judge}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('judges', judge)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                        data-oid=".0-z:sf"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-oid="lheind:"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                data-oid="zdo2w3g"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {formData.judges.length === 0 && (
                                <p className="text-gray-500 text-sm" data-oid="qscvdb-">
                                    No judges added yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="8yz3u3d">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="o1f-7kv"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        data-oid="ouuoguk"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Hackathon'}
                    </button>
                </div>
            </form>
        </div>
    );
}
