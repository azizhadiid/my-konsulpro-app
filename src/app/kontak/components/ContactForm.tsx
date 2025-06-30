'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast'; // Import toast
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8000/api';

interface UserData {
    id: number;
    name: string;
    email: string;
    // Tambahkan properti lain yang mungkin ada di objek user Anda
}

const ContactForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchUserError, setFetchUserError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setFetchUserError(null);
            const token = localStorage.getItem('token'); // Sesuaikan dengan key token Anda

            if (!token) {
                // Jika tidak ada token, mungkin user belum login, atau sesi berakhir
                // Kita bisa biarkan form kosong dan tidak readonly, atau redirect.
                // Berdasarkan kontak/page.tsx Anda, ada redirect jika tidak ada token.
                // Jadi, diasumsikan user selalu memiliki token di sini.
                // Atau, jika form kontak ini bisa diisi anonim, Anda bisa ubah logika.
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/user`, { // Endpoint Laravel untuk ambil data user
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    if (response.status === 401) {
                        toast.error('Sesi Anda telah berakhir. Mohon login kembali.');
                        localStorage.removeItem('token');
                        router.push('/auth/login');
                    }
                    throw new Error(data.message || 'Gagal mengambil data user.');
                }

                setUser(data);
                setFormData((prev) => ({
                    ...prev,
                    name: data.name,
                    email: data.email,
                }));
            } catch (err: any) {
                console.error('Error fetching user data:', err);
                setFetchUserError(err.message || 'Gagal memuat data pengguna.');
                toast.error('Gagal memuat data pengguna. Mohon coba refresh halaman.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]); // Tambahkan router sebagai dependency jika digunakan di useEffect

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Jangan izinkan perubahan pada name dan email jika sudah diisi dari user data
        if (name === 'name' && user) return;
        if (name === 'email' && user) return;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        toast.dismiss(); // Tutup toast yang mungkin masih terbuka

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Anda belum login. Silakan login terlebih dahulu.');
            router.push('/auth/login');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/send-contact-email`, { // Endpoint Laravel Brevo
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Gagal mengirim pesan kontak. Silakan coba lagi.';
                if (response.status === 401) {
                    errorMessage = 'Sesi Anda telah berakhir. Mohon login kembali.';
                    localStorage.removeItem('token');
                    router.push('/auth/login');
                } else if (response.status === 422 && data.errors) {
                    errorMessage = Object.values(data.errors).flat().join('\n');
                } else if (data.message) {
                    errorMessage = data.message;
                }
                throw new Error(errorMessage);
            }

            toast.success(data.message || 'Pesan Anda telah berhasil dikirim!');
            // Reset hanya subjek dan pesan karena nama dan email dari user
            setFormData((prev) => ({
                ...prev,
                subject: '',
                message: '',
            }));

        } catch (err: any) {
            console.error('Error sending contact email:', err);
            toast.error(err.message || 'Terjadi kesalahan jaringan.');
        } finally {
            setLoading(false);
        }
    };

    // Tampilkan loading state atau error jika user data belum terambil
    if (loading && !user && !fetchUserError) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex items-center justify-center h-full min-h-[300px]">
                <p className="text-gray-600">Memuat data pengguna...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
                Silakan isi formulir di bawah ini untuk menghubungi tim kami.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 sr-only">Nama Anda</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nama Anda"
                            required
                            readOnly={!!user} // readonly jika user data sudah ada
                            className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out ${user ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email Anda</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Anda"
                            required
                            readOnly={!!user} // readonly jika user data sudah ada
                            className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out ${user ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 sr-only">Subjek</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subjek"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 sr-only">Pesan</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis pesan Anda di sini..."
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out resize-y"
                    ></textarea>
                </div>

                {fetchUserError && <p className="text-red-600 text-sm">{fetchUserError}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={loading || !user} // Dinonaktifkan juga jika user data belum terambil
                        className="w-full md:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;