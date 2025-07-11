"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { authService } from '@/lib/api';
import { ForgotPasswordFormData } from '@/types/auth';

interface ForgotPasswordFormProps {
    onEmailSent: (email: string) => void; // Callback saat email berhasil dikirim
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onEmailSent }) => {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email) {
            toast.warning('Email harus diisi!');
            setIsLoading(false);
            return;
        }

        // Email validation (basic regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Format email tidak valid!');
            setIsLoading(false);
            return;
        }

        try {
            const res = await authService.forgotPassword({ email });

            console.log('Response:', res.data);
            toast.success(res.data.status || "Link reset password berhasil dikirim!");
            onEmailSent(email); // Panggil callback untuk memberi tahu parent
        } catch (err: any) {
            console.error('Error:', err.response?.data || err.message);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.values(errors).forEach((messages: any) => {
                    messages.forEach((message: string) => toast.error(message));
                });
            } else {
                toast.error("Gagal mengirim reset password.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                icon={<svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
            />

            {/* Send Reset Button */}
            <Button isLoading={isLoading}>
                <span>Kirim Link Reset</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </Button>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-white/60">atau</span>
                </div>
            </div>

            {/* Back to Login */}
            <div className="text-center">
                <Link
                    href="/auth/login"
                    className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-300 inline-flex items-center space-x-1 group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Kembali ke Login</span>
                </Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;