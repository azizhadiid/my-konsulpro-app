'use client'

import MainTemplateUser from "@/components/MainTemplateUser";
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify'; // Menggunakan react-toastify
import { authService } from '@/lib/api'; // Import authService
import { Testimonial, RatingStats } from '@/types/rating'; // Import tipe
import RatingHeroSection from "@/components/rating/RatingHeroSection";
import RatingForm from "@/components/rating/RatingForm";
import TestimonialSection from "@/components/rating/TestimonialSection";

// Import komponen-komponen baru


const RatingPage = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [stats, setStats] = useState<RatingStats>({
        total_clients: 0,
        average_rating: '0.0/5',
        satisfaction_rate: '0%',
        total_reviews: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Daftar layanan yang bisa dipilih di form rating
    const services = [
        'Konsultasi IT',
        'Strategi Bisnis',
        'Digital Transformation',
        'Cloud Solutions',
        'Cybersecurity',
        'Pengembangan Perangkat Lunak',
        'Analisis Data & AI',
        'Tim Ahli'
    ];

    const fetchRatingsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.getRatingsAndStats();
            setTestimonials(response.data.testimonials);
            setStats(response.data.stats);
        } catch (err: any) {
            console.error("Error fetching ratings data:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Gagal memuat data rating.');
            toast.error(err.response?.data?.message || 'Gagal memuat data rating.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }

        fetchRatingsData();
    }, [fetchRatingsData]);

    // Callback untuk refresh data setelah submit rating berhasil
    const handleRatingSubmitSuccess = () => {
        fetchRatingsData(); // Panggil ulang untuk mendapatkan data terbaru
    };

    if (isLoading) {
        return (
            <MainTemplateUser>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                        <p>Memuat data rating...</p>
                    </div>
                </div>
            </MainTemplateUser>
        );
    }

    if (error) {
        return (
            <MainTemplateUser>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-red-400">
                    <div className="text-center">
                        <p>{error}</p>
                        <button
                            onClick={fetchRatingsData}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </div>
            </MainTemplateUser>
        );
    }

    return (
        <MainTemplateUser>
            <div className="mx-auto space-y-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-24 pt-24 lg:pt-28">
                <RatingHeroSection stats={stats} />

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Rating Form */}
                    <RatingForm
                        onRatingSubmitSuccess={handleRatingSubmitSuccess}
                        services={services}
                    />

                    {/* Testimonials */}
                    <TestimonialSection testimonials={testimonials} />
                </div>
            </div>
        </MainTemplateUser>
    );
};

export default RatingPage;