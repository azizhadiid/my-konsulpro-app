export interface UserProfile {
    pekerjaan?: string | null;
    foto?: string | null;
    foto_url?: string | null;
}

export interface Testimonial {
    id: number;
    name: string;
    service: string;
    rating: number;
    review: string;
    date: string;
    user_profile?: UserProfile;
}

export interface RatingStats {
    total_clients: number;
    average_rating: string; // e.g., "4.9/5"
    satisfaction_rate: string; // e.g., "98%"
    total_reviews: number;
}

export interface RatingListResponse {
    message: string;
    testimonials: Testimonial[];
    stats: RatingStats;
}

export interface HighRatedTestimonialsResponse {
    message: string;
    testimonials: Testimonial[];
}

export interface SubmitRatingPayload {
    service_name: string;
    rating: number;
    review: string;
}

export interface SubmitRatingResponse {
    message: string;
    rating: {
        id: number;
        user_id: number;
        service_name: string;
        rating: number;
        review: string;
        created_at: string;
        updated_at: string;
    };
}