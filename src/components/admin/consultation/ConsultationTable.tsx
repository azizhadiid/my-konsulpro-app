'use client'

import React from 'react';
import { Calendar, CheckCircle, Clock, DollarSign, Info, MessageCircle, XCircle } from 'lucide-react';
import { ConsultationItem } from '@/types/consultation'; // Import tipe
import ConsultationStatusBadge from './ConsultationStatusBadge'; // Import badge component

interface ConsultationTableProps {
    consultations: ConsultationItem[];
    onChangeStatus: (consultation: ConsultationItem, status: ConsultationItem['status']) => void;
    // onDetailClick: (consultationId: number) => void; // Jika ada halaman detail
    isUpdatingStatus: boolean; // Menunjukkan apakah ada update status yang sedang berjalan
}

const ConsultationTable: React.FC<ConsultationTableProps> = ({
    consultations,
    onChangeStatus,
    // onDetailClick,
    isUpdatingStatus,
}) => {
    return (
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
                        {consultations.length > 0 ? (
                            consultations.map((item) => (
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
                                        <ConsultationStatusBadge status={item.status} />
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
                                                    onClick={() => onChangeStatus(item, 'pending')}
                                                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Ubah ke Menunggu"
                                                    disabled={isUpdatingStatus}
                                                >
                                                    <Clock className="inline-block w-4 h-4 mr-1" /> Pending
                                                </button>
                                            )}
                                            {item.status !== 'paid' && (
                                                <button
                                                    onClick={() => onChangeStatus(item, 'paid')}
                                                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Ubah ke Dibayar"
                                                    disabled={isUpdatingStatus}
                                                >
                                                    <DollarSign className="inline-block w-4 h-4 mr-1" /> Dibayar
                                                </button>
                                            )}
                                            {item.status !== 'completed' && (
                                                <button
                                                    onClick={() => onChangeStatus(item, 'completed')}
                                                    className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Ubah ke Selesai"
                                                    disabled={isUpdatingStatus}
                                                >
                                                    <CheckCircle className="inline-block w-4 h-4 mr-1" /> Selesai
                                                </button>
                                            )}
                                            {item.status !== 'cancelled' && (
                                                <button
                                                    onClick={() => onChangeStatus(item, 'cancelled')}
                                                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Ubah ke Dibatalkan"
                                                    disabled={isUpdatingStatus}
                                                >
                                                    <XCircle className="inline-block w-4 h-4 mr-1" /> Batalkan
                                                </button>
                                            )}
                                            {/* Tombol Detail (opsional, jika ada halaman detail terpisah) */}
                                            {/*
                      <button
                        onClick={() => onDetailClick(item.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Lihat Detail"
                        disabled={isUpdatingStatus}
                      >
                        <Info className="w-5 h-5" />
                      </button>
                      */}
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
    );
};

export default ConsultationTable;