'use client'

import MainTemplateAdmin from "../components/MainTemplateAdmin";
import { useEffect, useState, useCallback, JSX } from "react";
import axios from "axios";
import Link from "next/link";
import { MessageCircle, Clock, CheckCircle, XCircle, DollarSign, BookOpen, FileText, BarChart, TrendingUp, TrendingDown, Users } from "lucide-react"; // Import ikon tambahan

// --- Interfaces ---
interface DashboardStats {
    total_consultations: number;
    pending_consultations: number;
    paid_consultations: number;
    completed_consultations: number;
    cancelled_consultations: number;
    total_articles: number;
    draft_articles: number;
    published_articles: number;
    // Tambahkan metrik lain jika ada (misal: total user, pendapatan)
}

interface LatestConsultation {
    id: number;
    user_name: string;
    topik: string;
    status: 'pending' | 'paid' | 'completed' | 'cancelled';
    created_at_formatted: string;
}

interface LatestArticle {
    id: number;
    title: string;
    status: string; // 'draft' | 'published'
    created_at_formatted: string;
}

const DashboardPage = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [latestConsultations, setLatestConsultations] = useState<LatestConsultation[]>([]);
    const [latestArticles, setLatestArticles] = useState<LatestArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
        // TODO: Anda mungkin ingin memverifikasi role admin dari token di sini juga
        // const userRole = decodeToken(token).role;
        // if (userRole !== 'admin') { window.location.href = '/unauthorized'; }
    }, []);

    // --- Fetch Data Dashboard dari API ---
    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // Ini akan diarahkan oleh useEffect di atas, tapi untuk keamanan di sini juga
                window.location.href = "/auth/login";
                return;
            }

            // Endpoint API baru untuk dashboard admin
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setStats(response.data.stats);
                setLatestConsultations(response.data.latest_consultations);
                setLatestArticles(response.data.latest_articles);
            } else {
                setError(response.data.message || "Gagal mengambil data dashboard.");
            }
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
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
        fetchDashboardData();
    }, [fetchDashboardData]);

    const getStatusBadge = (status: string) => {
        const statusConfig: { [key: string]: { bg: string; text: string; label: string; icon?: JSX.Element } } = {
            completed: { bg: "bg-green-100", text: "text-green-800", label: "Selesai", icon: <CheckCircle className="w-3 h-3 mr-1" /> },
            pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Menunggu", icon: <Clock className="w-3 h-3 mr-1" /> },
            paid: { bg: "bg-blue-100", text: "text-blue-800", label: "Dibayar", icon: <DollarSign className="w-3 h-3 mr-1" /> },
            cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Dibatalkan", icon: <XCircle className="w-3 h-3 mr-1" /> },
            draft: { bg: "bg-gray-100", text: "text-gray-800", label: "Draft", icon: <FileText className="w-3 h-3 mr-1" /> },
            published: { bg: "bg-purple-100", text: "text-purple-800", label: "Published", icon: <BookOpen className="w-3 h-3 mr-1" /> },
        };
        const config = statusConfig[status.toLowerCase()] || { bg: "bg-gray-100", text: "text-gray-800", label: status };
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.icon}{config.label}
            </span>
        );
    };

    if (isLoading) {
        return (
            <MainTemplateAdmin>
                <div className="text-center py-12">
                    <p className="text-gray-600">Memuat data dashboard...</p>
                    <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </MainTemplateAdmin>
        );
    }

    if (error) {
        return (
            <MainTemplateAdmin>
                <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg border border-red-200 m-8">
                    <p>{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            </MainTemplateAdmin>
        );
    }

    return (
        <MainTemplateAdmin>
            <div className="space-y-8 py-8 px-5 md:px-10 lg:px-5">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, Admin
                            </h1>
                            <p className="text-gray-600">
                                Here's what's happening with your business today.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                                Generate Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ringkasan Statistik</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Konsultasi</p>
                            <p className="text-2xl font-bold text-gray-900">{stats?.total_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats?.pending_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Dibayar</p>
                            <p className="text-2xl font-bold text-blue-600">{stats?.paid_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Selesai</p>
                            <p className="text-2xl font-bold text-green-600">{stats?.completed_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Dibatalkan</p>
                            <p className="text-2xl font-bold text-red-600">{stats?.cancelled_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Artikel</p>
                            <p className="text-2xl font-bold text-gray-900">{stats?.total_articles}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Artikel Draft</p>
                            <p className="text-2xl font-bold text-gray-700">{stats?.draft_articles}</p>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Artikel Published</p>
                            <p className="text-2xl font-bold text-purple-600">{stats?.published_articles}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Latest Activities Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Latest Consultations */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <MessageCircle className="w-6 h-6 mr-2 text-blue-600" /> Konsultasi Terbaru
                        </h2>
                        {latestConsultations.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {latestConsultations.map(c => (
                                    <li key={c.id} className="py-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{c.topik} <span className="text-sm text-gray-500">- oleh {c.user_name}</span></p>
                                            <p className="text-sm text-gray-500">{c.created_at_formatted}</p>
                                        </div>
                                        {getStatusBadge(c.status)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Tidak ada konsultasi terbaru.</p>
                        )}
                        <div className="mt-4 text-right">
                            <Link href="/admin/verifikasi" className="text-blue-600 hover:text-blue-800 font-medium">
                                Lihat Semua Konsultasi &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Latest Articles */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <BookOpen className="w-6 h-6 mr-2 text-purple-600" /> Artikel Terbaru
                        </h2>
                        {latestArticles.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {latestArticles.map(a => (
                                    <li key={a.id} className="py-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{a.title}</p>
                                            <p className="text-sm text-gray-500">{a.created_at_formatted}</p>
                                        </div>
                                        {getStatusBadge(a.status)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Tidak ada artikel terbaru.</p>
                        )}
                        <div className="mt-4 text-right">
                            <Link href="/admin/article/edit" className="text-blue-600 hover:text-blue-800 font-medium">
                                Lihat Semua Artikel &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Optional: Quick Actions / Charts */}
                {/* <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <Link href="/admin/tambah-artikel" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <FileText className="w-8 h-8 text-indigo-600" />
                        <span className="font-semibold text-lg text-gray-800">Tambah Artikel Baru</span>
                    </Link>
                    <Link href="/admin/verifikasi" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <Clock className="w-8 h-8 text-yellow-600" />
                        <span className="font-semibold text-lg text-gray-800">Verifikasi Konsultasi</span>
                    </Link>
                    <Link href="/admin/users" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <Users className="w-8 h-8 text-green-600" />
                        <span className="font-semibold text-lg text-gray-800">Kelola Pengguna</span>
                    </Link>
                </div> */}

            </div>
        </MainTemplateAdmin>
    );
};

export default DashboardPage;