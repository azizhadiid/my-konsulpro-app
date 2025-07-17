'use client'

import React from 'react';
import { Eye, ExternalLink, MessageCircle, Calendar } from 'lucide-react';
import HistoryActionButton from './HistoryActionButton';
import StatusBadge from './StatusBadge';
import { ConsultationItem } from '@/types/consultation';
import { UserData } from '@/types/auth'; // Import UserData dari auth.d.ts

interface HistoryTableProps {
    riwayat: ConsultationItem[];
    user: UserData | null; // Menerima data user
}

const HistoryTable: React.FC<HistoryTableProps> = ({ riwayat, user }) => {

    const handleWhatsAppRedirect = (item: ConsultationItem) => {
        const phoneNumber = "+6281366705844"; // Ganti dengan nomor WhatsApp admin Anda
        const userName = user?.name || "Pelanggan Yth.";

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Topik Konsultasi</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Tanggal Pembayaran</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Harga</th>
                            <th className="text-center py-4 px-6 font-semibold text-gray-900">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {riwayat.length > 0 ? (
                            riwayat.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-1">{item.topik}</h3>
                                            <p className="text-sm text-gray-500">{item.kategori}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">
                                                {item.tanggalBayarFormatted}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-semibold text-gray-900">{item.harga}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center space-x-2">
                                            <HistoryActionButton variant="secondary">
                                                <Eye className="w-4 h-4" />
                                            </HistoryActionButton>
                                            <HistoryActionButton
                                                onClick={() => handleWhatsAppRedirect(item)}
                                                variant="whatsapp"
                                                disabled={item.status === 'pending' || item.status === 'cancelled'}
                                                className={item.status === 'pending' || item.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : ''}
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">WhatsApp</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </HistoryActionButton>
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
    );
};

export default HistoryTable;