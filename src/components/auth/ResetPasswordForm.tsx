'use client'

import { authService } from '@/lib/api';
import { ResetPasswordFormData } from '@/types/auth';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import InputField from '../ui/InputField';
import PasswordInput from '../ui/PasswordInput';
import Button from '../ui/Button';
import Link from 'next/link';

interface ResetPasswordFormProps {
    token: string;
    email: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token, email: initialEmail }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<ResetPasswordFormData>({
        token: token,
        email: initialEmail,
        password: "",
        password_confirmation: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialEmail) {
            setFormData(prev => ({ ...prev, email: initialEmail }));
        }
    }, [initialEmail]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.token) {
            toast.error("Token reset password tidak valid!");
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            toast.error("Konfirmasi password tidak cocok!");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("Password minimal 8 karakter!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.resetPassword(formData);
            console.log('Reset response:', response.data);
            toast.success(response.data.message || "Password berhasil direset!");

            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
        } catch (err: any) {
            console.error('Reset error:', err.response?.data || err.message);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.values(errors).forEach((messages: any) => {
                    messages.forEach((message: string) => toast.error(message));
                });
            } else {
                toast.error("Gagal reset password");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
                <InputField
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    readOnly={!!initialEmail}
                    className={!!initialEmail ? "cursor-not-allowed opacity-70" : ""}
                    icon={
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    }
                />
            </div>

            {/* Password Field */}
            <div>
                <PasswordInput
                    label="Password Baru"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password Baru"
                    showStrength
                    required
                    minLength={8}
                />
            </div>

            {/* Confirm Password Field */}
            <div>
                <PasswordInput
                    label="Konfirmasi Password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Konfirmasi Password"
                    required
                    minLength={8}
                />
                {/* Password Match Indicator */}
                {formData.password_confirmation && (
                    <div className="mt-2">
                        {formData.password === formData.password_confirmation ? (
                            <div className="flex items-center text-green-400 text-xs">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Password cocok
                            </div>
                        ) : (
                            <div className="flex items-center text-red-400 text-xs">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Password tidak cocok
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full"
                >
                    <span>Reset Password</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Button>
            </div>

            {/* Navigation Links */}
            <div className="pt-4 space-y-3">
                <div className="text-center text-white/50 text-sm">atau</div>
                <div className="flex justify-between items-center text-sm">
                    <Link
                        href="/auth/login"
                        className="text-white/70 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                    >
                        <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Login
                    </Link>
                    <Link
                        href="/contact-support"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    >
                        Bantuan
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default ResetPasswordForm;