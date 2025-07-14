'use client'

import React from 'react';

const ProfileHeader: React.FC = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-3xl"></div>
            <div className="relative max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Data Diri
                    </h1>
                    <p className="text-slate-600 text-lg">Kelola informasi profesional Anda</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;