import { useState, useEffect } from "react";
import { Menu, X, Home, FileText, MessageCircle, Clock, User, Phone, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const NavbarUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const router = useRouter();

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
        { name: 'Beranda', href: '/home', icon: Home, active: true },
        { name: 'Artikel', href: '#', icon: FileText },
        { name: 'Konsultasi', href: '#', icon: MessageCircle },
        { name: 'Riwayat', href: '#', icon: Clock },
        { name: 'Kontak', href: '#', icon: Phone },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/20 shadow-lg shadow-black/5'
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100/50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="relative group">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                                <Image
                                    width={24}
                                    height={24}
                                    src="/logo.svg"
                                    alt="KonsulPro"
                                    className="w-6 h-6 text-white"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                KonsulPro
                            </h1>
                            <p className="text-xs text-gray-500 font-medium">IT & Business Solutions</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`group relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${item.active
                                        ? 'text-blue-600 bg-blue-50/80'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                    {item.active && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right Side - Profile & Logout */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-300"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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

                        {/* Quick Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="group relative px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-300"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-110 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-4 py-4 bg-white/95 backdrop-blur-xl border-t border-gray-200/20">
                    <div className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${item.active
                                        ? 'text-blue-600 bg-blue-50/80'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
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