'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { myAppHook } from '../../../../context/AppProvider';

interface formData {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<formData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { register } = myAppHook();

    const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await register(formData.name ?? "", formData.email, formData.password, formData.confirmPassword ?? "")
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <form
                onSubmit={handleFormSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Daftar KonsulPro
                </h1>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleOnChangeInput}
                    placeholder="Nama Lengkap"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:outline-blue-500"
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChangeInput}
                    placeholder="Email"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:outline-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChangeInput}
                    placeholder="Password"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:outline-blue-500"
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnChangeInput}
                    placeholder="Konfirmasi Password"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-4 focus:outline-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
                >
                    Daftar
                </button>



                <p className="text-sm text-center text-gray-500 mt-6">
                    Sudah punya akun?{' '}
                    <Link
                        href="/auth/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login di sini
                    </Link>
                </p>
            </form>
        </main>
    );
};