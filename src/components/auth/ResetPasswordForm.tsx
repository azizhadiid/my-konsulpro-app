'use client'

import { usePasswordStrength } from '@/hooks/usePasswordStrength';
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

    // Re-use usePasswordStrength hook
    const { strength, color, text } = usePasswordStrength(formData.password);

    useEffect(() => {
        // Set email dari parameter URL ketika component mount
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

            // Redirect ke login setelah 2 detik
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
        } catch (err: any) {
            console.error('Reset error:', err.response?.data || err.message);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else if (err.response?.data?.errors) {
                // Handle Laravel validation errors
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
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field (read-only if from URL param) */}
            <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly={!!initialEmail} // Set readOnly jika email datang dari URL
                className={!!initialEmail ? "cursor-not-allowed opacity-70" : ""} // Gaya untuk readOnly
                icon={<svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
            />

            {/* Password Field */}
            <PasswordInput
                label="Password Baru"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password Baru"
                showStrength // Tampilkan indikator kekuatan password
                required
                minLength={8}
            />

            {/* Confirm Password Field */}
            <PasswordInput
                label="Konfirmasi Password"
                id="password_confirmation" // Pastikan name ini sesuai dengan Laravel
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Konfirmasi Password"
                required
                minLength={8}
            />

            {/* Password Match Indicator (re-used from RegisterForm logic) */}
            {formData.password_confirmation && (
                <div className="flex items-center mt-2">
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

            {/* Submit Button */}
            <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
                <span>Reset Password</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </Button>

            {/* Navigation Links */}
            <div className="text-center mt-6 text-white/50 text-sm">atau</div>
            <div className="flex justify-between mt-4 text-sm">
                <Link
                    href="/auth/login"
                    className="text-white/70 hover:text-cyan-400 transition-colors duration-300 flex items-center"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Login
                </Link>
                <Link
                    href="/contact-support" // Ganti dengan rute bantuan yang sesuai
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                    Bantuan
                </Link>
            </div>
        </form>
    );
};

export default ResetPasswordForm;