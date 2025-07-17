'use client';

import MainTemplateUser from "@/components/MainTemplateUser";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Menggunakan react-toastify
import { authService } from '@/lib/api'; // Menggunakan authService
import { ConsultationItem, ConsultationStats, ConsultationHistoryResponse } from '@/types/consultation';
import { UserData } from '@/types/auth'; // Import UserData

// Import komponen-komponen baru
import HistoryHeader from "@/components/riwayat/HistoryHeader";
import HistoryStatsCards from "@/components/riwayat/HistoryStatsCards";
import HistoryFilters from "@/components/riwayat/HistoryFilters";
import HistoryTable from "@/components/riwayat/HistoryTable";
import HistoryCtaSection from "@/components/riwayat/HistoryCtaSection";

const RiwayatPage = () => {
    const router = useRouter();
    const [riwayat, setRiwayat] = useState<ConsultationItem[]>([]);
    const [stats, setStats] = useState<ConsultationStats>({ total: 0, completed: 0, pending: 0, paid: 0, cancelled: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserData | null>(null); // State untuk user info

    // Fungsi untuk mengambil data riwayat dari backend
    const fetchRiwayat = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Anda harus login untuk mengakses halaman ini.");
                router.push("/auth/login");
                return;
            }

            const response = await authService.getConsultationHistory(); // Menggunakan authService

            if (response.data.success) {
                setRiwayat(response.data.data);
                setStats(response.data.stats);
                setUser(response.data.user_info || null); // Pastikan user_info di-set
            } else {
                setError(response.data.message || "Gagal mengambil data riwayat.");
                toast.error(response.data.message || "Gagal mengambil data riwayat.");
            }
        } catch (err: any) {
            console.error("Error fetching consultation history:", err);
            if (err.response) {
                if (err.response.status === 401) {
                    toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
                    localStorage.removeItem("token");
                    router.push("/auth/login");
                } else {
                    setError(err.response.data.message || "Terjadi kesalahan saat mengambil data.");
                    toast.error(err.response.data.message || "Terjadi kesalahan saat mengambil data.");
                }
            } else {
                setError("Terjadi kesalahan jaringan atau server.");
                toast.error("Terjadi kesalahan jaringan atau server.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchRiwayat();
    }, [fetchRiwayat]);

    // Filter riwayat berdasarkan searchTerm dan filterStatus
    const filteredRiwayat = riwayat.filter(item => {
        const matchesSearch = item.topik.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kategori.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === "all" || item.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <MainTemplateUser>
            <div className="space-y-8 py-24 px-5 md:px-10 lg:px-24">
                <HistoryHeader />

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Memuat riwayat konsultasi...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-red-600">
                        <p>{error}</p>
                        <button
                            onClick={fetchRiwayat}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : (
                    <>
                        <HistoryStatsCards stats={stats} />
                        <HistoryFilters
                            searchTerm={searchTerm}
                            onSearchChange={(e) => setSearchTerm(e.target.value)}
                            filterStatus={filterStatus}
                            onFilterChange={(e) => setFilterStatus(e.target.value as ConsultationItem['status'] | 'all')}
                        />
                        <HistoryTable riwayat={filteredRiwayat} user={user} />
                    </>
                )}

                <HistoryCtaSection />
            </div>
        </MainTemplateUser>
    );
};

export default RiwayatPage;
