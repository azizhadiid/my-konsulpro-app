"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from 'sweetalert2';
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";

const NavbarUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const router = useRouter();
    const pathname = usePathname();


    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const navItems = [
        { name: 'Beranda', href: '/home' },
        { name: 'Artikel', href: '#' },
        { name: 'Konsultasi', href: '/konsultasi' },
        { name: 'Riwayat', href: '#' },
        { name: 'Kontak', href: '#' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg shadow-gray-900/5'
                : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">

                    {/* Logo Section */}
                    <div className="flex items-center space-x-3 group ">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                                <Image
                                    width={24}
                                    height={24}
                                    src="/logo.svg"
                                    alt="KonsulPro"
                                    className="w-6 h-6 text-white"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                KonsulPro
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                                IT Solutions
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;

                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out hover:scale-[1.02] ${isActive
                                        ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                                        }`}
                                >
                                    {item.name}
                                    {!isActive && (
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA & Mobile Menu Button */}
                    <div className="flex items-center space-x-3">
                        {/* Profile Dropdown */}
                        <div className="relative hidden lg:block">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-300"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/20 py-2">
                                    <a href="/account" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50/80 transition-colors">
                                        <User className="w-4 h-4" />
                                        <span>Profil Saya</span>
                                    </a>
                                    <hr className="my-2 border-gray-200/50" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50/80 transition-colors w-full text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden relative p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <div className="relative w-6 h-6">
                                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-out ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-out top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-out ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${isOpen
                    ? 'max-h-110 opacity-100 pb-6'
                    : 'max-h-0 opacity-0 pb-0'
                    }`}>
                    <div className="pt-4 space-y-2">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;

                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ease-out ${isActive
                                        ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:translate-x-1'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{item.name}</span>
                                        {isActive && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </div>
                                </a>
                            );
                        })}

                        <hr className="my-3 border-gray-200/50" />

                        <a
                            href="/account"
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-300"
                        >
                            <User className="w-5 h-5" />
                            <span>Profil Saya</span>
                        </a>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50/80 transition-all duration-300 w-full text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;