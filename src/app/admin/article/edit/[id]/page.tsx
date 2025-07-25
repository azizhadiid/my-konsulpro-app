'use client'

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import MainTemplateAdmin from '@/app/admin/components/MainTemplateAdmin';
import { adminService } from '@/lib/admin-api'; // Import adminService
import { Artikel } from '@/types/artikel'; // Import Artikel interface

// Import komponen form yang sudah dibuat
import { Trash2 } from 'lucide-react'; // Untuk ikon hapus
import InputField from '@/components/admin/article/InputField';
import TextAreaField from '@/components/admin/article/TextAreaField';
import SelectField from '@/components/admin/article/SelectField';
import ImageUploadField from '@/components/admin/article/ImageUploadField';
import SubmitButton from '@/components/admin/article/SubmitButton';

const EditArtikelPage = () => {
    const router = useRouter();
    const params = useParams();
    const artikelId = params.id as string; // Ambil ID artikel dari URL dynamic route

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null); // File baru yang dipilih
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview untuk gambar baru/lama
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null); // URL gambar yang sudah ada dari DB
    const [isImageRemoved, setIsImageRemoved] = useState(false); // Flag untuk menandakan gambar dihapus
    const [loading, setLoading] = useState(true); // Loading saat fetch data
    const [submitting, setSubmitting] = useState(false); // Loading saat submit/delete

    // Categories for the select field (sama seperti di TambahArtikelPage)
    const categories = [
        { value: "IT Consulting", label: "IT Consulting" },
        { value: "Business Strategy", label: "Business Strategy" },
        { value: "Digital Transformation", label: "Digital Transformation" },
        { value: "Cyber Security", label: "Cyber Security" },
    ];

    // Fetch Artikel Data
    const fetchArtikelData = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const response = await adminService.getArtikelById(id); // Menggunakan adminService
            if (response.status === 200) {
                const artikel: Artikel = response.data.artikel;
                setTitle(artikel.judul || '');
                setContent(artikel.deskripsi || '');
                setCategory(artikel.kategori || '');
                setDate(artikel.tanggal_publish || '');
                setExistingImageUrl(artikel.foto_url || null);
                setImagePreview(artikel.foto_url || null); // Set preview awal ke gambar yang sudah ada
                setIsImageRemoved(false); // Reset flag
            } else {
                Swal.fire('Error', 'Gagal memuat data artikel.', 'error');
                router.push('/admin/article/edit'); // Redirect jika gagal
            }
        } catch (error: any) {
            console.error('Error fetching article:', error);
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat memuat artikel.';
            Swal.fire('Error!', errorMessage, 'error');
            router.push('/admin/article/edit'); // Redirect jika error
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
            return;
        }

        if (artikelId) {
            fetchArtikelData(artikelId);
        } else {
            console.warn('Artikel ID not available yet or invalid URL.');
            setLoading(false);
        }
    }, [artikelId, router, fetchArtikelData]);

    const handleImageChange = (file: File | null) => {
        setFeaturedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setIsImageRemoved(false); // Jika ada file baru, berarti tidak dihapus
        } else {
            // Jika file dikosongkan dari input file, kembali ke gambar yang sudah ada
            // atau kosong jika memang tidak ada gambar sebelumnya
            setImagePreview(existingImageUrl);
            // Jangan set isImageRemoved di sini, karena ini hanya reset input file,
            // bukan niat eksplisit untuk menghapus gambar yang ada.
            // Penghapusan gambar yang ada akan ditangani oleh tombol "Hapus Gambar".
        }
    };

    const handleClearImage = () => {
        setFeaturedImage(null); // Hapus file yang baru dipilih
        setImagePreview(null); // Hapus preview
        setExistingImageUrl(null); // Hapus referensi gambar yang sudah ada
        setIsImageRemoved(true); // Set flag bahwa gambar telah dihapus
    };


    const handleSubmit = async () => {
        if (!title || !content || !category || !date) {
            Swal.fire('Peringatan!', 'Mohon lengkapi semua bidang formulir.', 'warning');
            return;
        }

        setSubmitting(true);
        const formData = new FormData();
        formData.append('judul', title);
        formData.append('deskripsi', content);
        formData.append('kategori', category);
        formData.append('tanggal_publish', date);
        formData.append('_method', 'PUT'); // Penting untuk method spoofing di Laravel

        if (featuredImage) {
            formData.append('foto', featuredImage); // Upload gambar baru
        } else if (isImageRemoved) {
            formData.append('foto', ''); // Kirim string kosong untuk menandakan penghapusan gambar
        }
        // Jika featuredImage null dan isImageRemoved false, artinya tidak ada perubahan pada gambar.
        // Backend akan mempertahankan gambar yang sudah ada.

        try {
            const response = await adminService.updateArtikel(artikelId, formData); // Menggunakan adminService

            if (response.status === 200) {
                Swal.fire('Berhasil!', 'Artikel berhasil diperbarui.', 'success');
                router.push('/admin/article/edit'); // Kembali ke daftar artikel
            } else {
                Swal.fire('Gagal!', 'Terjadi kesalahan saat memperbarui artikel.', 'error');
            }
        } catch (error: any) {
            console.error('Error updating article:', error);
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server.';
            Swal.fire('Error!', errorMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda tidak akan bisa mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setSubmitting(true);
                try {
                    const response = await adminService.deleteArtikel(Number(artikelId)); // Menggunakan adminService

                    if (response.status === 200 || response.status === 204) {
                        Swal.fire('Terhapus!', 'Artikel telah dihapus.', 'success');
                        router.push('/admin/article/edit');
                    } else {
                        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus artikel.', 'error');
                    }
                } catch (error: any) {
                    console.error('Error deleting article:', error);
                    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server.';
                    Swal.fire('Error!', errorMessage, 'error');
                } finally {
                    setSubmitting(false);
                }
            }
        });
    };

    if (loading) {
        return (
            <MainTemplateAdmin>
                <div className="text-center py-12">
                    <p className="text-gray-600">Memuat data Artikel...</p>
                    <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </MainTemplateAdmin>
        );
    }

    return (
        <MainTemplateAdmin>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Artikel</h1>

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
                                disabled={submitting}
                            />

                            <TextAreaField
                                id="content"
                                label="Konten Artikel"
                                placeholder="Tulis konten artikel di sini..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                required
                                disabled={submitting}
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
                                disabled={submitting}
                            />

                            <InputField
                                id="publish-date"
                                label="Tanggal Publish"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                disabled={submitting}
                            />

                            <ImageUploadField
                                id="featured-image"
                                label="Gambar Unggulan"
                                onFileChange={handleImageChange}
                                previewUrl={imagePreview}
                                required={false} // Gambar tidak wajib saat update
                                disabled={submitting}
                            />
                            {(existingImageUrl || imagePreview) && (
                                <div className="mt-2 flex items-center space-x-2">
                                    {existingImageUrl && !featuredImage && !isImageRemoved && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Gambar saat ini: <a href={existingImageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Lihat Gambar</a>
                                        </p>
                                    )}
                                    {featuredImage && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Gambar baru dipilih.
                                        </p>
                                    )}
                                    {imagePreview && ( // Tombol hapus gambar hanya jika ada gambar untuk dihapus
                                        <button
                                            type="button"
                                            onClick={handleClearImage}
                                            disabled={submitting}
                                            className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Hapus Gambar
                                        </button>
                                    )}
                                </div>
                            )}
                            {isImageRemoved && !featuredImage && (
                                <p className="mt-2 text-sm text-red-500 dark:text-red-400">Gambar akan dihapus saat disimpan.</p>
                            )}

                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end space-x-4 mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={submitting}
                            className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md
                                ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Menghapus...' : 'Hapus Artikel'}
                        </button>
                        <SubmitButton
                            onClick={handleSubmit}
                            loading={submitting}
                        >
                            {submitting ? 'Menyimpan...' : 'Perbarui Artikel'}
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </MainTemplateAdmin>
    );
};

export default EditArtikelPage;
