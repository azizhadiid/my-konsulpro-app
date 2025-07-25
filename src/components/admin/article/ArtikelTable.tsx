'use client'

import React from 'react';
import Image from 'next/image';
import { Artikel } from '@/types/artikel';
import { Trash2, Edit } from 'lucide-react'; // Import icons

interface ArtikelTableProps {
    artikels: Artikel[];
    onEdit: (artikelId: number) => void;
    onDelete: (artikelId: number) => void;
    deletingId: number | null; // ID artikel yang sedang dihapus
}

const ArtikelTable: React.FC<ArtikelTableProps> = ({ artikels, onEdit, onDelete, deletingId }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Judul
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Kategori
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Tanggal Publish
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Gambar
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {artikels.map((artikel) => (
                        <tr key={artikel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {artikel.id}
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-800 dark:text-gray-200">
                                {artikel.judul}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {artikel.kategori}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {new Date(artikel.tanggal_publish).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {artikel.foto_url ? (
                                    <Image
                                        src={artikel.foto_url}
                                        alt={artikel.judul}
                                        width={48} // Sesuaikan ukuran sesuai kebutuhan
                                        height={48} // Sesuaikan ukuran sesuai kebutuhan
                                        className="h-12 w-12 object-cover rounded-md border border-gray-200 dark:border-gray-600 shadow-sm"
                                        unoptimized // Gunakan unoptimized jika URL berasal dari asset Laravel
                                    />
                                ) : (
                                    <span className="text-gray-400">Tidak ada gambar</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => onEdit(artikel.id)}
                                        className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-xs shadow-md"
                                    >
                                        <Edit className="w-4 h-4 mr-1" /> Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(artikel.id)}
                                        disabled={deletingId === artikel.id}
                                        className={`inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs shadow-md
                      ${deletingId === artikel.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {deletingId === artikel.id ? (
                                            <svg className="animate-spin h-4 w-4 mr-1 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <Trash2 className="w-4 h-4 mr-1" />
                                        )}
                                        {deletingId === artikel.id ? 'Menghapus...' : 'Hapus'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtikelTable;