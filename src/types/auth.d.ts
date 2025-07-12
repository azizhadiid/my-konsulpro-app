// src/types/auth.d.ts

// Existing types from Register
export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterApiPayload { // <--- Pastikan ini ada dan diekspor
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface RegisterResponse {
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
        updated_at: string;
    };
}

// New types for Login
export interface LoginFormData {
    email: string;
    password: string;
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user'; // Tambahkan role jika ada
    email_verified_at: string | null; // Tambahkan ini untuk verifikasi email di masa depan
    // ... properti user lainnya dari backend
}

export interface LoginResponse {
    message: string;
    user: UserData;
    token: string;
}

// Forgot
export interface ForgotPasswordFormData {
    email: string;
}

export interface ForgotPasswordResponse {
    status: string; // Laravel mengirim 'status' dengan pesan
}

// Reset Password
export interface ResetPasswordFormData {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordResponse {
    message: string;
}