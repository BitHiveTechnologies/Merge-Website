// Simple authentication utility functions for frontend use

import { BACKEND_URL } from "./utils";

// Check if user is logged in
export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;

    // Check if auth token exists in localStorage
    return !!localStorage.getItem('authToken');
};

// Get the authentication token
export const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('authToken');
};

// Set the authentication token
export const setAuthToken = (token: string): void => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('authToken', token);
};

// Remove the authentication token (logout)
export const removeAuthToken = (): void => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('authToken');
};

// Logout the user
export const logout = (): void => {
    removeAuthToken();
    // Clear any user-related data
    if (typeof window !== 'undefined') {
        localStorage.removeItem('username');
    }
    // Redirect to login page
    window.location.href = '/login';
};

// Get authenticated user data
export const getUser = async (): Promise<any> => {
    try {
        const token = getAuthToken();

        if (!token) {
            return null;
        }

        // Make API call to get user data
        const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

// Get username from localStorage
export const getUsername = (): string => {
    if (typeof window === 'undefined') return 'User';

    const username = localStorage.getItem('username');
    return username || 'User';
};
