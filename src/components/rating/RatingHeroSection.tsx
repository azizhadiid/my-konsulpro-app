'use client'

import React from 'react';
import { ThumbsUp, Users, Award, TrendingUp, MessageSquare } from 'lucide-react';
import { RatingStats } from '@/types/rating';

interface RatingHeroSectionProps {
    stats: RatingStats;
}

const RatingHeroSection: React.FC<RatingHeroSectionProps> = ({ stats }) => {
    const statItems = [
        { icon: Users, label: 'Total Klien', value: stats.total_clients, color: 'text-blue-400' },
        { icon: Award, label: 'Rating Rata-rata', value: stats.average_rating, color: 'text-yellow-400' },
        { icon: TrendingUp, label: 'Tingkat Kepuasan', value: stats.satisfaction_rate, color: 'text-green-400' },
        { icon: MessageSquare, label: 'Total Review', value: stats.total_reviews, color: 'text-purple-400' }
    ];

    return (
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

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {statItems.map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-gray-300 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingHeroSection;