'use client';
import MainTemplateUser from '@/components/MainTemplateUser';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authService } from '@/lib/api';
import { User, Briefcase, Phone, MapPin, Building, Calendar, FileText, Camera } from 'lucide-react';
import { FullProfileResponse, ProfileFieldConfig } from '@/types/user';
import ProfileHeader from '@/components/account/ProfileHeader';
import ProfileCard from '@/components/account/ProfileCard';
import ProfileDetailsSection from '@/components/account/ProfileDetailsSection';
import ProfileTipsCard from '@/components/account/ProfileTipsCard';

const AccountPage = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<FullProfileResponse | null>(null);
    const [formData, setFormData] = useState<Partial<FullProfileResponse>>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Profile fields configuration
    const profileFields: ProfileFieldConfig[] = [
        { key: 'tanggal_lahir', label: 'Tanggal Lahir', icon: Calendar, type: 'date' },
        { key: 'pekerjaan', label: 'Pekerjaan', icon: Briefcase, type: 'text' },
        { key: 'bidang_keahlian', label: 'Bidang Keahlian', icon: User, type: 'text' },
        { key: 'nohp', label: 'No. Telepon', icon: Phone, type: 'tel' },
        { key: 'alamat', 'label': 'Alamat', icon: MapPin, type: 'text' },
        { key: 'kantor', label: 'Perusahaan', icon: Building, type: 'text' },
        { key: 'about', label: 'Tentang Saya', icon: FileText, type: 'textarea' }
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
            toast.error("Anda harus login untuk mengakses halaman ini.");
        }
    }, [router]);

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await authService.getProfile();
            setProfile(res.data);
            setFormData(res.data);
        } catch (err: any) {
            console.error("Error fetching profile:", err);
            toast.error(err.response?.data?.message || "Gagal memuat profil.");
            if (err.response?.status === 401 || err.response?.status === 403) {
                router.push("/auth/login");
                toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleCancel = () => {
        if (profile) {
            setFormData({ ...profile });
        }
        setIsEditing(false);
        setSelectedFile(null); // Reset selected file saat batal
    };

    const handleFieldChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();

        // Field yang TIDAK boleh diupdate dari form frontend: 'id', 'nama', 'email', 'created_at', 'updated_at'
        const excludedKeys = ['id', 'nama', 'email', 'created_at', 'updated_at', 'foto_url']; // Tambahkan foto_url juga

        Object.entries(formData).forEach(([key, value]) => {
            if (!excludedKeys.includes(key) && value !== null) { // Pastikan tidak mengirim null sebagai string "null"
                data.append(key, String(value));
            }
        });

        if (selectedFile) {
            data.append('foto', selectedFile);
        }

        console.log('Data yang akan dikirim:');
        for (let [key, val] of data.entries()) {
            console.log(`${key}:`, val);
        }

        try {
            const res = await authService.updateProfile(data);
            setProfile(res.data);
            setFormData(res.data);
            setIsEditing(false);
            setSelectedFile(null);
            toast.success('Profil berhasil diperbarui!');
        } catch (err: any) {
            console.error("Error updating profile:", err.response?.data || err.message);
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                Object.values(errors).forEach((messages: any) => {
                    messages.forEach((message: string) => toast.error(message));
                });
            } else {
                toast.error(err.response?.data?.message || 'Terjadi kesalahan. Coba lagi nanti.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !profile) {
        return (
            <MainTemplateUser>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                    <div className="text-center text-slate-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p>Memuat profil...</p>
                    </div>
                </div>
            </MainTemplateUser>
        );
    }

    return (
        <MainTemplateUser>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-15 lg:pt-15 pb-20">
                <ProfileHeader />

                <div className="max-w-6xl mx-auto px-4 pb-8 -mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <ProfileCard
                                    profile={profile}
                                    isEditing={isEditing}
                                    selectedFile={selectedFile}
                                    onEditToggle={() => setIsEditing(true)}
                                    onFileChange={handleFileChange}
                                    onSave={handleSubmit}
                                    onCancel={handleCancel}
                                />
                            </div>

                            <div className="lg:col-span-2">
                                <ProfileDetailsSection
                                    profile={profile}
                                    formData={formData}
                                    isEditing={isEditing}
                                    profileFields={profileFields}
                                    onFieldChange={handleFieldChange}
                                />
                                <ProfileTipsCard />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainTemplateUser>
    );
};

export default AccountPage;
