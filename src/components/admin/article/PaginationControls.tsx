'use client'

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading: boolean;
    totalItems: number;
    perPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    loading,
    totalItems,
    perPage,
}) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5; // Jumlah tombol halaman yang ingin ditampilkan
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const endIndex = Math.min(currentPage * perPage, totalItems);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-4 md:space-y-0">
            <div className="text-sm text-gray-700 dark:text-gray-300">
                Menampilkan {startIndex} sampai {endIndex} dari {totalItems} artikel
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600
            ${currentPage === 1 || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={loading}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
              ${page === currentPage
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600
            ${currentPage === totalPages || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
            </nav>
        </div>
    );
};

export default PaginationControls;