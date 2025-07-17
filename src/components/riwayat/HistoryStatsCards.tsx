'use client'

import React from 'react';
import { MessageCircle, CreditCard, Calendar, DollarSign, XCircle } from 'lucide-react';
import { ConsultationStats } from '@/types/consultation';

interface HistoryStatsCardsProps {
    stats: ConsultationStats;
}

const HistoryStatsCards: React.FC<HistoryStatsCardsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Dibayar</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {stats.paid}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Dibatalkan</p>
                        <p className="text-2xl font-bold text-red-600">
                            {stats.cancelled}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryStatsCards;