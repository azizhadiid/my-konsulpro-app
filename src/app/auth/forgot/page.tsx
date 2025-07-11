'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AuthCard from '@/components/ui/AuthCard';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ForgotPasswordSuccess from '@/components/auth/ForgotPasswordSuccess';
import { authService } from '@/lib/api'; // Import authService untuk resend

const ForgotPage = () => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [isLoadingResend, setIsLoadingResend] = useState(false); // Untuk tombol kirim ulang

    // Callback saat email berhasil dikirim dari ForgotPasswordForm
    const handleEmailSent = (email: string) => {
        setIsEmailSent(true);
        setSubmittedEmail(email);
    };

    // Handler untuk tombol "Kirim Ulang" di ForgotPasswordSuccess
    const handleResendEmail = async () => {
        setIsLoadingResend(true);
        try {
            // Panggil API forgotPassword lagi dengan email yang sama
            const res = await authService.forgotPassword({ email: submittedEmail });
            toast.success(res.data.status || "Link reset password baru telah dikirim!");
        } catch (err: any) {
            console.error('Error resending verification email:', err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Gagal mengirim ulang link reset.");
        } finally {
            setIsLoadingResend(false);
        }
    };

    // Handler untuk tombol "Gunakan email lain?" di ForgotPasswordSuccess
    const handleUseAnotherEmail = () => {
        setIsEmailSent(false); // Kembali ke form awal
        setSubmittedEmail(''); // Kosongkan email yang tersimpan
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <AnimatedBackground />

            <AuthCard
                title={!isEmailSent ? "Lupa Password?" : "Reset Password"}
                subtitle={!isEmailSent ? "Masukkan email Anda untuk mendapatkan link reset password" : "Link reset password telah dikirim!"}
                logoSvg={
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                }
            >
                {!isEmailSent ? (
                    <ForgotPasswordForm onEmailSent={handleEmailSent} />
                ) : (
                    <ForgotPasswordSuccess
                        email={submittedEmail}
                        onResend={handleResendEmail} // Mengarahkan ke handler pengiriman ulang
                        onUseAnotherEmail={handleUseAnotherEmail} // Mengarahkan ke handler reset form
                        isLoading={isLoadingResend}
                    />
                )}
            </AuthCard>

            {/* Bottom Text */}
            <div className="text-center mt-8 absolute bottom-8 z-10">
                <p className="text-white/50 text-xs">
                    © {new Date().getFullYear()} KonsulPro. Secure Password Recovery System.
                </p>
            </div>
            {/* ToastContainer sudah di RootLayout */}
            {/* Pastikan style untuk animasi sudah ada di globals.css atau di AnimatedBackground.tsx */}
            <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-slideInUp {
            animation: slideInUp 0.5s ease-out;
        }
      `}</style>
        </main>
    );
};

export default ForgotPage;
