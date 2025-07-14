'use client'

import React from 'react';

const ProfileTipsCard: React.FC = () => {
    return (
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
            <h4 className="text-xl font-bold mb-4">Tips Profil Profesional</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm opacity-90">
                <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p>Gunakan foto profil yang profesional dan berkualitas tinggi</p>
                </div>
                <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p>Jelaskan keahlian dan pengalaman Anda dengan detail</p>
                </div>
                <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p>Pastikan informasi kontak selalu up-to-date</p>
                </div>
                <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p>Tulis deskripsi yang menarik di bagian "Tentang Saya"</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileTipsCard;