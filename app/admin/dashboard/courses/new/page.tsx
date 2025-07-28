'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminApi } from '@/lib/adminApi';
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

export default function NewCoursePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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
            // Send POST request to create course
            await fetch(`${BACKEND_URL}/api/courses`, {
                method: 'POST',
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

            setSuccess('Course created successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to create course');
            console.error('Error creating course:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto" data-oid="bu0rdt5">
            <div className="flex justify-between items-center mb-6" data-oid="89o4ufy">
                <div data-oid="avcy.v9">
                    <Link
                        href="/admin/dashboard"
                        className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 mb-4 inline-flex items-center"
                        data-oid="5hx69:9"
                    >
                        <span className="mr-1" data-oid="28n__5h">
                            ←
                        </span>{' '}
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4" data-oid="f3.f3aa">
                        Add New Course
                    </h1>
                </div>
            </div>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="q1evid6"
                >
                    <p className="text-red-200" data-oid="hodw-m7">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div
                    className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6"
                    data-oid="f3t4i9u"
                >
                    <p className="text-green-200" data-oid="s.2c.:f">
                        {success}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="o-.kgl3">
                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="utxad0p"
                >
                    <h2 className="text-xl font-semibold mb-4 text-purple-400" data-oid="f.a_y22">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="a3huyw-">
                        <div data-oid="1wubror">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="gm-70s8"
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
                                data-oid="jd:d5q2"
                            />
                        </div>
                        <div data-oid="6d_kg5-">
                            <label
                                htmlFor="instructor"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="4-4zj61"
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
                                data-oid="048-gyb"
                            />
                        </div>
                        <div data-oid="mh1mxq9">
                            <label
                                htmlFor="duration"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="ndzvwh:"
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
                                data-oid="qy:b3a6"
                            />
                        </div>
                        <div data-oid="t.ak0-7">
                            <label
                                htmlFor="level"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="78d_rsg"
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
                                data-oid="l5kkmkd"
                            >
                                <option value="Beginner" data-oid=":oxkm5m">
                                    Beginner
                                </option>
                                <option value="Intermediate" data-oid="ump02ls">
                                    Intermediate
                                </option>
                                <option value="Advanced" data-oid="qtz7-0r">
                                    Advanced
                                </option>
                            </select>
                        </div>
                        <div data-oid="ass46m5">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="rt9vibz"
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
                                data-oid="rl8-x9s"
                            />
                        </div>
                        <div data-oid="oe.lhyr">
                            <label
                                htmlFor="rating"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="umy0sit"
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
                                data-oid="r:9tqyj"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="aiutib.">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="h24zcby"
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
                                data-oid="k95x3ns"
                            />
                        </div>
                        <div className="md:col-span-2" data-oid="oicy:f4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-1"
                                data-oid="cpb0qqs"
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
                                data-oid="nb5_a2l"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2" data-oid="6haxsl4">
                            <div className="flex items-center" data-oid="96y2s31">
                                <input
                                    type="checkbox"
                                    id="isFeatured"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                                    data-oid="o9r316:"
                                />

                                <label
                                    htmlFor="isFeatured"
                                    className="ml-2 block text-sm text-gray-300"
                                    data-oid=":3z5y2s"
                                >
                                    Feature this course on the homepage
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6"
                    data-oid="jzqis3n"
                >
                    <div className="flex justify-between items-center mb-4" data-oid="qlszcin">
                        <h2 className="text-xl font-semibold text-purple-400" data-oid="m9:q4ln">
                            Curriculum
                        </h2>
                        <button
                            type="button"
                            onClick={addModule}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                            data-oid="0fkcyl8"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-oid="nq5gfpg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    data-oid="cpytsp."
                                />
                            </svg>
                            Add Module
                        </button>
                    </div>

                    <div className="space-y-6" data-oid="3_peiyj">
                        {formData.curriculum.map((module, moduleIndex) => (
                            <div
                                key={moduleIndex}
                                className="bg-gray-750 rounded-lg border border-gray-600 p-4"
                                data-oid="rg-p64s"
                            >
                                <div
                                    className="flex justify-between items-center mb-3"
                                    data-oid="tk-1w67"
                                >
                                    <h3
                                        className="text-lg font-medium text-white"
                                        data-oid="1vb8klg"
                                    >
                                        Module {moduleIndex + 1}
                                    </h3>
                                    {formData.curriculum.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeModule(moduleIndex)}
                                            className="text-red-400 hover:text-red-300"
                                            data-oid="a49exj5"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="oe3w7vh"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                    data-oid="gl4j22r"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="mb-4" data-oid="7hcov8f">
                                    <label
                                        htmlFor={`module-title-${moduleIndex}`}
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                        data-oid="a-3qq9c"
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
                                        data-oid="21kwj67"
                                    />
                                </div>

                                <div className="mb-3" data-oid="75c3-ek">
                                    <div
                                        className="flex justify-between items-center mb-2"
                                        data-oid="01vfsw6"
                                    >
                                        <h4
                                            className="text-md font-medium text-gray-300"
                                            data-oid="2935fi0"
                                        >
                                            Lessons
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => addLesson(moduleIndex)}
                                            className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded-md text-xs font-medium transition-colors flex items-center"
                                            data-oid="y97b7d."
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                data-oid="pk.co4m"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                    clipRule="evenodd"
                                                    data-oid="6y_5.d4"
                                                />
                                            </svg>
                                            Add Lesson
                                        </button>
                                    </div>

                                    <div className="space-y-4" data-oid="hj_--dj">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <div
                                                key={lessonIndex}
                                                className="bg-gray-700 rounded-md border border-gray-600 p-3"
                                                data-oid="tt9.gph"
                                            >
                                                <div
                                                    className="flex justify-between items-center mb-2"
                                                    data-oid="8rvpxup"
                                                >
                                                    <h5
                                                        className="text-sm font-medium text-gray-300"
                                                        data-oid="mc7.2bf"
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
                                                            data-oid="7d5vpc1"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                data-oid="wcsg7oa"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                    data-oid="p3pc2pn"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>

                                                <div
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                                                    data-oid="_q27zpv"
                                                >
                                                    <div data-oid="-py3t5s">
                                                        <label
                                                            htmlFor={`lesson-title-${moduleIndex}-${lessonIndex}`}
                                                            className="block text-xs font-medium text-gray-400 mb-1"
                                                            data-oid="9rmyegv"
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
                                                            data-oid="kpe:8e:"
                                                        />
                                                    </div>
                                                    <div data-oid=".-z4.hh">
                                                        <label
                                                            htmlFor={`lesson-duration-${moduleIndex}-${lessonIndex}`}
                                                            className="block text-xs font-medium text-gray-400 mb-1"
                                                            data-oid="2r2-5ne"
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
                                                            data-oid="126puwv"
                                                        />
                                                    </div>
                                                    <div
                                                        className="md:col-span-2"
                                                        data-oid="8buss67"
                                                    >
                                                        <label
                                                            htmlFor={`lesson-content-${moduleIndex}-${lessonIndex}`}
                                                            className="block text-xs font-medium text-gray-400 mb-1"
                                                            data-oid="mu0r1ee"
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
                                                            data-oid="c4nu2z:"
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

                <div className="flex justify-end space-x-4" data-oid="k50hx.r">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="cbrxh70"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        data-oid="03f95d6"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
}
