'use client'

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingInputProps {
    selectedRating: number;
    onSelectRating: (rating: number) => void;
    hoverRating: number;
    onHoverEnter: (rating: number) => void;
    onHoverLeave: () => void;
    size?: string; // e.g., 'w-6 h-6', 'w-8 h-8'
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
    selectedRating,
    onSelectRating,
    hoverRating,
    onHoverEnter,
    onHoverLeave,
    size = 'w-8 h-8',
}) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`${size} cursor-pointer transition-all duration-200 ${star <= (hoverRating || selectedRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-400'
                        } hover:scale-110`}
                    onClick={() => onSelectRating(star)}
                    onMouseEnter={() => onHoverEnter(star)}
                    onMouseLeave={onHoverLeave}
                />
            ))}
        </div>
    );
};

export default StarRatingInput;