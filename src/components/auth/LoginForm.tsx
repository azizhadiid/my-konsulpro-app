'use client'

import { useAuth } from '@/context/AuthContext';
import { authService } from '@/lib/api';
import { LoginFormData } from '@/types/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import InputField from '../ui/InputField';
import PasswordInput from '../ui/PasswordInput';
import Button from '../ui/Button';
import Link from 'next/link';


const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login: authLogin } = useAuth(); // Ambil fungsi login dari AuthContext

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { email, password } = formData;

        // Validasi Front-end
        if (!email || !password) {
            toast.warning('Semua input wajib diisi!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.login({ email, password });
            const { user, token } = response.data;

            // Simpan user dan token ke AuthContext
            authLogin(user, token);

            toast.success('Login berhasil!');

            // Redirect berdasarkan role
            setTimeout(() => {
                if (user.role === 'admin') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/home');
                }
            }, 1200);

        } catch (error: any) {
            console.error('Login error:', error); // Untuk debugging
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.data?.errors) {
                // Handle Laravel validation errors (e.g., if email format is wrong)
                const errors = error.response.data.errors;
                Object.values(errors).forEach((messages: any) => {
                    messages.forEach((message: string) => toast.error(message));
                });
            } else {
                toast.error('Login gagal, email atau password salah.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
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

            {/* Password Input (re-using PasswordInput component) */}
            <PasswordInput
                label="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
            // showStrength tidak perlu untuk login
            />

            {/* Login Button */}
            <Button isLoading={isLoading}>
                <span>Sign In</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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

            {/* Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-sm">
                <Link
                    href="/auth/forgot"
                    className="text-purple-300 hover:text-purple-200 transition-colors duration-300 flex items-center space-x-1 group"
                >
                    <span>Lupa password?</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                <Link
                    href="/auth/register"
                    className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300 flex items-center space-x-1 group"
                >
                    <span>Buat akun baru</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;