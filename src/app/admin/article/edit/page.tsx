'use client'

import { useEffect, useState, useCallback } from "react";
import MainTemplateAdmin from "../../components/MainTemplateAdmin";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import { MdSearch } from "react-icons/md"; // Icon untuk search

// Definisikan interface untuk struktur data artikel (tetap sama)
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

// Interface untuk data paginasi dari Laravel
interface PaginationData {
    data: Artikel[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean; }[];
}

const DaftarArtikelPage = () => {
    const router = useRouter();
    const [artikels, setArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    // State untuk Search dan Pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // Tambahkan state untuk total item
    const [perPage, setPerPage] = useState(10); // Jumlah item per halaman, default 10

    // Menggunakan useCallback untuk memoize fungsi fetchArtikels
    const fetchArtikels = useCallback(async (token: string, page: number, search: string, itemsPerPage: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artikels`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { // Kirim parameter paginasi dan search melalui params
                    page: page,
                    per_page: itemsPerPage,
                    search: search
                }
            });

            if (response.status === 200) {
                const paginationData: PaginationData = response.data; // Asumsi response adalah data paginasi
                setArtikels(paginationData.data || []);
                setCurrentPage(paginationData.current_page);
                setTotalPages(paginationData.last_page);
                setTotalItems(paginationData.total); // Set total item
                setPerPage(paginationData.per_page); // Update perPage jika backend mengirim nilai berbeda
            } else {
                Swal.fire('Error', 'Gagal memuat daftar artikel.', 'error');
            }
        } catch (error: any) {
            console.error('Error fetching artikels:', error);
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat memuat daftar artikel.';
            Swal.fire('Error', errorMessage, 'error');
            if (error.response?.status === 401) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    }, [router]); // Tambahkan router sebagai dependency useCallback

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
            return;
        }
        fetchArtikels(token, currentPage, searchTerm, perPage);
    }, [router, currentPage, searchTerm, perPage, fetchArtikels]); // Tambahkan dependencies

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
                        // Setelah menghapus, panggil ulang fetchArtikels untuk refresh data
                        fetchArtikels(token!, currentPage, searchTerm, perPage); // Pastikan token tidak null
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


    if (loading && artikels.length === 0) { // Tampilkan loading state hanya jika belum ada data sama sekali
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
                    {/* Search and Per Page Filter */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="relative w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Cari artikel (judul, kategori)..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 text-xl" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="perPage" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Tampilkan:</label>
                            <select
                                id="perPage"
                                value={perPage}
                                onChange={handlePerPageChange}
                                className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">per halaman</span>
                        </div>
                    </div>

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
                                        <tr key={artikel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {artikel.id}
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-800 dark:text-gray-200">
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
                                                    <img src={artikel.foto_url} alt={artikel.judul} className="h-12 w-12 object-cover rounded-md border border-gray-200 dark:border-gray-600 shadow-sm" />
                                                ) : (
                                                    <span className="text-gray-400">Tidak ada gambar</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(artikel.id)}
                                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-xs shadow-md"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(artikel.id)}
                                                        disabled={deleting}
                                                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs shadow-md
                                                            ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {deleting ? 'Menghapus...' : 'Hapus'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {artikels.length > 0 && ( // Tampilkan pagination hanya jika ada artikel
                        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-4 md:space-y-0">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Menampilkan {totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1} sampai {Math.min(currentPage * perPage, totalItems)} dari {totalItems} artikel
                            </div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600
                                        ${currentPage === 1 || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="sr-only">Previous</span>
                                    {/* Heroicon name: solid/chevron-left */}
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        disabled={loading}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                            ${page === currentPage
                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || loading}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600
                                        ${currentPage === totalPages || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="sr-only">Next</span>
                                    {/* Heroicon name: solid/chevron-right */}
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </MainTemplateAdmin>
    );
};

export default DaftarArtikelPage;