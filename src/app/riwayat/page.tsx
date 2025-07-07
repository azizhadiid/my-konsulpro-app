'use client'

import MainTemplateUser from "@/components/MainTemplateUser";
import { useEffect, useState, useCallback } from "react";
import { MessageCircle, Calendar, CreditCard, Eye, ExternalLink, Filter, Search, ChevronDown, DollarSign, XCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios"; // Import axios

// Definisikan interface untuk tipe data riwayat konsultasi
interface ConsultationItem {
    id: number;
    topik: string;
    status: 'completed' | 'pending' | 'paid' | 'cancelled'; // Sesuaikan dengan status dari backend
    tanggalBayar: string; // Format YYYY-MM-DD
    tanggalBayarFormatted: string; // Format D M Y
    harga: string; // Misal: "Rp 2.500.000"
    kategori: string;
    deskripsi?: string; // Optional, jika ingin ditampilkan detail
    durasi?: number; // Optional
}

interface ConsultationStats {
    total: number;
    completed: number;
    pending: number;
    paid: number;
    cancelled: number;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const RiwayatPage = () => {
    const [riwayat, setRiwayat] = useState<ConsultationItem[]>([]);
    const [stats, setStats] = useState<ConsultationStats>({ total: 0, completed: 0, pending: 0, paid: 0, cancelled: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    // Fungsi untuk mengambil data riwayat dari backend
    const fetchRiwayat = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // Redirect ke login jika token tidak ada
                window.location.href = "/auth/login";
                return;
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consultation/history`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setRiwayat(response.data.data);
                setStats(response.data.stats); // Set statistik dari backend

                setUser(response.data.user_info);
            } else {
                setError(response.data.message || "Gagal mengambil data riwayat.");
            }
        } catch (err) {
            console.error("Error fetching consultation history:", err);
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    // Token tidak valid atau expired, redirect ke login
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
        fetchRiwayat();
    }, [fetchRiwayat]); // Dependency array memastikan useEffect berjalan hanya sekali atau saat fetchRiwayat berubah

    // Filter riwayat berdasarkan searchTerm dan filterStatus
    const filteredRiwayat = riwayat.filter(item => {
        const matchesSearch = item.topik.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kategori.toLowerCase().includes(searchTerm.toLowerCase());

        // Sesuaikan filterStatus dengan 'completed', 'pending', 'paid', 'cancelled'
        const matchesFilter = filterStatus === "all" || item.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Fungsi untuk mendapatkan badge status yang disesuaikan
    const getStatusBadge = (status: ConsultationItem['status']) => {
        const statusConfig = {
            completed: {
                bg: "bg-green-100",
                text: "text-green-800",
                label: "Selesai",
                icon: "✓"
            },
            pending: {
                bg: "bg-yellow-100",
                text: "text-yellow-800",
                label: "Menunggu", // Ubah dari 'Pending' menjadi 'Menunggu' jika cocok
                icon: "⏳"
            },
            paid: { // Tambahkan status 'paid'
                bg: "bg-blue-100",
                text: "text-blue-800",
                label: "Dibayar",
                icon: "💰" // Icon baru untuk status 'paid'
            },
            cancelled: { // Ubah dari 'canceled' menjadi 'cancelled' agar konsisten dengan backend
                bg: "bg-red-100",
                text: "text-red-800",
                label: "Dibatalkan",
                icon: "✕"
            }
        };

        const config = statusConfig[status] || statusConfig.pending; // Default ke pending jika status tidak dikenal
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                <span className="mr-1">{config.icon}</span>
                {config.label}
            </span>
        );
    };

    const handleWhatsAppRedirect = (item: ConsultationItem) => {
        const phoneNumber = "+6281366705844";
        const userName = user?.name || "Pelanggan Yth."; // Ini akan mencegah 'undefined'
        // -------------------------------------------------------------
        let message = '';

        switch (item.status) {
            case 'pending':
                message = `Halo Admin KonsulPro, saya ${userName}. Mohon panduan untuk menyelesaikan pembayaran konsultasi "${item.topik}" (ID: ${item.id}). Terima kasih.`;
                break;
            case 'paid':
                message = `Halo Admin KonsulPro, saya ${userName}. Saya telah melakukan pembayaran untuk konsultasi "${item.topik}" (ID: ${item.id}). Mohon konfirmasi jadwal selanjutnya. Terima kasih.`;
                break;
            case 'completed':
                message = `Halo Admin KonsulPro, saya ${userName}. Saya ingin menanyakan tindak lanjut atau memberikan feedback untuk konsultasi "${item.topik}" (ID: ${item.id}) yang sudah selesai. Terima kasih.`;
                break;
            case 'cancelled':
                message = `Halo Admin KonsulPro, saya ${userName}. Saya ingin menanyakan tentang pembatalan konsultasi "${item.topik}" (ID: ${item.id}). Terima kasih.`;
                break;
            default:
                message = `Halo Admin KonsulPro, saya ${userName}. Saya ingin menanyakan tentang konsultasi "${item.topik}" (ID: ${item.id}).`;
                break;
        }

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <MainTemplateUser>
            <div className="space-y-8 py-24 px-5 md:px-10 lg:px-24">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4">Riwayat Konsultasi</h1>
                        <p className="text-blue-100 text-lg">
                            Pantau progres dan kelola seluruh riwayat konsultasi IT dan bisnis Anda dengan mudah.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Tambahkan satu kolom untuk Paid */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Konsultasi</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Selesai</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.completed}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {stats.pending}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    {/* Tambahkan card untuk status 'Paid' */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Dibayar</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.paid}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-blue-600" /> {/* Icon DollarSign */}
                            </div>
                        </div>
                    </div>

                    {/* Tambahkan card untuk status 'Cancelled' */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Dibatalkan</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {stats.cancelled}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-red-600" /> {/* Icon XCircle */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari topik konsultasi..."
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
                                    <option value="completed">Selesai</option>
                                    <option value="pending">Pending</option>
                                    <option value="paid">Dibayar</option> {/* Tambahkan opsi 'Dibayar' */}
                                    <option value="cancelled">Dibatalkan</option> {/* Sesuaikan dengan 'cancelled' */}
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                            {/* Tombol filter ini bisa disembunyikan atau diubah fungsinya jika filter sudah otomatis onChange */}
                            {/* <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <Filter className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-700">Filter</span>
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Loading and Error States */}
                {isLoading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Memuat riwayat konsultasi...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-600">
                        <p>{error}</p>
                        <button
                            onClick={fetchRiwayat}
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
                            <table className="w-full min-w-[700px]"> {/* Minimal width untuk tabel */}
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Topik Konsultasi</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Tanggal Pembayaran</th> {/* Ubah label */}
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Harga</th>
                                        <th className="text-center py-4 px-6 font-semibold text-gray-900">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredRiwayat.length > 0 ? (
                                        filteredRiwayat.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 mb-1">{item.topik}</h3>
                                                        <p className="text-sm text-gray-500">{item.kategori}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {getStatusBadge(item.status)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-700">
                                                            {/* Gunakan tanggalBayarFormatted dari backend */}
                                                            {item.tanggalBayarFormatted}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="font-semibold text-gray-900">{item.harga}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleWhatsAppRedirect(item)}
                                                            // Nonaktifkan tombol WhatsApp jika statusnya 'pending' atau 'cancelled'
                                                            disabled={item.status === 'pending' || item.status === 'cancelled'}
                                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${item.status === 'pending' || item.status === 'cancelled'
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                : 'bg-green-600 hover:bg-green-700 text-white'
                                                                }`}
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            <span className="text-sm font-medium">WhatsApp</span>
                                                            <ExternalLink className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="text-center py-12">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <MessageCircle className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada riwayat konsultasi</h3>
                                                    <p className="text-gray-500">Mulai konsultasi pertama Anda untuk melihat riwayat di sini.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Butuh Konsultasi Baru?</h2>
                    <p className="text-blue-100 mb-6">Tim ahli kami siap membantu transformasi digital dan strategi bisnis Anda.</p>
                    <Link className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" href="/konsultasi">
                        Mulai Konsultasi →
                    </Link>
                </div>
            </div>
        </MainTemplateUser>
    );
};

export default RiwayatPage;