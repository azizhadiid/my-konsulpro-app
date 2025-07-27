'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import MainTemplateAdmin from "../components/MainTemplateAdmin";
import { adminService } from '@/lib/admin-api'; // Import adminService yang sudah diperbarui
import { ConsultationItem, AdminConsultationStats } from '@/types/consultation'; // Import tipe konsultasi
import ConsultationStatsCards from "@/components/admin/consultation/ConsultationStatsCards";
import ConsultationSearchFilter from "@/components/admin/consultation/ConsultationSearchFilter";
import ConsultationTable from "@/components/admin/consultation/ConsultationTable";
import ConsultationPaginationControls from "@/components/admin/consultation/ConsultationPaginationControls";

// Import komponen baru


const VerifikasiPage = () => {
    const router = useRouter();
    const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
    const [stats, setStats] = useState<AdminConsultationStats>({ total: 0, pending: 0, paid: 0, completed: 0, cancelled: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false); // State untuk loading saat update status

    // Verifikasi Token Admin
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
        }
        // TODO: Anda mungkin juga perlu memverifikasi role admin dari token di sini
    }, [router]);

    // --- Fetch Data Konsultasi dari API ---
    const fetchConsultations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await adminService.getAdminConsultations(currentPage, perPage, searchTerm, filterStatus);

            if (response.data.success) {
                setConsultations(response.data.data || []);
                setStats(response.data.stats);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
                setTotalItems(response.data.total);
                setPerPage(response.data.per_page);
            } else {
                setError(response.data.message || "Gagal mengambil data konsultasi.");
            }
        } catch (err: any) {
            console.error("Error fetching consultations:", err);
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem("token");
                    router.push("/auth/login");
                } else {
                    setError(err.response.data.message || "Terjadi kesalahan saat mengambil data.");
                }
            } else {
                setError("Terjadi kesalahan jaringan atau server.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, perPage, searchTerm, filterStatus, router]); // Tambahkan semua dependencies

    useEffect(() => {
        fetchConsultations();
    }, [fetchConsultations]);

    // --- Fungsi Ubah Status ---
    const handleChangeStatusClick = async (consultation: ConsultationItem, status: ConsultationItem['status']) => {
        const result = await Swal.fire({
            title: 'Konfirmasi Perubahan Status',
            html: `Anda yakin ingin mengubah status konsultasi topik "<strong>${consultation.topik}</strong>" (ID: ${consultation.id}) menjadi "<strong>${status.charAt(0).toUpperCase() + status.slice(1)}</strong>"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Ubah Status!',
            cancelButtonText: 'Batal',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            setIsUpdatingStatus(true); // Aktifkan loading saat proses update
            try {
                const response = await adminService.updateConsultationStatus(consultation.id, status);

                if (response.data.success) {
                    Swal.fire(
                        'Berhasil!',
                        response.data.message || 'Status konsultasi berhasil diperbarui.',
                        'success'
                    );
                    fetchConsultations(); // Refresh data setelah berhasil update
                } else {
                    Swal.fire(
                        'Gagal!',
                        response.data.message || 'Gagal memperbarui status konsultasi.',
                        'error'
                    );
                }
            } catch (err: any) {
                console.error("Error updating consultation status:", err);
                let errorMessage = "Terjadi kesalahan jaringan atau server.";
                if (err.response) {
                    errorMessage = err.response.data.message || "Terjadi kesalahan saat memperbarui status.";
                }
                Swal.fire(
                    'Error!',
                    errorMessage,
                    'error'
                );
            } finally {
                setIsUpdatingStatus(false); // Matikan loading
            }
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 setiap kali search term berubah
    };

    const handleFilterStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 setiap kali filter status berubah
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
            <div className="space-y-8 py-8 px-5 md:px-10 lg:px-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Konsultasi</h1>

                {/* Stats Cards */}
                <ConsultationStatsCards stats={stats} />

                {/* Search and Filter Section */}
                <ConsultationSearchFilter
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    filterStatus={filterStatus}
                    onFilterStatusChange={handleFilterStatusChange}
                    disabled={isLoading || isUpdatingStatus}
                />

                {/* Loading and Error States */}
                {isLoading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Memuat data konsultasi...</p>
                        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg border border-red-200">
                        <p>{error}</p>
                        <button
                            onClick={fetchConsultations}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}

                {/* Table Section */}
                {!isLoading && !error && (
                    <>
                        <ConsultationTable
                            consultations={consultations}
                            onChangeStatus={handleChangeStatusClick}
                            isUpdatingStatus={isUpdatingStatus}
                        />

                        {/* Pagination Controls */}
                        {totalItems > 0 && (
                            <ConsultationPaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalItems={totalItems}
                                perPage={perPage}
                                onPageChange={handlePageChange}
                                onPerPageChange={handlePerPageChange}
                                loading={isLoading || isUpdatingStatus}
                            />
                        )}
                    </>
                )}
            </div>
        </MainTemplateAdmin>
    );
};

export default VerifikasiPage;
