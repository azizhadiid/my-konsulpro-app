'use client'

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface ConsultationSearchFilterProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterStatus: string;
    onFilterStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled: boolean;
}

const ConsultationSearchFilter: React.FC<ConsultationSearchFilterProps> = ({
    searchTerm,
    onSearchChange,
    filterStatus,
    onFilterStatusChange,
    disabled,
}) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan topik, nama user, atau email..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        disabled={disabled}
                    />
                </div>

                <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
                    <div className="relative w-full md:w-auto">
                        <select
                            value={filterStatus}
                            onChange={onFilterStatusChange}
                            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full"
                            disabled={disabled}
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
    );
};

export default ConsultationSearchFilter;