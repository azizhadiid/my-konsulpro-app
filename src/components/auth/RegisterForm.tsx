'use client'

import { authService } from "@/lib/api";
import { RegisterFormData } from "@/types/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import Link from "next/link";
import PasswordInput from "../ui/PasswordInput";

// src/components/auth/RegisterForm.tsx


const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { name, email, password, confirmPassword } = formData;

        // Validasi Front-end
        if (!name || !email || !password || !confirmPassword) {
            toast.warning('Semua kolom harus diisi!');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Password dan konfirmasi tidak sama!');
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            toast.error('Password minimal 8 karakter!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.register({
                name,
                email,
                password,
                confirmPassword, // Laravel expects password_confirmation, adjust if needed
            });
            console.log(response.data); // For debugging

            toast.success('Pendaftaran berhasil! Silakan login.');
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else if (error.response && error.response.data && error.response.data.errors) {
                // Handle Laravel validation errors
                const errors = error.response.data.errors;
                Object.values(errors).forEach((messages: any) => {
                    messages.forEach((message: string) => toast.error(message));
                });
            }
            else {
                toast.error('Terjadi kesalahan saat mendaftar.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
                label="Nama Lengkap"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
                icon={<svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />

            <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                icon={<svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
            />

            <PasswordInput
                label="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Buat password yang kuat"
                showStrength
                required
            />

            <PasswordInput
                label="Konfirmasi Password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
                required
            />

            {formData.confirmPassword && (
                <div className="flex items-center mt-2">
                    {formData.password === formData.confirmPassword ? (
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

            <Button isLoading={isLoading} className="w-full">
                <span>Buat Akun</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            </Button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-white/60">atau</span>
                </div>
            </div>

            <div className="text-center">
                <p className="text-white/70 text-sm">
                    Sudah punya akun?{' '}
                    <Link
                        href="/auth/login"
                        className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors duration-300 inline-flex items-center space-x-1 group"
                    >
                        <span>Masuk di sini</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;