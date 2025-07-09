// src/types/auth.d.ts
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