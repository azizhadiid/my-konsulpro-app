'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Calendar, CreditCard } from 'lucide-react';
import { consultationService } from '../services/consultationService';
import MainTemplateUser from '@/components/MainTemplateUser';

const ConsultationSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [consultationData, setConsultationData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const orderId = searchParams.get('order_id');
                if (orderId) {
                    const response = await consultationService.checkStatus(orderId);
                    if (response.success) {
                        setConsultationData(response.data.consultation);
                    }
                }
            } catch (error) {
                console.error('Error checking payment status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkPaymentStatus();
    }, [searchParams]);

    if (loading) {
        return (
            <MainTemplateUser>
                <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Memverifikasi pembayaran...</p>
                    </div>
                </div>
            </MainTemplateUser>
        );
    }

    return (
        <MainTemplateUser>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 lg:p-12">
                        {/* Success Header */}
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Pembayaran Berhasil!
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Selamat! Pembayaran konsultasi Anda telah berhasil diproses. Tim kami akan segera menghubungi Anda untuk memulai proses konsultasi.
                            </p>
                        </div>

                        {/* Transaction Details */}
                        {consultationData && (
                            <div className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    Detail Transaksi
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">ID Transaksi</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {consultationData.midtrans_transaction_id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Judul Konsultasi</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {consultationData.title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Durasi</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {consultationData.duration} bulan
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Pembayaran</p>
                                        <p className="font-semibold text-green-600 dark:text-green-400 text-lg">
                                            Rp {parseFloat(consultationData.total_price).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Next Steps */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                Langkah Selanjutnya
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        1
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Tim kami akan meninjau kebutuhan konsultasi Anda dalam 24 jam kerja
                                    </p>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        2
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Anda akan dihubungi melalui email/telepon untuk penjadwalan konsultasi awal
                                    </p>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        3
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Konsultasi akan dimulai sesuai dengan jadwal yang telah disepakati
                                    </p>
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <span>Kembali ke Dashboard</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => router.push('/consultation/history')}
                                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
                            >
                                Lihat Riwayat Konsultasi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainTemplateUser>
    );
};

export default ConsultationSuccessPage;