// Admin authentication utility functions

import { BACKEND_URL } from './utils';

// Check if admin is logged in
export const isAdminAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;

    // Check if admin auth token exists in localStorage
    return !!localStorage.getItem('adminAuthToken');
};

// Get the admin authentication token
export const getAdminAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('adminAuthToken');
};

// Set the admin authentication token
export const setAdminAuthToken = (token: string): void => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('adminAuthToken', token);
};

// Remove the admin authentication token (logout)
export const removeAdminAuthToken = (): void => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('adminAuthToken');
};

// Logout the admin
export const adminLogout = (): void => {
    removeAdminAuthToken();
    // Redirect to admin login page
    window.location.href = '/admin/login';
};

// Admin API request helper with authentication
export const adminFetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAdminAuthToken();

    if (!token) {
        throw new Error('Admin not authenticated');
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            // If unauthorized, logout admin
            if (response.status === 401) {
                adminLogout();
            }

            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Admin API request failed:', error);
        throw error;
    }
};
