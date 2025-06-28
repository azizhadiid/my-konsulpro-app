"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Set email dari parameter URL ketika component mount
    useEffect(() => {
        if (emailParam) {
            setForm(prev => ({ ...prev, email: emailParam }));
        }
    }, [emailParam]);

    // Password strength checker
    const checkPasswordStrength = (password: any) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(form.password));
    }, [form.password]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const getStrengthColor = (strength: any) => {
        if (strength <= 2) return "bg-red-400";
        if (strength <= 3) return "bg-yellow-400";
        return "bg-green-400";
    };

    const getStrengthText = (strength: any) => {
        if (strength <= 2) return "Lemah";
        if (strength <= 3) return "Sedang";
        return "Kuat";
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
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 px-4">
            <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                    {/* Logo & Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-2xl mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">KonsulPro</h1>
                        <p className="text-white/70 text-sm mb-6">Reset Password Anda</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="mb-4">
                            <label className="block text-white/90 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                                    required
                                    readOnly={!!emailParam}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-3">
                            <label className="block text-white/90 text-sm font-medium mb-2">
                                Password Baru
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password Baru"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Password Strength */}
                            {form.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-white/60">Kekuatan Password</span>
                                        <span className={`text-xs font-medium ${passwordStrength <= 2 ? 'text-red-400' : passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                                            {getStrengthText(passwordStrength)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-6">
                            <label className="block text-white/90 text-sm font-medium mb-2">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Konfirmasi Password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Password Match */}
                            {form.password_confirmation && (
                                <div className="mt-2 flex items-center">
                                    {form.password === form.password_confirmation ? (
                                        <div className="flex items-center text-green-400">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            <span className="text-xs">Password cocok</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-400">
                                            <AlertCircle className="w-4 h-4 mr-2" />
                                            <span className="text-xs">Password tidak cocok</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                                    Memproses...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    Reset Password
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            )}
                        </button>

                        <div className="text-center mt-6 text-white/50 text-sm">atau</div>

                        {/* Navigation Links */}
                        <div className="flex justify-between mt-4 text-sm">
                            <button
                                type="button"
                                onClick={() => router.push("/auth/login")}
                                className="text-white/70 hover:text-cyan-400 transition-colors duration-300 flex items-center"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Kembali ke Login
                            </button>
                            <button
                                type="button"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                            >
                                Bantuan
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-white/40 text-xs">
                        © 2025 KonsulPro. Transforming Business Through Technology.
                    </p>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                theme="dark"
                toastClassName="backdrop-blur-sm"
            />
        </main>
    );
};

export default ResetPasswordPage;