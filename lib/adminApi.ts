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
