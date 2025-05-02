// Admin API service functions for interacting with the backend

import { adminFetchWithAuth } from './adminAuth';
import { BACKEND_URL } from './utils';

// Admin API functions
export const adminApi = {
    // Courses
    courses: {
        // Get all courses
        getAll: async () => {
            // Using public endpoint for courses list
            return fetch(`${BACKEND_URL}/api/courses`).then((res) => res.json());
        },

        // Create a new course
        create: async (courseData: any) => {
            return adminFetchWithAuth(`/courses`, {
                method: 'POST',
                body: JSON.stringify(courseData),
            });
        },

        // Update a course
        update: async (courseId: string, courseData: any) => {
            return adminFetchWithAuth(`/courses/${courseId}`, {
                method: 'PUT',
                body: JSON.stringify(courseData),
            });
        },

        // Delete a course
        delete: async (courseId: string) => {
            return adminFetchWithAuth(`/courses/${courseId}`, {
                method: 'DELETE',
            });
        },

        // Get all course registrations
        getRegistrations: async (courseId?: string) => {
            const data = await adminFetchWithAuth(`/admin/courses/registrations`);

            // If courseId is provided, filter the results client-side
            if (courseId) {
                return data.filter((reg: any) => reg.courseId._id === courseId);
            }

            return data;
        },
    },

    // Workshops
    workshops: {
        // Get all workshops
        getAll: async () => {
            // Using public endpoint for workshops list
            return fetch(`${BACKEND_URL}/api/workshops`).then((res) => res.json());
        },

        // Create a new workshop
        create: async (workshopData: any) => {
            return adminFetchWithAuth(`/workshops`, {
                method: 'POST',
                body: JSON.stringify(workshopData),
            });
        },

        // Update a workshop
        update: async (workshopId: string, workshopData: any) => {
            return adminFetchWithAuth(`/workshops/${workshopId}`, {
                method: 'PUT',
                body: JSON.stringify(workshopData),
            });
        },

        // Delete a workshop
        delete: async (workshopId: string) => {
            return adminFetchWithAuth(`/workshops/${workshopId}`, {
                method: 'DELETE',
            });
        },

        // Get all workshop registrations
        getRegistrations: async (workshopId?: string) => {
            const data = await adminFetchWithAuth(`/admin/workshops/registrations`);

            // If workshopId is provided, filter the results client-side
            if (workshopId) {
                return data.filter((reg: any) => reg.workshopId._id === workshopId);
            }

            return data;
        },
    },

    // Hackathons
    hackathons: {
        // Get all hackathons
        getAll: async () => {
            // Using public endpoint for hackathons list
            return fetch(`${BACKEND_URL}/api/hackathons`).then((res) => res.json());
        },

        // Create a new hackathon
        create: async (hackathonData: any) => {
            return adminFetchWithAuth(`/hackathons`, {
                method: 'POST',
                body: JSON.stringify(hackathonData),
            });
        },

        // Update a hackathon
        update: async (hackathonId: string, hackathonData: any) => {
            return adminFetchWithAuth(`/hackathons/${hackathonId}`, {
                method: 'PUT',
                body: JSON.stringify(hackathonData),
            });
        },

        // Delete a hackathon
        delete: async (hackathonId: string) => {
            return adminFetchWithAuth(`/hackathons/${hackathonId}`, {
                method: 'DELETE',
            });
        },

        // Get all hackathon registrations
        getRegistrations: async (hackathonId?: string) => {
            const data = await adminFetchWithAuth(`/admin/hackathons/registrations`);

            // If hackathonId is provided, filter the results client-side
            if (hackathonId) {
                return data.filter((reg: any) => reg.hackathonId._id === hackathonId);
            }

            return data;
        },
    },
};
