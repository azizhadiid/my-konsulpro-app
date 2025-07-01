'use client'

import Swal from 'sweetalert2';
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from 'next/navigation';

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
    const router = useRouter();

    const handleLogout = () => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin logout?',
            text: 'Anda akan keluar dari akun Anda.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, logout',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token'); // hapus token
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil logout',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    router.push('/auth/login'); // redirect setelah alert
                });
            }
        });
    };
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Breadcrumb */}
                    <nav className="hidden md:flex items-center space-x-2 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Admin</span>
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-900 dark:text-white font-medium">Dashboard</span>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                    >
                        <IoIosLogOut />
                        <span>Logout</span>
                    </button>

                    {/* Profile */}
                    <div className="relative">
                        <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                AD
                            </div>
                            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;