'use client'

// src/components/ui/AuthCard.tsx
import React from 'react';

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    logoSvg?: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle, logoSvg }) => {
    return (
        <div className="relative z-10 w-full max-w-lg px-6 py-14">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    {logoSvg && (
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl mb-4">
                            {logoSvg}
                        </div>
                    )}
                    <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                    <p className="text-white/70 text-sm">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthCard;