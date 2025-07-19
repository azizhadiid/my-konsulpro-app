'use client';

import Image from 'next/image'; // Import Image dari next/image
import { useRouter } from 'next/navigation'; // Import useRouter untuk navigasi ke detail

type Artikel = { // Interface yang lebih lengkap dari yang Anda berikan
    id: number;
    judul: string;
    deskripsi: string;
    kategori: string;
    tanggal_publish: string;
    foto_url: string | null;
};

type Props = {
    artikel: Artikel;
};

export default function ArtikelCard({ artikel }: Props) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/article/${artikel.id}`); // Arahkan ke halaman detail artikel
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden
                       transition transform hover:scale-[1.02] hover:shadow-2xl duration-300
                       cursor-pointer group"
            onClick={handleCardClick}
        >
            {artikel.foto_url ? (
                <div className="relative w-full h-52"> {/* Fixed height for image container */}
                    <Image
                        src={artikel.foto_url}
                        alt={artikel.judul}
                        fill // Mengisi parent div
                        style={{ objectFit: 'cover' }} // Memastikan gambar menutupi area tanpa terdistorsi
                        className="transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Opsional: untuk optimasi ukuran gambar
                        unoptimized={process.env.NODE_ENV === 'development'} // Matikan optimasi di dev
                    />
                </div>
            ) : (
                <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg">
                    Tidak ada gambar
                </div>
            )}
            <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2
                                 dark:bg-blue-900 dark:text-blue-300">
                    {artikel.kategori}
                </span>
                <h2 className="font-bold text-xl md:text-2xl mt-1 text-gray-900 dark:text-white leading-tight mb-2
                               group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {artikel.judul}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {new Date(artikel.tanggal_publish).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-base line-clamp-3 mb-4">
                    {artikel.deskripsi}
                </p>
            </div>
        </div>
    );
}