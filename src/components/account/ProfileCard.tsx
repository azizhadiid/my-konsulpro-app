'use client'

import React, { useState, useEffect } from 'react'; // Import useEffect
import { User, Camera, Edit3, Save, X } from 'lucide-react';
import AccountActionButton from '../ui/AccountActionButton';
import { FullProfileResponse } from '@/types/user';

interface ProfileCardProps {
    profile: FullProfileResponse;
    isEditing: boolean;
    selectedFile: File | null;
    onEditToggle: () => void;
    onFileChange: (file: File | null) => void;
    onSave: (e: React.FormEvent) => void;
    onCancel: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    profile,
    isEditing,
    selectedFile,
    onEditToggle,
    onFileChange,
    onSave,
    onCancel,
}) => {
    const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        // Buat URL objek untuk pratinjau foto yang dipilih
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewPhotoUrl(objectUrl);

            // Bersihkan URL objek saat komponen di-unmount atau file berubah
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewPhotoUrl(null); // Reset pratinjau jika tidak ada file dipilih
        }
    }, [selectedFile]);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFileChange(e.target.files?.[0] || null);
    };

    // Tentukan URL foto yang akan ditampilkan
    const displayPhotoUrl = previewPhotoUrl || profile.foto_url;

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 sticky top-8">
            {/* Profile Image */}
            <div className="text-center mb-6">
                <div className="relative inline-block">
                    {displayPhotoUrl ? ( // Gunakan displayPhotoUrl
                        <img
                            src={displayPhotoUrl}
                            alt="Profile"
                            loading="lazy"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl border-4 border-white">
                            <User className="w-16 h-16 text-white" />
                        </div>
                    )}
                    {isEditing && (
                        <label htmlFor="profile-photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
                            <Camera className="w-4 h-4" />
                            <input
                                id="profile-photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mt-4">
                    {profile.name || 'User'} {/* Nama tetap dari profile asli */}
                </h2>
                <p className="text-blue-600 font-medium">
                    {profile.pekerjaan || 'IT Professional'}
                </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
                {!isEditing ? (
                    <AccountActionButton onClick={onEditToggle}>
                        <Edit3 className="w-4 h-4" />
                        Edit Profil
                    </AccountActionButton>
                ) : (
                    <div className="flex gap-2">
                        <AccountActionButton onClick={onSave} type="submit">
                            <Save className="w-4 h-4" />
                            Simpan
                        </AccountActionButton>
                        <AccountActionButton onClick={onCancel} variant="secondary" type="button">
                            <X className="w-4 h-4" />
                            Batal
                        </AccountActionButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;