'use client'

import { useEffect, useState, useCallback } from "react";
import MainTemplateAdmin from "../../components/MainTemplateAdmin";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { adminService } from '@/lib/admin-api'; // Import adminService
import { Artikel } from '@/types/artikel'; // Import Artikel interface

// Import komponen baru
import SearchAndFilter from "@/components/admin/article/SearchAndFilter";
import ArtikelTable from "@/components/admin/article/ArtikelTable";
import PaginationControls from "@/components/admin/article/PaginationControls";

const DaftarArtikelPage = () => {
    const router = useRouter();
    const [artikels, setArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null); // Menggunakan ID yang sedang dihapus

    // State untuk Search dan Pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [perPage, setPerPage] = useState(10);

    // Initial auth check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
        }
        // TODO: Anda mungkin ingin memverifikasi role admin dari token di sini juga
    }, [router]);

    // Menggunakan useCallback untuk memoize fungsi fetchArtikels
    const fetchArtikels = useCallback(async (page: number, search: string, itemsPerPage: number) => {
        setLoading(true);
        try {
            const response = await adminService.getArtikels(page, itemsPerPage, search); // Menggunakan adminService

            if (response.status === 200) {
                const paginationData = response.data;
                setArtikels(paginationData.data || []);
                setCurrentPage(paginationData.current_page);
                setTotalPages(paginationData.last_page);
                setTotalItems(paginationData.total);
                setPerPage(paginationData.per_page);
            } else {
                Swal.fire('Error', 'Gagal memuat daftar artikel.', 'error');
            }
        } catch (error: any) {
            console.error('Error fetching artikels:', error);
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat memuat daftar artikel.';
            Swal.fire('Error', errorMessage, 'error');
            if (error.response?.status === 401 || error.response?.status === 403) {
                router.push('/auth/login'); // Redirect to login on auth errors
            }
        } finally {
            setLoading(false);
        }
    }, [router]);

    // Effect untuk memanggil fetchArtikels saat ada perubahan state
    useEffect(() => {
        fetchArtikels(currentPage, searchTerm, perPage);
    }, [currentPage, searchTerm, perPage, fetchArtikels]);

    const handleEdit = (artikelId: number) => {
        router.push(`/admin/article/edit/${artikelId}`);
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
                setDeletingId(artikelId); // Set ID artikel yang sedang dihapus
                try {
                    const response = await adminService.deleteArtikel(artikelId); // Menggunakan adminService

                    if (response.status === 200 || response.status === 204) {
                        Swal.fire('Terhapus!', 'Artikel telah dihapus.', 'success');
                        // Setelah menghapus, panggil ulang fetchArtikels untuk refresh data
                        // Jika halaman saat ini kosong setelah penghapusan terakhir, kembali ke halaman sebelumnya
                        if (artikels.length === 1 && currentPage > 1) {
                            setCurrentPage(prev => prev - 1);
                        } else {
                            fetchArtikels(currentPage, searchTerm, perPage);
                        }
                    } else {
                        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus artikel.', 'error');
                    }
                } catch (error: any) {
                    console.error('Error deleting article:', error);
                    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server.';
                    Swal.fire('Error!', errorMessage, 'error');
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        router.push('/auth/login');
                    }
                } finally {
                    setDeletingId(null); // Reset ID artikel yang sedang dihapus
                }
            }
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 setiap kali search term berubah
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset ke halaman 1
    };

    return (
        <MainTemplateAdmin>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Daftar Artikel Anda</h1>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
                    {/* Search and Per Page Filter */}
                    <SearchAndFilter
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        perPage={perPage}
                        onPerPageChange={handlePerPageChange}
                        loading={loading}
                    />

                    {loading && artikels.length === 0 ? ( // Tampilkan skeleton loader jika loading pertama kali atau setelah search/page change
                        <div className="animate-pulse">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                            {[...Array(perPage)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-md mb-2"></div>
                            ))}
                        </div>
                    ) : artikels.length === 0 && !loading ? ( // Tampilkan pesan jika tidak ada artikel setelah search/filter
                        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                            <p className="mb-4 text-lg">Tidak ada artikel ditemukan dengan kriteria pencarian Anda.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    ) : (
                        <ArtikelTable
                            artikels={artikels}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            deletingId={deletingId}
                        />
                    )}

                    {/* Pagination Controls */}
                    {artikels.length > 0 && ( // Tampilkan pagination hanya jika ada artikel
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            loading={loading}
                            totalItems={totalItems}
                            perPage={perPage}
                        />
                    )}
                </div>
            </div>
        </MainTemplateAdmin>
    );
};

export default DaftarArtikelPage;
