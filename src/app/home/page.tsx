'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import MainTemplateUser from "@/components/MainTemplateUser";

export default function Home() {
    const [message, setMessage] = useState('Loading...')

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/ping')
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch(() => setMessage('Gagal koneksi ke Laravel API'))
    }, [])

    return (
        <MainTemplateUser>
            {/* Hero Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    {/* Hero Text */}
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
                            Inspiring Excellence Through Education
                        </h1>
                        <p className="mt-4 text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
                            eget lacus id tortor facilisis tincidunt.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-6">
                            <div>
                                <p className="text-3xl font-bold text-blue-600">96%</p>
                                <p className="text-sm text-gray-500">Employment Rate</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-600">12:1</p>
                                <p className="text-sm text-gray-500">Student-Teacher Ratio</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-600">50+</p>
                                <p className="text-sm text-gray-500">Programs</p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
                                Start Your Journey
                            </a>
                            <a href="#" className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50 transition">
                                Virtual Tour
                            </a>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <Image
                            src="/assets/img/education/showcase-6.webp" // ganti nanti dengan gambar kamu
                            alt="Education"
                            width={500}
                            height={500}
                            className="rounded-xl w-full shadow-lg"
                        />
                        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                            <i className="bi bi-patch-check-fill"></i>
                            <span>Accredited Excellence</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    {/* Gambar atau ilustrasi */}
                    <div>
                        <Image
                            src="/assets/img/education/events-1.webp" // ganti gambar ini sesuai kamu
                            alt="Tentang Kami"
                            width={600}
                            height={400}
                            className="rounded-xl shadow-md w-full"
                        />
                    </div>

                    {/* Teks About */}
                    <div>
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">Tentang KonsulPro</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            KonsulPro adalah platform layanan konsultasi profesional yang menghubungkan pengguna dengan konsultan ahli
                            dari berbagai bidang. Kami memberikan kemudahan bagi masyarakat untuk mendapatkan akses ke solusi, wawasan,
                            dan pendampingan dalam menghadapi berbagai tantangan.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-2">
                                <i className="bi bi-check-circle-fill text-green-500 mt-1"></i>
                                Layanan konsultasi berbasis kebutuhan pengguna
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="bi bi-check-circle-fill text-green-500 mt-1"></i>
                                Konsultan berpengalaman & terverifikasi
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="bi bi-check-circle-fill text-green-500 mt-1"></i>
                                Proses cepat, efisien, dan fleksibel
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </MainTemplateUser>
    );
}
