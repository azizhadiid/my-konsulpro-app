'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning('Semua input wajib diisi!');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                email,
                password,
            });

            const { user } = response.data;
            toast.success('Login berhasil!');

            setTimeout(() => {
                if (user.role === 'admin') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/home');
                }
            }, 1200);
        } catch (error: any) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Login gagal, email atau password salah.');
            }
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Masuk KonsulPro
                </h1>

                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:outline-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:outline-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
                >
                    Masuk
                </button>

                <div className="flex justify-between text-sm text-gray-500 mt-4">
                    <Link href="/auth/forgot" className="hover:underline text-blue-600">
                        Lupa password?
                    </Link>
                    <Link href="/auth/register" className="hover:underline text-blue-600">
                        Belum punya akun?
                    </Link>
                </div>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </main>
    );
};

export default Login;
