'use client'

import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface SubmitButtonProps {
    isSubmitting: boolean;
    isDisabled: boolean;
    onClick: (e: React.FormEvent) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, isDisabled, onClick }) => {
    return (
        <div className="pt-6">
            <button
                type="submit"
                onClick={onClick}
                disabled={isDisabled}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-5 px-8 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-3 text-lg group disabled:cursor-not-allowed dark:disabled:from-gray-600 dark:disabled:to-gray-700"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengirim Konsultasi...</span>
                    </>
                ) : (
                    <>
                        <span>Ajukan Konsultasi Sekarang</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Tim kami akan merespons dalam 24 jam dan memberikan proposal detail
            </p>
        </div>
    );
};

export default SubmitButton;