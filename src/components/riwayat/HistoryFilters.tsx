'use client'

import React from 'react';
import HistoryInputField from './HistoryInputField';
import HistorySelectField from './HistorySelectField';

interface HistoryFiltersProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterStatus: string;
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "completed", label: "Selesai" },
    { value: "pending", label: "Menunggu" },
    { value: "paid", label: "Dibayar" },
    { value: "cancelled", label: "Dibatalkan" },
];

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
    searchTerm,
    onSearchChange,
    filterStatus,
    onFilterChange,
}) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <HistoryInputField
                    placeholder="Cari topik konsultasi..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="max-w-md"
                />

                <div className="flex items-center space-x-4">
                    <HistorySelectField
                        options={statusOptions}
                        value={filterStatus}
                        onChange={onFilterChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default HistoryFilters;