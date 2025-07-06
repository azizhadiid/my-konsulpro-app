'use client';

import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Calendar,
    Clock,
    Cpu,
    Zap,
    Shield,
    Cloud,
    BarChart3,
    Code,
    Building2,
    Target // Untuk icon deskripsi
} from 'lucide-react';

import Swal from 'sweetalert2'; // Tetap gunakan Swal
import MainTemplateUser from '@/components/MainTemplateUser';
import ConsultationHeader from './components/ConsultationHeader';
import FormField from './components/FormField';
import CategorySelection from './components/CategorySelection';
import PriceSummaryCard from './components/PriceSummaryCard';
import SubmitButton from './components/SubmitButton';
import axios from 'axios';

declare global {
    interface Window {
        snap: {
            pay: (
                token: string,
                options: {
                    onSuccess?: (result: any) => void;
                    onPending?: (result: any) => void;
                    onError?: (result: any) => void;
                    onClose?: () => void;
                }
            ) => void;
        };
    }
}


const KonsultasiPage = () => {
    // Autentikasi
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: 1,
        category: ''
    });

    const pricePerMonth = 500000;
    const [totalPrice, setTotalPrice] = useState(pricePerMonth);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const consultationCategories = [
        {
            value: 'it-consulting',
            label: 'Konsultasi IT Umum',
            icon: <Cpu className="w-5 h-5" />,
            description: 'Solusi teknologi menyeluruh'
        },
        {
            value: 'strategy-business',
            label: 'Strategi Bisnis Digital',
            icon: <Building2 className="w-5 h-5" />,
            description: 'Transformasi digital bisnis'
        },
        {
            value: 'digital-transformation',
            label: 'Transformasi Digital',
            icon: <Zap className="w-5 h-5" />,
            description: 'Modernisasi sistem perusahaan'
        },
        {
            value: 'cloud-solutions',
            label: 'Solusi Cloud & Infrastruktur',
            icon: <Cloud className="w-5 h-5" />,
            description: 'Migrasi dan optimasi cloud'
        },
        {
            value: 'cybersecurity',
            label: 'Keamanan Siber',
            icon: <Shield className="w-5 h-5" />,
            description: 'Perlindungan data dan sistem'
        },
        {
            value: 'data-analytics',
            label: 'Analisis Data & AI',
            icon: <BarChart3 className="w-5 h-5" />,
            description: 'Insights dari data bisnis'
        },
        {
            value: 'software-development',
            label: 'Pengembangan Perangkat Lunak',
            icon: <Code className="w-5 h-5" />,
            description: 'Aplikasi custom dan sistem'
        }
    ];

    useEffect(() => {
        setTotalPrice(formData.duration * pricePerMonth);
    }, [formData.duration]);

    const handleInputChange = (field: keyof typeof formData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim() || !formData.category || formData.duration <= 0) {
            Swal.fire({ icon: 'error', title: 'Form belum lengkap' });
            return;
        }

        setIsSubmitting(true);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/consultation', {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                duration: formData.duration
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const { snap_token } = response.data;

            window.snap.pay(snap_token, {
                onSuccess: function (result) {
                    Swal.fire('Pembayaran Berhasil', '', 'success');
                },
                onPending: function (result) {
                    Swal.fire('Menunggu Pembayaran', '', 'info');
                },
                onError: function (result) {
                    Swal.fire('Pembayaran Gagal', '', 'error');
                },
                onClose: function () {
                    console.log('Popup ditutup');
                }
            });

        } catch (error) {
            console.error(error);
            Swal.fire('Gagal mengirim permintaan konsultasi', '', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <MainTemplateUser>
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-12">
                <ConsultationHeader />

                {/* Main Form Section */}
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 lg:p-12">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-8">
                                {/* Title Section */}
                                <FormField
                                    id="title"
                                    label="Topik Konsultasi"
                                    description="Berikan judul yang menggambarkan kebutuhan Anda"
                                    icon={<MessageSquare className="w-5 h-5 text-white" />}
                                >
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Contoh: Optimalisasi Infrastruktur Cloud untuk E-commerce"
                                        className="w-full px-6 py-4 text-lg bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                        required
                                    />
                                </FormField>

                                {/* Description Section */}
                                <FormField
                                    id="description"
                                    label="Detail Kebutuhan"
                                    description="Jelaskan masalah dan tujuan yang ingin dicapai"
                                    icon={<Target className="w-5 h-5 text-white" />}
                                >
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={6}
                                        placeholder="Jelaskan secara detail tentang:\n• Masalah yang dihadapi saat ini\n• Tujuan yang ingin dicapai\n• Ekspektasi hasil konsultasi\n• Kendala atau batasan yang ada"
                                        className="w-full px-6 py-4 text-lg bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white resize-none"
                                        required
                                    />
                                </FormField>

                                {/* Category Selection */}
                                <CategorySelection
                                    categories={consultationCategories}
                                    selectedCategory={formData.category}
                                    onSelect={(value) => handleInputChange('category', value)}
                                />

                                {/* Duration Section */}
                                <FormField
                                    id="duration"
                                    label="Estimasi Durasi"
                                    description="Berapa lama proyek ini diperkirakan akan selesai?"
                                    icon={<Calendar className="w-5 h-5 text-white" />}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="relative flex-1 max-w-xs">
                                            <input
                                                type="number"
                                                value={formData.duration}
                                                onChange={(e) => handleInputChange('duration', Math.max(1, parseInt(e.target.value) || 1))}
                                                min="1"
                                                className="w-full px-6 py-4 text-lg bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                                                required
                                            />
                                            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                                bulan
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                            <Clock className="w-5 h-5" />
                                            <span>Minimum 1 bulan</span>
                                        </div>
                                    </div>
                                </FormField>

                                {/* Price Summary */}
                                <PriceSummaryCard
                                    duration={formData.duration}
                                    totalPrice={totalPrice}
                                    pricePerMonth={pricePerMonth}
                                />

                                {/* Submit Button */}
                                <SubmitButton
                                    isSubmitting={isSubmitting}
                                    isDisabled={isSubmitting || !formData.title || !formData.description || !formData.category}
                                    onClick={handleSubmit}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </MainTemplateUser>
    );
};

export default KonsultasiPage;