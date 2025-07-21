'use client'

import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types/rating';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    const renderStars = (rating: number, size = 'w-4 h-4') => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-blue-300 text-sm">{testimonial.service}</p>
                </div>
                <div className="text-right">
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-400 text-xs mt-1">{testimonial.date}</p>
                </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{testimonial.review}</p>
        </div>
    );
};

export default TestimonialCard;