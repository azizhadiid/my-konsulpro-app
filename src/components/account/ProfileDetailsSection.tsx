'use client'

import React from 'react';
import { User } from 'lucide-react';
import { ProfileFieldConfig, FullProfileResponse } from '@/types/user'; // Import tipe

interface ProfileDetailsSectionProps {
    profile: FullProfileResponse;
    formData: Partial<FullProfileResponse>; // Menggunakan Partial karena formData mungkin belum lengkap
    isEditing: boolean;
    profileFields: ProfileFieldConfig[];
    onFieldChange: (key: string, value: string) => void;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({
    profile,
    formData,
    isEditing,
    profileFields,
    onFieldChange,
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" />
                Informasi Profesional
            </h3>

            {!isEditing ? (
                // Display Mode
                <div className="grid md:grid-cols-2 gap-6">
                    {profileFields.map((field) => {
                        const IconComponent = field.icon;
                        return (
                            <div key={field.key} className={`group ${field.key === 'about' ? 'md:col-span-2' : ''}`}>
                                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/50 hover:bg-white/80 transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-md">
                                    <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                                        <IconComponent className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <label className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                            {field.label}
                                        </label>
                                        <p className={`text-slate-700 font-medium mt-1 ${field.key === 'about' ? 'text-sm leading-relaxed' : ''}`}>
                                            {profile[field.key as keyof FullProfileResponse] || '-'} {/* Akses properti menggunakan keyof */}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Edit Mode
                <div className="space-y-6">
                    {/* Foto Profil input akan di ProfileCard, jadi ini hanya untuk field lainnya */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {profileFields.map((field) => {
                            const IconComponent = field.icon;
                            return (
                                <div key={field.key} className={field.key === 'about' ? 'md:col-span-2' : ''}>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <IconComponent className="w-4 h-4 text-blue-600" />
                                        {field.label}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={formData[field.key as keyof Partial<FullProfileResponse>] || ''}
                                            onChange={(e) => onFieldChange(field.key, e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm resize-none"
                                            placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            value={formData[field.key as keyof Partial<FullProfileResponse>] || ''}
                                            onChange={(e) => onFieldChange(field.key, e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm"
                                            placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDetailsSection;
