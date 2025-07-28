# 📘 KonsulPro – Website Konsultasi IT
KonsulPro adalah platform konsultasi IT dan bisnis yang dirancang untuk menghubungkan klien dengan para ahli di berbagai bidang konsultasi. Aplikasi ini menyediakan fungsionalitas untuk manajemen artikel (blog), permintaan konsultasi, sistem pembayaran, dan panel administrasi untuk verifikasi konsultasi serta pengelolaan konten.

## Proyek ini dibagi menjadi dua bagian utama:
- Backend (API): Dibangun dengan Laravel untuk mengelola data, otentikasi, otorisasi, dan logika bisnis.
- Frontend (Web Application): Dibangun dengan Next.js (React) untuk antarmuka pengguna yang responsif dan interaktif.

## 📌 Fitur Utama
Fitur Pengguna (Client):
- Otentikasi: Pendaftaran, Login, Lupa Password, Reset Password.
- Manajemen Profil: Melihat dan memperbarui informasi profil pribadi, termasuk foto profil.
- Permintaan Konsultasi: Mengajukan permintaan konsultasi dengan detail topik, kategori, durasi, dan melihat estimasi harga.
- Pembayaran Konsultasi: Integrasi dengan sistem pembayaran (misalnya Midtrans Snap) untuk memproses pembayaran konsultasi.
- Riwayat Konsultasi: Melihat daftar konsultasi yang telah diajukan beserta statusnya.
- Rating & Testimonial: Memberikan rating dan testimonial untuk layanan konsultasi.
- Kontak: Mengirim pesan atau pertanyaan melalui formulir kontak.
- Artikel: Melihat daftar artikel dan membaca detail artikel.

Fitur Admin:
-  Dashboard Admin: Ringkasan statistik konsultasi dan artikel.
- Verifikasi Konsultasi: Melihat, mencari, memfilter, dan memperbarui status permintaan konsultasi (pending, paid, completed, cancelled).
- Manajemen Artikel (CRUD): Menambah, melihat, mengedit, dan menghapus artikel blog.
- Laporan: Menghasilkan laporan data (misalnya dalam format Excel).
- Otorisasi Berbasis Peran: Akses ke fitur admin hanya untuk pengguna dengan peran 'admin'.

## 🚀 Teknologi yang Digunakan

Backend (Laravel):
- Framework: Laravel 12+
- Database: MySQL
- Otentikasi API: Laravel Sanctum
- Pembayaran: Midtrans Snap
- Manajemen File: Laravel Storage Facade
- Seeder & Factory: Untuk data dummy pengembangan/pengujian
- Middleware: Untuk otorisasi berbasis peran

Frontend (Next.js):
- Framework: Next.js 15
- Styling: Tailwind CSS
- State Management: React Context API (untuk otentikasi)
- HTTP Client: Axios
- Notifikasi: React Toastify
- Alerts: SweetAlert2
- Icons: Lucide React

## 📸 Landing Page
![Homepage](/public/landing.png)

## 🛠️ Instalasi
### 1. Clone Repository
```bash
git clone (https://github.com/azizhadiid/my-konsulpro-app.git)
cd konsulpro-project # Atau nama folder proyek Anda
```

### 2. Instalasi Frontend (Next.js)
```bash
cd ../frontend
npm install # atau yarn install
cp .env.local.example .env.local
```

### 3. Ambil API
```bash
git clone https://github.com/azizhadiid/konsulpro-API-Laravel.git
cd konsulproAPI
php artisan serve
```

## 🔐 ENV 
### Frontend: .env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxx
```
## 💡 Catatan
- Midtrans menggunakan mode sandbox untuk simulasi pembayaran
- Brevo digunakan untuk pengiriman email otomatis setelah booking berhasil
- Pastikan koneksi frontend ↔ backend melalui CORS telah dikonfigurasi
- Pastikan sudah generate client/server key dari Midtrans Sandbox

## 📬 Kontak
Jika kamu tertarik untuk bekerja sama atau memiliki pertanyaan, silakan hubungi melalui form kontak di website ini atau email langsung ke azizalhadiid88@gmail.com.
