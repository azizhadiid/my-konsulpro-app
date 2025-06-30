'use client';
import MainTemplateUser from '@/components/MainTemplateUser';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Briefcase, Phone, MapPin, Building, Calendar, FileText, Camera, Edit3, Save, X } from 'lucide-react';
import Swal from 'sweetalert2';

const AccountPage = () => {
    const [profile, setProfile] = useState<any>({});
    const [formData, setFormData] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Profile fields configuration
    const profileFields = [
        { key: 'tanggal_lahir', label: 'Tanggal Lahir', icon: Calendar, type: 'date' },
        { key: 'pekerjaan', label: 'Pekerjaan', icon: Briefcase, type: 'text' },
        { key: 'bidang_keahlian', label: 'Bidang Keahlian', icon: User, type: 'text' },
        { key: 'nohp', label: 'No. Telepon', icon: Phone, type: 'tel' },
        { key: 'alamat', label: 'Alamat', icon: MapPin, type: 'text' },
        { key: 'kantor', label: 'Perusahaan', icon: Building, type: 'text' },
        { key: 'about', label: 'Tentang Saya', icon: FileText, type: 'textarea' }
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                setProfile(res.data);
                setFormData(res.data);
            })
            .catch(err => {
                console.error("Error fetching profile:", err);
            });
    }, []);

    const handleCancel = () => {
        setFormData({ ...profile });
        setIsEditing(false);
        setSelectedFile(null);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = new FormData();

        // Kirim semua formData kecuali field foto dan foto_url
        Object.entries(formData).forEach(([key, value]) => {
            // Skip field foto dan foto_url karena akan ditangani terpisah
            if (key !== 'foto' && key !== 'foto_url') {
                data.append(key, String(value ?? ''));
            }
        });

        // Kirim file foto hanya jika ada file yang dipilih
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            data.append('foto', selectedFile);
        }

        // Debug log (opsional)
        console.log('Data yang akan dikirim:');
        for (let [key, val] of data.entries()) {
            console.log(`${key}:`, val);
        }

        try {
            const res = await axios.post('http://localhost:8000/api/profile', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProfile({ ...formData, foto_url: res.data.foto_url || profile.foto_url });
            setIsEditing(false);
            setSelectedFile(null);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Profil berhasil diperbarui.',
                showConfirmButton: false,
                timer: 2000
            });
        } catch (err: any) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const firstErrorKey = Object.keys(errors)[0];
                const firstErrorMessage = errors[firstErrorKey][0];
                Swal.fire({
                    icon: 'error',
                    title: 'Validasi Gagal',
                    text: `Gagal menyimpan: ${firstErrorMessage}`
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Terjadi kesalahan. Coba lagi nanti.'
                });
            }
        }
    };

    return (
        <MainTemplateUser>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-15 lg:pt-15 pb-20">
                {/* Header with glassmorphism effect */}
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

                <div className="max-w-6xl mx-auto px-4 pb-8 -mt-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 sticky top-8">
                                {/* Profile Image */}
                                <div className="text-center mb-6">
                                    <div className="relative inline-block">
                                        {profile.foto_url ? (
                                            <img
                                                src={profile.foto_url}
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
                                            <button
                                                type="button"
                                                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800 mt-4">
                                        {profile.nama || 'User'}
                                    </h2>
                                    <p className="text-blue-600 font-medium">
                                        {profile.pekerjaan || 'IT Professional'}
                                    </p>
                                </div>

                                {/* Quick Actions */}
                                <div className="space-y-3">
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Edit Profil
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSubmit}
                                                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg"
                                            >
                                                <Save className="w-4 h-4" />
                                                Simpan
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="flex-1 bg-slate-400 text-white py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-slate-500 transition-colors shadow-lg"
                                            >
                                                <X className="w-4 h-4" />
                                                Batal
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="lg:col-span-2">
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
                                                                {profile[field.key] || '-'}
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
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                                <Camera className="w-4 h-4 text-blue-600" />
                                                Foto Profil
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors"
                                            />
                                            {selectedFile && (
                                                <p className="text-xs text-green-600 mt-1">
                                                    File terpilih: {selectedFile.name}
                                                </p>
                                            )}
                                        </div>

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
                                                                value={formData[field.key] || ''}
                                                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                                                rows={4}
                                                                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm resize-none"
                                                                placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                                            />
                                                        ) : (
                                                            <input
                                                                type={field.type}
                                                                value={formData[field.key] || ''}
                                                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
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

                            {/* Additional Info Card */}
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
                        </div>
                    </div>
                </div>
            </div>
        </MainTemplateUser>
    );
};

export default AccountPage;