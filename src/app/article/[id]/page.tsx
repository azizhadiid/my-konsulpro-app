'use client';

import MainTemplateUser from '@/components/MainTemplateUser';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Artikel = {
    id: number;
    judul: string;
    deskripsi: string;
    kategori: string;
    tanggal_publish: string;
    foto_url: string | null;
};

export default function DetailArtikelPage() {
    const { id } = useParams();
    const router = useRouter();
    const [artikel, setArtikel] = useState<Artikel | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/artikels/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setArtikel(res.data.artikel);
            } catch (err) {
                console.error('Gagal mengambil data artikel', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) {
        return (
            <MainTemplateUser>
                <div className="py-20 text-center text-gray-500 text-lg">Memuat artikel...</div>
            </MainTemplateUser>
        );
    }

    if (!artikel) {
        return (
            <MainTemplateUser>
                <div className="py-20 text-center text-red-500 text-lg">Artikel tidak ditemukan.</div>
            </MainTemplateUser>
        );
    }

    return (
        <MainTemplateUser>
            <section className="max-w-4xl mx-auto px-5 md:px-8 lg:px-0 py-28">
                {/* Header */}
                <div className="mb-6 text-center">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold tracking-wide uppercase">
                        {artikel.kategori}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 leading-tight">
                        {artikel.judul}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Dipublikasikan pada {new Date(artikel.tanggal_publish).toLocaleDateString('id-ID')}
                    </p>
                </div>

                {/* Gambar Artikel */}
                {artikel.foto_url && (
                    <div className="w-full h-[240px] md:h-[360px] overflow-hidden rounded-xl mb-10 shadow">
                        <img
                            src={artikel.foto_url}
                            alt={artikel.judul}
                            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                )}

                {/* Konten Artikel */}
                <article className="prose lg:prose-xl prose-gray max-w-none">
                    <div
                        dangerouslySetInnerHTML={{ __html: artikel.deskripsi }}
                    />
                </article>

                {/* Tombol Kembali */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => router.push('/article')}
                        className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition"
                    >
                        ← Kembali ke Daftar Artikel
                    </button>
                </div>
            </section>
        </MainTemplateUser>
    );
}
