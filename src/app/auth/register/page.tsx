'use client'

import RegisterForm from '@/components/auth/RegisterForm';
import ToastNotification from '@/components/shared/ToastNotification';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AuthCard from '@/components/ui/AuthCard';
import React from 'react';


const RegisterPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <AnimatedBackground />

            <AuthCard
                title="Bergabung dengan KonsulPro"
                subtitle="Mulai perjalanan transformasi bisnis Anda"
                logoSvg={
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                }
            >
                <RegisterForm />
            </AuthCard>

            <div className="text-center mt-8 absolute bottom-8 z-10">
                <p className="text-white/50 text-xs">
                    © {new Date().getFullYear()} KonsulPro. Transforming Business Through Technology.
                </p>
            </div>

            <ToastNotification />
        </main>
    );
};

export default RegisterPage;