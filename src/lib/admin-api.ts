// src/lib/admin-api.ts

import axios from 'axios';
import { DashboardApiResponse } from '@/types/admin-dashboard'; // Import tipe yang baru dibuat
import { CreateArtikelApiResponse, CreateArtikelPayload, ArtikelListResponse, ApiResponse } from '@/types/artikel';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    console.error('NEXT_PUBLIC_API_URL is not defined in your environment variables.');
}

const adminApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor to add Authorization token
adminApi.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor to handle common errors like 401/403
adminApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                // Redirect to login if unauthorized or forbidden
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    window.location.href = "/auth/login"; // Or a more specific admin login page
                }
            }
        }
        return Promise.reject(error);
    }
);

export const adminService = {
    // Untuk Dashboard
    getAdminDashboardData: () => adminApi.get<DashboardApiResponse>('/dashboard'),
    // generateReport: () => adminApi.get<GenerateReportResponse>('/dashboard/generate-report'),

    // Untuk Artikel
    createArtikel: (data: FormData) =>
        adminApi.post<CreateArtikelApiResponse>('/artikels', data, {
            headers: {
                'Content-Type': 'multipart/form-data', // Penting untuk upload file
            },
        }),
    getArtikels: (page: number = 1, per_page: number = 10, search: string = '') =>
        adminApi.get<ArtikelListResponse>('/artikels', {
            params: { page, per_page, search },
        }),
    deleteArtikel: (id: number) => adminApi.delete<ApiResponse>(`/artikels/${id}`),
};
