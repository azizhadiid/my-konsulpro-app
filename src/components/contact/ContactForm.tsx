'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ContactFormData } from '@/types/contact';

const ContactForm: React.FC = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth(); // Ambil user dan loading dari AuthContext

    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [fetchUserError, setFetchUserError] = useState<string | null>(null);

    // Inisialisasi form data dengan nama dan email user jika sudah login
    useEffect(() => {
        setFetchUserError(null);
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name,
                email: user.email,
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Jangan izinkan perubahan pada name dan email jika sudah diisi dari user data
        // karena ini diasumsikan untuk user yang sudah login
        if (user && (name === 'name' || name === 'email')) {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        toast.dismiss(); // Tutup toast yang mungkin masih terbuka

        // Validasi sederhana di frontend
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Semua field wajib diisi.');
            setLoading(false);
            return;
        }

        try {
            const response = await authService.sendContactEmail(formData); // Menggunakan authService

            toast.success(response.data.message || 'Pesan Anda telah berhasil dikirim!');
            // Reset hanya subjek dan pesan karena nama dan email dari user
            setFormData((prev) => ({
                ...prev,
                subject: '',
                message: '',
            }));

        } catch (err: any) {
            console.error('Error sending contact email:', err.response?.data || err.message);
            setFetchUserError(err.message || 'Gagal memuat data pengguna.');
            if (err.response?.status === 422 && err.response?.data?.errors) {
                // Tangani error validasi Laravel
                const errors = err.response.data.errors;
                Object.values(errors).flat().forEach((message: any) => toast.error(message));
            } else if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Gagal mengirim pesan kontak. Silakan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Tampilkan loading state atau error jika user data belum terambil
    if (authLoading && !fetchUserError) { // Gunakan authLoading dari AuthContext
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