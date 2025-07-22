'use client'

import MainTemplateAdmin from "../components/MainTemplateAdmin";
import { useEffect, useState, useCallback, JSX } from "react";
import Link from "next/link";
import { MessageCircle, Clock, CheckCircle, XCircle, DollarSign, BookOpen, FileText, Users, LayoutDashboard } from "lucide-react";

// Import tipe dari file baru
import { DashboardStats, LatestConsultation, LatestArticle, DashboardApiResponse } from '@/types/admin-dashboard';
// Import service API baru
import { adminService } from '@/lib/admin-api';

const DashboardPage = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [latestConsultations, setLatestConsultations] = useState<LatestConsultation[]>([]);
    const [latestArticles, setLatestArticles] = useState<LatestArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    // Initial auth check (can be combined with data fetching or kept separate)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
        // TODO: Implement actual role verification here (e.g., decode token and check role)
        // For example:
        // const decodedToken = decodeToken(token);
        // if (decodedToken?.role !== 'admin') {
        //     window.location.href = '/unauthorized'; // Or redirect to a general user dashboard
        // }
    }, []);

    // --- Fetch Dashboard Data from API using adminService ---
    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/auth/login";
                return;
            }

            const response = await adminService.getAdminDashboardData(); // Menggunakan adminService

            if (response.data.success) {
                setStats(response.data.stats);
                setLatestConsultations(response.data.latest_consultations);
                setLatestArticles(response.data.latest_articles);
            } else {
                setError(response.data.message || "Gagal mengambil data dashboard.");
            }
        } catch (err: any) {
            console.error("Error fetching dashboard data:", err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
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

    // Function to handle report generation
    const handleGenerateReport = async () => {
        setIsGeneratingReport(true);
        try {
            // Simulate a short delay for "generating"
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Construct the direct URL to the report endpoint
            const reportUrl = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/generate-report`;

            // Open the URL in a new blank tab
            // The Laravel backend will directly send the file for download.
            window.open(reportUrl, '_blank');

            // Optionally, show a success message after opening the tab
            // (Consider using a custom modal/toast instead of alert in production)
            alert("Laporan sedang dibuat dan akan diunduh di tab baru!");

        } catch (err) {
            console.error("Error initiating report download:", err);
            alert("Gagal memulai unduhan laporan. Silakan coba lagi.");
        } finally {
            setIsGeneratingReport(false);
        }
    };

    // Helper function to render status badges
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
                                Welcome back, Admin!
                            </h1>
                            <p className="text-gray-600">
                                Here's what's happening with your business today.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={handleGenerateReport}
                                disabled={isGeneratingReport}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGeneratingReport ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </span>
                                ) : (
                                    "Generate Report"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ringkasan Statistik</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Total Konsultasi */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Konsultasi</p>
                            <p className="text-2xl font-bold text-gray-900">{stats?.total_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    {/* Konsultasi Pending */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats?.pending_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    {/* Konsultasi Dibayar */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Dibayar</p>
                            <p className="text-2xl font-bold text-blue-600">{stats?.paid_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    {/* Konsultasi Selesai */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Selesai</p>
                            <p className="text-2xl font-bold text-green-600">{stats?.completed_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    {/* Konsultasi Dibatalkan */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Konsultasi Dibatalkan</p>
                            <p className="text-2xl font-bold text-red-600">{stats?.cancelled_consultations}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    {/* Total Artikel */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Artikel</p>
                            <p className="text-2xl font-bold text-gray-900">{stats?.total_articles}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    {/* Artikel Draft */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Artikel Draft</p>
                            <p className="text-2xl font-bold text-gray-700">{stats?.draft_articles}</p>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                    {/* Artikel Published */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Artikel Published</p>
                            <p className="text-2xl font-bold text-purple-600">{stats?.published_articles}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    {/* Total Users Card */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Pengguna</p>
                            <p className="text-2xl font-bold text-indigo-600">{stats?.total_users}</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-indigo-600" />
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

            </div>
        </MainTemplateAdmin>
    );
};

export default DashboardPage;
