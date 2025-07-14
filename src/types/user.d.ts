// Definisi untuk data profil pengguna dari backend
export interface UserProfileData {
    id: number;
    user_id: number;
    tanggal_lahir: string | null;
    pekerjaan: string | null;
    bidang_keahlian: string | null;
    nohp: string | null;
    alamat: string | null;
    kantor: string | null;
    about: string | null;
    foto: string | null; // Nama file foto di server
    foto_url: string | null; // URL lengkap foto
    created_at: string;
    updated_at: string;
}

// Definisi untuk data yang dikembalikan dari endpoint /api/profile
export interface FullProfileResponse {
    message: string;
    name: string; // Nama dari tabel users
    id: number; // ID dari tabel users
    email: string; // Email dari tabel users
    // ... properti lain dari tabel users jika ada
    tanggal_lahir: string | null;
    pekerjaan: string | null;
    bidang_keahlian: string | null;
    nohp: string | null;
    alamat: string | null;
    kantor: string | null;
    about: string | null;
    foto: string | null;
    foto_url: string | null;
}

// Konfigurasi untuk field-field profil
export interface ProfileFieldConfig {
    key: keyof UserProfileData | 'name' | 'email'; // Bisa juga nama atau email dari user utama
    label: string;
    icon: React.ElementType; // Untuk komponen Lucide Icon
    type: 'text' | 'date' | 'tel' | 'textarea' | 'email';
}