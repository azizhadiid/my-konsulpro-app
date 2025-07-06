import axios from 'axios';

// Base URL untuk API Laravel
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Axios instance dengan konfigurasi default
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor untuk menambahkan token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired atau tidak valid
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

// Service untuk consultation
export const consultationService = {
    // Membuat konsultasi baru
    create: async (consultationData: any) => {
        try {
            const response = await api.post('/consultations', consultationData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Mendapatkan daftar konsultasi user
    getUserConsultations: async () => {
        try {
            const response = await api.get('/consultations');
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Cek status konsultasi
    checkStatus: async (orderId: any) => {
        try {
            const response = await api.get(`/consultations/${orderId}/status`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },
};

// Service untuk authentication
export const authService = {
    login: async (credentials: any) => {
        try {
            const response = await api.post('/login', credentials);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    logout: async () => {
        try {
            const response = await api.post('/logout');
            localStorage.removeItem('token');
            return response.data;
        } catch (error: any) {
            localStorage.removeItem('token');
            throw error.response?.data || error.message;
        }
    },

    getUser: async () => {
        try {
            const response = await api.get('/user');
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },
};

export default api;