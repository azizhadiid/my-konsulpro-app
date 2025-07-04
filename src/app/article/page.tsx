'use client';

import MainTemplateUser from '@/components/MainTemplateUser';
import { useEffect, useState, useCallback } from 'react'; // Tambahkan useCallback
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading'; // Pastikan path benar
import ArtikelCard from './components/ArtikelCard'; // Pastikan path benar
import Pagination from './components/Pagination'; // Pastikan path benar
import { useDebounce } from 'use-debounce'; // Import useDebounce

// Definisikan interface untuk struktur data artikel (jika belum ada)
interface Artikel {
    id: number;
    user_id: number;
    judul: string;
    deskripsi: string;
    kategori: string;
    tanggal_publish: string;
    foto: string | null;
    foto_url: string | null;
    created_at: string;
    updated_at: string;
}

export default function ArtikelPage() {
    const [artikels, setArtikels] = useState<Artikel[]>([]); // Tentukan tipe Artikel[]
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // Ganti nama state 'search' menjadi 'searchTerm' agar lebih jelas
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce search term
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // Tambahkan state untuk total item
    const [perPage, setPerPage] = useState(6); // Default 6 artikel per halaman

    const fetchData = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        // Autentikasi: Jika artikel memang hanya untuk user yang login, maka ini diperlukan.
        // Jika publik, Anda bisa menghapusnya dan header Authorization.
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artikels`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, search: debouncedSearchTerm, per_page: perPage }, // Gunakan debouncedSearchTerm dan perPage
            });
            setArtikels(response.data.data);
            setLastPage(response.data.last_page);
            setTotalItems(response.data.total); // Set total item dari response
            setPerPage(response.data.per_page); // Update perPage jika backend mengirim nilai berbeda
        } catch (error) {
            console.error('Gagal memuat artikel', error);
            // Tambahkan penanganan error yang lebih baik, misalnya SweetAlert2
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearchTerm, perPage]); // Dependencies untuk useCallback

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/auth/login';
        } else {
            fetchData();
        }
    }, [page, debouncedSearchTerm, perPage, fetchData]); // Tambahkan fetchData ke dependency list

    const handleSearchChange = (value: string) => { // Menerima value langsung dari SearchBar
        setSearchTerm(value);
        setPage(1); // Reset halaman ke 1 setiap kali search term berubah
    };

    const handlePerPageChange = (value: number) => { // Menerima value langsung dari Pagination (jika mau di sana)
        setPerPage(value);
        setPage(1); // Reset halaman ke 1
    };


    return (
        <MainTemplateUser>
            <section className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                        Insight & Inspirasi Konsultasi
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Jelajahi berbagai artikel kami tentang inovasi, strategi bisnis, dan teknologi terbaru. Temukan solusi untuk tantangan bisnis Anda.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <SearchBar value={searchTerm} onChange={handleSearchChange} /> {/* Gunakan searchTerm */}
                    {/* Select per page, bisa ditaruh di sini atau di komponen Pagination */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="perPage" className="text-gray-700 dark:text-gray-300 font-medium text-base">Tampilkan:</label>
                        <select
                            id="perPage"
                            value={perPage}
                            onChange={(e) => handlePerPageChange(Number(e.target.value))}
                            className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm"
                        >
                            <option value="3">3</option>
                            <option value="6">6</option>
                            <option value="9">9</option>
                            <option value="12">12</option>
                        </select>
                        <span className="text-gray-700 dark:text-gray-300 text-base">artikel</span>
                    </div>
                </div>

                {loading ? (
                    <Loading perPage={perPage} /> // Teruskan perPage ke Loading untuk jumlah skeleton
                ) : artikels.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                        <p className="mb-4 text-2xl font-semibold">Ups! Artikel tidak ditemukan.</p>
                        <p className="text-lg mb-6">Coba kata kunci lain atau reset pencarian Anda.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setPage(1); }}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg font-semibold"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                        {artikels.map((artikel: Artikel) => ( // Tentukan tipe Artikel
                            <ArtikelCard key={artikel.id} artikel={artikel} />
                        ))}
                    </div>
                )}

                {artikels.length > 0 && ( // Tampilkan paginasi hanya jika ada artikel
                    <Pagination page={page} lastPage={lastPage} setPage={setPage} totalItems={totalItems} perPage={perPage} />
                )}
            </section>
        </MainTemplateUser>
    );
}