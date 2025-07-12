'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import AuthCard from '@/components/ui/AuthCard';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Link from 'next/link';
// ToastContainer sudah di RootLayout

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();

    // Ambil token dan email dari URL parameters
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');

    // Jika token atau email tidak ada, tampilkan pesan error atau redirect
    if (!token || !emailParam) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 px-4 text-white text-center">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-4">Link Tidak Valid</h1>
                    <p className="mb-6">Link reset password tidak valid atau sudah kedaluwarsa. Silakan coba lagi dari halaman lupa password.</p>
                    <Link href="/auth/forgot" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                        Kembali ke Lupa Password
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <AnimatedBackground /> {/* Re-use AnimatedBackground */}

            <AuthCard
                title="KonsulPro"
                subtitle="Reset Password Anda"
                logoSvg={
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
            >
                <ResetPasswordForm token={token} email={emailParam} />
            </AuthCard>

            {/* Footer */}
            <div className="text-center mt-6 absolute bottom-8 z-10">
                <p className="text-white/40 text-xs">
                    © {new Date().getFullYear()} KonsulPro. Transforming Business Through Technology.
                </p>
            </div>
            {/* ToastContainer sudah di RootLayout */}
        </main>
    );
};

export default ResetPasswordPage;
