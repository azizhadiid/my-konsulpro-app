'use client'

import { LucideLayoutDashboard } from 'lucide-react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdDomainVerification, MdOutlineEditNote } from 'react-icons/md';
import { usePathname } from 'next/navigation'; // Import usePathname
import Link from 'next/link';

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
    const pathname = usePathname(); // Dapatkan pathname saat ini

    const menuItems = [
        {
            id: 'dashboard',
            icon: (
                <LucideLayoutDashboard />
            ),
            label: 'Dashboard',
            href: '/admin/dashboard'
        },
        {
            id: 'tambah-artikel',
            icon: (
                <AiOutlineFileAdd />
            ),
            label: 'Tambah Artikel',
            href: '/admin/article/tambah'
        },
        {
            id: 'edit-artikel', // Ubah id
            icon: (
                <MdOutlineEditNote />
            ),
            label: 'Edit Artikel',
            href: '/admin/article/edit'
        },
        {
            id: 'verifikasi-konsultasi', // Ubah id
            icon: (
                <MdDomainVerification />
            ),
            label: 'Verifikasi Konsultasi',
            href: '/admin/verifikasi'
        },
    ];

    return (
        <>
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                ConsultPro
                            </h1>
                            <p className="text-xs text-gray-500">
                                Admin Dashboard
                            </p>
                        </div>
                    </div>

                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => {
                        let isActive = false;

                        // Logika untuk menentukan item aktif
                        if (item.href === pathname) {
                            isActive = true; // Jika pathname sama persis (misal /admin/dashboard)
                        } else if (item.href === '/admin/article/edit' && pathname.startsWith('/admin/article/edit/')) {
                            // Jika item.href adalah '/admin/article/edit' DAN pathname dimulai dengan '/admin/article/edit/'
                            isActive = true;
                        } else if (item.href === '/admin/article' && pathname.startsWith('/admin/article')) {
                            // Jika ada link ke '/admin/article' (misal untuk daftar utama)
                            // ini akan aktif di '/admin/article', '/admin/article/tambah', '/admin/article/edit/id'
                            // Hanya tambahkan ini jika Anda punya item sidebar untuk daftar artikel utama
                            // Jika tidak ada item sidebar untuk daftar utama, abaikan kondisi ini
                        } else if (item.href === '/admin/article/tambah' && pathname.startsWith('/admin/article/tambah')) {
                            isActive = true; // Agar 'Tambah Artikel' tetap aktif meskipun ada query params atau hash
                        }


                        // Solusi Paling Fleksibel (menggunakan startsWith untuk semua kecuali root)
                        // const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
                        // Atau yang lebih sederhana jika link di sidebar hanya untuk parent path:
                        // const isActive = pathname.startsWith(item.href);
                        // Namun ini akan membuat '/admin/article' aktif ketika di '/admin/article/tambah'
                        // Untuk kasus 'Edit Artikel' dengan href '/admin/article/edit', ini akan bekerja:
                        const isActiveEditArtikel = item.href === '/admin/article/edit' && pathname.startsWith('/admin/article/edit/');
                        const isExactlyActive = pathname === item.href;

                        const finalIsActive = isExactlyActive || isActiveEditArtikel;


                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${finalIsActive
                                        ? 'bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-900 dark:bg-opacity-50 dark:text-blue-300'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    }`}
                                onClick={onClose}
                            >
                                <div className={`transition-colors duration-200 ${finalIsActive ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-white'
                                    }`}>
                                    {item.icon}
                                </div>
                                <span className="font-medium">{item.label}</span>

                                {finalIsActive && (
                                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-400"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Section */}
                <hr className="p-4 border-t border-gray-200" />
            </aside>
        </>
    );
};

export default SideBar;