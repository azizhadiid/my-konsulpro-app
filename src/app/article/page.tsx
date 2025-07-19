'use client';

import MainTemplateUser from '@/components/MainTemplateUser';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { toast } from 'react-toastify'; // Menggunakan react-toastify
import { authService } from '@/lib/api'; // Import authService
import { Artikel, ArtikelListResponse } from '@/types/artikel'; // Import tipe Artikel dan ArtikelListResponse
import { useDebounce } from 'use-debounce';

// Import komponen-komponen yang sudah ada (pastikan path benar)
import SearchBar from '@/components/article/SearchBar';
import Loading from '@/components/article/Loading';
import Pagination from '@/components/article/Pagination';
import ArtikelCard from '@/components/article/ArtikelCard';

export default function ArtikelPage() {
    const router = useRouter(); // Inisialisasi useRouter
    const [artikels, setArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [perPage, setPerPage] = useState(6);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Anda harus login untuk mengakses halaman ini.");
            router.push('/auth/login');
            return;
        }

        try {
            const response = await authService.getArtikels({ // Menggunakan authService
                page,
                search: debouncedSearchTerm,
                per_page: perPage
            });

            setArtikels(response.data.data);
            setLastPage(response.data.last_page);
            setTotalItems(response.data.total);
            setPerPage(response.data.per_page);
        } catch (error: any) {
            console.error('Gagal memuat artikel', error);
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
                    localStorage.removeItem("token");
                    router.push("/auth/login");
                } else {
                    toast.error(error.response.data.message || 'Terjadi kesalahan saat memuat artikel.');
                }
            } else {
                toast.error('Terjadi kesalahan jaringan atau server.');
            }
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearchTerm, perPage, router]); // Tambahkan router ke dependency list

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        setPage(1);
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
                    <SearchBar value={searchTerm} onChange={handleSearchChange} />
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
                    <Loading perPage={perPage} />
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
                        {artikels.map((artikel: Artikel) => (
                            <ArtikelCard key={artikel.id} artikel={artikel} />
                        ))}
                    </div>
                )}

                {artikels.length > 0 && (
                    <Pagination page={page} lastPage={lastPage} setPage={setPage} totalItems={totalItems} perPage={perPage} />
                )}
            </section>
        </MainTemplateUser>
    );
}