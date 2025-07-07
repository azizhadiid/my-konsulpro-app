'use client'


import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Search, ChevronDown, CheckCircle, Clock, XCircle, DollarSign, ExternalLink, Calendar, MessageCircle, Info } from "lucide-react"; // Icons
import MainTemplateAdmin from "../components/MainTemplateAdmin";
import Swal from 'sweetalert2';

// --- Interfaces ---
interface ConsultationItem {
    id: number;
    user_name: string; // Nama user yang konsultasi
    user_email: string; // Email user
    topik: string;
    kategori: string;
    deskripsi: string;
    durasi: number;
    harga: string; // Format 'Rp X.XXX.XXX'
    total_price: number; // Tambahkan ini jika harga asli diperlukan untuk proses backend
    status: 'pending' | 'paid' | 'completed' | 'cancelled';
    tanggal_konsultasi_formatted: string; // Tanggal rencana konsultasi jika ada
    created_at_formatted: string; // Tanggal dibuatnya permintaan konsultasi
}

interface AdminStats {
    total: number;
    pending: number;
    paid: number;
    completed: number;
    cancelled: number;
}

// --- Komponen Utama ---
const VerifikasiPage = () => {
    const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
    const [stats, setStats] = useState<AdminStats>({ total: 0, pending: 0, paid: 0, completed: 0, cancelled: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Verifikasi Token Admin
    useEffect(() => {
        const token = localStorage.getItem("token");
        // Di sini Anda mungkin juga perlu memverifikasi role admin dari token
        // Untuk demo ini, kita hanya cek keberadaan token
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);

    // --- Fetch Data Konsultasi dari API ---
    const fetchConsultations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) return; // Seharusnya sudah di-handle oleh useEffect di atas

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consultation/verifikasi`, { // API Baru untuk Admin
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setConsultations(response.data.data);
                setStats(response.data.stats);
            } else {
                setError(response.data.message || "Gagal mengambil data konsultasi.");
            }
        } catch (err) {
            console.error("Error fetching consultations:", err);
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401 || err.response.status === 403) { // Unauthorized or Forbidden
                    localStorage.removeItem("token");
                    window.location.href = "/auth/login";
                } else {
                    setError(err.response.data.message || "Terjadi kesalahan saat mengambil data.");
                }
            } else {
                setError("Terjadi kesalahan jaringan atau server.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchConsultations();
    }, [fetchConsultations]);

    // --- Filter dan Pencarian ---
    const filteredConsultations = consultations.filter(item => {
        const matchesSearch = item.topik.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || item.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

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
            reverseButtons: true // Membalik posisi tombol
        });

        if (result.isConfirmed) {
            setIsLoading(true); // Tampilkan loading saat proses update
            setError(null);

            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/consultations/${consultation.id}/status`, {
                    status: status,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
                    setError(response.data.message || "Gagal memperbarui status konsultasi.");
                }
            } catch (err) {
                console.error("Error updating consultation status:", err);
                let errorMessage = "Terjadi kesalahan jaringan atau server.";
                if (axios.isAxiosError(err) && err.response) {
                    errorMessage = err.response.data.message || "Terjadi kesalahan saat memperbarui status.";
                }
                Swal.fire(
                    'Error!',
                    errorMessage,
                    'error'
                );
                setError(errorMessage);
                setIsLoading(false); // Pastikan loading mati meskipun ada error
            }
        }
    };

    // --- Fungsi Badge Status ---
    const getStatusBadge = (status: ConsultationItem['status']) => {
        const statusConfig = {
            completed: {
                bg: "bg-green-100",
                text: "text-green-800",
                label: "Selesai",
                icon: <CheckCircle className="w-4 h-4 mr-1" />
            },
            pending: {
                bg: "bg-yellow-100",
                text: "text-yellow-800",
                label: "Menunggu",
                icon: <Clock className="w-4 h-4 mr-1" />
            },
            paid: {
                bg: "bg-blue-100",
                text: "text-blue-800",
                label: "Dibayar",
                icon: <DollarSign className="w-4 h-4 mr-1" />
            },
            cancelled: {
                bg: "bg-red-100",
                text: "text-red-800",
                label: "Dibatalkan",
                icon: <XCircle className="w-4 h-4 mr-1" />
            }
        };

        const config = statusConfig[status] || statusConfig.pending; // Default ke pending
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                {config.icon}
                {config.label}
            </span>
        );
    };

    return (
        <MainTemplateAdmin>
            <div className="space-y-8 py-8 px-5 md:px-10 lg:px-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Verifikasi Konsultasi</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} Konsultasi</p>
                                <p className="text-2xl font-bold text-gray-900">{value}</p>
                            </div>
                            {/* Tambahkan ikon dinamis jika perlu */}
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                {key === 'total' && <MessageCircle className="w-6 h-6 text-blue-600" />}
                                {key === 'pending' && <Clock className="w-6 h-6 text-yellow-600" />}
                                {key === 'paid' && <DollarSign className="w-6 h-6 text-blue-600" />}
                                {key === 'completed' && <CheckCircle className="w-6 h-6 text-green-600" />}
                                {key === 'cancelled' && <XCircle className="w-6 h-6 text-red-600" />}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan topik, nama user, atau kategori..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="pending">Menunggu</option>
                                    <option value="paid">Dibayar</option>
                                    <option value="completed">Selesai</option>
                                    <option value="cancelled">Dibatalkan</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

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
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Konsultasi</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Klien</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Harga</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Tanggal Order</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredConsultations.length > 0 ? (
                                        filteredConsultations.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 mb-1">{item.topik}</h3>
                                                        <p className="text-sm text-gray-500">{item.kategori}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{item.user_name}</h3>
                                                        <p className="text-sm text-gray-500">{item.user_email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 font-semibold text-gray-900">
                                                    {item.harga}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {getStatusBadge(item.status)}
                                                </td>
                                                <td className="py-4 px-6 text-gray-700">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span>{item.created_at_formatted}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.status !== 'pending' && (
                                                            <button
                                                                onClick={() => handleChangeStatusClick(item, 'pending')}
                                                                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                                                                title="Ubah ke Menunggu"
                                                            >
                                                                <Clock className="inline-block w-4 h-4 mr-1" /> Pending
                                                            </button>
                                                        )}
                                                        {item.status !== 'paid' && (
                                                            <button
                                                                onClick={() => handleChangeStatusClick(item, 'paid')}
                                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                                                                title="Ubah ke Dibayar"
                                                            >
                                                                <DollarSign className="inline-block w-4 h-4 mr-1" /> Dibayar
                                                            </button>
                                                        )}
                                                        {item.status !== 'completed' && (
                                                            <button
                                                                onClick={() => handleChangeStatusClick(item, 'completed')}
                                                                className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                                                                title="Ubah ke Selesai"
                                                            >
                                                                <CheckCircle className="inline-block w-4 h-4 mr-1" /> Selesai
                                                            </button>
                                                        )}
                                                        {item.status !== 'cancelled' && (
                                                            <button
                                                                onClick={() => handleChangeStatusClick(item, 'cancelled')}
                                                                className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                                                                title="Ubah ke Dibatalkan"
                                                            >
                                                                <XCircle className="inline-block w-4 h-4 mr-1" /> Batalkan
                                                            </button>
                                                        )}
                                                        {/* Link untuk melihat detail/chat dengan user jika ada */}
                                                        {/* <Link href={`/admin/consultations/${item.id}`} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Lihat Detail">
                                                            <Info className="w-5 h-5" />
                                                        </Link> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6}>
                                                <div className="text-center py-12 text-gray-600">
                                                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                                    <p className="text-lg font-medium mb-2">Tidak ada data konsultasi ditemukan</p>
                                                    <p>Coba sesuaikan filter atau pencarian Anda.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </MainTemplateAdmin>
    );
};

export default VerifikasiPage;