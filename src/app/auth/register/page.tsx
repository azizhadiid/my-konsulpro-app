'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        // Validasi: semua field harus diisi
        if (!name || !email || !password || !confirmPassword) {
            toast.warning('Semua kolom harus diisi!');
            return;
        }

        // Validasi: password dan konfirmasi password harus sama
        if (password !== confirmPassword) {
            toast.error('Password dan konfirmasi tidak sama!');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            toast.success('Pendaftaran berhasil! Silakan login.');
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Terjadi kesalahan saat mendaftar.');
            }
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
                    Daftar Konsul<span className="text-indigo-500">Pro</span>
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Konfirmasi Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300"
                >
                    Daftar
                </button>

                <p className="text-sm text-center text-gray-600 mt-5">
                    Sudah punya akun?{' '}
                    <Link href="/auth/login" className="text-indigo-600 hover:underline font-medium">
                        Login di sini
                    </Link>
                </p>
            </form>
            <ToastContainer position="top-center" />
        </main>
    );
};

export default RegisterPage;
