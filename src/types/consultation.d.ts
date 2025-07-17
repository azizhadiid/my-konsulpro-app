export interface ConsultationItem {
    id: number;
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