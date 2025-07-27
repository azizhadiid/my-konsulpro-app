export interface ConsultationItem {
    id: number;
    user_id: number; // Tambahkan user_id jika ada di backend
    user_name: string;
    user_email: string;
    topik: string;
    status: 'completed' | 'pending' | 'paid' | 'cancelled'; // Status yang konsisten
    tanggalBayar: string; // Format YYYY-MM-DD
    tanggalBayarFormatted: string; // Format D M Y
    harga: string; // Misal: "Rp 2.500.000"
    kategori: string;
    deskripsi?: string; // Opsional
    durasi?: number; // Opsional
    created_at: string;
    updated_at: string;
    created_at_formatted: string;
}

// Definisi untuk statistik konsultasi
export interface ConsultationStats {
    total: number;
    completed: number;
    pending: number;
    paid: number;
    cancelled: number;
}

// Definisi untuk respons API riwayat konsultasi
export interface ConsultationHistoryResponse {
    success: boolean;
    data: ConsultationItem[];
    stats: ConsultationStats;
    message: string;
    user_info?: UserData;
}

export interface AdminConsultationStats {
    total: number;
    pending: number;
    paid: number;
    completed: number;
    cancelled: number;
}

export interface ConsultationListResponse {
    success: boolean;
    message: string;
    data: ConsultationItem[];
    stats: AdminConsultationStats; // Statistik juga disertakan dalam respons daftar
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean; }[];
}

export interface UpdateConsultationStatusPayload {
    status: 'pending' | 'paid' | 'completed' | 'cancelled';
}

export interface UpdateConsultationStatusResponse {
    success: boolean;
    message: string;
    consultation?: ConsultationItem; // Opsional, jika backend mengembalikan item yang diperbarui
}

export interface ApiResponse {
    success: boolean;
    message: string;
}