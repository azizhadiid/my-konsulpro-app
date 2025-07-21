'use client'

import MainTemplateUser from "@/components/MainTemplateUser";
import React, { useState } from 'react';
import { Star, Send, CheckCircle, Users, Award, TrendingUp, MessageSquare, ThumbsUp } from 'lucide-react';

const RatingPage = () => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const services = [
        'Konsultasi IT',
        'Strategi Bisnis',
        'Digital Transformation',
        'Cloud Solutions',
        'Cybersecurity',
        'Tim Ahli'
    ];

    const testimonials = [
        {
            name: 'Ahmad Pratama',
            service: 'Digital Transformation',
            rating: 5,
            review: 'Pelayanan sangat profesional dan membantu transformasi digital perusahaan kami.',
            date: '2 hari yang lalu'
        },
        {
            name: 'Sarah Wijaya',
            service: 'Cybersecurity',
            rating: 5,
            review: 'Tim ahli yang sangat kompeten dalam bidang keamanan siber. Highly recommended!',
            date: '1 minggu yang lalu'
        },
        {
            name: 'Budi Santoso',
            service: 'Cloud Solutions',
            rating: 5,
            review: 'Migrasi ke cloud berjalan lancar berkat bantuan KonsulPro. Terima kasih!',
            date: '2 minggu yang lalu'
        }
    ];

    const stats = [
        { icon: Users, label: 'Total Klien', value: '500+', color: 'text-blue-400' },
        { icon: Award, label: 'Rating Rata-rata', value: '4.9/5', color: 'text-yellow-400' },
        { icon: TrendingUp, label: 'Tingkat Kepuasan', value: '98%', color: 'text-green-400' },
        { icon: MessageSquare, label: 'Total Review', value: '450+', color: 'text-purple-400' }
    ];

    const renderStars = (rating: number, interactive = false, size = 'w-6 h-6') => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} cursor-pointer transition-all duration-200 ${star <= (interactive ? (hoverRating || selectedRating) : rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-400'
                            } ${interactive ? 'hover:scale-110' : ''}`}
                        onClick={interactive ? () => setSelectedRating(star) : undefined}
                        onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
                        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
                    />
                ))}
            </div>
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRating > 0 && review.trim() && selectedService && name.trim()) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setSelectedRating(0);
                setReview('');
                setSelectedService('');
                setName('');
            }, 3000);
        }
    };

    return (
        <MainTemplateUser>
            <div className="mx-auto space-y-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-24 pt-24 lg:pt-28">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2">
                        <ThumbsUp className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-200 text-sm font-medium">Rating & Testimoni</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Suara Klien
                        <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Adalah Prioritas Kami
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Kepuasan dan testimoni dari klien adalah bukti komitmen kami dalam memberikan
                        solusi IT terbaik untuk transformasi digital perusahaan Anda.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex items-center space-x-3 mb-3">
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-gray-300 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Rating Form */}
                    <div className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Berikan Rating</h2>
                                    <p className="text-gray-300">Bagikan pengalaman Anda dengan layanan kami</p>
                                </div>
                            </div>

                            {submitted ? (
                                <div className="text-center space-y-4 py-8">
                                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                                    <h3 className="text-2xl font-bold text-white">Terima Kasih!</h3>
                                    <p className="text-gray-300">Review Anda telah berhasil dikirim</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-white font-medium mb-3">Nama Anda</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Masukkan nama Anda"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-3">Layanan yang Anda gunakan</label>
                                        <select
                                            value={selectedService}
                                            onChange={(e) => setSelectedService(e.target.value)}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        >
                                            <option value="" className="bg-slate-800">Pilih layanan</option>
                                            {services.map((service) => (
                                                <option key={service} value={service} className="bg-slate-800">{service}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-3">
                                            Rating Anda ({selectedRating}/5)
                                        </label>
                                        {renderStars(selectedRating, true, 'w-8 h-8')}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-3">Review Anda</label>
                                        <textarea
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            rows={4}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Ceritakan pengalaman Anda menggunakan layanan kami..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={selectedRating === 0 || !review.trim() || !selectedService || !name.trim()}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        <span>Kirim Review</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Testimoni Klien</h2>
                                <p className="text-gray-300">Pengalaman nyata dari klien kami</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                            <p className="text-blue-300 text-sm">{testimonial.service}</p>
                                        </div>
                                        <div className="text-right">
                                            {renderStars(testimonial.rating, false, 'w-4 h-4')}
                                            <p className="text-gray-400 text-xs mt-1">{testimonial.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{testimonial.review}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300">
                                Lihat Semua Testimoni
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainTemplateUser>
    );
};

export default RatingPage;