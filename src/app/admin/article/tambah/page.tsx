'use client'

import { useEffect, useState } from 'react';
import MainTemplateAdmin from '../../components/MainTemplateAdmin';
import Swal from 'sweetalert2'; // Pastikan SweetAlert2 sudah terinstal
import { adminService } from '@/lib/admin-api'; // Import adminService yang sudah diperbarui

// Component
import InputField from '@/components/admin/article/InputField';
import TextAreaField from '@/components/admin/article/TextAreaField';
import SelectField from '@/components/admin/article/SelectField';
import ImageUploadField from '@/components/admin/article/ImageUploadField';
import SubmitButton from '@/components/admin/article/SubmitButton';


const TambahArtikelPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Categories for the select field
    const categories = [
        { value: "IT Consulting", label: "IT Consulting" },
        { value: "Business Strategy", label: "Business Strategy" },
        { value: "Digital Transformation", label: "Digital Transformation" },
        { value: "Cyber Security", label: "Cyber Security" },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
        // TODO: Anda mungkin ingin memverifikasi role admin dari token di sini juga
    }, []);

    const handleImageChange = (file: File | null) => {
        setFeaturedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setCategory('');
        setDate('');
        setFeaturedImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async () => {
        if (!title || !content || !category || !date || !featuredImage) {
            Swal.fire('Peringatan!', 'Mohon lengkapi semua bidang formulir dan unggah gambar.', 'warning');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('judul', title);
        formData.append('deskripsi', content);
        formData.append('kategori', category);
        formData.append('tanggal_publish', date);
        if (featuredImage) {
            formData.append('foto', featuredImage);
        }

        try {
            const response = await adminService.createArtikel(formData); // Menggunakan adminService

            if (response.status === 201) {
                Swal.fire('Berhasil!', 'Artikel berhasil ditambahkan.', 'success');
                resetForm();
            } else {
                Swal.fire('Gagal!', 'Terjadi kesalahan saat menambahkan artikel.', 'error');
            }
        } catch (error: any) {
            console.error('Error adding article:', error);
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server.';
            Swal.fire('Error!', errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainTemplateAdmin>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tambah Artikel Baru</h1>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Kolom Kiri: Judul dan Konten */}
                        <div className="lg:col-span-2 space-y-6">
                            <InputField
                                id="title"
                                label="Judul Artikel"
                                type="text"
                                placeholder="Masukkan judul artikel..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <TextAreaField
                                id="content"
                                label="Konten Artikel"
                                placeholder="Tulis konten artikel di sini..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                required
                            />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Gunakan editor ini untuk memformat teks, menambahkan gambar, atau video.</p>
                        </div>

                        {/* Kolom Kanan: Pengaturan Artikel */}
                        <div className="lg:col-span-1 space-y-6">
                            <SelectField
                                id="category"
                                label="Kategori"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                options={categories}
                                required
                            />

                            <InputField
                                id="publish-date"
                                label="Tanggal Publish"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />

                            <ImageUploadField
                                id="featured-image"
                                label="Gambar Unggulan"
                                onFileChange={handleImageChange}
                                previewUrl={imagePreview}
                                required
                            />
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end space-x-4 mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <SubmitButton
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Publikasikan Artikel
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </MainTemplateAdmin>
    );
}

export default TambahArtikelPage;