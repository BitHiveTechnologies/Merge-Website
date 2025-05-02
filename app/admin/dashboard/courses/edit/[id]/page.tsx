'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

interface CourseParams {
    params: {
        id: string;
    };
}

export default function EditCoursePage({ params }: CourseParams) {
    const router = useRouter();
    const [course, setCourse] = useState({
        title: '',
        level: '',
        description: '',
        price: 0,
        instructor: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Fetch the individual course using the public API
                const response = await fetch(`/api/courses/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course');
                }
                const data = await response.json();
                setCourse(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch course');
                console.error('Error fetching course:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [params.id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: name === 'price' ? parseFloat(value) || 0 : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            await adminApi.courses.update(params.id, course);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to update course');
            console.error('Error updating course:', err);
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]" data-oid="a-j5ydw">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                    data-oid="cu37lu4"
                ></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4" data-oid="qeuwqob">
            <h1 className="text-3xl font-bold mb-8" data-oid="syi3h5c">
                Edit Course
            </h1>

            {error && (
                <div
                    className="bg-red-500/20 border border-red-500 rounded-md p-4 mb-6"
                    data-oid="e5oilvb"
                >
                    <p className="text-red-200" data-oid="wtf.a8x">
                        {error}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="b7k:vtn">
                <div data-oid="ea04.y6">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium mb-1"
                        data-oid="1n7hb7n"
                    >
                        Course Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="ik9g.7-"
                    />
                </div>

                <div data-oid="k27dg5a">
                    <label
                        htmlFor="level"
                        className="block text-sm font-medium mb-1"
                        data-oid="cv8ga9a"
                    >
                        Level
                    </label>
                    <select
                        id="level"
                        name="level"
                        value={course.level}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="vryin-e"
                    >
                        <option value="" data-oid="f_g-04r">
                            Select Level
                        </option>
                        <option value="Beginner" data-oid="pjs8j0z">
                            Beginner
                        </option>
                        <option value="Intermediate" data-oid="r-x34cx">
                            Intermediate
                        </option>
                        <option value="Advanced" data-oid=":7tr0u9">
                            Advanced
                        </option>
                    </select>
                </div>

                <div data-oid="9am98k6">
                    <label
                        htmlFor="instructor"
                        className="block text-sm font-medium mb-1"
                        data-oid="a6y_.67"
                    >
                        Instructor
                    </label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        value={course.instructor || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="kxlsg5j"
                    />
                </div>

                <div data-oid="t79nm0u">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium mb-1"
                        data-oid="._0ry3z"
                    >
                        Price (0 for free)
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={course.price || 0}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="tmvox6p"
                    />
                </div>

                <div data-oid="isss2iz">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium mb-1"
                        data-oid="r1o4cx."
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        data-oid="pg5k:11"
                    />
                </div>

                <div className="flex justify-end space-x-4" data-oid="2jz:o79">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                        data-oid="4dsvkv8"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors flex items-center"
                        data-oid="s1thf5l"
                    >
                        {saving ? (
                            <>
                                <div
                                    className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"
                                    data-oid="3ualc10"
                                ></div>
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
