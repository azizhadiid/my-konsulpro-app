export interface ConsultationFormData {
    title: string;
    description: string;
    duration: number;
    category: string;
}

// Tipe untuk respons dari endpoint /api/payment-token
export interface PaymentTokenResponse {
    snap_token: string;
}

// Tipe untuk data yang dikirim saat menyimpan konsultasi setelah pembayaran
export interface SaveConsultationPayload extends ConsultationFormData {
    status: 'paid' | 'pending' | 'cancelled'; // Status pembayaran
    // Anda bisa menambahkan detail transaksi Midtrans di sini jika ingin disimpan
}

// Tipe untuk respons dari endpoint /api/consultation/save
export interface ConsultationSaveResponse {
    message: string;
    consultation: {
        id: number;
        user_id: number;
        title: string;
        description: string;
        category: string;
        duration: number;
        total_price: number;
        status: string;
        created_at: string;
        updated_at: string;
    };
}

// Tipe untuk kategori konsultasi
export interface ConsultationCategory {
    value: string;
    label: string;
    icon: React.ReactNode; // Untuk komponen Lucide Icon
    description: string;
}