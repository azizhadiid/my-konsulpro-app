// src/lib/api.ts
import { RegisterFormData, LoginFormData, LoginResponse } from '@/types/auth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    console.error('NEXT_PUBLIC_API_URL is not defined in your environment variables.');
    // You might want to throw an error or handle this more gracefully in a real application
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        // You might add other headers here, e.g., Authorization for protected routes
    },
});

// Optional: Add request interceptors (e.g., for adding tokens)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Example for token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Add response interceptors (e.g., for handling global errors, token refresh)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Example: if (error.response.status === 401) { handleUnauthorized(); }
        return Promise.reject(error);
    }
);

export default api;

// You can also create specific API service functions here
export const authService = {
    // Register
    register: (data: RegisterFormData) => api.post('/register', data),
    // Login
    login: (data: LoginFormData) => api.post<LoginResponse>('/login', data),
};