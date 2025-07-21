'use client'

import React from 'react';
import { MessageSquare } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '@/types/rating';

interface TestimonialSectionProps {
    testimonials: Testimonial[];
    onViewAllClick?: () => void; // Opsional jika ada tombol "Lihat Semua"
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials, onViewAllClick }) => {
    return (
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
                {testimonials.length > 0 ? (
                    testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-8">
                        <p>Belum ada testimoni. Jadilah yang pertama memberikan review!</p>
                    </div>
                )}
            </div>

            {onViewAllClick && (
                <div className="text-center">
                    <button
                        onClick={onViewAllClick}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300"
                    >
                        Lihat Semua Testimoni
                    </button>
                </div>
            )}
        </div>
    );
};

export default TestimonialSection;
