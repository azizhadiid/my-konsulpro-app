'use client'

import React from 'react';
import { MessageCircle, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { AdminConsultationStats } from '@/types/consultation'; // Import tipe

interface ConsultationStatsCardsProps {
    stats: AdminConsultationStats;
}

const ConsultationStatsCards: React.FC<ConsultationStatsCardsProps> = ({ stats }) => {
    const statItems = [
        { key: 'total', label: 'Total Konsultasi', value: stats.total, icon: <MessageCircle className="w-6 h-6 text-blue-600" />, bgColor: 'bg-blue-100' },
        { key: 'pending', label: 'Konsultasi Menunggu', value: stats.pending, icon: <Clock className="w-6 h-6 text-yellow-600" />, bgColor: 'bg-yellow-100' },
        { key: 'paid', label: 'Konsultasi Dibayar', value: stats.paid, icon: <DollarSign className="w-6 h-6 text-blue-600" />, bgColor: 'bg-blue-100' },
        { key: 'completed', label: 'Konsultasi Selesai', value: stats.completed, icon: <CheckCircle className="w-6 h-6 text-green-600" />, bgColor: 'bg-green-100' },
        { key: 'cancelled', label: 'Konsultasi Dibatalkan', value: stats.cancelled, icon: <XCircle className="w-6 h-6 text-red-600" />, bgColor: 'bg-red-100' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statItems.map((item) => (
                <div key={item.key} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 capitalize">{item.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                        {item.icon}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConsultationStatsCards;