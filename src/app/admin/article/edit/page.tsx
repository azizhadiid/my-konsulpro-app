'use client'

import { useEffect, useState } from "react";
import MainTemplateAdmin from "../../components/MainTemplateAdmin";
import { useRouter } from 'next/navigation'; // Import useRouter
import Swal from 'sweetalert2';
import axios from 'axios';

// Definisikan interface untuk struktur data artikel
interface Artikel {
    id: number;
    user_id: number;
    judul: string;
    deskripsi: string;
    kategori: string;
    tag: string; // Asumsi dari backend ini masih string koma-terpisah
    tanggal_publish: string;
    foto: string | null;
    foto_url: string | null; // URL publik gambar
    created_at: string;
    updated_at: string;
}

const DaftarArtikelPage = () => {
    const router = useRouter();
    const [artikels, setArtikels] = useState<Artikel[]>([]); // State untuk menyimpan daftar artikel
    const [loading, setLoading] = useState(true); // State untuk loading data
    const [deleting, setDeleting] = useState(false); // State untuk indikator sedang menghapus

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login"); // Gunakan router.push
            return;
        }
        fetchArtikels(token);
    }, [router]); // Tambahkan router sebagai dependency

    const fetchArtikels = async (token: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artikels`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // Pastikan response.data.artikels adalah array
                setArtikels(response.data.artikels || []);
            } else {
                Swal.fire('Error', 'Gagal memuat daftar artikel.', 'error');
            }
        } catch (error: any) {
            console.error('Error fetching artikels:', error);
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat memuat daftar artikel.';
            Swal.fire('Error', errorMessage, 'error');
            // Opsional: Redirect ke login jika error 401 Unauthorized
            if (error.response?.status === 401) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (artikelId: number) => {
        router.push(`/admin/article/edit/${artikelId}`); // Arahkan ke halaman edit dengan ID
    };

    const handleDelete = async (artikelId: number) => {
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
                setDeleting(true);
                const token = localStorage.getItem("token");
                try {
                    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/artikels/${artikelId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200 || response.status === 204) {
                        Swal.fire('Terhapus!', 'Artikel telah dihapus.', 'success');
                        // Perbarui state artikels tanpa artikel yang dihapus
                        setArtikels(prevArtikels => prevArtikels.filter(artikel => artikel.id !== artikelId));
                    } else {
                        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus artikel.', 'error');
                    }
                } catch (error: any) {
                    console.error('Error deleting article:', error);
                    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server.';
                    Swal.fire('Error!', errorMessage, 'error');
                } finally {
                    setDeleting(false);
                }
            }
        });
    };

    if (loading) {
        return (
            <MainTemplateAdmin>
                <div className="container mx-auto px-4 py-8 text-center text-gray-700 dark:text-gray-300">
                    Memuat daftar artikel...
                </div>
            </MainTemplateAdmin>
        );
    }

    return (
        <MainTemplateAdmin>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Daftar Artikel Anda</h1>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
                    {artikels.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                            <p className="mb-4 text-lg">Anda belum memiliki artikel.</p>
                            <button
                                onClick={() => router.push('/admin/artikel/tambah')} // Contoh: Arahkan ke halaman tambah artikel
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Tambah Artikel Baru
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Judul
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Kategori
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Tanggal Publish
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Gambar
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {artikels.map((artikel) => (
                                        <tr key={artikel.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {artikel.id}
                                            </td>
                                            <td className="px-6 py-4 max-w-sm truncate text-sm text-gray-800 dark:text-gray-200">
                                                {artikel.judul}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                {artikel.kategori}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                {new Date(artikel.tanggal_publish).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                {artikel.foto_url ? (
                                                    <img src={artikel.foto_url} alt={artikel.judul} className="h-12 w-12 object-cover rounded-md" />
                                                ) : (
                                                    <span className="text-gray-400">Tidak ada gambar</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(artikel.id)}
                                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-xs"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(artikel.id)}
                                                        disabled={deleting}
                                                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs
                                                            ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </MainTemplateAdmin>
    );
};

export default DaftarArtikelPage;