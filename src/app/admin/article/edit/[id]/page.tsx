'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation'; // Import useParams untuk dynamic route
import Swal from 'sweetalert2';
import axios from 'axios';
import MainTemplateAdmin from '@/app/admin/components/MainTemplateAdmin';

const EditArtikelPage = () => {
    const router = useRouter();
    const params = useParams(); // Hook untuk dynamic route
    const artikelId = params.id as string; // Ambil ID artikel dari URL dynamic route

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
            return;
        }

        // Pastikan artikelId sudah tersedia sebelum fetch data
        if (artikelId) {
            fetchArtikelData(token, artikelId);
        } else {
            // Ini akan terjadi jika halaman diakses tanpa ID (misal /admin/artikel/edit)
            // Atau saat render pertama kali sebelum params.id tersedia
            console.warn('Artikel ID not available yet or invalid URL.');
            setLoading(false); // Berhenti loading jika ID tidak ada
        }
    }, [artikelId, router]); // Dependencies: artikelId dan router

    const fetchArtikelData = async (token: string, id: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artikels/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const artikel = response.data.artikel;
                setTitle(artikel.judul || '');
                setContent(artikel.deskripsi || '');
                setCategory(artikel.kategori || '');
                setDate(artikel.tanggal_publish || ''); // Pastikan format tanggal sesuai input type="date"
                setExistingImageUrl(artikel.foto_url || null);
                setImagePreview(artikel.foto_url || null);
            } else {
                Swal.fire('Error', 'Gagal memuat data artikel.', 'error');
            }
        } catch (error: any) {
            console.error('Error fetching article:', error);
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat memuat artikel.';
            Swal.fire('Error', errorMessage, 'error');
            // Redirect jika artikel tidak ditemukan atau ada masalah akses
            router.push('/admin/artikel');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFeaturedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFeaturedImage(null);
            setImagePreview(existingImageUrl); // Kembali ke gambar yang sudah ada jika tidak ada file baru dipilih
        }
    };

    const handleSubmit = async () => {
        if (!title || !content || !category || !date) {
            Swal.fire('Peringatan!', 'Mohon lengkapi semua bidang formulir.', 'warning');
            return;
        }

        setSubmitting(true);
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('judul', title);
        formData.append('deskripsi', content);
        formData.append('kategori', category);
        formData.append('tanggal_publish', date);
        formData.append('_method', 'PUT'); // Penting untuk method spoofing di Laravel

        if (featuredImage) {
            formData.append('foto', featuredImage);
        } else if (existingImageUrl === null) { // Jika gambar sebelumnya dihapus (tidak ada existingImageUrl)
            // Jika sebelumnya ada gambar tapi user menghapus atau tidak memilih file baru,
            // dan existingImageUrl sudah null (misal dari API), kita bisa kirim null ke backend
            formData.append('foto', ''); // Kirim string kosong, backend harus bisa menginterpretasikan ini
        }


        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/artikels/${artikelId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

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
                setSubmitting(true); // Gunakan submitting state juga untuk delete
                const token = localStorage.getItem("token");
                try {
                    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/artikels/${artikelId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

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
                <div className="container mx-auto px-4 py-8 text-center text-gray-700 dark:text-gray-300">
                    Memuat data artikel...
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
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Judul Artikel</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan judul artikel..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konten Artikel</label>
                                <textarea
                                    id="content"
                                    rows={15}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-y"
                                    placeholder="Tulis konten artikel di sini..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Gunakan editor ini untuk memformat teks, menambahkan gambar, atau video.</p>
                            </div>
                        </div>

                        {/* Kolom Kanan: Pengaturan Artikel */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Kategori */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
                                <select
                                    id="category"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="IT Consulting">IT Consulting</option>
                                    <option value="Business Strategy">Business Strategy</option>
                                    <option value="Digital Transformation">Digital Transformation</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                </select>
                            </div>

                            {/* Tanggal Publish */}
                            <div>
                                <label htmlFor="publish-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Publish</label>
                                <input
                                    type="date"
                                    id="publish-date"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

                            {/* Gambar Unggulan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gambar Unggulan</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 transition-colors">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <div className="space-y-1 text-center">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto object-cover rounded-lg" />
                                            ) : (
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <p className="pl-1">Drag and drop atau</p>
                                                <span className="font-semibold text-blue-600 hover:text-blue-500 ml-1">Unggah file</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hingga 10MB</p>
                                        </div>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                    </label>
                                </div>
                                {existingImageUrl && !featuredImage && (
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Gambar saat ini: <a href={existingImageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Lihat Gambar</a></p>
                                )}
                                {featuredImage && (
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Gambar baru dipilih. Akan mengganti gambar yang ada.</p>
                                )}
                            </div>
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
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md
                                ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Menyimpan...' : 'Perbarui Artikel'}
                        </button>
                    </div>
                </div>
            </div>
        </MainTemplateAdmin>
    );
};

export default EditArtikelPage;