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
    Target
} from 'lucide-react';

import Swal from 'sweetalert2';
import { consultationService } from './services/consultationService';
import MainTemplateUser from '@/components/MainTemplateUser';
import ConsultationHeader from './components/ConsultationHeader';
import FormField from './components/FormField';
import CategorySelection from './components/CategorySelection';
import PriceSummaryCard from './components/PriceSummaryCard';
import SubmitButton from './components/SubmitButton';

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

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi
        if (!formData.title.trim() || !formData.description.trim() || !formData.category || formData.duration <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Input Tidak Lengkap',
                text: 'Mohon lengkapi semua bidang yang diperlukan!',
                customClass: {
                    container: 'my-swal-container',
                    popup: 'my-swal-popup',
                    header: 'my-swal-header',
                    title: 'my-swal-title',
                    content: 'my-swal-content',
                    confirmButton: 'my-swal-confirm-button',
                }
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Siapkan data untuk dikirim ke API
            const consultationData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                duration: formData.duration,
                total_price: totalPrice
            };

            // Kirim ke backend
            const response = await consultationService.create(consultationData);

            if (response.success) {
                const { snap_token, consultation } = response.data;

                // Tampilkan konfirmasi sebelum redirect ke pembayaran
                const result = await Swal.fire({
                    icon: 'success',
                    title: 'Konsultasi Berhasil Dibuat!',
                    html: `
                        <div class="text-left">
                            <p><strong>Judul:</strong> ${consultation.title}</p>
                            <p><strong>Durasi:</strong> ${consultation.duration} bulan</p>
                            <p><strong>Kategori:</strong> ${consultationCategories.find(cat => cat.value === consultation.category)?.label}</p>
                            <p><strong>Total Harga:</strong> Rp ${consultation.total_price.toLocaleString('id-ID')}</p>
                            <p class="mt-4 text-gray-600">Klik "Lanjut Pembayaran" untuk melanjutkan ke proses pembayaran.</p>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Lanjut Pembayaran',
                    cancelButtonText: 'Nanti Saja',
                    customClass: {
                        container: 'my-swal-container',
                        popup: 'my-swal-popup',
                        header: 'my-swal-header',
                        title: 'my-swal-title',
                        content: 'my-swal-content',
                        confirmButton: 'my-swal-confirm-button',
                        cancelButton: 'my-swal-cancel-button',
                    }
                });

                if (result.isConfirmed) {
                    // Redirect ke Midtrans Snap
                    window.snap.pay(snap_token, {
                        onSuccess: function (result) {
                            console.log('Payment success:', result);
                            Swal.fire({
                                icon: 'success',
                                title: 'Pembayaran Berhasil!',
                                text: 'Terima kasih, pembayaran Anda telah berhasil diproses.',
                                customClass: {
                                    container: 'my-swal-container',
                                    popup: 'my-swal-popup',
                                    header: 'my-swal-header',
                                    title: 'my-swal-title',
                                    content: 'my-swal-content',
                                    confirmButton: 'my-swal-confirm-button',
                                }
                            });
                        },
                        onPending: function (result) {
                            console.log('Payment pending:', result);
                            Swal.fire({
                                icon: 'info',
                                title: 'Pembayaran Pending',
                                text: 'Pembayaran Anda sedang diproses. Silakan cek status pembayaran secara berkala.',
                                customClass: {
                                    container: 'my-swal-container',
                                    popup: 'my-swal-popup',
                                    header: 'my-swal-header',
                                    title: 'my-swal-title',
                                    content: 'my-swal-content',
                                    confirmButton: 'my-swal-confirm-button',
                                }
                            });
                        },
                        onError: function (result) {
                            console.log('Payment error:', result);
                            Swal.fire({
                                icon: 'error',
                                title: 'Pembayaran Gagal',
                                text: 'Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.',
                                customClass: {
                                    container: 'my-swal-container',
                                    popup: 'my-swal-popup',
                                    header: 'my-swal-header',
                                    title: 'my-swal-title',
                                    content: 'my-swal-content',
                                    confirmButton: 'my-swal-confirm-button',
                                }
                            });
                        },
                        onClose: function () {
                            console.log('Payment popup closed');
                        }
                    });
                }

                // Reset form setelah berhasil
                setFormData({
                    title: '',
                    description: '',
                    duration: 1,
                    category: ''
                });
            }

        } catch (error: any) {
            console.error('Error creating consultation:', error);
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: error.message || 'Gagal membuat konsultasi. Silakan coba lagi.',
                customClass: {
                    container: 'my-swal-container',
                    popup: 'my-swal-popup',
                    header: 'my-swal-header',
                    title: 'my-swal-title',
                    content: 'my-swal-content',
                    confirmButton: 'my-swal-confirm-button',
                }
            });
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
                                        placeholder="Jelaskan secara detail tentang:&#10;• Masalah yang dihadapi saat ini&#10;• Tujuan yang ingin dicapai&#10;• Ekspektasi hasil konsultasi&#10;• Kendala atau batasan yang ada"
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