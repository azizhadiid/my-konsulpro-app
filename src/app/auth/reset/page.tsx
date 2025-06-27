"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ResetPasswordPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Ambil token dan email dari URL parameters
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');

    const [form, setForm] = useState({
        email: emailParam || "",
        password: "",
        password_confirmation: ""
    });
    const [loading, setLoading] = useState(false);

    // Set email dari parameter URL ketika component mount
    useEffect(() => {
        if (emailParam) {
            setForm(prev => ({ ...prev, email: emailParam }));
        }
    }, [emailParam]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!token) {
            toast.error("Token reset password tidak valid!");
            return;
        }

        if (form.password !== form.password_confirmation) {
            toast.error("Konfirmasi password tidak cocok!");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
                token: token,
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation,
            });

            console.log('Reset response:', response.data);
            toast.success("Password berhasil direset!");

            // Redirect ke login setelah 2 detik
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
        } catch (err: any) {
            console.error('Reset error:', err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Gagal reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <form onSubmit={handleSubmit} className="bg-white/80 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Reset Password</h1>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl mb-3"
                    required
                    readOnly={!!emailParam} // Readonly jika email dari parameter
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password Baru"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl mb-3"
                    required
                    minLength={8}
                />

                <input
                    name="password_confirmation"
                    type="password"
                    placeholder="Konfirmasi Password"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl mb-3"
                    required
                    minLength={8}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Memproses..." : "Reset Password"}
                </button>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => router.push("/auth/login")}
                        className="text-blue-600 hover:underline"
                    >
                        Kembali ke Login
                    </button>
                </div>

                <ToastContainer position="top-center" />
            </form>
        </main>
    );
};

export default ResetPasswordPage;