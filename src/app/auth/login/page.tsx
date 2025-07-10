'use client';

import React from 'react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AuthCard from '@/components/ui/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
// ToastNotification sudah di-handle di layout.tsx

const LoginPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <AnimatedBackground />

            <AuthCard
                title="KonsulPro"
                subtitle="Solusi Konsultasi IT & Bisnis Terdepan"
                logoSvg={
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
            >
                <LoginForm />
            </AuthCard>

            {/* Bottom Text */}
            <div className="text-center mt-8 absolute bottom-8 z-10">
                <p className="text-white/50 text-xs">
                    © {new Date().getFullYear()} KonsulPro. Transforming Business Through Technology.
                </p>
            </div>
            {/* ToastContainer sudah di RootLayout */}
        </main>
    );
};

export default LoginPage;