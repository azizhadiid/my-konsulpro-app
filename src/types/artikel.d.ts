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
}

// Definisi untuk respons API detail artikel
export interface ArtikelDetailResponse {
    artikel: Artikel; // Backend mengembalikan dalam objek 'artikel'
}