import {
    RegisterFormData,
    LoginFormData,
    LoginResponse,
    ForgotPasswordFormData,
    ForgotPasswordResponse,
    ResetPasswordFormData,
    ResetPasswordResponse,
} from '@/types/auth';
import { FullProfileResponse, UserProfileData } from '@/types/user';
import { ContactFormData, ContactResponse } from '@/types/contact';
import { ConsultationHistoryResponse } from '@/types/consultation';
import { ArtikelListResponse, ArtikelDetailResponse } from '@/types/artikel';
import {
    ConsultationFormData,
    PaymentTokenResponse,
    SaveConsultationPayload,
    ConsultationSaveResponse,
} from '@/types/consultation-form';
import {
    RatingListResponse,
    SubmitRatingPayload,
    SubmitRatingResponse,
    HighRatedTestimonialsResponse,
} from '@/types/rating';
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
        const token = localStorage.getItem('token'); // Example for token
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
    // Forogt
    forgotPassword: (data: ForgotPasswordFormData) => api.post<ForgotPasswordResponse>('/forgot-password', data),
    // Reset
    resetPassword: (data: ResetPasswordFormData) => api.post<ResetPasswordResponse>('/reset-password', data),

    // Profile
    getProfile: () => api.get<FullProfileResponse>('/profile'),

    // New: Update user profile (uses FormData for file uploads)
    updateProfile: (data: FormData) => api.post<FullProfileResponse>('/profile', data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Penting untuk FormData
        },
    }),

    // New: Send contact email
    sendContactEmail: (data: ContactFormData) => api.post<ContactResponse>('/send-contact-email', data),

    // Riwayat Konsultasi
    getConsultationHistory: () => api.get<ConsultationHistoryResponse>('/consultation/history'),

    // Artikel
    getArtikels: (params?: { page?: number; search?: string; per_page?: number }) =>
        api.get<ArtikelListResponse>('/artikels', { params }),
    getArtikelById: (id: string | number) =>
        api.get<ArtikelDetailResponse>(`/artikels/${id}`),

    // konsultasi
    getSnapToken: (data: ConsultationFormData) =>
        api.post<PaymentTokenResponse>('/payment-token', data),
    saveConsultation: (data: SaveConsultationPayload) =>
        api.post<ConsultationSaveResponse>('/consultation/save', data),

    // Rating
    submitRating: (data: SubmitRatingPayload) =>
        api.post<SubmitRatingResponse>('/ratings', data),
    getRatingsAndStats: () =>
        api.get<RatingListResponse>('/ratings'),
    getHighRatedTestimonials: () => // NEW API call for home page testimonials
        api.get<HighRatedTestimonialsResponse>('/top-ratings'),
};