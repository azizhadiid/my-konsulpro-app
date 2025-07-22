// src/types/admin-dashboard.d.ts

/**
 * Interface for the dashboard statistics.
 */
export interface DashboardStats {
    total_consultations: number;
    pending_consultations: number;
    paid_consultations: number;
    completed_consultations: number;
    cancelled_consultations: number;
    total_articles: number;
    draft_articles: number;
    published_articles: number;
    total_users: number;
}

/**
 * Interface for a single latest consultation entry.
 */
export interface LatestConsultation {
    id: number;
    user_name: string;
    topik: string;
    status: 'pending' | 'paid' | 'completed' | 'cancelled';
    created_at_formatted: string;
}

/**
 * Interface for a single latest article entry.
 */
export interface LatestArticle {
    id: number;
    title: string;
    status: 'draft' | 'published';
    created_at_formatted: string;
}

/**
 * Interface for the complete API response of the admin dashboard data.
 */
export interface DashboardApiResponse {
    success: boolean;
    message: string;
    stats: DashboardStats;
    latest_consultations: LatestConsultation[];
    latest_articles: LatestArticle[];
}
