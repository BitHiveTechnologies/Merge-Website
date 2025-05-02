'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BACKEND_URL } from '@/lib/utils';

interface Lesson {
    title: string;
    content: string;
    duration: string;
}

interface Module {
    title: string;
    lessons: Lesson[];
}

interface CourseFormData {
    title: string;
    description: string;
    instructor: string;
    duration: string;
    level: string;
    rating: number;
    price: number;
    image: string;
    isFeatured: boolean;
    curriculum: Module[];
}

interface CourseParams {
    params: {
        id: string;
    };
}

export default function EditCoursePage({ params }: CourseParams) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<CourseFormData>({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        level: 'Beginner',
        rating: 0,
        price: 0,
        image: '',
        isFeatured: false,
        curriculum: [
            {
                title: '',
                lessons: [
                    {
                        title: '',
                        content: '',
                        duration: '',
                    },
                ],
            },
        ],
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Fetch the individual course using the public API
                const response = await fetch(`${BACKEND_URL}/api/courses/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course');
                }
                const data = await response.json();

                // Initialize curriculum if it doesn't exist
                if (
                    !data.curriculum ||
                    !Array.isArray(data.curriculum) ||
                    data.curriculum.length === 0
                ) {
                    data.curriculum = [
                        {
                            title: '',
                            lessons: [
                                {
                                    title: '',
                                    content: '',
                                    duration: '',
                                },
                            ],
                        },
                    ];
                }
                // Ensure all modules have at least one lesson
                data.curriculum = data.curriculum.map(
                    (module: {
                        title: string;
                        lessons: { title: string; content: string; duration: string }[];
                    }) => ({
                        ...module,
                        lessons:
                            module.lessons && module.lessons.length > 0
                                ? module.lessons
                                : [{ title: '', content: '', duration: '' }],
                    }),
                );

                setFormData(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch course');
                console.error('Error fetching course:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
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

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value) || 0,
        });
    };

    const handleModuleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedCurriculum = [...formData.curriculum];
        updatedCurriculum[index] = {
            ...updatedCurriculum[index],
            [name]: value,
        };
        setFormData({
            ...formData,
            curriculum: updatedCurriculum,
        });
    };

    const handleLessonChange = (
        moduleIndex: number,
        lessonIndex: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        const updatedCurriculum = [...formData.curriculum];
        updatedCurriculum[moduleIndex].lessons[lessonIndex] = {
            ...updatedCurriculum[moduleIndex].lessons[lessonIndex],
            [name]: value,
        };
        setFormData({
            ...formData,
            curriculum: updatedCurriculum,
        });
    };

    const addModule = () => {
        setFormData({
            ...formData,
            curriculum: [
                ...formData.curriculum,
                {
                    title: '',
                    lessons: [
                        {
                            title: '',
                            content: '',
                            duration: '',
                        },
                    ],
                },
            ],
        });
    };

    const removeModule = (moduleIndex: number) => {
        const updatedCurriculum = formData.curriculum.filter((_, index) => index !== moduleIndex);
        setFormData({
            ...formData,
            curriculum: updatedCurriculum,
        });
    };

    const addLesson = (moduleIndex: number) => {
        const updatedCurriculum = [...formData.curriculum];
        updatedCurriculum[moduleIndex].lessons.push({
            title: '',
            content: '',
            duration: '',
        });
        setFormData({
            ...formData,
            curriculum: updatedCurriculum,
        });
    };

    const removeLesson = (moduleIndex: number, lessonIndex: number) => {
        const updatedCurriculum = [...formData.curriculum];
        updatedCurriculum[moduleIndex].lessons = updatedCurriculum[moduleIndex].lessons.filter(
            (_, index) => index !== lessonIndex,
        );
        setFormData({
            ...formData,
            curriculum: updatedCurriculum,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            // Send PUT request to update course
            await fetch(`${BACKEND_URL}/api/courses/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
                },
                body: JSON.stringify(formData),
            }).then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `API error: ${response.status}`);
                }
                return response.json();
            });

            setSuccess('Course updated successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to update course');
            console.error('Error updating course:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="6gbzk6_">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="e150_:o"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" data-oid="s4ku3fb">
            <div className="flex justify-between items-center mb-6" data-oid=".qi3gou">
                <div data-oid=".y1sxik">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="27o3yha"
                    >
                        <span className="mr-1" data-oid="trd6pig">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="qcmvsqj">
                        Edit Course
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="kisnmd:"
                >
                    <p className="text-red-200" data-oid="ra3x7j4">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="65odfih"
                >
                    <p className="text-green-200" data-oid="0bnlq2v">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="e9o759t">
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="b8f3cqd"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="hv6fojr">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="z9jyb.m">
                        <div data-oid="yh50ih_">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="ig3y6:m"
                            >
                                Course Title*
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid=":z6rzu-"
                            />
                        </div>
                        <div data-oid="q8svoce">
                            <label
                                htmlFor="instructor"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="radjkrs"
                            >
                                Instructor*
                            </label>
                            <input
                                type="text"
                                id="instructor"
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="7if-pmb"
                            />
                        </div>
                        <div data-oid="t1_et:f">
                            <label
                                htmlFor="duration"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="1jlh2ph"
                            >
                                Duration*
                            </label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., 6 weeks"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="nj87.s:"
                            />
                        </div>
                        <div data-oid="up5j2a9">
                            <label
                                htmlFor="level"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="ezsal43"
                            >
                                Level*
                            </label>
                            <select
                                id="level"
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="o_0n5r9"
                            >
                                <option value="Beginner" data-oid="rsq5a.i">
                                    Beginner
                                </option>
                                <option value="Intermediate" data-oid="lqoe31g">
                                    Intermediate
                                </option>
                                <option value="Advanced" data-oid="se9568w">
                                    Advanced
                                </option>
                            </select>
                        </div>
                        <div data-oid="3::rd_c">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="u55n05_"
                            >
                                Price*
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleNumberChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="ks00npc"
                            />
                        </div>
                        <div data-oid="zuuvk:g">
                            <label
                                htmlFor="rating"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="gqximvy"
                            >
                                Rating (0-5)
                            </label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleNumberChange}
                                min="0"
                                max="5"
                                step="0.1"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="on73w:n"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="gmjxl-h">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="w5f4yq9"
                            >
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/images/course.png"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                data-oid="9mpr6c0"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="xd4u3n-">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="07k59tb"
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
                                data-oid="ubl97za"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2" data-oid="c5nrk.4">
                            <div className="flex items-center" data-oid="13w9jq.">
                                <input
                                    type="checkbox"
                                    id="isFeatured"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="2rqmhwo"
                                />

                                <label
                                    htmlFor="isFeatured"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid="-j:exkx"
                                >
                                    Feature this course on the homepage
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="1url8:n"
                >
                    <div className="flex justify-between items-center mb-4" data-oid="lx799o.">
                        <h2 className="text-xl font-semibold text-purple-400" data-oid="_f-b5ve">
                            Curriculum
                        </h2>
                        <button
                            type="button"
                            onClick={addModule}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="1n3yga7"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="77gx9cd"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="e2hfgvu"
                                />
                            </svg>
                            Add Module
                        </button>
                    </div>

                    <div className="space-y-6" data-oid="83hl7xz">
                        {formData.curriculum.map((module, moduleIndex) => (
                            <div
                                key={moduleIndex}
                                className="bg-gray-750 rounded-lg border border-gray-600 p-4"
                                data-oid="u57ggtj"
                            >
                                <div
                                    className="flex justify-between items-center mb-3"
                                    data-oid="-b51-ty"
                                >
                                    <h3
                                        className="text-lg font-medium text-white"
                                        data-oid="az_3leo"
                                    >
                                        Module {moduleIndex + 1}
                                    </h3>
                                    {formData.curriculum.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeModule(moduleIndex)}
                                            className="text-red-400 hover:text-red-300"
                                            data-oid="a00opx2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="jgpb_h-"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                    data-oid="wpr2mnw"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="mb-4" data-oid="-5ouv:z">
                                    <label
                                        htmlFor={`module-title-${moduleIndex}`}
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                        data-oid="m0c6:-t"
                                    >
                                        Module Title*
                                    </label>
                                    <input
                                        type="text"
                                        id={`module-title-${moduleIndex}`}
                                        name="title"
                                        value={module.title}
                                        onChange={(e) => handleModuleChange(moduleIndex, e)}
                                        required
                                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        data-oid="j2jmgr8"
                                    />
                                </div>

                                <div className="mb-3" data-oid="knx7_yb">
                                    <div
                                        className="flex justify-between items-center mb-2"
                                        data-oid="3vf8api"
                                    >
                                        <h4
                                            className="text-md font-medium text-gray-300"
                                            data-oid="ql_89fj"
                                        >
                                            Lessons
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => addLesson(moduleIndex)}
                                            className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded-md text-xs font-medium transition-colors flex items-center"
                                            data-oid="pl6lt2t"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="m9c22b0"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                    clipRule="evenodd"
                                                    data-oid="h57vjt-"
                                                />
                                            </svg>
                                            Add Lesson
                                        </button>
                                    </div>

                                    <div className="space-y-4" data-oid="a4cg5ig">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <div
                                                key={lessonIndex}
                                                className="bg-gray-700 rounded-md border border-gray-600 p-3"
                                                data-oid="8bdq5iy"
                                            >
                                                <div
                                                    className="flex justify-between items-center mb-2"
                                                    data-oid="g5pyb02"
                                                >
                                                    <h5
                                                        className="text-sm font-medium text-gray-300"
                                                        data-oid="fd:y861"
                                                    >
                                                        Lesson {lessonIndex + 1}
                                                    </h5>
                                                    {module.lessons.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeLesson(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                )
                                                            }
                                                            className="text-red-400 hover:text-red-300"
                                                            data-oid=":hh:40p"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                data-oid="21w8y1."
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                    data-oid="s:ts5u9"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>

                                                <div
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                                                    data-oid="70yb6cv"
                                                >
                                                    <div data-oid="r17g0i.">
                                                        <label
                                                            htmlFor={`lesson-title-${moduleIndex}-${lessonIndex}`}
                                                            className="block text-xs font-medium text-gray-400 mb-1"
                                                            data-oid="c2s7469"
                                                        >
                                                            Lesson Title*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id={`lesson-title-${moduleIndex}-${lessonIndex}`}
                                                            name="title"
                                                            value={lesson.title}
                                                            onChange={(e) =>
                                                                handleLessonChange(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                    e,
                                                                )
                                                            }
                                                            required
                                                            className="w-full bg-gray-600 border border-gray-500 rounded-md py-1 px-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            data-oid="wxd7ft_"
                                                        />
                                                    </div>
                                                    <div data-oid=".tq-ehy">
                                                        <label
                                                            htmlFor={`lesson-duration-${moduleIndex}-${lessonIndex}`}
                                                            className="block text-xs font-medium text-gray-400 mb-1"
                                                            data-oid="bb_br7x"
                                                        >
                                                            Duration*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id={`lesson-duration-${moduleIndex}-${lessonIndex}`}
                                                            name="duration"
                                                            value={lesson.duration}
                                                            onChange={(e) =>
                                                                handleLessonChange(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                    e,
                                                                )
                                                            }
                                                            required
                                                            placeholder="e.g., 15 min"
                                                            className="w-full bg-gray-600 border border-gray-500 rounded-md py-1 px-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            data-oid="k4w2-q7"
                                                        />
                                                    </div>
                                                    <div
                                                        className="md:col-span-2"
                                                        data-oid="ck_73tl"
                                                    >
                                                        <label
                                                            htmlFor={`lesson-content-${moduleIndex}-${lessonIndex}`}
                                                            className="block text-xs font-medium text-gray-400 mb-1"
                                                            data-oid="8yrdjkr"
                                                        >
                                                            Content*
                                                        </label>
                                                        <textarea
                                                            id={`lesson-content-${moduleIndex}-${lessonIndex}`}
                                                            name="content"
                                                            value={lesson.content}
                                                            onChange={(e) =>
                                                                handleLessonChange(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                    e,
                                                                )
                                                            }
                                                            required
                                                            rows={2}
                                                            className="w-full bg-gray-600 border border-gray-500 rounded-md py-1 px-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            data-oid="gf3cil0"
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-4" data-oid="::pfu3s">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="_tdmdqv"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        data-oid=":xw77kr"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Course'}
                    </button>
                </div>
            </form>
        </div>
    );
}
