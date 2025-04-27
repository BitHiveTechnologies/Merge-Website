// API service functions for interacting with the backend

const API_BASE_URL = 'http://localhost:8001/api';

// Generic fetch function with authentication
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    // Get auth token from localStorage if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.msg || `API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Hackathon API functions
export const hackathonApi = {
    // Get all hackathons
    getAll: async () => {
        return fetchWithAuth('/hackathons');
    },

    // Get hackathon by ID
    getById: async (id: string) => {
        return fetchWithAuth(`/hackathons/${id}`);
    },

    // Register for a hackathon
    register: async (
        id: string,
        registrationData: { teamName: string; teamSize: number; track: string },
    ) => {
        return fetchWithAuth(`/hackathons/register/${id}`, {
            method: 'POST',
            body: JSON.stringify(registrationData),
        });
    },

    // Get hackathon winners
    getWinners: async () => {
        return fetchWithAuth('/hackathons/winners');
    },
};

// Other API services can be added here
