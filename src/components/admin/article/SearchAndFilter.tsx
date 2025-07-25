'use client'

import React from 'react';
import { Search } from 'lucide-react'; // Menggunakan icon Search dari lucide-react

interface SearchAndFilterProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    perPage: number;
    onPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    loading: boolean;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    searchTerm,
    onSearchChange,
    perPage,
    onPerPageChange,
    loading,
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Cari artikel (judul, kategori)..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={searchTerm}
                    onChange={onSearchChange}
                    disabled={loading}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="perPage" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Tampilkan:</label>
                <select
                    id="perPage"
                    value={perPage}
                    onChange={onPerPageChange}
                    disabled={loading}
                    className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <span className="text-gray-700 dark:text-gray-300 text-sm">per halaman</span>
            </div>
        </div>
    );
};

export default SearchAndFilter;