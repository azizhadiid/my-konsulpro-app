export interface Artikel {
    id: number;
    user_id: number;
    judul: string;
    deskripsi: string;
    kategori: string;
    tanggal_publish: string;
    foto: string | null; // Nama file foto di server
    foto_url: string | null; // URL lengkap foto
    created_at: string;
    updated_at: string;
    user?: { // Jika Anda eager load user di backend (penulis artikel)
        id: number;
        name: string;
    };
}

// Definisi untuk respons API daftar artikel (paginated)
export interface ArtikelListResponse {
    current_page: number;
    data: Artikel[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    message: string;
    artikels: Artikel[];
}

// Definisi untuk respons API detail artikel
export interface ArtikelDetailResponse {
    message: string;
    artikel: Artikel; // Backend mengembalikan dalam objek 'artikel'
}

export interface CreateArtikelPayload {
    judul: string;
    deskripsi: string;
    kategori: string;
    tanggal_publish: string;
    foto?: File | null; // File object for upload
}

export interface CreateArtikelApiResponse {
    message: string;
    artikel: Artikel;
}

export interface ApiResponse {
    message: string;
    success?: boolean; // Opsional, tergantung backend Anda
}

export interface UpdateArtikelPayload {
    judul: string;
    deskripsi: string;
    kategori: string;
    tanggal_publish: string;
    foto?: File | null; // New file to upload, or null if no new file
    _method: 'PUT'; // For Laravel method spoofing
    // Tambahkan properti ini jika Anda ingin sinyal eksplisit untuk menghapus gambar
    // is_foto_removed?: boolean;
}
