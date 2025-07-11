'use client'

import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface ForgotPasswordSuccessProps {
    email: string;
    onResend: () => void;
    onUseAnotherEmail: () => void;
    isLoading: boolean;
}

const ForgotPasswordSuccess: React.FC<ForgotPasswordSuccessProps> = ({ email, onResend, onUseAnotherEmail, isLoading }) => {
    return (
        <div className="text-center space-y-6 animate-slideInUp">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                    Email Terkirim!
                </h1>
                <p className="text-white/70 text-sm mb-4">
                    Link reset password telah dikirim ke <br />
                    <span className="font-medium text-emerald-300">{email}</span>
                </p>
                <p className="text-white/60 text-xs">
                    Periksa folder inbox dan spam Anda
                </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                {/* Tombol Kirim Ulang */}
                <Button
                    onClick={onResend}
                    isLoading={isLoading}
                    // Gunakan className yang sama seperti sebelumnya
                    className="w-full bg-white/10 border border-white/20 text-white font-medium py-3 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                    type="button" // Penting: ini bukan submit form
                >
                    {/* Hapus <div> pembungkus di sini */}
                    <span>Kirim Ulang</span>
                </Button>

                {/* Tombol Kembali ke Login (tetap sama) */}
                <Link
                    href="/auth/login"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                    <span>Kembali ke Login</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                </Link>
            </div>

            {/* Tombol Gunakan email lain? (tetap sama) */}
            <div className="text-center mt-4">
                <button
                    onClick={onUseAnotherEmail}
                    className="text-white/60 hover:text-white/80 text-sm transition-colors"
                >
                    Gunakan email lain?
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordSuccess;
